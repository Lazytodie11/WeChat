// scripts/remove-product-prices.mjs
// 批量移除云数据库 products 集合中商品的价格字段
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const envId = process.env.TCB_ENV_ID || process.env.TCB_ENV || process.env.TCB_ENVID;
const secretId = process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID;
const secretKey = process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY;

if (!envId || !secretId || !secretKey) {
  console.error('[remove-product-prices] 缺少环境或凭据变量，请确认 .env.tcb 已配置 TCB_ENV_ID / TCB_SECRET_ID / TCB_SECRET_KEY');
  process.exit(1);
}

const app = cloudbase.init({
  envId,
  env: envId,
  secretId,
  secretKey
});

const db = app.database({ env: envId });
const _ = db.command;
const col = db.collection('products');

function stripVariantPrices(variants = []) {
  if (!Array.isArray(variants)) return variants;
  return variants.map((v) => {
    if (!v || typeof v !== 'object') return v;
    const { price, priceLowest, priceText, ...rest } = v;
    return rest;
  });
}

async function run() {
  const PAGE = 100;
  let skip = 0;
  let processed = 0;
  let updated = 0;

  while (true) {
    const { data = [] } = await col.skip(skip).limit(PAGE).get();
    if (!data.length) break;
    skip += data.length;

    for (const doc of data) {
      processed += 1;
      const patch = {};
      let needUpdate = false;

      if (doc.price !== undefined) {
        patch.price = _.remove();
        needUpdate = true;
      }
      if (doc.priceLowest !== undefined) {
        patch.priceLowest = _.remove();
        needUpdate = true;
      }
      if (doc.priceText !== undefined) {
        patch.priceText = _.remove();
        needUpdate = true;
      }

      if (Array.isArray(doc.variants) && doc.variants.length) {
        const stripped = stripVariantPrices(doc.variants);
        const original = JSON.stringify(doc.variants);
        const next = JSON.stringify(stripped);
        if (original !== next) {
          patch.variants = stripped;
          needUpdate = true;
        }
      }

      if (!needUpdate) continue;

      try {
        await col.doc(doc._id).update(patch);
        updated += 1;
        console.log(`[update] ${doc._id}`);
      } catch (err) {
        console.error('[update fail]', doc._id, err);
      }
    }
  }

  console.log(`[done] scanned=${processed}, updated=${updated}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
