// scripts/set-boys-cover-from-images.mjs
// 将“男生款蛋糕”（categoryId = boys-cake）的 cover 统一设置为 images[0]
// 默认 dry-run 仅打印；使用 --apply 实际写库

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const TARGET_CATEGORY_ID = 'boys-cake';
const APPLY = process.argv.includes('--apply') || process.argv.includes('--commit');
const ONLY_EMPTY = process.argv.includes('--only-empty');

function firstImage(arr = []) {
  if (!Array.isArray(arr)) return '';
  for (const v of arr) {
    if (typeof v === 'string' && v.trim()) return v.trim();
  }
  return '';
}

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  env: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const col = db.collection('products');

async function run() {
  let skip = 0, page = 0;
  let scanned = 0, updated = 0, skipped = 0, missing = 0;
  while (true) {
    const { data = [] } = await col.where({ categoryId: TARGET_CATEGORY_ID }).skip(skip).limit(100).get();
    if (!data.length) break;
    page++;
    for (const doc of data) {
      scanned++;
      const first = firstImage(doc.images);
      if (!first) { missing++; console.log(`[MISS] ${doc._id} no images[0]`); continue; }
      if (ONLY_EMPTY && (typeof doc.cover === 'string' && doc.cover.trim())) { skipped++; continue; }
      if (doc.cover === first) { skipped++; continue; }
      if (!APPLY) {
        console.log(`[DRY] set cover <- images[0] | id=${doc._id} name=${doc.name || ''}`);
      } else {
        try {
          await col.doc(doc._id).update({ cover: first });
          console.log(`[APPLY] set cover <- images[0] | id=${doc._id}`);
          updated++;
        } catch (e) {
          console.error('[UPDATE FAIL]', doc._id, e && e.message ? e.message : e);
        }
      }
    }
    skip += data.length;
    console.log(`[batch ${page}] scanned=${scanned} updated=${updated} skipped=${skipped} missing=${missing} mode=${APPLY ? 'apply' : 'dry-run'}${ONLY_EMPTY ? ' only-empty' : ''}`);
  }
  console.log('[DONE]', { scanned, updated, skipped, missing, mode: APPLY ? 'apply' : 'dry-run', onlyEmpty: ONLY_EMPTY });
}

run().catch(e => { console.error(e); process.exit(1); });

