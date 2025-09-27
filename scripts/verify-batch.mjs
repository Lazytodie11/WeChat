#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const CATALOG_PATH = path.resolve(REPO_ROOT, 'miniprogram', 'data', 'catalog.js');
const MANIFEST_PATH = path.resolve(REPO_ROOT, 'data', 'import-manifest.json');

function toHalfWidth(str=''){ return String(str).replace(/[\uFF01-\uFF5E]/g,ch=>String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' ');} 
function cleanDisplayName(raw=''){ let s=toHalfWidth(String(raw)); s=s.replace(/[\s\u3000]+/g,' ').trim(); const patterns=[/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i,/^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i]; let changed=true; while(changed){changed=false; for(const re of patterns){ const ns=s.replace(re,''); if(ns!==s){s=ns; changed=true;}} s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'').replace(/[\s\u3000]+/g,' ').trim();} return s; }

function loadCatalog(){ const src=fs.readFileSync(CATALOG_PATH,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }

function main(){
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH,'utf8'));
  const targetIds = new Set((manifest.series||[]).map(s=>s.categoryId));
  const { products=[] } = loadCatalog();
  const list = products.filter(p=>targetIds.has(p.categoryId));

  let anomalies=0, totalImgs=0;
  for(const p of list){
    const imgs=Array.isArray(p.images)?p.images:[]; totalImgs+=imgs.length;
    const coverOk = imgs.length>0 ? p.cover===imgs[0] : (p.cover==='/assets/p1.jpg');
    const variantsOk = Array.isArray(p.variants) && p.variants.length>=1;
    const priceMin = variantsOk? Math.min(...p.variants.map(v=>Number(v.price||0))) : 0;
    const priceOk = Number(p.price)===Number(priceMin);
    const nameOk = cleanDisplayName(p.name)===p.name;
    const prefixOk = imgs.every(s=> s==='/assets/p1.jpg' || s.startsWith(`/assets/${p.categoryId}/`));

    const ok = variantsOk && priceOk && coverOk && prefixOk && nameOk;
    if(!ok) anomalies++;
    console.log(`[${ok? 'OK':'ERR'}] ${p.categoryId} | ${p.name} | imgs:${imgs.length} coverOk:${coverOk} prefixOk:${prefixOk} price:${p.price} min:${priceMin} nameClean:${nameOk}`);
  }
  console.log(`Total products (batch categories): ${list.length}, images total: ${totalImgs}, anomalies: ${anomalies}`);
}

main();

