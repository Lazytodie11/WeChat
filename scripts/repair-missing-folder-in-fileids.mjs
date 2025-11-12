#!/usr/bin/env node
/* eslint-disable no-console */
import 'dotenv/config';
import cloudbase from '@cloudbase/node-sdk';
import { db, appEnv } from './lib/tcb.js';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const catArg = (args.find(a => a.startsWith('--category=')) || '').split('=')[1] || null;

const ENV_ID = process.env.TCB_ENV || process.env.TCB_ENV_ID || process.env.TCB_ENVID;
const SECRET_ID = process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID;
const SECRET_KEY = process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY;

if (!ENV_ID || !SECRET_ID || !SECRET_KEY) {
  console.error('[FATAL] 缺少云开发凭据，请确认 .env.tcb 已通过 DOTENV_CONFIG_PATH 加载：', {
    ENV_ID: !!ENV_ID, SECRET_ID: !!SECRET_ID, SECRET_KEY: !!SECRET_KEY
  });
  process.exit(1);
}

console.log('[ENV]', appEnv);

// 1) 需要补的“中文子目录”映射（按分类）
const CATEGORY_FOLDER = {
  'ty-cake': 'T.y 堆堆蛋糕系列',
  'ty-mille': 'T.y 堆堆千层系列',      // 这里按你的实际存储目录调整
  'french-mille': '法式千层蛋糕',
  'basque': '巴斯克蛋糕',
  'tiramisu': '提拉米苏蛋糕',
  'ins-roll': 'Ins瑞士卷',
  'accessories': '蛋糕配件',
  'four-inch': '4寸蛋糕',
  'eight-inch': '8寸蛋糕',
  'lava-falls': '爆浆瀑布蛋糕',
  'girls-cake': '女生款蛋糕',
  'flavor-milk-cake': '口味奶糕',
};

// 2) 先做“目录名纠错”的替换表（不改变文件名，只修正中间目录）
const REPLACEMENTS = [
  {
    from: '/prod-images/T y 堆堆蛋糕系列/',
    to:   '/prod-images/T.y 堆堆蛋糕系列/',
    note: '修正 T y → T.y',
  },
];

/** 在路径里应用目录名纠错（只做字符串替换） */
function applyFolderRenames(p) {
  if (!p || typeof p !== 'string') return p;
  let out = p;
  for (const r of REPLACEMENTS) {
    if (out.includes(r.from)) {
      out = out.replace(r.from, r.to);
    }
  }
  return out;
}

/** 如果缺少中文子目录，就补上；随后再跑一次目录名纠错 */
function fixPathByCategory(p, categoryId) {
  if (!p || typeof p !== 'string') return p;

  // 先跑一轮目录名纠错（比如把已经错写成 T y 的先替回来，避免误判）
  let out = applyFolderRenames(p);

  const folder = CATEGORY_FOLDER[categoryId];
  if (!folder) return out;

  const PREFIX = '/prod-images/';
  const idx = out.indexOf(PREFIX);
  if (idx === -1) return out;

  // 取出 /prod-images/ 后的部分，检查是否已含有对应中文子目录前缀
  const after = out.slice(idx + PREFIX.length);
  const alreadyHas = after.startsWith(`${folder}/`) || after.startsWith(`${folder}\\`);

  if (!alreadyHas) {
    // 说明以前把图片直接丢在 /prod-images 根下了，给它补上该分类的中文目录
    out = out.replace(PREFIX, `${PREFIX}${folder}/`);
  }

  // 再跑一轮目录名纠错（防御性，确保最终是正确的）
  out = applyFolderRenames(out);
  return out;
}

function fixDoc(doc) {
  const changes = {};
  // cover
  if (typeof doc.cover === 'string') {
    const fixed = fixPathByCategory(doc.cover, doc.categoryId);
    if (fixed !== doc.cover) changes.cover = fixed;
  }
  // images[]
  if (Array.isArray(doc.images) && doc.images.length) {
    const next = doc.images.map(img =>
      typeof img === 'string' ? fixPathByCategory(img, doc.categoryId) : img
    );
    const changed = next.some((v, i) => v !== doc.images[i]);
    if (changed) changes.images = next;
  }
  return changes;
}

async function run() {
  const app = cloudbase.init({
    env: ENV_ID,
    secretId: SECRET_ID,
    secretKey: SECRET_KEY,
  });
  const db = app.database();
  const _ = db.command;

  const where = catArg ? { categoryId: _.in([catArg]) } : {};
  const { total } = await db.collection('products').where(where).count();
  console.log(`[COUNT] products to scan: ${total}`);

  const pageSize = 100;
  let scanned = 0;
  let changedDocs = 0;
  let changedFields = 0;

  for (let skip = 0; skip < total; skip += pageSize) {
    const res = await db.collection('products').where(where).limit(pageSize).skip(skip).get();
    for (const doc of res.data) {
      const changes = fixDoc(doc);
      const keys = Object.keys(changes);
      if (keys.length) {
        changedDocs++;
        changedFields += keys.length;

        console.log(`[CHANGE] ${doc._id} (${doc.categoryId || '-'})`);
        if (changes.cover) {
          console.log('  cover:');
          console.log(`    ${doc.cover}`);
          console.log(` -> ${changes.cover}`);
        }
        if (changes.images) {
          (doc.images || []).forEach((img, idx) => {
            if (img !== changes.images[idx]) {
              console.log(`  images[${idx}]:`);
              console.log(`    ${img}`);
              console.log(` -> ${changes.images[idx]}`);
            }
          });
        }

        if (!dryRun) {
          await db.collection('products').doc(doc._id).update({ data: changes });
        }
      }
      scanned++;
    }
  }

  console.log('\n[SUMMARY]', { scanned, changedDocs, changedFields, dryRun });
}

run().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
