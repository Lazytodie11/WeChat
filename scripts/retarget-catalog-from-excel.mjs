#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import xlsx from 'xlsx';
import { createRequire } from 'node:module';

function loadCatalog(){
  const catalogPath = path.resolve(process.cwd(), 'miniprogram', 'data', 'catalog.js');
  const src = fs.readFileSync(catalogPath,'utf8');
  const m = { exports: {} };
  const req = createRequire(catalogPath);
  const fn = new Function('module','exports','require', src + '\n;return module.exports;');
  const mod = fn(m, m.exports, req) || {};
  return { catalogPath, categories: mod.categories||[], products: mod.products||[] };
}

function saveCatalog(catalogPath, categories, products){
  const out=`// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories,null,2)};\n\nconst products = ${JSON.stringify(products,null,2)};\n\nmodule.exports = { categories, products };\n`;
  const ts=new Date().toISOString().replace(/[-:.TZ]/g,'');
  const bak = path.join(path.dirname(catalogPath), `catalog.bak.${ts}.js`);
  fs.writeFileSync(bak, fs.readFileSync(catalogPath,'utf8'));
  fs.writeFileSync(catalogPath, out, 'utf8');
  return bak;
}

function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g, ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function normalizeName(raw=''){
  let s=toHalfWidth(String(raw)).trim();
  s=s.replace(/[・·•]/g,'·').replace(/[—–-]+/g,'-').replace(/[\(（]/g,'(').replace(/[\)）]/g,')').replace(/[\.]/g,'·');
  const patterns=[/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i];
  for(const re of patterns){ s=s.replace(re,''); }
  s=s.replace(/[（(]?口味自选[）)]?/gi,'').replace(/默认/gi,'').replace(/随机/gi,'');
  s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'');
  s=s.replace(/[\s\u3000]+/g,' ').trim().toLowerCase();
  return s;
}

function cellText(ws, addr){ const c=ws[addr]; if(!c) return ''; const v=c.v!=null? c.v : c.w; return String(v||'').trim(); }

function processRange({ file, sheetIndex=0, catNameCN, start, end }, catsMap, products, report){
  const wb=xlsx.readFile(file); const ws=wb.Sheets[wb.SheetNames[sheetIndex]]; if(!ws) throw new Error('sheet not found');
  const catId = catsMap.get(catNameCN) || '';
  for(let r=start;r<=end;r++){
    const nameB = cellText(ws,'B'+r);
    const urlD  = cellText(ws,'D'+r);
    if(!/^https?:\/\//i.test(urlD)) { report.push({file,row:r,catExcel:catNameCN,nameExcel:nameB,match:'miss',note:'D empty or not http'}); continue; }
    if(!catId){ report.push({file,row:r,catExcel:catNameCN,nameExcel:nameB,match:'miss',note:'cat not found'}); continue; }
    const target = products.find(p=> p.categoryId===catId && normalizeName(p.name)===normalizeName(nameB));
    if(!target){ report.push({file,row:r,catExcel:catNameCN,nameExcel:nameB,match:'miss',note:'product not found'}); continue; }
    const oldCover = target.cover || '';
    target.images = [ urlD ];
    target.cover  = urlD;
    report.push({file,row:r,catExcel:catNameCN,nameExcel:nameB,match:'eq',id:target.id,oldCover,newCover:urlD});
  }
}

function main(){
  const { catalogPath, categories, products } = loadCatalog();
  const catsMap = new Map(categories.map(c=>[String(c.name).trim(), c.id]));
  const plan=[
    { file:'/Users/yipengli/Desktop/Products_name.xlsx', catNameCN:'口味奶糕', start:2, end:17 },
    { file:'/Users/yipengli/Desktop/Products_name.xlsx', catNameCN:'女生款蛋糕', start:19, end:96 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'T·y堆堆千层系列', start:2, end:9 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'T·y堆堆蛋糕系列', start:11, end:28 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'法式千层蛋糕', start:30, end:39 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'男生款蛋糕', start:41, end:63 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'巴斯克蛋糕', start:65, end:73 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'提拉米苏蛋糕', start:75, end:80 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'Ins瑞士卷', start:82, end:98 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'蛋糕配件', start:100, end:107 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'4寸蛋糕', start:109, end:134 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'8寸蛋糕', start:136, end:156 },
    { file:'/Users/yipengli/Desktop/cake_name3.xlsx', catNameCN:'爆浆瀑布蛋糕', start:158, end:162 }
  ];
  const report=[];
  for(const p of plan){ if(!fs.existsSync(p.file)){ console.warn('[retarget] file not found:', p.file); continue; } processRange(p, catsMap, products, report); }
  const bak=saveCatalog(catalogPath, categories, products);
  console.log('[retarget] backup:', path.relative(process.cwd(), bak));
  const outDir=path.resolve(process.cwd(),'out'); if(!fs.existsSync(outDir)) fs.mkdirSync(outDir,{recursive:true}); const ts=new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,12); const csv=path.join(outDir,`retarget-from-excel-${ts}.csv`);
  const header='file,row,categoryExcel,nameExcel,id,oldCover,newCover,match,note';
  const lines=[header];
  report.forEach(r=>lines.push([r.file,r.row,r.catExcel,r.nameExcel,r.id||'',r.oldCover||'',r.newCover||'',r.match||'miss',r.note||''].map(x=>`"${String(x).replace(/"/g,'""')}"`).join(',')));
  fs.writeFileSync(csv, lines.join('\n'),'utf8');
}

main();

