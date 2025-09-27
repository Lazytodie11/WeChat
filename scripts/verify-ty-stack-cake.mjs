#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function toHalfWidth(str = '') { return String(str).replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0)-0xFEE0)).replace(/\u3000/g,' '); }
function cleanDisplayName(raw = '') {
  let s = toHalfWidth(String(raw)); s = s.replace(/[\s\u3000]+/g,' ').trim();
  const patterns = [/^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,/^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,/^\s*(\d+(?:\.\d+)?\s*层)\s*/i,/^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i];
  let changed=true; while(changed){changed=false; for(const re of patterns){const ns=s.replace(re,''); if(ns!==s){s=ns; changed=true;}} s=s.replace(/^[\-_/|·•—–、，,.;:：。]+/,'').replace(/[\s\u3000]+/g,' ').trim();}
  return s;
}

function loadCatalog(){ const src=fs.readFileSync(CATALOG_PATH,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }

function main(){
  const { categories=[], products=[] } = loadCatalog();
  const list = products.filter(p => p.categoryId === 'ty-stack-cake');
  let anomalies=0;
  for(const p of list){
    const imgs = Array.isArray(p.images)?p.images:[];
    const allInDir = imgs.length>0 && imgs.every(s=>typeof s==='string' && s.startsWith('/assets/ty-stack-cake/'));
    const firstExists = imgs.length>0 && fs.existsSync(path.resolve(__dirname,'..','miniprogram', imgs[0].replace(/^\//,'')));
    const coverOk = imgs.length>0 ? p.cover===imgs[0] : true;
    const priceMin = Array.isArray(p.variants)&&p.variants.length?Math.min(...p.variants.map(v=>Number(v.price||0))):0;
    const priceOk = Number(p.price)===Number(priceMin);
    const nameOk = cleanDisplayName(p.name)===p.name;
    if(!(Array.isArray(p.variants)&&p.variants.length) || !priceOk || imgs.length<1 || !allInDir || !coverOk || !nameOk) anomalies++;
    console.log(`[OK] ${p.name} | imgs:${imgs.length} inDir:${allInDir} coverOk:${coverOk} priceMin:${priceMin} price:${p.price} nameClean:${nameOk} first:${firstExists}`);
  }
  console.log(`Total products: ${list.length}, anomalies: ${anomalies}`);
}

main();

