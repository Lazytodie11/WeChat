// scripts/clean-weird-images.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const col = db.collection('products');

// 判定“可疑图片名”（含空格或明显打错的片名片段，如 " 1.jpg"、" 2.jpeg"）
function isWeirdName(fileID = '') {
  const s = String(fileID);
  // 只看文件名部分
  const fname = decodeURIComponent(s.split('/').pop() || '');
  // 规则：文件名里含空格；或出现像 "1 1.jpg" 这种明显误拼
  return /\s/.test(fname) || /(?:\d)\s+(?:\d)/.test(fname);
}

const uniq = arr => Array.from(new Set(arr)).filter(Boolean);

async function run() {
  let skip = 0, fixed = 0, touched = 0, page = 0;

  while (true) {
    const { data = [] } = await col.skip(skip).limit(100).get();
    if (!data.length) break;
    page++;

    for (const doc of data) {
      const images = Array.isArray(doc.images) ? doc.images.slice() : [];
      if (!images.length) continue;

      const keep = images.filter(f => !isWeirdName(f));
      if (keep.length === images.length) continue; // 没有脏名，不动

      const patch = { images: uniq(keep) };
      // 如果封面被踢掉了，换成第一张
      if (doc.cover && !patch.images.includes(doc.cover)) {
        patch.cover = patch.images[0] || '';
      }
      // 没图了就下架，避免前端空卡片
      if (!patch.images.length) patch.status = 0;

      try {
        await col.doc(doc._id).update(patch);
        touched++;
        fixed += images.length - keep.length;
        console.log('[FIXED]', doc._id, 'removed=', images.length - keep.length,
                    'remain=', patch.images.length, patch.cover ? '' : '(no cover)');
      } catch (e) {
        console.error('[UPDATE FAIL]', doc._id, e);
      }
    }

    skip += data.length;
    console.log(`[batch ${page}] scanned=${data.length}, cleaned_so_far=${fixed}, updated_docs=${touched}`);
  }

  console.log('[DONE] removed_files=', fixed, 'updated_docs=', touched);
}

run().catch(e => { console.error(e); process.exit(1); });
