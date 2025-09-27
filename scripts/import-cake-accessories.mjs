#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const EXCEL_PATH = process.env.ACCESSORIES_EXCEL || '/Users/yipengli/Desktop/cake_name3.xlsx';
const SHEET_INDEX = 1;
const ROW_START = 100;
const ROW_END = 107;
const COL_B = 2;
const COL_C = 3;
const COL_E = 5;

const CATEGORY_ID = 'cake-accessories';
const CATEGORY_NAME = '蛋糕配件';
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'cake-accessories');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function ensureDir(d){ fs.mkdirSync(d,{recursive:true}); }
function resetDir(d){ if(fs.existsSync(d)) fs.rmSync(d,{recursive:true,force:true}); fs.mkdirSync(d,{recursive:true}); }
function toHalfWidth(s=''){ return String(s).replace(/[\uFF01-\uFF5E]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function slugify(t){ return String(t||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase(); }

function parseVariantsFromE(raw=''){
  const txt0 = toHalfWidth(String(raw)).replace(/[；、，]/g,',').replace(/[\s]+/g,' ').trim();
  const variants=[]; if(!txt0) return variants; const parts=txt0.split(/[\s,;]+/).filter(Boolean);
  for(const part of parts){
    const m=part.match(/^([0-9]+(?:\.[0-9]+)?[^\/]*)\s*\/\s*([0-9]+(?:\.[0-9]+)?)$/);
    if(m){ let size=m[1].trim().replace(/\s+/g,'')||'默认'; const price=Number(m[2]); if(!Number.isNaN(price)) variants.push({size,price}); continue; }
    const only=part.match(/^([0-9]+(?:\.[0-9]+)?)$/); if(only){ const price=Number(only[1]); if(!Number.isNaN(price)) variants.push({size:'默认',price}); }
  }
  const map=new Map(); for(const v of variants){ map.set(v.size, Math.min(map.get(v.size)??Infinity, v.price)); }
  return Array.from(map.entries()).map(([size,price])=>({size,price}));
}

function cleanDisplayName(raw=''){
  let s=toHalfWidth(String(raw)); s=s.replace(/[\s\u3000]+/g,' ').trim();
  const patterns=[/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i,/^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i];
  let changed=true; while(changed){changed=false; for(const re of patterns){ const ns=s.replace(re,''); if(ns!==s){s=ns; changed=true;}} s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'').replace(/[\s\u3000]+/g,' ').trim();}
  return s;
}

function loadCatalog(){ const src=fs.readFileSync(CATALOG_PATH,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }
function saveCatalog(categories,products){ const out=`// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories,null,2)};\n\nconst products = ${JSON.stringify(products,null,2)};\n\nmodule.exports = { categories, products };\n`; fs.writeFileSync(CATALOG_PATH,out,'utf8'); }

function getAllAnchoredImages(sheet, wb){
  const imgs=sheet.getImages?sheet.getImages():[]; const media=(wb.model&&wb.model.media)||[];
  return imgs.map(img=>{ const r=img.range||{}; const tl=r.tl||r||{}; const tlr=(tl.nativeRow??tl.row??r.row??0); return {img, tlr, media}; }).sort((a,b)=>a.tlr-b.tlr);
}

async function main(){
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(EXCEL_PATH); const sh=wb.worksheets[SHEET_INDEX-1]; if(!sh) throw new Error('Sheet not found');
  resetDir(ASSET_DIR);
  const {categories:cat0=[], products:prod0=[]}=loadCatalog(); const categories=[...cat0]; if(!categories.find(c=>c.id===CATEGORY_ID)) categories.push({id:CATEGORY_ID,name:CATEGORY_NAME});
  const others=(Array.isArray(prod0)?prod0:[]).filter(p=>p.categoryId!==CATEGORY_ID);

  const starters=[]; for(let r=ROW_START;r<=ROW_END;r++){ const b=sh.getCell(r,COL_B)?.value; const raw=String(b&&b.richText? b.richText.map(x=>x.text).join('') : b || '').trim(); if(raw) starters.push(r); }
  const ranges=starters.map((p,i)=>({start:p,end:(i<starters.length-1? starters[i+1]-1 : ROW_END)}));
  const anchored=getAllAnchoredImages(sh, wb);

  const outProducts=[];
  for(let i=0;i<starters.length;i++){
    const r=starters[i]; const rawB=sh.getCell(r,COL_B)?.value; const rawC=sh.getCell(r,COL_C)?.value; const rawE=sh.getCell(r,COL_E)?.value;
    const rawName=String(rawB&&rawB.richText? rawB.richText.map(x=>x.text).join('') : rawB || '').trim(); if(!rawName) continue;
    const displayName=cleanDisplayName(rawName); const brief= rawName || String(rawC||'').trim() || displayName; const variants=parseVariantsFromE(String(rawE&&rawE.richText? rawE.richText.map(x=>x.text).join('') : rawE || ''));
    const price=variants.length? Math.min(...variants.map(v=>Number(v.price||0))) : 0; const slug=slugify(displayName);
    const range=ranges[i]; const hits=anchored.filter(h=> (h.tlr+1)>=range.start && (h.tlr+1)<=range.end);
    const images=[]; for(let k=0;k<hits.length;k++){ const found=hits[k].media.find(m=>m&&m.index===hits[k].img.imageId); if(!found) continue; const buf=found.buffer||(found.base64?Buffer.from(found.base64,'base64'):null); if(!buf) continue; const ext0=(found.extension||found.type||'jpeg').toLowerCase(); const ext=ext0==='jpg'?'jpeg':ext0; const fn=`cake-accessories-${slug}-${k+1}.${ext}`; fs.writeFileSync(path.join(ASSET_DIR,fn),buf); images.push(`/assets/cake-accessories/${fn}`);} 
    outProducts.push({ id:`cake-accessories-${slug}`, categoryId:CATEGORY_ID, name:displayName, brief, images, cover: images[0]||'/assets/p1.jpg', price:Number(price), variants: variants.length?variants:[{size:'默认',price:Number(price)}] });
  }

  const products=others.concat(outProducts); saveCatalog(categories, products);
  console.log(`[ACCESSORIES] rows:${outProducts.length}, assets:${ASSET_DIR}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });

