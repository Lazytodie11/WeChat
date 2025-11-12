#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadCatalog(){
  const catalogPath = path.resolve(__dirname, '../miniprogram/data/catalog.js');
  const src = fs.readFileSync(catalogPath,'utf8');
  const m = { exports: {} };
  const req = createRequire(catalogPath);
  const fn = new Function('module','exports','require', src + '\n;return module.exports;');
  const mod = fn(m, m.exports, req) || {};
  const categories = mod.categories || [];
  const products = mod.products || [];
  return { categories, products };
}

function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g, ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function cleanDisplayName(raw=''){ let s=toHalfWidth(String(raw)); s=s.replace(/[\s\u3000]+/g,' ').trim(); const patterns=[/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i,/^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i]; let changed=true; while(changed){changed=false; for(const re of patterns){ const ns=s.replace(re,''); if(ns!==s){s=ns; changed=true;}} s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'').replace(/[\s\u3000]+/g,' ').trim();} return s; }

function backupExcel(file){ const buf=fs.readFileSync(file); const ts=new Date().toISOString().replace(/[-:.TZ]/g,''); const bak=`${file}.bak.${ts}.xlsx`; fs.writeFileSync(bak, buf); return bak; }

function cellText(cell){ if(!cell) return ''; const v=cell.v!=null?cell.v:cell.w; return String(v||'').trim(); }

function processRanges(file, ranges){
  backupExcel(file);
  const wb=xlsx.readFile(file);
  const ws=wb.Sheets[wb.SheetNames[0]];
  const { categories=[], products=[] } = loadCatalog();
  const catNameToId=new Map(categories.map(c=>[String(c.name).trim(), c.id]));
  for(const r of ranges){
    const expectCatId = catNameToId.get(r.categoryName) || '';
    let ok=0; const miss=[];
    for(let row=r.start; row<=r.end; row++){
      const b = cellText(ws['B'+row]);
      const a = cellText(ws['A'+row]);
      const nameClean = cleanDisplayName(b);
      const catId = expectCatId || catNameToId.get(a) || '';
      let found=null;
      if(catId){ found = products.find(p=> p.categoryId===catId && cleanDisplayName(p.name)===nameClean ); }
      if(!found){ miss.push({row, a:a||r.categoryName, b}); continue; }
      const cover = Array.isArray(found.images) && found.images[0] ? found.images[0] : (found.cover||'');
      if(!cover){ miss.push({row, a:a||r.categoryName, b, reason:'无封面'}); continue; }
      ws['D'+row] = { t:'s', v: cover };
      ok++;
    }
    const list=miss.slice(0,20).map(m=>`#${m.row} ${m.a} / ${m.b}${m.reason? ' - '+m.reason:''}`).join('\n  ');
    console.log(`[fill:excel] ${path.basename(file)} rows ${r.start}-${r.end} | matched: ${ok} | misses: ${miss.length}${miss.length? '\n  '+list:''}`);
  }
  xlsx.writeFile(wb, file);
}

function main(){
  const plan=[
    { file: '/Users/yipengli/Desktop/Products_name.xlsx', ranges:[
      { start:2, end:17, categoryName:'口味奶糕' },
      { start:19, end:96, categoryName:'女生款蛋糕' }
    ]},
    { file: '/Users/yipengli/Desktop/cake_name3.xlsx', ranges:[
      { start:2, end:9, categoryName:'T·y堆堆千层系列' },
      { start:11, end:28, categoryName:'T·y堆堆蛋糕系列' },
      { start:30, end:39, categoryName:'法式千层蛋糕' },
      { start:41, end:63, categoryName:'男生款蛋糕' },
      { start:65, end:73, categoryName:'巴斯克蛋糕' },
      { start:75, end:80, categoryName:'提拉米苏蛋糕' },
      { start:82, end:98, categoryName:'Ins瑞士卷' },
      { start:100, end:107, categoryName:'蛋糕配件' },
      { start:109, end:134, categoryName:'4寸蛋糕' },
      { start:136, end:156, categoryName:'8寸蛋糕' },
      { start:158, end:162, categoryName:'爆浆瀑布蛋糕' }
    ]}
  ];
  for(const p of plan){ if(!fs.existsSync(p.file)){ console.warn('[fill:excel] file not found:', p.file); continue;} processRanges(p.file, p.ranges); }
}

main();

