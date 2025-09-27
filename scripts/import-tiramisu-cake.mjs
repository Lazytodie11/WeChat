#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config
const EXCEL_PATH = process.env.TIRAMISU_CAKE_EXCEL || '/Users/yipengli/Desktop/cake_name3.xlsx';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 75;
const ROW_END = 80;
const COL_B = 2; // raw name
const COL_C = 3; // sizes (not used directly)
const COL_D = 4; // images (embedded)
const COL_E = 5; // price

const CATEGORY_ID = 'tiramisu-cake';
const CATEGORY_NAME = '提拉米苏蛋糕';
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'tiramisu-cake');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function ensureDir(dir){ fs.mkdirSync(dir,{recursive:true}); }
function resetDir(dir){ if(fs.existsSync(dir)) fs.rmSync(dir,{recursive:true,force:true}); fs.mkdirSync(dir,{recursive:true}); }
function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function slugify(text){ return String(text||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase(); }

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
function saveCatalog(categories,products){ const out=`// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories,null,2)};\n\nconst products = ${JSON.stringify(products,null, 2)};\n\nmodule.exports = { categories, products };\n`; fs.writeFileSync(CATALOG_PATH,out,'utf8'); }

function getAllAnchoredImages(sheet, workbook){
  const imgs=sheet.getImages?sheet.getImages():[]; const media=(workbook.model&&workbook.model.media)||[];
  return imgs.map(img=>{
    const range=img.range||{}; const tl=range.tl||range||{}; const br=range.br||range.tl||range||{};
    const tlc=(tl.nativeCol??tl.col??range.col??0); const tlr=(tl.nativeRow??tl.row??range.row??0);
    const brc=(br.nativeCol??br.col??tlc); const brr=(br.nativeRow??br.row??tlr);
    return {img, tlc, tlr, brc, brr, media};
  }).sort((a,b)=>(a.tlr-b.tlr)||(a.tlc-b.tlc));
}

async function main(){
  if(!fs.existsSync(EXCEL_PATH)) throw new Error(`Excel not found: ${EXCEL_PATH}`);
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(EXCEL_PATH); const sheet=wb.worksheets[SHEET_INDEX-1]; if(!sheet) throw new Error(`Sheet ${SHEET_INDEX} not found`);

  resetDir(ASSET_DIR);
  const {categories:cat0=[], products:prod0=[]}=loadCatalog(); const categories=Array.isArray(cat0)?[...cat0]:[]; if(!categories.find(c=>c.id===CATEGORY_ID)) categories.push({id:CATEGORY_ID,name:CATEGORY_NAME});
  const others=(Array.isArray(prod0)?prod0:[]).filter(p=>p.categoryId!==CATEGORY_ID);
  const outProducts=[]; const sourceMap={};

  // starters: B 非空
  const starters=[]; for(let r=ROW_START;r<=ROW_END;r++){ const bRaw=sheet.getCell(r,COL_B)?.value; const raw=String(bRaw && bRaw.richText? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim(); if(raw) starters.push(r); }
  const ranges=starters.map((p,i)=>({start:p,end:(i<starters.length-1? starters[i+1]-1 : ROW_END)}));
  const anchored=getAllAnchoredImages(sheet, wb);
  const media=(wb.model&&wb.model.media)||[];

  for(let i=0;i<starters.length;i++){
    const r=starters[i]; const bRaw=sheet.getCell(r,COL_B)?.value; const eText=sheet.getCell(r,COL_E)?.value; const cText=sheet.getCell(r,COL_C)?.value;
    const rawName=String(bRaw && bRaw.richText? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim(); const displayName=cleanDisplayName(rawName); const brief= rawName || String(cText||'').trim() || displayName;
    const variants=parseVariantsFromE(String(eText && eText.richText? eText.richText.map(x=>x.text).join('') : eText || '')); const price=variants.length? Math.min(...variants.map(v=>Number(v.price||0))) : 0; const slug=slugify(displayName);
    const range=ranges[i]; const hits=anchored.filter(h=> (h.tlr+1)>=range.start && (h.tlr+1)<=range.end);
    let images=[]; if(hits.length){ hits.forEach((h,idx)=>{ const found=media.find(m=>m&&m.index===h.img.imageId); if(!found) return; const buffer=found.buffer||(found.base64?Buffer.from(found.base64,'base64'):null); if(!buffer) return; const ext0=(found.extension||found.type||'jpeg').toLowerCase(); const ext=ext0==='jpg'?'jpeg':ext0; const fn=`tiramisu-cake-${slug}-${idx+1}.${ext}`; fs.writeFileSync(path.join(ASSET_DIR,fn), buffer); images.push(`/assets/tiramisu-cake/${fn}`); }); sourceMap[`tiramisu-cake-${slug}`]='excel'; } else { sourceMap[`tiramisu-cake-${slug}`]='none'; }
    console.log(`row ${r} -> images:${images.length}, from:${sourceMap[`tiramisu-cake-${slug}`]}`);
    const cover=images[0] || '/assets/p1.jpg';
    outProducts.push({ id:`tiramisu-cake-${slug}`, categoryId:CATEGORY_ID, name:displayName, brief, images, cover, price:Number(price), variants: variants.length?variants:[{size:'默认',price:Number(price)}] });
  }

  const products=others.concat(outProducts); saveCatalog(categories,products);
  try{ const tmp=path.resolve(__dirname,'..','tmp'); ensureDir(tmp); fs.writeFileSync(path.join(tmp,'tiramisu-cake-source.json'), JSON.stringify(sourceMap,null,2)); }catch(_){ }
  console.log(`[TIRAMISU] rows:${outProducts.length}, assets:${ASSET_DIR}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });

