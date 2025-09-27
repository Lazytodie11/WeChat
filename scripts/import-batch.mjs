#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.resolve(REPO_ROOT, 'miniprogram', 'data', 'catalog.js');
const MANIFEST_PATH = path.resolve(REPO_ROOT, 'data', 'import-manifest.json');

function ensureDir(dir){ fs.mkdirSync(dir, { recursive: true }); }
function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function slugify(text){ return String(text||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase(); }

function parseVariantsFromE(raw=''){
  const txt0 = toHalfWidth(String(raw)).replace(/[；、，]/g, ',').replace(/[\s]+/g, ' ').trim();
  const variants=[]; if(!txt0) return variants; const parts=txt0.split(/[\s,;]+/).filter(Boolean);
  for(const part of parts){
    const m=part.match(/^([^\/]+?)\s*\/\s*([0-9]+(?:\.[0-9]+)?)$/); // size/price
    if(m){ let size=m[1].trim().replace(/\s+/g,'')||'默认'; const price=Number(m[2]); if(!Number.isNaN(price)) variants.push({size,price}); continue; }
    const only=part.match(/^([0-9]+(?:\.[0-9]+)?)$/); if(only){ const price=Number(only[1]); if(!Number.isNaN(price)) variants.push({size:'默认',price}); }
  }
  const map=new Map(); for(const v of variants){ map.set(v.size, Math.min(map.get(v.size)??Infinity, v.price)); }
  return Array.from(map.entries()).map(([size,price])=>({size,price}));
}

function cleanDisplayName(raw=''){
  let s=toHalfWidth(String(raw)); s=s.replace(/[\s\u3000]+/g,' ').trim();
  const patterns=[
    /^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,
    /^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,
    /^\s*(\d+(?:\.\d+)?\s*层)\s*/i,
    /^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i
  ];
  let changed=true; 
  while(changed){
    changed=false;
    for(const re of patterns){ const ns=s.replace(re,''); if(ns!==s){ s=ns; changed=true; }}
    s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/, '').replace(/[\s\u3000]+/g, ' ').trim();
  }
  return s;
}

