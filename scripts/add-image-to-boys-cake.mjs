// scripts/add-image-to-boys-cake.mjs
// 将指定图片 fileID 插入到所有 “男生款蛋糕”（categoryId=boys-cake）的 images 数组中（去重）
// 支持 --apply 提交；默认为 dry-run 仅打印计划改动

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const TARGET_CATEGORY_ID = 'boys-cake';
const TARGET_FILEID = 'cloud://cloud1-7gk4rj31c1fce8b0.636c-cloud1-7gk4rj31c1fce8b0-1380779246/prod-images/男生款蛋糕/WechatIMG127.jpg';

function uniq(arr = []) { return Array.from(new Set((arr || []).filter(Boolean))); }

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  env: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const col = db.collection('products');

async function run() {
  const apply = process.argv.includes('--apply') || process.argv.includes('--commit');
  let skip = 0, page = 0, touched = 0, updated = 0, skipped = 0;
  while (true) {
    const { data = [] } = await col.where({ categoryId: TARGET_CATEGORY_ID }).skip(skip).limit(100).get();
    if (!data.length) break;
    page++;
    for (const doc of data) {
      const imgs = Array.isArray(doc.images) ? doc.images.slice() : [];
      if (imgs.includes(TARGET_FILEID)) { skipped++; continue; }
      const next = uniq([...imgs, TARGET_FILEID]);
      const before = imgs.length, after = next.length;
      if (!apply) {
        console.log(`[DRY] would add image -> id=${doc._id} name=${doc.name || ''} images: ${before} -> ${after}`);
      } else {
        try {
          await col.doc(doc._id).update({ images: next });
          console.log(`[APPLY] updated -> id=${doc._id} name=${doc.name || ''} images: ${before} -> ${after}`);
          updated++;
        } catch (e) {
          console.error('[UPDATE FAIL]', doc._id, e && e.message ? e.message : e);
        }
      }
      touched++;
    }
    skip += data.length;
    console.log(`[batch ${page}] scanned=${data.length} touched=${touched} updated=${updated} skipped=${skipped} mode=${apply ? 'apply' : 'dry-run'}`);
  }
  console.log('[DONE]', { touched, updated, skipped, categoryId: TARGET_CATEGORY_ID, mode: (process.argv.includes('--apply')||process.argv.includes('--commit')) ? 'apply' : 'dry-run' });
}

run().catch(e => { console.error(e); process.exit(1); });
