#!/usr/bin/env node
// 批量修正 products.images / cover 的 cloud:// 路径中的【目录段】
// 默认 dry-run 仅打印；加 --apply 才真正写回数据库
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });

import cloudbase from '@cloudbase/node-sdk';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));
const APPLY = !!argv.apply;

// 你的环境 & bucket
const ENV_ID = process.env.TCB_ENV_ID;
const BUCKET = process.env.TCB_BUCKET;

// ===== 目录映射（按你控制台存储里的中文目录名，务必与控制台一致！）=====
const DIR_MAP = {
  'flavor-milk-cake': '口味奶糕',
  'girls-cake':       '女生款蛋糕',
  'boys-cake':        '男生款蛋糕',
  'ty-mille':         'T y 堆堆千层系列',   // ← 注意中间是空格，不是点
  'ty-cake':          'T y 堆堆蛋糕系列',
  'french-mille':     '法式千层蛋糕',
  'basque':           '巴斯克蛋糕',
  'tiramisu':         '提拉米苏蛋糕',
  'ins-roll':         'Ins瑞士卷',
  'accessories':      '蛋糕配件',
  'four-inch':        '4寸蛋糕',
  'eight-inch':       '8寸蛋糕',
  'lava-falls':       '爆浆瀑布蛋糕',
};

// 统一拼接 FileID
const fileID = (dir, base) =>
  `cloud://${ENV_ID}.${BUCKET}/prod-images/${dir}/${base}`;

// 从 url/fileID 里取出文件名
function baseName(s = '') {
  try {
    if (!s) return '';
    // 允许 http(s) / cloud:// / 其他
    const u = s.startsWith('http') ? new URL(s).pathname : s.replace(/^[^/]*:\/\//, '');
    const seg = decodeURIComponent(u.split('/').pop() || '');
    return seg;
  } catch {
    return String(s).split('/').pop() || '';
  }
}

// 把任意图片字符串（http 或 cloud）重写到目标目录，保留文件名
function rewriteToDir(img, targetDir) {
  if (!img) return img;
  const base = baseName(img);
  if (!base) return img;
  // 已经是目标目录则跳过
  if (img.startsWith('cloud://') &&
      img.includes(`/prod-images/${targetDir}/`) &&
      img.endsWith(`/${base}`)) return img;
  return fileID(targetDir, base);
}

// 打印差异
function diff(oldV, newV) {
  return oldV === newV ? null : { from: oldV, to: newV };
}

async function run() {
  if (!ENV_ID || !BUCKET) {
    console.error('[FATAL] 请在 .env.tcb 配置 TCB_ENV_ID / TCB_BUCKET');
    process.exit(1);
  }

  const app = cloudbase.init({
    envId: ENV_ID,
    secretId: process.env.TCB_SECRET_ID,
    secretKey: process.env.TCB_SECRET_KEY,
  });
  const db = app.database({ env: ENV_ID });
  const col = db.collection('products');

  let cursor = col.limit(1000);
  const { data: all } = await cursor.get();

  let changed = 0, scanned = 0;

  for (const doc of all) {
    scanned++;
    const dir = DIR_MAP[doc.categoryId];
    if (!dir) continue; // 未知分类跳过

    const beforeCover = doc.cover || '';
    const beforeImages = Array.isArray(doc.images) ? doc.images.slice() : [];

    // 生成新值
    const afterCover = beforeCover ? rewriteToDir(beforeCover, dir) : beforeCover;
    const afterImages = beforeImages.map(img => rewriteToDir(img, dir));

    // 如果没有 images 而有 cover，就用 cover 填充第一张
    if ((!afterImages || !afterImages.length) && afterCover) {
      afterImages.push(afterCover);
    }

    // 统计差异
    const diffs = [];
    const d1 = diff(beforeCover, afterCover);
    if (d1) diffs.push({ field: 'cover', ...d1 });
    for (let i = 0; i < Math.max(beforeImages.length, afterImages.length); i++) {
      const d = diff(beforeImages[i] || '', afterImages[i] || '');
      if (d) diffs.push({ field: `images[${i}]`, ...d });
    }

    if (!diffs.length) continue;

    console.log(`\n[CHANGE] ${doc._id} (${doc.categoryId})`);
    diffs.forEach(d => console.log(` - ${d.field}: \n    ${d.from}\n -> ${d.to}`));

    if (APPLY) {
      await col.doc(doc._id).update({
        cover: afterCover,
        images: afterImages
      });
      changed++;
    }
  }

  console.log(`\n[SUMMARY] scanned=${scanned} ${APPLY ? 'updated=' + changed : '(dry-run, no write)'}`);
}

run().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
