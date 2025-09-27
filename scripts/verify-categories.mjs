#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const req = createRequire(CATALOG_PATH);
  const fn = new Function('module', 'exports', 'require', src + '\n;return module.exports;');
  const mod = fn(m, m.exports, req) || {};
  const categories = Array.isArray(mod.categories) ? mod.categories.slice() : [];
  const products = Array.isArray(mod.products) ? mod.products.slice() : [];
  return { categories, products };
}

function main() {
  const { categories, products } = loadCatalog();
  const nameMap = new Map();
  let dupCatNames = 0;
  for (const c of categories) {
    const name = String(c?.name || '').trim();
    if (nameMap.has(name)) dupCatNames++;
    nameMap.set(name, c.id);
  }
  const catIds = new Set(categories.map(c => c.id));
  let orphanProducts = 0;
  for (const p of products) {
    if (!catIds.has(p.categoryId)) orphanProducts++;
  }
  // duplicate products within same category by normalized name
  const norm = (s='') => String(s).trim().replace(/\s+/g,' ');
  let dupProducts = 0;
  const seen = new Set();
  for (const p of products) {
    const key = `${p.categoryId}::${norm(p.name)}`;
    if (seen.has(key)) dupProducts++;
    else seen.add(key);
  }
  console.log(`Categories: ${categories.length}`);
  console.log(`Products: ${products.length}`);
  console.log(`Duplicate category names: ${dupCatNames}`);
  console.log(`Duplicate products (same category+name): ${dupProducts}`);
  console.log(`Orphan products: ${orphanProducts}`);
  if (dupCatNames>0 || orphanProducts>0 || dupProducts>0) process.exitCode = 1;
}

main();
