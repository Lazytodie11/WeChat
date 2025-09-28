#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { ASSET_BASE_URL } = require('./config.cjs');
const CATALOG = path.resolve(process.cwd(), 'miniprogram', 'data', 'catalog.js');

function loadCatalog(){ const src=fs.readFileSync(CATALOG,'utf8'); const m={exports:{}}; const fn=new Function('module','exports',src+'\n;return module.exports;'); return fn(m,m.exports)||{}; }
function isHttp(s){ return /^https?:\/\//i.test(String(s)); }

const { products=[] } = loadCatalog();
const prefix = (ASSET_BASE_URL||'').replace(/\/$/,'') + '/prod-images/';
let totalImgs=0, prefixed=0, anomalies=[];
for(const p of products){
  const imgs = Array.isArray(p.images)?p.images:[];
  totalImgs += imgs.length;
  let ok = true;
  for(const s of imgs){ if(isHttp(s)) { if(String(s).startsWith(prefix)) prefixed++; } else ok=false; }
  // cover rule: either http(s) and equals images[0] if exists, or ok if images empty
  if(imgs.length>0){ if(p.cover!==imgs[0]) ok=false; }
  else { if(!isHttp(p.cover)) ok=false; }
  if(!ok) anomalies.push(p.id);
}
console.log(`[verify:cdn] products: ${products.length}, images: ${totalImgs}, cdn-prefixed: ${prefixed}`);
if(anomalies.length){ console.log('[verify:cdn] anomalies (up to 10):', anomalies.slice(0,10).join(', ')); process.exitCode=1; }

