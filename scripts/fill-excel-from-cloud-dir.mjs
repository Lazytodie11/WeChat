#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';
import { createRequire } from 'node:module';

const requireCJS = createRequire(import.meta.url);
const { ASSET_BASE_URL, ASSET_SUBDIR } = requireCJS('./config.cjs');

function prefix(){ return ASSET_SUBDIR ? `${ASSET_BASE_URL}/${ASSET_SUBDIR}` : `${ASSET_BASE_URL}`; }
function enc(s){ return encodeURIComponent(String(s)); }
function urlFromChineseDir(dirCN, file){ return `${prefix()}/${enc(dirCN)}/${enc(file)}`; }

function humanSortWechat(files){
  // WechatIMG2 < WechatIMG10
  const items = files.map(f=>{ const m=f.match(/WechatIMG(\d+)\.(jpg|jpeg|png)$/i); return { f, n: m? Number(m[1]) : Infinity }; });
  items.sort((a,b)=> a.n-b.n || a.f.localeCompare(b.f));
  return items.map(x=>x.f);
}

function listWechatImgs(localDir){
  if(!fs.existsSync(localDir)) return [];
  const files = fs.readdirSync(localDir).filter(f=>/^WechatIMG\d+\.(jpg|jpeg|png)$/i.test(f));
  return humanSortWechat(files);
}

function backupExcel(file){ const buf=fs.readFileSync(file); const ts=new Date().toISOString().replace(/[-:.TZ]/g,''); const bak=`${file}.bak.${ts}.xlsx`; fs.writeFileSync(bak, buf); return bak; }
function cellText(ws, addr){ const c=ws[addr]; if(!c) return ''; const v=c.v!=null? c.v : c.w; return String(v||'').trim(); }
function setCell(ws, addr, v){ ws[addr]={ t:'s', v:String(v)}; }

function processRange({ file, sheetIndex=0, dirCN, start, end }){
  const wb=xlsx.readFile(file); const ws=wb.Sheets[wb.SheetNames[sheetIndex]]; if(!ws) throw new Error('sheet not found');
  const localDir = path.join('/Users/yipengli/Desktop', dirCN);
  const files = listWechatImgs(localDir);
  const rows = []; for(let r=start;r<=end;r++) rows.push(r);
  let i=0, matched=0; const shortage=[]; const overflow=[];
  rows.forEach(r=>{
    const dAddr='D'+r; const cur=cellText(ws,dAddr);
    if(/^https?:\/\//i.test(cur)) return; // keep manual override
    if(i<files.length){ const url=urlFromChineseDir(dirCN, files[i]); setCell(ws,dAddr,url); matched++; i++; }
    else shortage.push(r);
  });
  if(i<files.length){ for(let k=i;k<files.length;k++) overflow.push(files[k]); }
  xlsx.writeFile(wb,file);
  return { file: path.basename(file), dirCN, start, end, files: files.length, rows: rows.length, matched, shortage: shortage.length, overflow: overflow.length, shortageRows: shortage.slice(0,20), overflowFiles: overflow.slice(0,20) };
}

function main(){
  const plan=[
    { file:'/Users/yipengli/Desktop/Products_name.xlsx', dirCN:'口味奶糕', start:2, end:17 },
    { file:'/Users/yipengli/Desktop/Products_name.xlsx', dirCN:'女生款蛋糕', start:19, end:96 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'T.y堆堆千层系列', start:2, end:9 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'T.y堆堆蛋糕系列', start:11, end:28 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'法式千层蛋糕', start:30, end:39 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'男生款蛋糕', start:41, end:63 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'巴斯克蛋糕', start:65, end:73 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'提拉米苏蛋糕', start:75, end:80 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'Ins瑞士卷', start:82, end:98 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'蛋糕配件', start:100, end:107 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'4寸蛋糕', start:109, end:134 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'8寸蛋糕', start:136, end:156 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', dirCN:'爆浆瀑布蛋糕', start:158, end:162 }
  ];
  // backup once per excel
  const backed=new Set(); plan.forEach(p=>{ if(!backed.has(p.file) && fs.existsSync(p.file)){ backupExcel(p.file); backed.add(p.file);} });
  const out=[];
  for(const p of plan){ if(!fs.existsSync(p.file)){ console.warn('[fill:from-cloud] file not found:', p.file); continue; } const r=processRange({ ...p }); console.log(`[${r.file}] ${r.dirCN} rows ${r.start}-${r.end} | files:${r.files} rows:${r.rows} matched:${r.matched} shortage:${r.shortage} overflow:${r.overflow}`); out.push(r); }
  // CSV report
  const outDir=path.resolve(process.cwd(),'out'); if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true}); const ts=new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,12); const csv=path.join(outDir,`fill-d-from-cloud-${ts}.csv`);
  const lines=['file,dirCN,start,end,files,rows,matched,shortage,overflow,shortageRows,overflowFiles'];
  out.forEach(r=>lines.push([r.file,r.dirCN,r.start,r.end,r.files,r.rows,r.matched,r.shortage,r.overflow,JSON.stringify(r.shortageRows),JSON.stringify(r.overflowFiles)].join(',')));
  fs.writeFileSync(csv, lines.join('\n'),'utf8');
}

main();

