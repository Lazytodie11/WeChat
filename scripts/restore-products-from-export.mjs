// scripts/restore-products-from-export.mjs
// 将先前导出的 products 快照回写到数据库，用于“撤回”修复脚本带来的更改。
// 用法：
//   node scripts/restore-products-from-export.mjs --in exports/products-all.json --commit
//   （不加 --commit 为预演，打印统计不落库）

import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import cloudbase from '@cloudbase/node-sdk';

const args = process.argv.slice(2);
function getArg(name, def) {
  const idx = args.findIndex(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (idx === -1) return def;
  const a = args[idx];
  if (a.includes('=')) return a.split('=').slice(1).join('=');
  const next = args[idx + 1];
  return next && !next.startsWith('--') ? next : def;
}

const inFile = getArg('in', 'exports/products-all.json');
const COMMIT = args.includes('--commit');

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID || process.env.TCB_ENV || process.env.TCB_ENVID,
  env: process.env.TCB_ENV_ID || process.env.TCB_ENV || process.env.TCB_ENVID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID || process.env.TCB_ENV || process.env.TCB_ENVID });

function loadExport(filePath) {
  const raw = fs.readFileSync(path.resolve(filePath), 'utf8').trim();
  // 兼容 JSON 数组 或 NDJSON
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
  } catch (_) {}
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const docs = [];
  for (const line of lines) {
    try { docs.push(JSON.parse(line)); } catch (_) {}
  }
  return docs;
}

async function main() {
  const docs = loadExport(inFile);
  if (!Array.isArray(docs) || !docs.length) {
    console.error('[ERROR] 无法读取导出文件或为空：', inFile);
    process.exit(1);
  }
  let ok = 0, failed = 0, skipped = 0;
  for (const doc of docs) {
    const id = doc && (doc._id || doc.id);
    if (!id) { skipped++; continue; }
    const data = { ...doc };
    delete data._id;
    try {
      if (COMMIT) await db.collection('products').doc(id).set(data);
      ok++;
    } catch (e) {
      failed++;
      console.error('[FAIL]', id, e && e.message ? e.message : e);
    }
  }
  console.log(`[RESTORE] from=${inFile} total=${docs.length} ok=${ok} failed=${failed} skipped=${skipped} commit=${COMMIT}`);
  if (!COMMIT) console.log('（预演模式；加 --commit 才会写回数据库）');
}

main().catch(e => { console.error('[FATAL]', e); process.exit(1); });

