#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { ASSET_BASE_URL } = require('./config.cjs');
function assetUrl(category, filename){ const cat=String(category||'').replace(/^\/+|\/+$/g,''); const fn=String(filename||'').replace(/^\/+/, ''); if(ASSET_BASE_URL){ const base=ASSET_BASE_URL.replace(/\/$/,''); return `${base}/prod-images/${cat}/${fn}`;} return `/assets/${cat}/${fn}`; }

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config
const EXCEL_PATH = process.env.INS_ROLL_EXCEL || '/Users/yipengli/Desktop/cake_name3.xlsx';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 82;
const ROW_END = 98;
const COL_B = 2; // name raw
const COL_E = 5; // price text

const CATEGORY_ID = 'ins-swiss-roll';
const CATEGORY_NAME = 'Ins瑞士卷';
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'ins-swiss-roll');
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
function saveCatalog(categories,products){ const out=`// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories,null,2)};\n\nconst products = ${JSON.stringify(products,null,2)};\n\nmodule.exports = { categories, products };\n`; fs.writeFileSync(CATALOG_PATH,out,'utf8'); }

async function main(){
  const wb=new ExcelJS.Workbook(); await wb.xlsx.readFile(EXCEL_PATH); const sh=wb.worksheets[SHEET_INDEX-1]; if(!sh) throw new Error('sheet not found');
  resetDir(ASSET_DIR);
  const {categories:cat0=[], products:prod0=[]}=loadCatalog(); const categories=[...cat0]; if(!categories.find(c=>c.id===CATEGORY_ID)) categories.push({id:CATEGORY_ID,name:CATEGORY_NAME});
  const others=(Array.isArray(prod0)?prod0:[]).filter(p=>p.categoryId!==CATEGORY_ID);

  // Aggregate single product for Ins瑞士卷
  const displayName='Ins 瑞士卷 （口味自选）';
  const slug=slugify(displayName);

  // images: collect all row-anchored images within the range
  const media=(wb.model&&wb.model.media)||[]; const images=[];
  const allImgs=(sh.getImages?sh.getImages():[]).map(img=>{ const r=img.range||{}; const tl=r.tl||r||{}; const tlr=(tl.nativeRow??tl.row??r.row??0); return {img, tlr}; }).filter(o=> (o.tlr+1)>=ROW_START && (o.tlr+1)<=ROW_END).sort((a,b)=>a.tlr-b.tlr);
  allImgs.forEach((h,i)=>{ const found=media.find(m=>m&&m.index===h.img.imageId); if(!found) return; const buf=found.buffer||(found.base64?Buffer.from(found.base64,'base64'):null); if(!buf) return; const ext0=(found.extension||found.type||'jpeg').toLowerCase(); const ext=ext0==='jpg'?'jpeg':ext0; const fn=`ins-swiss-roll-${slug}-${i+1}.${ext}`; fs.writeFileSync(path.join(ASSET_DIR,fn),buf); images.push(assetUrl('ins-swiss-roll', fn)); });

  // variants: union of sizes from E column for rows
  const vmap=new Map();
  for(let r=ROW_START;r<=ROW_END;r++){ const e=sh.getCell(r,COL_E)?.value; const text=String(e && e.richText? e.richText.map(x=>x.text).join('') : e || ''); const list=parseVariantsFromE(text); for(const v of list){ vmap.set(v.size, Math.min(vmap.get(v.size)??Infinity, Number(v.price||0))); } }
  const variants=Array.from(vmap.entries()).map(([size,price])=>({size,price}));
  const price=variants.length? Math.min(...variants.map(v=>Number(v.price||0))) : 0;

  const optionsTitle='口味自选';
  const optionsType='single';
  const options=[
    {name:'巧克力脆皮瑞士卷',selected:false},
    {name:'红丝绒瑞士卷',selected:false},
    {name:'黑金抹茶瑞士卷',selected:false},
    {name:'焦糖饼干瑞士卷',selected:false},
    {name:'原味瑞士卷',selected:true},
    {name:'双重开心果瑞士卷',selected:false},
    {name:'香芋瑞士卷',selected:false},
    {name:'夹心芋泥➕芒果',selected:false},
    {name:'斑斓椰子瑞士卷',selected:false},
    {name:'伯爵红茶瑞士',selected:false}
  ];

  const product={ id:'ins-swiss-roll', categoryId:CATEGORY_ID, name:displayName, brief:displayName, images, cover: images[0]|| (ASSET_BASE_URL? assetUrl('', 'p1.jpg') : '/assets/p1.jpg'), price:Number(price), variants: variants.length?variants:[{size:'默认',price:Number(price)}], optionsTitle, optionsType, options };

  const products=others.concat([product]);
  saveCatalog(categories, products);
  console.log(`[INS-ROLL] product created, images:${images.length}, variants:${variants.length}`);
}

main().catch(e=>{ console.error(e); process.exit(1); });
