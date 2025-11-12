// scripts/repair-products.mjs  —— 覆盖整个文件
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  // 某些场景需要同时传递 env 字段以消除 SDK 的未指定 env 警告
  env: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const col = db.collection('products');

const PREFIX_TO_CATEGORY = new Set([
  'flavor-milk-cake',
  'girls-cake', 'boys-cake',
  'ty-mille', 'ty-cake',
  'french-mille', 'basque', 'tiramisu',
  'ins-roll', 'accessories',
  'four-inch', 'eight-inch',
  'lava-falls'
]);

const PLACEHOLDER = `cloud://${process.env.TCB_ENV_ID}.${process.env.TCB_BUCKET}/prod-images/common/placeholder.png`;

function inferCategoryIdFromId(id='') {
  const segs = String(id).split('-');
  if (segs.length < 2) return '';
  const key = `${segs[0]}-${segs[1]}`;
  return PREFIX_TO_CATEGORY.has(key) ? key : '';
}

const uniq = arr => Array.from(new Set(arr)).filter(Boolean);
const chunk = (arr, n) => {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
};

// ✅ 分批（<=50）取临时 URL，并要求每个元素含 fileID + maxAge
async function getTempURLMap(fileIDs = []) {
  const map = new Map();
  const ids = uniq(fileIDs);
  if (!ids.length) return map;

  const groups = chunk(ids, 50);
  for (const g of groups) {
    const fileList = g.map(f => ({ fileID: f, maxAge: 3600 }));
    const { fileList: res } = await app.getTempFileURL({ fileList });
    for (const it of res) {
      map.set(it.fileID, it.tempFileURL || '');
    }
  }
  return map;
}

async function run() {
  let skip = 0, page = 0, updated = 0;
  while (true) {
    const { data = [] } = await col.skip(skip).limit(100).get();
    if (!data.length) break;
    page++;

    const allFileIDs = uniq(data.flatMap(d => Array.isArray(d.images) ? d.images : []));
    const urlMap = await getTempURLMap(allFileIDs);

    for (const doc of data) {
      const patch = {};

      // 1) 补 categoryId
      if (!doc.categoryId) {
        const cat = inferCategoryIdFromId(doc._id);
        if (cat) patch.categoryId = cat;
      }

      // 2) 清理 images：去重/去占位/去不可达
      let images = Array.isArray(doc.images) ? uniq(doc.images) : [];
      images = images.filter(f => f !== PLACEHOLDER && urlMap.get(f));
      if (JSON.stringify(images) !== JSON.stringify(doc.images || [])) {
        patch.images = images;
      }

      // 3) 自动补 cover
      if ((!doc.cover || !String(doc.cover).trim()) && images.length) {
        patch.cover = images[0];
      }

      // 4) 没图就下架，避免前端空卡片
      if (!images.length) patch.status = 0;

      if (Object.keys(patch).length) {
        try {
          await col.doc(doc._id).update(patch);
          updated++;
        } catch (e) {
          console.error('[UPDATE FAIL]', doc._id, e);
        }
      }
    }

    skip += data.length;
    console.log(`[batch ${page}] processed=${data.length}, totalUpdated=${updated}`);
  }
  console.log('[DONE] updated=', updated);
}

run().catch(e => { console.error(e); process.exit(1); });
