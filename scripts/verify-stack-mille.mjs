#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'stack-mille');
const EXCEL_PATH = '/Users/yipengli/Desktop/cake_name5.xlsx';

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module','exports', src + '\n;return module.exports;');
  return fn(m, m.exports) || {};
}

async function main() {
  const { products = [] } = loadCatalog();
  const p = products.find(x => x.id === 'stack-mille');
  if (!p) {
    console.log('[NG] product stack-mille not found');
    process.exit(1);
  }
  const imgCount = Array.isArray(p.images) ? p.images.length : 0;
  const firstExists = imgCount > 0 && fs.existsSync(path.resolve(__dirname, '..', 'miniprogram', p.images[0].replace(/^\//,'')));
  const variantsOk = Array.isArray(p.variants) && p.variants.length === 1 && p.variants[0].size === '默认' && Number(p.variants[0].price) === 69.9;
  const priceOk = Number(p.price) === 69.9;
  let c2NonEmpty = false;
  try {
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(EXCEL_PATH);
    const sh = wb.worksheets[0];
    const c2 = sh.getCell('C2')?.value;
    c2NonEmpty = !!String(c2 || '').trim();
  } catch (_) {}
  const optionsOk = c2NonEmpty ? (Array.isArray(p.options) && p.options.length >= 1) : true;

  console.log(`[CHECK] images=${imgCount} (firstExists=${firstExists}) variantsOk=${variantsOk} priceOk=${priceOk} optionsOk=${optionsOk}`);
  if (imgCount !== 8) console.warn(`[WARN] expected 8 images, got ${imgCount}`);
  if (!firstExists) console.warn('[WARN] first image missing on disk');
  if (!variantsOk) console.warn('[WARN] variants invalid, expect [{size:"默认",price:69.9}]');
  if (!priceOk) console.warn('[WARN] price not 69.9');
  if (!optionsOk) console.warn('[WARN] options empty while C2 non-empty');
}

main();

