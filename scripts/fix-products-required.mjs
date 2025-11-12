// scripts/fix-products-required.mjs
// 统一为 products 补齐必需字段，避免前端空白：
// - images 为空但有 cover => images=[cover]
// - cover 为空但有 images => cover=images[0]
// - variants 为空 => 给一个默认规格（price:0）
// - priceLowest = variants 里的最小价
// - status 缺失 => 1（上架）
// - options 缺失 => []
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID });

function isFileId(s=''){ return typeof s==='string' && s.startsWith('cloud://'); }
function minPrice(variants=[]) {
  const nums = variants
    .map(v => Number(v?.price))
    .filter(n => Number.isFinite(n) && n >= 0);
  return nums.length ? Math.min(...nums) : 0;
}

async function* scan(colName, pageSize = 100) {
  let skip = 0;
  while (true) {
    const rs = await db.collection(colName).skip(skip).limit(pageSize).get();
    if (!rs.data.length) break;
    for (const d of rs.data) yield d;
    skip += rs.data.length;
  }
}

async function main(){
  const col = db.collection('products');
  let total=0, needFix=0, fixed=0, failed=0;

  for await (const p of scan('products', 100)) {
    total++;

    const upd = {};
    const images = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
    const hasImages = images.some(isFileId);
    const hasCover = isFileId(p.cover);

    // 图片兜底
    if (!hasImages && hasCover) upd.images = [p.cover];
    if (!hasCover && hasImages)  upd.cover  = images[0];

    // 规格兜底
    const variants = Array.isArray(p.variants) ? p.variants : [];
    const validVariants = variants.filter(v => v && Number.isFinite(Number(v.price)));
    if (validVariants.length === 0) {
      upd.variants = [{ id:'default', name:'默认', price: 0 }];
    }

    // 最低价
    const finalVariants = upd.variants || variants;
    const priceLowest = minPrice(finalVariants);
    if (p.priceLowest !== priceLowest) upd.priceLowest = priceLowest;

    // 状态 / 选项兜底
    if (p.status !== 1) upd.status = 1;
    if (!Array.isArray(p.options)) upd.options = [];

    if (Object.keys(upd).length) {
      needFix++;
      try {
        await col.doc(p._id).update(upd);
        fixed++;
      } catch (e) {
        console.error('[UPDATE FAIL]', p._id, e);
        failed++;
      }
    }
  }

  console.log(`[DONE] total=${total} needFix=${needFix} fixed=${fixed} failed=${failed}`);
}

main().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
