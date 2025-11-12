// scripts/import-boys-from-excel-min.mjs
// 作用：从 Excel 导入“男生款蛋糕”最小信息（仅 name、price），images 置空，cover 置空
// 用法：
//   node scripts/import-boys-from-excel-min.mjs --excel "/Users/yipengli/Desktop/cake_name5.xlsx:41-63" --commit
//   预演（不写库）去掉 --commit 即可

import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });

import * as XLSXmod from 'xlsx/xlsx.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import minimist from 'minimist';
import cloudbase from '@cloudbase/node-sdk';

const XLSX = XLSXmod.default || XLSXmod;

function reqEnv(name){
  const v = process.env[name];
  if(!v) throw new Error(`Missing env: ${name} (check .env.tcb)`);
  return v;
}

const app = cloudbase.init({
  envId: reqEnv('TCB_ENV_ID'),
  env: reqEnv('TCB_ENV_ID'),
  secretId: reqEnv('TCB_SECRET_ID'),
  secretKey: reqEnv('TCB_SECRET_KEY'),
});
const db = app.database({ env: reqEnv('TCB_ENV_ID') });

function slugify(s=''){
  return String(s).normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase();
}

async function readWorkbook(p){
  const abs = path.resolve(p);
  const buf = await fs.readFile(abs);
  return XLSX.read(buf, { type: 'buffer' });
}

function parseExcelArg(argv){
  const args = minimist(argv.slice(2));
  let spec = args.excel;
  if(!spec){
    console.error('用法: node scripts/import-boys-from-excel-min.mjs --excel "/path.xlsx:41-63" [--commit]');
    process.exit(1);
  }
  const i = String(spec).indexOf(':');
  const file = (i>=0? String(spec).slice(0,i) : String(spec)).trim();
  const ranges = (i>=0? String(spec).slice(i+1) : 'all').trim();
  return { file, ranges, commit: !!args.commit };
}

function buildAllowedSet(ranges, maxRow){
  if(!ranges || ranges.toLowerCase()==='all') return null;
  const set = new Set();
  ranges.split(',').map(s=>s.trim()).filter(Boolean).forEach(seg=>{
    const m = seg.match(/^(\d+)-(\d+)$/);
    if(m){ let a=Number(m[1]), b=Number(m[2]); if(a>b) [a,b]=[b,a]; for(let r=a;r<=b;r++){ if(r>=2 && r<=maxRow) set.add(r);} }
    else if(/^\d+$/.test(seg)){ const n=Number(seg); if(n>=2 && n<=maxRow) set.add(n); }
  });
  return set;
}

async function main(){
  const { file, ranges, commit } = parseExcelArg(process.argv);
  const wb = await readWorkbook(file);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 'A', defval: '' });
  const allowed = buildAllowedSet(ranges, rows.length);

  const out = [];
  let sortCounter = 1_000_000;
  for(let i=2;i<=rows.length;i++){
    if(allowed && !allowed.has(i)) continue;
    const r = rows[i-1] || {};
    const catCN = String(r.A||'').trim();
    const nameRaw = String(r.B||'').trim();
    const priceRaw = String(r.E||'').trim();
    if(!nameRaw) continue;
    const price = Number(priceRaw||0);
    const slug = slugify(nameRaw);
    const _id = `boys-cake-${slug}`;
    const doc = {
      _id,
      categoryId: 'boys-cake',
      name: nameRaw,
      brief: '',
      price,
      variants: [{ id:'default', name:'默认', price }],
      images: [],
      cover: '',
      sort: sortCounter--,
      status: 1,
    };
    out.push(doc);
  }

  console.log(`[BUILD] rows=${out.length}`);
  const col = db.collection('products');
  let ok=0, fail=0;
  for(const d of out){
    try{
      const {_id, ...data} = d; // TCB 不允许在数据体内携带 _id
      if(commit) await col.doc(_id).set(data);
      ok++;
      console.log(`[UPSERT] ${_id}`);
    }catch(e){
      fail++;
      console.error('[FAIL]', d._id, e && e.message ? e.message : e);
    }
  }
  console.log(`[SUMMARY] ok=${ok} failed=${fail} commit=${commit}`);
}

main().catch(e=>{ console.error('[FATAL]', e); process.exit(1); });
