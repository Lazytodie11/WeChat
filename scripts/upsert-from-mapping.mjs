// scripts/upsert-from-mapping.mjs
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import cloudbase from '@cloudbase/node-sdk';

const args = process.argv.slice(2);
const inIdx = args.indexOf('--in');
if (inIdx === -1 || !args[inIdx + 1]) {
  console.error('用法: node scripts/upsert-from-mapping.mjs --in=./mappings/ty-cake.json [--commit]');
  process.exit(1);
}
const inFile = args[inIdx + 1];
const COMMIT = args.includes('--commit');

const app = cloudbase.init({
  envId: process.env.TCB_ENV || process.env.TCB_ENVID
});
const db = app.database();

function joinFileId(prefix, dir, filename) {
  // 统一把多余的斜杠处理一下，但保持空格/点号/中文不变
  const left = prefix.replace(/\/+$/, '');
  const mid  = dir.replace(/^\/+|\/+$/g, '');
  const right = filename.replace(/^\/+/, '');
  return `${left}/${mid}/${right}`;
}

async function main() {
  const raw = fs.readFileSync(path.resolve(inFile), 'utf8');
  const map = JSON.parse(raw);

  const fileIdPrefix = map.fileIdPrefix;
  const dir = map.dir;
  if (!fileIdPrefix || !dir || !Array.isArray(map.items)) {
    throw new Error('映射文件必须包含 fileIdPrefix、dir 和 items[]');
  }

  let created = 0, updated = 0, skipped = 0;
  for (const item of map.items) {
    const { _id, name, files } = item;
    if (!_id || !Array.isArray(files) || files.length === 0) {
      console.log(`[SKIP] ${_id || '(missing id)'} files 为空`);
      skipped++;
      continue;
    }
    const images = files.map(f => joinFileId(fileIdPrefix, dir, f));
    const cover = images[0];

    // 查是否存在
    const exist = await db.collection('products').doc(_id).get();
    if (!exist.data || exist.data.length === 0) {
      // 新建
      const doc = {
        _id,
        name: name || _id,
        categoryId: _id.split('-')[0] + '-' + _id.split('-')[1], // e.g. ty-cake
        cover,
        images,
        price: 69.9,
        priceLowest: 69.9,
        variants: [{ id: 'default', name: '默认', price: 69.9 }],
        options: [],
        status: 1,
        sort: 99998
      };
      console.log(`[CREATE] ${_id} => cover=${path.basename(cover)} images=${images.length}`);
      if (COMMIT) {
        await db.collection('products').add(doc);
      }
      created++;
    } else {
      // 更新
      console.log(`[UPDATE] ${_id} => cover=${path.basename(cover)} images=${images.length}`);
      if (COMMIT) {
        await db.collection('products').doc(_id).update({ cover, images });
      }
      updated++;
    }
  }

  console.log(`[SUMMARY] created=${created} updated=${updated} skipped=${skipped} commit=${COMMIT}`);
  if (!COMMIT) console.log('（预演模式，未写库；加 --commit 才会落库）');
}

main().catch(e => {
  console.error('[FATAL]', e);
  process.exit(1);
});
