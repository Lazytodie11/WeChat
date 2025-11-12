// scripts/dump-mapping-template.mjs
// 把某分类里 still 用 placeholder 的商品导出成一个“待填映射模板”。
// 额外增强：把本地 assets 目录中该分类的所有文件名一并列出来，方便粘贴；
//           可选 --guess 启用基于商品名的粗略匹配建议（不会改库）。
//
// 用法示例：
// node scripts/dump-mapping-template.mjs --category=ty-cake --dir="T y 堆堆蛋糕系列" --out=./mappings/ty-cake.json --assetsDir=./assets --guess

import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';
dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database();

const args = Object.fromEntries(
  process.argv.slice(2).map(s => {
    const i = s.indexOf('=');
    return i > 0 ? [s.slice(2, i), s.slice(i + 1)] : [s.replace(/^--/, ''), true];
  })
);

const categoryId = args.category;
const dir = args.dir; // 存储子目录名（和你“存储”里的中文目录一致）
const out = args.out || `./mappings/${categoryId || 'unknown'}.json`;
const assetsDir = args.assetsDir || './assets';
const doGuess = !!args.guess;

if (!categoryId || !dir) {
  console.error('用法：node scripts/dump-mapping-template.mjs --category=<cid> --dir="<存储子目录>" [--out=./mappings/file.json] [--assetsDir=./assets] [--guess]');
  process.exit(1);
}

const PLACEHOLDER_RE = /\/placeholder\.png(\?.*)?$/i;
const isPlaceholder = s => typeof s === 'string' && PLACEHOLDER_RE.test(s);

// 把中文名转 slug，便于和文件名做包含匹配
function slugify(s = '') {
  return String(s)
    .normalize('NFKC')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

async function* iterAll(col, where = {}, pageSize = 100) {
  let skip = 0;
  for (;;) {
    const { data } = await col.where(where).skip(skip).limit(pageSize).get();
    if (!data || !data.length) return;
    for (const d of data) yield d;
    skip += data.length;
  }
}

function basePrefix() {
  return `cloud://${process.env.TCB_ENV_ID}.${process.env.TCB_BUCKET}/prod-images/${dir}/`;
}

// 读取本地 assets 对应目录的全部文件名（只要图片）
function readLocalDirFilenames() {
  const p = path.resolve(assetsDir, 'prod-images', dir);
  if (!fssync.existsSync(p)) return [];
  const all = fssync.readdirSync(p, { withFileTypes: true })
    .filter(d => d.isFile())
    .map(d => d.name)
    .filter(n => /\.(jpe?g|png|webp|gif|bmp)$/i.test(n))
    .sort((a, b) => a.localeCompare(b, 'zh-Hans-CN'));
  return all;
}

// 简单“猜测”：文件名包含商品名 or slug 的就当作候选
function guessFilesForProduct(name, allFiles) {
  const s = slugify(name);
  const plain = name.replace(/\s+/g, '');
  const picks = allFiles.filter(fn => {
    const low = fn.toLowerCase();
    return low.includes(s) || fn.includes(plain);
  });
  // 如果完全匹配不到，就返回空数组（让你自己选）
  return picks;
}

async function run() {
  const col = db.collection('products');
  const where = { categoryId };
  const items = [];

  // 先把该分类下仍是 placeholder 的商品挑出来
  for await (const d of iterAll(col, where)) {
    const badCover = isPlaceholder(d.cover);
    const badImgs = !Array.isArray(d.images) || d.images.length === 0 || d.images.some(isPlaceholder);
    if (badCover || badImgs) {
      items.push({
        _id: d._id,
        name: d.name || '',
        categoryId: d.categoryId || '',
        files: [],                 // ← 你要填的文件名（不含前缀）
        guess: []                  // ← 可选的猜测（仅建议）
      });
    }
  }

  if (!items.length) {
    console.log(`[OK] 分类 ${categoryId} 没有 placeholder 记录。`);
    return;
  }

  // 把本地目录下的全部文件名也打包进模板，方便你复制粘贴
  const dirFiles = readLocalDirFilenames();

  // 做一次粗略猜测（不强制）
  if (doGuess && dirFiles.length) {
    for (const it of items) {
      it.guess = guessFilesForProduct(it.name, dirFiles);
    }
  }

  const payload = {
    categoryId,
    dir,
    fileIdPrefix: basePrefix(),
    tips: "把 files 填成 [\"WechatIMG227.jpg\",\"WechatIMG228.jpg\"...]，不要包含前缀。第一张会设为 cover。",
    dirFiles,  // ← 该目录下的所有文件名（可复制）
    items
  };

  await fs.mkdir(path.dirname(out), { recursive: true });
  await fs.writeFile(out, JSON.stringify(payload, null, 2), 'utf8');
  console.log(`[DONE] 模板已写入 ${out}`);
  console.log(`前缀：${payload.fileIdPrefix} + <文件名>`);
  console.log(`本地目录文件数：${dirFiles.length}`);
}

run().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
