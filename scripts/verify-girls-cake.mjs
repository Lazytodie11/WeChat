#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'girls-cake');

function toHalfWidth(str = '') {
  return String(str).replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, ' ');
}

function cleanDisplayName(raw = '') {
  let s = toHalfWidth(String(raw));
  s = s.replace(/[\s\u3000]+/g, ' ').trim();
  const patterns = [
    /^\s*[0-9０-９]+(?:\.[0-9０-９]+)?\s*寸(?:\s*加高)?\s*/i,
    /^\s*[0-9０-９]+\s*\+\s*[0-9０-９]+(?:\s*寸|\s*层)?\s*/i,
    /^\s*[0-9０-９]+(?:\.[0-9０-９]+)?\s*英寸\s*/i,
    /^\s*[0-9０-９]+\s*层\s*/i,
  ];
  const stripDelims = /^[-_/|·•—–、，,.;:：。]+/;
  let changed = true;
  while (changed) {
    changed = false;
    for (const re of patterns) {
      const ns = s.replace(re, '');
      if (ns !== s) { s = ns; changed = true; }
    }
    const ns2 = s.replace(stripDelims, '');
    if (ns2 !== s) { s = ns2; changed = true; }
    s = s.replace(/[\s\u3000]+/g, ' ').trim();
  }
  s = toHalfWidth(s).replace(/[\s\u3000]+/g, ' ').trim();
  return s;
}

function parseVariantsFromE(raw = '') {
  const txt0 = toHalfWidth(String(raw))
    .replace(/[；、，]/g, ',')
    .replace(/[\s]+/g, ' ')
    .trim();
  const variants = [];
  if (!txt0) return variants;
  const parts = txt0.split(/[\s,;]+/).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/^([0-9]+(?:\.[0-9]+)?[^\/]*)\s*\/\s*([0-9]+(?:\.[0-9]+)?)$/);
    if (m) {
      let size = m[1].trim().replace(/\s+/g, '') || '默认';
      const price = Number(m[2]);
      if (!Number.isNaN(price)) variants.push({ size, price });
      continue;
    }
    const only = part.match(/^([0-9]+(?:\.[0-9]+)?)$/);
    if (only) {
      const price = Number(only[1]);
      if (!Number.isNaN(price)) variants.push({ size: '默认', price });
    }
  }
  const map = new Map();
  for (const v of variants) {
    const key = v.size;
    if (!map.has(key)) map.set(key, v.price);
    else map.set(key, Math.min(map.get(key), v.price));
  }
  return Array.from(map.entries()).map(([size, price]) => ({ size, price }));
}

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module','exports', src + '\n;return module.exports;');
  return fn(m, m.exports) || {};
}

function main() {
  const { products = [] } = loadCatalog();
  const girls = products.filter(p => p.categoryId === 'girls-cake');
  let totalImages = 0;
  let errors = 0;
  girls.forEach(p => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    totalImages += imgs.length;
    const first = imgs[0] || '';
    const varSummary = Array.isArray(p.variants) ? p.variants.map(v => `${v.size}/${v.price}`).join(', ') : '';
    const existFlags = imgs.map(rel => fs.existsSync(path.resolve(__dirname, '..', 'miniprogram', rel.replace(/^\//,''))) ? 'Y' : 'N');
    // Checks
    const minPrice = Array.isArray(p.variants) && p.variants.length ? Math.min(...p.variants.map(v=>Number(v.price||0))) : 0;
    const priceOk = Number(p.price) === Number(minPrice);
    const cleaned = cleanDisplayName(p.name);
    const nameOk = cleaned === p.name; // should already be cleaned
    if (!priceOk || !nameOk || !(Array.isArray(p.variants) && p.variants.length>=1)) errors++;
    // Print
    console.log(`[OK] ${p.name} | images:${imgs.length} | first:${first} | variants: ${varSummary} | priceMin:${minPrice} | price=${p.price} | nameClean:${nameOk} | files: ${existFlags.join('')}`);
  });
  console.log(`Total products: ${girls.length}, total images: ${totalImages}, anomalies: ${errors}`);

  // Mini tests
  console.log('\n[Mini Tests] cleanDisplayName');
  const nameCases = [
    [' 6寸简约裱花款', '简约裱花款'],
    ['\u30006寸 可可蓝莓', '可可蓝莓'],
    ['8+6双层 白色系蝴蝶款', '白色系蝴蝶款'],
    ['6寸/白色系蝴蝶款', '白色系蝴蝶款'],
    ['6寸-白色系蝴蝶款', '白色系蝴蝶款'],
    ['6寸—白色系蝴蝶款', '白色系蝴蝶款'],
    ['10英寸 草莓蛋糕2025', '草莓蛋糕2025'],
    ['2层 公主款', '公主款'],
  ];
  nameCases.forEach(([raw, expect]) => {
    const got = cleanDisplayName(raw);
    console.log(`${raw} => ${got} ${got===expect?'[OK]':'[NG]'}`);
  });

  console.log('\n[Mini Tests] parseVariantsFromE');
  const pv = (s)=>parseVariantsFromE(s);
  const pvCases = [
    ['4寸/39.9 6寸/79.9 8寸/159.9', 3, 39.9],
    ['4/39.9；6/79.9；8/159.9', 3, 39.9],
    ['39.9', 1, 39.9],
  ];
  pvCases.forEach(([raw, cnt, min]) => {
    const list = pv(raw); const minPrice = list.length?Math.min(...list.map(v=>v.price)):0;
    console.log(`${raw} => n=${list.length} min=${minPrice} ${list.length===cnt && minPrice===min?'[OK]':'[NG]'}`);
  });
}

main();
