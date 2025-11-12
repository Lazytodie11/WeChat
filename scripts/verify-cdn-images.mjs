#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const requireCJS = createRequire(import.meta.url);
const { ASSET_BASE_URL, ASSET_SUBDIR } = requireCJS('./config.cjs');

function loadCatalog() {
  const catalogPath = path.resolve(__dirname, '../miniprogram/data/catalog.js');
  const src = fs.readFileSync(catalogPath, 'utf8');
  const m = { exports: {} };
  const req = createRequire(catalogPath);
  const fn = new Function('module','exports','require', src + '\n;return module.exports;');
  const mod = fn(m, m.exports, req) || {};
  const categories = mod.categories || [];
  const products = mod.products || [];
  return { categories, products };
}

function isHttp(s){ return /^https?:\/\//i.test(String(s)); }

const { products=[] } = loadCatalog();
const base = (ASSET_BASE_URL||'').replace(/\/$/,'');
const sub = String(ASSET_SUBDIR||'').replace(/^\/+|\/+$/g,'');
const prefix = base + (sub? `/${sub}` : '') + '/';
let totalImgs=0, prefixed=0, anomalies=[];
for(const p of products){
  const imgs = Array.isArray(p.images)?p.images:[];
  totalImgs += imgs.length;
  let ok = true;
  for(const s of imgs){ if(isHttp(s)) { if(String(s).startsWith(prefix)) prefixed++; } else ok=false; }
  if(imgs.length>0){ if(p.cover!==imgs[0]) ok=false; }
  else { if(!isHttp(p.cover)) ok=false; }
  if(!ok) anomalies.push(p.id);
}
console.log(`[verify:cdn] products: ${products.length}, images: ${totalImgs}, cdn-prefixed: ${prefixed}`);
if(anomalies.length){ console.log('[verify:cdn] anomalies (up to 10):', anomalies.slice(0,10).join(', ')); process.exitCode=1; }
