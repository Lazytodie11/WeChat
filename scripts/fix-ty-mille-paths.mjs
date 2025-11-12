// scripts/fix-ty-mille-paths.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });

import cloudbase from '@cloudbase/node-sdk';

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID });

const ENV = process.env.TCB_ENV_ID;
const BUCKET = process.env.TCB_BUCKET;

// 将中点目录替换为你云端实际存在的句点目录
function fixFileID(fid) {
  if (!fid || typeof fid !== 'string') return fid;
  const pairs = [
    [`/prod-images/T·y 堆堆千层系列/`, `/prod-images/T.y 堆堆千层系列/`],
    [`/prod-images/T·y 堆堆蛋糕系列/`, `/prod-images/T.y 堆堆蛋糕系列/`],
  ];
  let out = fid;
  for (const [from, to] of pairs) {
    if (out.includes(from)) out = out.replace(from, to);
  }
  return out;
}

async function run() {
  const col = db.collection('products');

  // 仅修正 ty-mille 分类的商品
  const { data } = await col.where({ categoryId: 'ty-mille' }).get();
  console.log(`[INFO] ty-mille count=${data.length}`);

  let fixed = 0;
  for (const p of data) {
    const coverNew = fixFileID(p.cover);
    const imagesNew = Array.isArray(p.images) ? p.images.map(fixFileID) : [];

    // 如果 images 为空，用 cover 填充一张，保证前端有图可用
    const imagesFinal = imagesNew.length ? imagesNew : (coverNew ? [coverNew] : []);

    // 若都没有图片，给一个占位（可选）
    const placeholder = `cloud://${ENV}.${BUCKET}/prod-images/common/placeholder.png`;
    const imagesSafe = imagesFinal.length ? imagesFinal : [placeholder];
    const coverSafe = coverNew || imagesSafe[0];

    const needUpdate =
      coverSafe !== p.cover ||
      JSON.stringify(imagesSafe) !== JSON.stringify(p.images || []);

    if (!needUpdate) continue;

    await col.doc(p._id).update({
      cover: coverSafe,
      images: imagesSafe,
      status: 1,              // 强制上架
      priceLowest: p.priceLowest ?? 0,
      variants: Array.isArray(p.variants) && p.variants.length
        ? p.variants
        : [{ id: 'default', name: '默认', price: p.price ?? 0 }],
    });

    console.log(`[FIX] ${p._id}`);
    fixed++;
  }

  console.log(`[DONE] fixed=${fixed}`);
}

run().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