function loadCatalog(){ const src=fs.readFileSync(CATALOG_PATH,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }
function saveCatalog(categories,products){ const out=`// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories,null,2)};\n\nconst products = ${JSON.stringify(products,null, 2)};\n\nmodule.exports = { categories, products };\n`; fs.writeFileSync(CATALOG_PATH,out,'utf8'); }

function colLetterToIndex(letter){
  const s=String(letter||'').trim().toUpperCase();
  let idx=0; for(let i=0;i<s.length;i++){ idx = idx*26 + (s.charCodeAt(i)-64); }
  return idx; // 1-based
}

function getAllAnchoredImages(sheet, workbook){
  const imgs=sheet.getImages?sheet.getImages():[]; const media=(workbook.model&&workbook.model.media)||[];
  return imgs.map(img=>{
    const range=img.range||{}; const tl=range.tl||range||{}; const br=range.br||range.tl||range||{};
    const tlc=(tl.nativeCol??tl.col??range.col??0); const tlr=(tl.nativeRow??tl.row??range.row??0);
    const brc=(br.nativeCol??br.col??tlc); const brr=(br.nativeRow??br.row??tlr);
    return {img, tlc, tlr, brc, brr, media};
  }).sort((a,b)=>(a.tlr-b.tlr)||(a.tlc-b.tlc));
}

async function importSeries({ workbook, sheetIndex, rows, cols, categoryId, categoryName }){
  const sheet=workbook.worksheets[sheetIndex-1]; if(!sheet) throw new Error(`Sheet ${sheetIndex} not found`);

  const COL_B = colLetterToIndex(cols.name||'B');
  const COL_C = colLetterToIndex(cols.brief||'C');
  const COL_D = colLetterToIndex(cols.images||'D');
  const COL_E = colLetterToIndex(cols.price||'E');

  const assetsDir = path.resolve(REPO_ROOT, 'miniprogram', 'assets', categoryId);
  ensureDir(assetsDir);

  // starters: B 非空
  const starters=[]; for(let r=rows.start;r<=rows.end;r++){ const bRaw=sheet.getCell(r,COL_B)?.value; const raw=String(bRaw && bRaw.richText? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim(); if(raw) starters.push(r); }
  const ranges=starters.map((p,i)=>({start:p,end:(i<starters.length-1? starters[i+1]-1 : rows.end)}));
  const anchored=getAllAnchoredImages(sheet, workbook);
  const media=(workbook.model&&workbook.model.media)||[];

  const outProducts=[];
  for(let i=0;i<starters.length;i++){
    const r=starters[i]; 
    const bRaw=sheet.getCell(r,COL_B)?.value; const eText=sheet.getCell(r,COL_E)?.value; const cText=sheet.getCell(r,COL_C)?.value;
    const rawName=String(bRaw && bRaw.richText? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim();
    const displayName=cleanDisplayName(rawName); const brief= rawName || String(cText||'').trim() || displayName;
    const variants=parseVariantsFromE(String(eText && eText.richText? eText.richText.map(x=>x.text).join('') : eText || ''));
    const price=variants.length? Math.min(...variants.map(v=>Number(v.price||0))) : 0; 
    const slug=slugify(displayName);
    const range=ranges[i]; 
    const hits=anchored.filter(h=> (h.tlr+1)>=range.start && (h.tlr+1)<=range.end && (h.tlc<= (COL_D-1) && h.brc>= (COL_D-1)));
    let images=[]; 
    if(hits.length){
      hits.forEach((h,idx)=>{ 
        const found=media.find(m=>m&&m.index===h.img.imageId); if(!found) return; 
        const buffer=found.buffer||(found.base64?Buffer.from(found.base64,'base64'):null); if(!buffer) return; 
        const ext0=(found.extension||found.type||'jpeg').toLowerCase(); const ext=ext0==='jpg'?'jpeg':ext0; 
        const fn=`${categoryId}-${slug}-${idx+1}.${ext}`; 
        fs.writeFileSync(path.join(assetsDir,fn), buffer); 
        images.push(`/assets/${categoryId}/${fn}`); 
      });
    }
    if(images.length===0){ images=[`/assets/p1.jpg`]; }
    const cover=images[0];
    outProducts.push({ id:`${categoryId}-${slug}`, categoryId, name:displayName, brief, images, cover, price:Number(price), variants: variants.length?variants:[{size:'默认',price:Number(price)}] });
  }
  return { products: outProducts, category: { id: categoryId, name: categoryName } };
}

async function main(){
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH,'utf8'));
  const excelPath = process.env.BULK_EXCEL || manifest.excel || '/Users/yipengli/Desktop/cake_name3.xlsx';
  if(!fs.existsSync(excelPath)) throw new Error(`Excel not found: ${excelPath}`);
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(excelPath);

  const cols=manifest.columns||{ name:'B', brief:'C', images:'D', price:'E' };
  const series=manifest.series||[];

  const {categories:cat0=[], products:prod0=[]}=loadCatalog();
  const categories=[...cat0];

  // Remove products for target series categories before import
  const targetIds=new Set(series.map(s=>s.categoryId));
  let products=prod0.filter(p=>!targetIds.has(p.categoryId));

  for(const s of series){
    const { categoryId, categoryName, sheet, rowStart, rowEnd } = s;
    const res = await importSeries({
      workbook: wb,
      sheetIndex: Number(sheet||1),
      rows: { start: Number(rowStart), end: Number(rowEnd) },
      cols,
      categoryId,
      categoryName
    });
    // ensure category
    if(!categories.find(c=>c.id===res.category.id)) categories.push(res.category);
    products = products.concat(res.products);
    console.log(`[BATCH] ${categoryId}: imported ${res.products.length} products`);
  }

  saveCatalog(categories, products);
  console.log(`[BATCH] Completed. Catalog: ${path.relative(REPO_ROOT, CATALOG_PATH)}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });

