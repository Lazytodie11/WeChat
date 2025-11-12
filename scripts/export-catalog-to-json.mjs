#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function exitErr(msg) {
  console.error(`[export:db] ERROR: ${msg}`);
  process.exit(1);
}

function ensureDir(p) {
  try {
    fs.mkdirSync(p, { recursive: true });
  } catch (e) {
    exitErr(`Failed to create dir ${p}: ${e.message}`);
  }
}

function overwriteWarn(fp) {
  if (fs.existsSync(fp)) {
    console.warn(`[export:db] Overwriting existing file: ${fp}`);
  }
}

async function main() {
  const outDir = path.join(process.cwd(), 'out', 'db-seed');
  ensureDir(outDir);

  // 由于项目使用 ESM(type:module) 而 catalog.js 为 CJS，使用 Function 包装执行以获得导出
  let data;
  try {
    const file = path.join(process.cwd(), 'miniprogram', 'data', 'catalog.js');
    const code = fs.readFileSync(file, 'utf8');
    const factory = new Function('module', 'exports', `${code}\n;return module.exports;`);
    const mod = { exports: {} };
    data = factory(mod, mod.exports);
  } catch (e) {
    exitErr(`Cannot load miniprogram/data/catalog.js: ${e.message}`);
  }

  const categories = Array.isArray(data.categories) ? data.categories : [];
  const products = Array.isArray(data.products) ? data.products : [];

  const catOut = categories.map(c => ({
    _id: String(c.id || ''),
    name: String(c.name || ''),
    sort: (c.sort != null ? Number(c.sort) : 100)
  })).filter(c => c._id);

  const prodOut = products.filter(p => {
    if (Object.prototype.hasOwnProperty.call(p, 'status')) {
      return Number(p.status) === 1;
    }
    return true;
  }).map(p => {
    const imgArr = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
    const cover = imgArr.length ? imgArr[0] : (p.cover || null);
    const base = {
      _id: String(p.id || ''),
      categoryId: String(p.categoryId || ''),
      name: String(p.name || ''),
      brief: p.brief != null ? String(p.brief) : '',
      price: Number(p.price != null ? p.price : (Array.isArray(p.variants) && p.variants.length ? p.variants[0].price : 0)),
      variants: Array.isArray(p.variants) ? p.variants : [],
      images: imgArr,
      cover: cover || null,
      sort: (p.sort != null ? Number(p.sort) : 100),
      status: (p.status != null ? Number(p.status) : 1)
    };
    if (p.options) base.options = p.options; // 仅需要时存在
    return base;
  }).filter(p => p._id && p.categoryId);

  const catsPath = path.join(outDir, 'categories.jsonl');
  const prodsPath = path.join(outDir, 'products.jsonl');
  overwriteWarn(catsPath); overwriteWarn(prodsPath);

  try {
    const cStream = fs.createWriteStream(catsPath, { encoding: 'utf8' });
    catOut.forEach(o => cStream.write(JSON.stringify(o) + '\n'));
    cStream.end();
  } catch (e) {
    exitErr(`Failed writing categories.jsonl: ${e.message}`);
  }

  try {
    const pStream = fs.createWriteStream(prodsPath, { encoding: 'utf8' });
    prodOut.forEach(o => pStream.write(JSON.stringify(o) + '\n'));
    pStream.end();
  } catch (e) {
    exitErr(`Failed writing products.jsonl: ${e.message}`);
  }

  // 输出统计与示例
  console.log(`[export:db] categories: ${catOut.length}`);
  console.log(`[export:db] products:   ${prodOut.length}`);
  const sampleCats = catOut.slice(0, 3).map(JSON.stringify);
  const sampleProds = prodOut.slice(0, 3).map(JSON.stringify);
  console.log('[export:db] sample categories(3):');
  sampleCats.forEach(l => console.log(l));
  console.log('[export:db] sample products(3):');
  sampleProds.forEach(l => console.log(l));
}

main().catch(e => exitErr(e.message || String(e)));
