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
  return { src, categories, products };
}

function saveCatalog(categories, products) {
  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');
}

function main() {
  const { categories, products } = loadCatalog();
  // group by name preserving indices
  const groups = new Map();
  categories.forEach((c, idx) => {
    const name = String(c?.name || '').trim();
    if (!groups.has(name)) groups.set(name, []);
    groups.get(name).push({ idx, id: c.id, c });
  });

  const keptIdByName = new Map();
  const removed = new Map(); // name -> [ids]

  for (const [name, arr] of groups.entries()) {
    if (arr.length === 1) { keptIdByName.set(name, arr[0].id); continue; }
    const sorted = arr.slice().sort((a, b) => a.idx - b.idx);
    let keep;
    if (name === '4寸蛋糕' || name === '8寸蛋糕') {
      keep = sorted[1] || sorted[0];
    } else if (name === 'Ins瑞士卷') {
      keep = sorted[0];
    } else {
      keep = sorted[0];
    }
    keptIdByName.set(name, keep.id);
    const removedIds = [];
    for (const it of sorted) {
      if (it.id === keep.id) continue;
      removedIds.push(it.id);
    }
    removed.set(name, removedIds);
  }

  // Build sets
  const keptIds = new Set();
  for (const [name, arr] of groups.entries()) {
    if (arr.length === 1) keptIds.add(arr[0].id);
    else keptIds.add(keptIdByName.get(name));
  }
  const toDeleteIds = new Set();
  for (const ids of removed.values()) ids.forEach(id => toDeleteIds.add(id));

  // Filter categories: keep only keptIds; DO NOT drop empty unique categories
  const finalCategories = categories.filter(c => keptIds.has(c.id));

  // Delete products that belong to removed categories
  const productsDeletedByCategory = products.filter(p => toDeleteIds.has(p.categoryId)).length;
  const keptProducts = products.filter(p => !toDeleteIds.has(p.categoryId));

  // Deduplicate within same kept category by normalized name
  const norm = (s='') => String(s).trim().replace(/\s+/g,' ');
  const seen = new Set();
  let productsDeletedByDup = 0;
  const finalProducts = [];
  for (const p of keptProducts) {
    const key = `${p.categoryId}::${norm(p.name)}`;
    if (seen.has(key)) { productsDeletedByDup++; continue; }
    seen.add(key);
    finalProducts.push(p);
  }

  saveCatalog(finalCategories, finalProducts);

  // Print summary
  console.log('Fix duplicate categories summary:');
  for (const [name, arr] of groups.entries()) {
    if (arr.length <= 1) continue;
    const kept = keptIdByName.get(name);
    const del = removed.get(name) || [];
    console.log(`- ${name}: kept=${kept}, removed=[${del.join(', ')}]`);
  }
  console.log(`Products deleted: byCategory=${productsDeletedByCategory}, byDupInCategory=${productsDeletedByDup}`);
  console.log(`Final categories: ${finalCategories.length}, final products: ${finalProducts.length}`);
}

main();
