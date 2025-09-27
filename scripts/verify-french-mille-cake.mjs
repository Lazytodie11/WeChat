#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function cleanDisplayName(raw=''){ let s=toHalfWidth(String(raw)); s=s.replace(/[\s\u3000]+/g,' ').trim(); const patterns=[/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i,/^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i]; let changed=true; while(changed){changed=false; for(const re of patterns){ const ns=s.replace(re,''); if(ns!==s){s=ns; changed=true;}} s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'').replace(/[\s\u3000]+/g,' ').trim();} return s; }

function loadCatalog(){ const src=fs.readFileSync(CATALOG_PATH,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }

function main(){
  const { products=[] } = loadCatalog();
  const list = products.filter(p=>p.categoryId==='french-mille-cake');
  let anomalies=0, excel=0, fallback=0, none=0, totalImgs=0; const seen=new Map();
  let srcMap={}; try{ srcMap=JSON.parse(fs.readFileSync(path.resolve(__dirname,'..','tmp','french-mille-source.json'),'utf8')); }catch(_){ }
  for(const p of list){
    const imgs=Array.isArray(p.images)?p.images:[]; totalImgs+=imgs.length;
    const allInDir=imgs.length>0 && imgs.every(s=>typeof s==='string' && s.startsWith('/assets/french-mille-cake/'));
    const coverOk=imgs.length>0 ? p.cover===imgs[0] : true;
    const priceMin=Array.isArray(p.variants)&&p.variants.length?Math.min(...p.variants.map(v=>Number(v.price||0))):0;
    const priceOk=Number(p.price)===Number(priceMin);
    const nameOk=cleanDisplayName(p.name)===p.name;
    const briefOk=!!(p.brief && String(p.brief).trim());
    let crossDup=false; imgs.forEach(s=>{ const c=(seen.get(s)||0)+1; seen.set(s,c); if(c>1) crossDup=true; });
    if(!(Array.isArray(p.variants)&&p.variants.length) || !priceOk || imgs.length<1 || !allInDir || !coverOk || !nameOk || !briefOk || crossDup) anomalies++;
    const from=srcMap[p.id]||'unknown'; if(from==='excel') excel++; else if(from==='fallback') fallback++; else none++;
    console.log(`[OK] ${p.name} | from:${from} | imgs:${imgs.length} inDir:${allInDir} coverOk:${coverOk} priceMin:${priceMin} price:${p.price} nameClean:${nameOk} briefOk:${briefOk}`);
  }
  console.log(`Total products: ${list.length}, images total: ${totalImgs}, anomalies: ${anomalies}, from: excel=${excel}, fallback=${fallback}, none/unknown=${none}`);
}

main();
