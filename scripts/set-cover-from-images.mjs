// scripts/set-cover-from-images.mjs
// 将 products 集合中每条文档的 cover 统一设置为 images[0]
// 支持预演/指定分类/仅修复 cover!=images[0] 的文档
// 用法：
//   预演： node scripts/set-cover-from-images.mjs
//   按分类：node scripts/set-cover-from-images.mjs --category=girls-cake
//   写库：  node scripts/set-cover-from-images.mjs --commit
//   强制：  node scripts/set-cover-from-images.mjs --commit --force  （即使 cover 已等于 images[0] 也写入）

import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const args = process.argv.slice(2);
const COMMIT = args.includes('--commit');
const FORCE = args.includes('--force');
const catArg = (args.find(a => a.startsWith('--category=')) || '').split('=')[1] || '';

function reqEnv(name){
  const v = process.env[name];
  if(!v){
    throw new Error(`Missing env: ${name}. Please set it in .env.tcb`);
  }
  return v;
}

const app = cloudbase.init({
  envId: reqEnv('TCB_ENV_ID'),
  env: reqEnv('TCB_ENV_ID'),
  secretId: reqEnv('TCB_SECRET_ID'),
  secretKey: reqEnv('TCB_SECRET_KEY'),
});
const db = app.database({ env: reqEnv('TCB_ENV_ID') });

async function main(){
  const col = db.collection('products');
  const where = catArg ? { categoryId: catArg } : {};
  const { total } = await col.where(where).count();
  const limit = 100;
  let skip = 0;
  const stats = { total, scanned: 0, withImages: 0, changed: 0, same: 0, emptyImages: 0, failed: 0 };
  console.log(`[START] total=${total} category=${catArg || '(all)' } commit=${COMMIT} force=${FORCE}`);

  while (skip < total) {
    const { data: batch } = await col.where(where).skip(skip).limit(limit).get();
    if (!batch || !batch.length) break;
    for (const doc of batch) {
      stats.scanned++;
      const images = Array.isArray(doc.images) ? doc.images : [];
      if (!images.length) { stats.emptyImages++; continue; }
      stats.withImages++;
      const target = images[0];
      if (!FORCE && doc.cover === target) { stats.same++; continue; }
      try {
        if (COMMIT) await col.doc(doc._id).update({ cover: target });
        stats.changed++;
        console.log(`[SET] ${doc._id} cover <- images[0] (${target})`);
      } catch (e) {
        stats.failed++;
        console.error(`[FAIL] ${doc._id}`, e && e.message ? e.message : e);
      }
    }
    skip += batch.length;
  }

  console.log(`[SUMMARY]`, stats);
  if (!COMMIT) console.log('（预演模式；加 --commit 才会写库）');
}

main().catch(e => { console.error('[FATAL]', e); process.exit(1); });
