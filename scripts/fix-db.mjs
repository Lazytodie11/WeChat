// 修复：补齐 categories + 回填 products.categoryId + 删除测试文档
// 运行：node scripts/fix-db.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });

import cloudbase from '@cloudbase/node-sdk';

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const _ = db.command;

// 你小程序里侧边栏的类目清单（名称可按你实际想展示的中文）
// 注意：_id 就是前端/产品里用的 categoryId
const CATEGORIES = [
  {_id:'flavor-milk-cake', name:'口味奶糕',     sort:100},
  {_id:'girls-cake',       name:'女生款蛋糕',   sort:200},
  {_id:'boys-cake',        name:'男生款蛋糕',   sort:250},
  {_id:'ty-mille',         name:'T·y堆堆千层系列', sort:300},
  {_id:'ty-cake',          name:'T·y堆堆蛋糕系列', sort:400},
  {_id:'french-mille',     name:'法式千层蛋糕', sort:500},
  {_id:'basque',           name:'巴斯克蛋糕',   sort:600},
  {_id:'tiramisu',         name:'提拉米苏蛋糕', sort:700},
  {_id:'ins-roll',         name:'Ins瑞士卷',    sort:800},
  {_id:'accessories',      name:'蛋糕配件',     sort:900},
  {_id:'four-inch',        name:'4寸蛋糕',     sort:1000},
  {_id:'eight-inch',       name:'8寸蛋糕',     sort:1100},
  {_id:'lava-falls',       name:'爆浆瀑布蛋糕', sort:1200},
];

// 批量遍历集合
async function forEachDoc(colName, handler, batchSize = 100) {
  const col = db.collection(colName);
  const { total } = await col.count();
  let processed = 0;
  while (processed < total) {
    const { data } = await col.skip(processed).limit(batchSize).get();
    for (const doc of data) await handler(doc);
    processed += data.length;
    if (!data.length) break;
  }
}

async function upsertCategories() {
  const col = db.collection('categories');
  let inserted = 0, updated = 0;
  for (const c of CATEGORIES) {
    try {
      // set 覆盖式写入（不带 _id 字段本体）——写入 name/sort
      await col.doc(c._id).set({ name: c.name, sort: c.sort });
      inserted++;
    } catch (e) {
      try {
        await col.doc(c._id).update({ name: c.name, sort: c.sort });
        updated++;
      } catch (e2) {
        console.error('[CATEGORY UPSERT FAIL]', c._id, e2);
      }
    }
  }
  console.log(`[CATEGORIES] upsert done: inserted=${inserted} updated=${updated}`);
}

function inferCategoryIdFromProductId(pid='') {
  // 规则：取 _id 的前两段（如 girls-cake-xxx => girls-cake）
  // 兼容只有一段的意外情况（如 basque-xxx 也能得到 basque）
  const parts = String(pid).split('-');
  if (parts.length >= 2) return `${parts[0]}-${parts[1]}`;
  return parts[0] || '';
}

async function backfillProductCategoryId() {
  const col = db.collection('products');
  let fixed = 0, skipped = 0, total = 0;

  await forEachDoc('products', async (doc) => {
    total++;
    if (doc.categoryId) { skipped++; return; }

    const cid = inferCategoryIdFromProductId(doc._id);
    if (!cid) { console.warn('[NO CID INFER]', doc._id); return; }

    try {
      await col.doc(doc._id).update({ categoryId: cid });
      fixed++;
    } catch (e) {
      console.error('[BACKFILL FAIL]', doc._id, e);
    }
  });

  console.log(`[PRODUCTS] total=${total} fixed=${fixed} skipped=${skipped}`);
}

async function deleteTestDoc() {
  const col = db.collection('products');
  try {
    await col.doc('milk-cake-01').remove();
    console.log('[DELETE] milk-cake-01 removed');
  } catch (e) {
    // 不存在就忽略
    console.log('[DELETE] milk-cake-01 not found or already removed');
  }
}

async function statPerCategory() {
  const col = db.collection('products');
  const ids = CATEGORIES.map(c=>c._id);
  for (const id of ids) {
    const { total } = await col.where({ categoryId: id }).count();
    console.log(`[STAT] ${id} => ${total}`);
  }
}

(async function main(){
  await upsertCategories();
  await backfillProductCategoryId();
  await deleteTestDoc();
  await statPerCategory();
  console.log('[DONE]');
})().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
