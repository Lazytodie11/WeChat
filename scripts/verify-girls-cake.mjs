#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'girls-cake');

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
  girls.forEach(p => {
    const imgs = Array.isArray(p.images) ? p.images : [];
    totalImages += imgs.length;
    const first = imgs[0] || '';
    const varSummary = Array.isArray(p.variants) ? p.variants.map(v => `${v.size}/${v.price}`).join(', ') : '';
    const existFlags = imgs.map(rel => fs.existsSync(path.resolve(__dirname, '..', 'miniprogram', rel.replace(/^\//,''))) ? 'Y' : 'N');
    // Print
    console.log(`[OK] ${p.name} | images:${imgs.length} | first:${first} | variants: ${varSummary} | files: ${existFlags.join('')}`);
  });
  console.log(`Total products: ${girls.length}, total images: ${totalImages}`);
}

main();

