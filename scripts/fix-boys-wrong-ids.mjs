// scripts/fix-boys-wrong-ids.mjs
// 修正“男生款蛋糕”中两个误填的商品：名称修正；可选同时重建 _id
// 默认 dry-run 仅打印，--apply 执行；--rename-id 同时更换 _id（会新建+删除旧文档）

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  env: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });
const col = db.collection('products');

const TARGET_CATEGORY = 'boys-cake';

// 需修正的映射：key 为当前(错误)的 name 或 _id 后缀，value 为期望的正确 name
const FIX_MAP = new Map([
  ['6寸伯爵红茶巴斯克', '6寸水果多多 (应季水果)'],
  ['6寸树莓开心果巴斯克', '6寸简约水果款']
]);

function toNewId(name) {
  // 把中文括号与空白转为连字符，便于 _id 一致性
  return 'boys-cake-' + String(name)
    .replace(/[()（）]/g, '-')
    .replace(/\s+/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/-$/,'');
}

async function run() {
  const apply = process.argv.includes('--apply') || process.argv.includes('--commit');
  const renameId = process.argv.includes('--rename-id');

  // 拉取 boys-cake 全量，或可按需分页（当前量不大直接全拉）
  const pageSize = 100;
  let skip = 0, all = [];
  while (true) {
    const { data = [] } = await col.where({ categoryId: TARGET_CATEGORY }).skip(skip).limit(pageSize).get();
    if (!data.length) break;
    all = all.concat(data);
    skip += data.length;
  }

  let touched = 0, renamed = 0, recreated = 0, removed = 0;
  for (const doc of all) {
    const name = doc.name || '';
    const wrong = Array.from(FIX_MAP.keys()).find(k => name === k || (doc._id || '').endsWith(k));
    if (!wrong) continue;
    const correctName = FIX_MAP.get(wrong);
    const newId = toNewId(correctName);
    touched++;

    if (!apply) {
      console.log(`[DRY] ${renameId ? 'rename-id' : 'rename-name'} -> id=${doc._id} name:"${name}" => "${correctName}" newId=${renameId ? newId : '(keep)'}`);
      continue;
    }

    if (!renameId) {
      await col.doc(doc._id).update({ name: correctName });
      renamed++;
      console.log(`[APPLY] updated name -> ${doc._id} => "${correctName}"`);
      continue;
    }

    // 重建 _id：创建新文档（带新 _id 与新 name），复制其余字段，然后删除旧文档
    const { _id, name: _oldName, ...rest } = doc;
    try {
      await col.add({ _id: newId, name: correctName, ...rest });
      recreated++;
      await col.doc(_id).remove();
      removed++;
      console.log(`[APPLY] recreated with new _id -> ${_id} -> ${newId}`);
    } catch (e) {
      console.error('[FAIL] recreate', _id, '=>', newId, e && e.message ? e.message : e);
    }
  }

  console.log('[DONE]', { apply, renameId, touched, renamed, recreated, removed });
}

run().catch(e => { console.error(e); process.exit(1); });

