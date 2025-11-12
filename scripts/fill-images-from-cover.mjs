// scripts/fill-images-from-cover.mjs
// 把 images 为空但有 cover 的商品补成 images=[cover]；
// 把 cover 为空但 images 有值的商品补上 cover=images[0]；
// 顺手补一个 status:1 方便前端过滤。
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID });

async function* scanCollection(colName, pageSize = 100) {
  let skip = 0;
  while (true) {
    const rs = await db.collection(colName).skip(skip).limit(pageSize).get();
    if (!rs.data.length) break;
    for (const d of rs.data) yield d;
    skip += rs.data.length;
  }
}

function isFileId(s = '') {
  return typeof s === 'string' && s.startsWith('cloud://');
}

async function main() {
  const col = db.collection('products');
  let total = 0, toFix = 0, fixed = 0, skipped = 0;

  for await (const p of scanCollection('products', 100)) {
    total++;
    const upd = {};
    const images = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
    const cover = p.cover || '';

    const hasCover = isFileId(cover);
    const hasImages = images.some(isFileId);

    // 规则 1：images 为空且 cover 存在 → images=[cover]
    if (!hasImages && hasCover) {
      upd.images = [cover];
    }

    // 规则 2：cover 为空且 images 有值 → cover = images[0]
    if (!hasCover && hasImages) {
      upd.cover = images[0];
    }

    // 规则 3：补 status=1（若没有）
    if (p.status !== 1) {
      upd.status = 1;
    }

    if (Object.keys(upd).length) {
      toFix++;
      try {
        await col.doc(p._id).update(upd);
        fixed++;
      } catch (e) {
        console.error('[UPDATE FAIL]', p._id, e);
        skipped++;
      }
    }
  }

  console.log(`[DONE] total=${total} needFix=${toFix} fixed=${fixed} failed=${skipped}`);
}

main().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
