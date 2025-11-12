// scripts/apply-image-mapping.mjs
// 作用：读取 dump 的 JSON 映射，把 cover 和 images 批量写回 DB
// 用法：node scripts/apply-image-mapping.mjs --in=./mappings/ty-cake.json

import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';
dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database();

const args = Object.fromEntries(process.argv.slice(2).map(s=>{
  const i=s.indexOf('='); return i>0?[s.slice(2,i), s.slice(i+1)]:[s.replace(/^--/,''), true];
}));

const inFile = args.in;
if (!inFile) {
  console.error('用法：node scripts/apply-image-mapping.mjs --in=./mappings/ty-cake.json');
  process.exit(1);
}

async function run(){
  const payload = JSON.parse(await fs.readFile(inFile, 'utf8'));
  const { categoryId, dir, fileIdPrefix, items=[] } = payload;

  if (!fileIdPrefix || !dir) {
    throw new Error('映射文件缺少 fileIdPrefix 或 dir');
  }

  const col = db.collection('products');
  let ok=0, skip=0, fail=0;

  for (const it of items) {
    if (!Array.isArray(it.files) || it.files.length===0) { skip++; continue; }
    const images = it.files.map(fname => fileIdPrefix + fname);
    const cover = images[0];

    try {
      await col.doc(it._id).update({ cover, images });
      ok++;
      console.log(`[OK] ${it._id} (${it.name}) -> cover=${cover} images=${images.length}`);
    } catch (e) {
      fail++;
      console.error(`[FAIL] ${it._id}`, e.message || e);
    }
  }

  console.log(`\n[SUMMARY] category=${categoryId} dir=${dir}\n  ok=${ok} skip(empty)=${skip} fail=${fail}`);
}

run().catch(e=>{ console.error('[FATAL]', e); process.exit(1); });
