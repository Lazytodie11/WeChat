#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config
const EXCEL_PATH = '/Users/yipengli/Desktop/cake_name5.xlsx';
const SHEET_INDEX = 1; // 1-based
const NAME_CONST = '堆堆千层';
const CELL_C2 = 'C2';
const CELL_E2 = 'E2';
// Local import directory (explicit, contains spaces and dot)
const SRC_DIR = '/Users/yipengli/Desktop/T.y 堆堆千层系列';
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'stack-mille');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function clearDir(dir) {
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir)) {
      fs.rmSync(path.join(dir, f), { force: true, recursive: true });
    }
  } else {
    ensureDir(dir);
  }
}

function parseOptionsFromC(text) {
  if (!text) return [];
  const items = String(text)
    .split(/[\n\r\t、，,；; ]+/)
    .map(s => s.trim())
    .filter(Boolean);
  const uniq = [...new Set(items)];
  return uniq.map(name => ({ name, selected: false }));
}

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module','exports', src + '\n;return module.exports;');
  return fn(m, m.exports) || {};
}

async function main() {
  // Excel still used for price/options; images now come from local folder only
  if (!fs.existsSync(EXCEL_PATH)) throw new Error(`Excel not found: ${EXCEL_PATH}`);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.worksheets[SHEET_INDEX - 1];
  if (!sheet) throw new Error(`Sheet ${SHEET_INDEX} not found`);

  // Prepare asset dir: clear then ensure
  ensureDir(ASSET_DIR);
  clearDir(ASSET_DIR);

  // Local directory import (explicit path)
  if (!fs.existsSync(SRC_DIR)) throw new Error(`Source dir not found: ${SRC_DIR}`);
  const files = fs.readdirSync(SRC_DIR).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const naturalCompare = (a,b) => {
    const ax = [], bx = [];
    a.replace(/(\d+)|(\D+)/g, (_, $1, $2) => { ax.push([$1 || Infinity, $2 || '']); });
    b.replace(/(\d+)|(\D+)/g, (_, $1, $2) => { bx.push([$1 || Infinity, $2 || '']); });
    while (ax.length && bx.length) {
      const an = ax.shift(); const bn = bx.shift();
      const ad = an[0] === Infinity ? an[1] : Number(an[0]);
      const bd = bn[0] === Infinity ? bn[1] : Number(bn[0]);
      if (ad === bd) continue;
      return ad > bd ? 1 : -1;
    }
    return ax.length - bx.length;
  };
  files.sort(naturalCompare);
  const outImages = [];
  files.forEach((f, i) => {
    const idx = i + 1;
    const ext0 = path.extname(f).slice(1).toLowerCase();
    const ext = ext0 === 'jpg' ? 'jpeg' : ext0; // unify .jpg -> .jpeg
    const dstName = `stack-mille-${idx}.${ext}`;
    const src = path.join(SRC_DIR, f);
    const dst = path.join(ASSET_DIR, dstName);
    try { fs.copyFileSync(src, dst); outImages.push(`/assets/stack-mille/${dstName}`); } catch(e) { console.warn('[COPY_FAIL]', f, e.message); }
  });

  // Read price and options
  const priceRaw = sheet.getCell(CELL_E2)?.value;
  const price = Number(String(priceRaw).replace(/[^0-9.]/g, '')) || 0;
  const variants = [{ size: '默认', price }];
  const optionsText = sheet.getCell(CELL_C2)?.value;
  const options = parseOptionsFromC(optionsText);

  // Merge into catalog
  const { categories: cat0 = [], products: prod0 = [] } = loadCatalog();
  const categories = Array.isArray(cat0) ? [...cat0] : [];
  const existing = categories.find(c => c.id === 'stack-mille');
  if (!existing) categories.push({ id: 'stack-mille', name: 'T·y堆堆千层系列' });
  else existing.name = 'T·y堆堆千层系列';

  const others = (Array.isArray(prod0) ? prod0 : []).filter(p => p.id !== 'stack-mille');
  const product = {
    id: 'stack-mille',
    categoryId: 'stack-mille',
    name: NAME_CONST,
    brief: NAME_CONST,
    images: outImages,
    cover: outImages[0] || '/assets/p1.jpg',
    price,
    variants,
    options,
  };
  if (product.images.some(p => p.includes('girls-cake'))) {
    throw new Error('Invalid path mixed with girls-cake in stack-mille images');
  }
  const products = others.concat([product]);

  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');

  console.log(`[STACK-MILLE] images: ${outImages.length}, price: ${price}, options: ${options.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
