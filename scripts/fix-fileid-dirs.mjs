// scripts/fix-fileid-dirs.mjs
// 目的：批量修正云存储 FileID 中的目录名拼写（例如 T.y → T·y、Ins瑞士卷 → Ins 瑞士卷）
// 注意：仅替换路径片段，不改变 ENV/BUCKET，不改文件名。

import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  env: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID });

// 需要修正的目录片段（左：错误，右：正确）
// 根据你的云目录，使用以下替换：将“中点版本/带空格版本”替换为“实际存在的目录名”
const REPLACEMENTS = [
  ['/prod-images/T·y 堆堆千层系列/', '/prod-images/T.y 堆堆千层系列/'],
  ['/prod-images/T·y 堆堆蛋糕系列/', '/prod-images/T.y 堆堆蛋糕系列/'],
  ['/prod-images/Ins 瑞士卷/', '/prod-images/Ins瑞士卷/'],
];

function fixPath(fid = '') {
  if (typeof fid !== 'string') return fid;
  if (!fid.startsWith('cloud://')) return fid;
  let out = fid;
  for (const [from, to] of REPLACEMENTS) {
    if (out.includes(from)) out = out.replace(from, to);
  }
  return out;
}

async function run() {
  const col = db.collection('products');
  let skip = 0, page = 0, updated = 0, scanned = 0;
  while (true) {
    const { data } = await col.skip(skip).limit(100).get();
    const list = data || [];
    if (!list.length) break;
    page++;
    for (const doc of list) {
      scanned++;
      const coverNew = fixPath(doc.cover);
      const imagesNew = Array.isArray(doc.images) ? doc.images.map(fixPath) : [];
      const needUpdate = (coverNew !== doc.cover) || (JSON.stringify(imagesNew) !== JSON.stringify(doc.images || []));
      if (!needUpdate) continue;
      try {
        await col.doc(doc._id).update({ cover: coverNew, images: imagesNew });
        updated++;
        console.log(`[FIX] ${doc._id}`);
      } catch (e) {
        console.error('[UPDATE FAIL]', doc._id, e && e.message ? e.message : e);
      }
    }
    skip += list.length;
    console.log(`[batch ${page}] scanned=${scanned} updated=${updated}`);
  }
  console.log(`[DONE] scanned=${scanned} updated=${updated}`);
}

run().catch(e => { console.error('[FATAL]', e); process.exit(1); });
