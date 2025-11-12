// scripts/upsert-ty-mille-options.mjs
// 将“堆堆千层（ty-mille）”分类下的所有商品批量写入 options（口味单选）
// 运行示例：
//   预演：node scripts/upsert-ty-mille-options.mjs
//   落库：node scripts/upsert-ty-mille-options.mjs --commit

import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });

import path from 'node:path';
import { createRequire } from 'node:module';
import cloudbase from '@cloudbase/node-sdk';

const require = createRequire(import.meta.url);
// 读取小程序常量里的口味清单
const { TY_MILLE_FLAVORS } = require('../miniprogram/constants/options.js');

const COMMIT = process.argv.includes('--commit');

function reqEnv(name){
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}. Please set it in .env.tcb`);
  return v;
}

const app = cloudbase.init({
  envId: reqEnv('TCB_ENV_ID'),
  env: reqEnv('TCB_ENV_ID'),
  secretId: reqEnv('TCB_SECRET_ID'),
  secretKey: reqEnv('TCB_SECRET_KEY'),
});
const db = app.database({ env: reqEnv('TCB_ENV_ID') });

function desiredOptions() {
  return [
    {
      id: 'flavor',
      name: '口味',
      type: 'single',
      min: 0,
      max: 1,
      items: (Array.isArray(TY_MILLE_FLAVORS) ? TY_MILLE_FLAVORS : []).map(x => ({ id: x.id, name: x.name }))
    }
  ];
}

function sameOptions(a, b){
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch(_) { return false; }
}

async function main(){
  const col = db.collection('products');
  const where = { categoryId: 'ty-mille' };
  const { total } = await col.where(where).count();
  const limit = 100;
  let skip = 0;
  let scanned = 0, updated = 0, skipped = 0, failed = 0;
  const nextOpts = desiredOptions();
  console.log(`[START] ty-mille upsert options, total≈${total}, commit=${COMMIT}`);

  while (skip < total) {
    const { data } = await col.where(where).skip(skip).limit(limit).get();
    if (!data || !data.length) break;
    for (const doc of data) {
      scanned++;
      const opts = Array.isArray(doc.options) ? doc.options : [];
      if (opts.length && sameOptions(opts, nextOpts)) { skipped++; continue; }
      try {
        if (COMMIT) await col.doc(doc._id).update({ options: nextOpts });
        updated++;
        console.log(`[SET] ${doc._id} options <- flavor(${nextOpts[0].items.length})`);
      } catch (e) {
        failed++;
        console.error('[FAIL]', doc._id, e && e.message ? e.message : e);
      }
    }
    skip += data.length;
  }

  console.log(`[SUMMARY] scanned=${scanned} updated=${updated} skipped=${skipped} failed=${failed} commit=${COMMIT}`);
  if (!COMMIT) console.log('（预演模式；加 --commit 才会写回数据库）');
}

main().catch(e => { console.error('[FATAL]', e); process.exit(1); });

