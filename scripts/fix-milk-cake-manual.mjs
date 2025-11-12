// scripts/fix-milk-cake-manual.mjs
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

const ENV = process.env.TCB_ENV_ID;
const BUCKET = process.env.TCB_BUCKET;
const dir = '口味奶糕';
const fid = name => `cloud://${ENV}.${BUCKET}/prod-images/${dir}/${name}`;

// 约定：你的 products._id 规则是 “categoryId-名字”
const ID_BYYJX = 'flavor-milk-cake-伯牙绝弦';
const ID_HYALO = 'flavor-milk-cake-海盐奥利奥';

async function upsert(id, images) {
  const cover = images[0] || '';
  const patch = { images, cover, status: 1 };
  try {
    await col.doc(id).update(patch);
  } catch {
    await col.doc(id).set({ _id: id, name: id.split('-').slice(2).join('-'), categoryId: 'flavor-milk-cake', ...patch });
  }
  console.log('[OK]', id, 'images=', images.length, 'cover=', cover.split('/').pop());
}

async function main() {
  // 1) 伯牙绝弦：注意保留带空格的文件名
  await upsert(ID_BYYJX, [
    fid('WechatIMG1 1.jpg'), // 带空格
    fid('WechatIMG2.jpg'),
    fid('WechatIMG3.jpg')
  ]);

  // 2) 海盐奥利奥：把 4 放到首图
  await upsert(ID_HYALO, [
    fid('WechatIMG4.jpg'),
    fid('WechatIMG5.jpg'),
    fid('WechatIMG6.jpg')
  ]);

  // 3) 删除误加的文档
  try {
    await col.doc('milk-cake-01').remove();
    console.log('[DELETED] milk-cake-01');
  } catch (e) {
    console.log('[SKIP DELETE] milk-cake-01', e.code || e.message);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
