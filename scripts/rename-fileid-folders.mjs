#!/usr/bin/env node
/* eslint-disable no-console */
import 'dotenv/config';
import cloudbase from '@cloudbase/node-sdk';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const catArg = (args.find(a => a.startsWith('--category=')) || '').split('=')[1] || null;

// 仅修复这一处：T y 堆堆蛋糕系列 -> T.y 堆堆蛋糕系列
const REPLACEMENTS = [
  {
    from: '/prod-images/T y 堆堆蛋糕系列/',
    to:   '/prod-images/T.y 堆堆蛋糕系列/',
    note: '修正 “T y 堆堆蛋糕系列” → “T.y 堆堆蛋糕系列”'
  },
];

// 可选：只处理这些分类（不填就全库扫）
const CATEGORY_FILTER = catArg ? [catArg] : null;

function fixOnePath(p) {
  if (!p || typeof p !== 'string') return p;
  let out = p;
  let hit = false;
  for (const r of REPLACEMENTS) {
    if (out.includes(r.from)) {
      out = out.replace(r.from, r.to);
      hit = true;
    }
  }
  return { changed: hit, value: out };
}

function fixDoc(doc) {
  const changes = {};
  // cover
  if (typeof doc.cover === 'string') {
    const r = fixOnePath(doc.cover);
    if (r.changed) changes.cover = r.value;
  }
  // images[]
  if (Array.isArray(doc.images) && doc.images.length) {
    const newImgs = [];
    let any = false;
    for (let i = 0; i < doc.images.length; i++) {
      const img = doc.images[i];
      if (typeof img === 'string') {
        const r = fixOnePath(img);
        if (r.changed) any = true;
        newImgs.push(r.value);
      } else {
        newImgs.push(img);
      }
    }
    if (any) changes.images = newImgs;
  }
  return changes;
}

async function run() {
  const envId = process.env.TCB_ENV || process.env.TCB_ENV_ID || process.env.TCB_ENVID;
  if (!envId) {
    console.error('[FATAL] 未找到环境变量 TCB_ENV / TCB_ENV_ID / TCB_ENVID');
    process.exit(1);
  }

  const app = cloudbase.init({
    env: envId,
    secretId: process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID,
    secretKey: process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY,
  });
  const db = app.database();
  const _ = db.command;

  console.log('[ENV]', { env: envId, dryRun, category: catArg || 'ALL' });

  // 统计总量
  const countRes = await db.collection('products')
    .where(CATEGORY_FILTER ? { categoryId: _.in(CATEGORY_FILTER) } : {})
    .count();

  const total = countRes.total || 0;
  console.log(`[COUNT] products to scan: ${total}`);

  const pageSize = 100;
  let scanned = 0;
  let changedDocs = 0;
  let changedFields = 0;

  for (let skip = 0; skip < total; skip += pageSize) {
    const res = await db.collection('products')
      .where(CATEGORY_FILTER ? { categoryId: _.in(CATEGORY_FILTER) } : {})
      .limit(pageSize)
      .skip(skip)
      .get();

    for (const doc of res.data) {
      const changes = fixDoc(doc);
      const keys = Object.keys(changes);
      if (keys.length) {
        changedDocs++;
        changedFields += keys.length;

        // 打印预览
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

run().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
