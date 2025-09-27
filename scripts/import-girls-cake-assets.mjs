#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { ASSET_BASE_URL } = require('./config.cjs');
function assetUrl(category, filename){ const cat=String(category||'').replace(/^\/+|\/+$/g,''); const fn=String(filename||'').replace(/^\/+/, ''); if(ASSET_BASE_URL){ const base=ASSET_BASE_URL.replace(/\/$/,''); return `${base}/prod-images/${cat}/${fn}`;} return `/assets/${cat}/${fn}`; }

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config per request
const EXCEL_PATH = '/Users/yipengli/Desktop/Products_name.xlsx';
const IMG_SRC_DIR = '/Users/yipengli/Desktop/女生款蛋糕/';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 19;
const ROW_END = 96;
const COL_NAME = 2; // B
const COL_PRICE = 5; // E (E19–E96 only)
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'girls-cake');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function toHalfWidth(str = '') {
  // full-width to half-width (incl. digits and spaces)
  return String(str).replace(/[\uFF01-\uFF5E]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0)).replace(/\u3000/g, ' ');
}

function slugify(text) {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export function parseVariantsFromE(raw) {
  // Strictly parse from E column text only
  const txt0 = toHalfWidth(String(raw || ''))
    .replace(/[；、，]/g, ',')
    .replace(/[\s]+/g, ' ') // compress spaces
    .trim();
  const variants = [];
  if (!txt0) return variants;
  // split by separators (space/comma/semicolon)
  const parts = txt0.split(/[\s,;]+/).filter(Boolean);
  for (const part of parts) {
    // Accept forms like: 4寸/39.9  | 4/39.9 | 8寸 / 159.9 | 8/159.9
    const m = part.match(/^([0-9]+(?:\.[0-9]+)?[^\/]*)\s*\/\s*([0-9]+(?:\.[0-9]+)?)$/);
    if (m) {
      let size = m[1].trim();
      size = size.replace(/\s+/g, '');
      size = size || '默认';
      const price = Number(m[2]);
      if (!Number.isNaN(price)) variants.push({ size, price });
      continue;
    }
    // Single number -> price only
    const only = part.match(/^([0-9]+(?:\.[0-9]+)?)$/);
    if (only) {
      const price = Number(only[1]);
      if (!Number.isNaN(price)) variants.push({ size: '默认', price });
    }
  }
  // Merge duplicates by size: keep min price
  const map = new Map();
  for (const v of variants) {
    const key = v.size;
    if (!map.has(key)) map.set(key, v.price);
    else map.set(key, Math.min(map.get(key), v.price));
  }
  return Array.from(map.entries()).map(([size, price]) => ({ size, price }));
}

export function cleanDisplayName(raw) {
  if (!raw) return '';
  // Normalize spaces (full-width to half-width, compress spaces)
  let s = toHalfWidth(String(raw));
  s = s.replace(/[\s\u3000]+/g, ' ').trim();
  // Repeatedly strip leading tokens
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
  // Final normalization
  s = toHalfWidth(s).replace(/[\s\u3000]+/g, ' ').trim();
  return s;
}

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module','exports', src + '\n;return module.exports;');
  return fn(m, m.exports) || {};
}

async function main() {
  // Preconditions
  if (!fs.existsSync(EXCEL_PATH)) throw new Error(`Excel not found: ${EXCEL_PATH}`);
  if (!fs.existsSync(IMG_SRC_DIR)) throw new Error(`Image dir not found: ${IMG_SRC_DIR}`);
  ensureDir(ASSET_DIR);

  // Load Excel rows
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.worksheets[SHEET_INDEX - 1];
  if (!sheet) throw new Error(`Sheet ${SHEET_INDEX} not found`);

  const rows = [];
  for (let r = ROW_START; r <= ROW_END; r++) {
    const nameCell = sheet.getCell(r, COL_NAME);
    const priceCell = sheet.getCell(r, COL_PRICE);
    const nameRaw = String(nameCell && nameCell.value ? (nameCell.value.richText ? nameCell.value.richText.map(x=>x.text).join('') : nameCell.value) : '').trim();
    const name = cleanDisplayName(nameRaw);
    if (!name) continue;
    const priceRaw = String(priceCell && priceCell.value ? (priceCell.value.richText ? priceCell.value.richText.map(x=>x.text).join('') : priceCell.value) : '').trim();
    rows.push({ r, rawName: nameRaw, displayName: name, priceRaw });
  }

  // Load source images WechatIMG23..WechatIMG105 and sort by number
  const files = fs.readdirSync(IMG_SRC_DIR)
    .filter(f => /^(WechatIMG)(\d+)\.(jpg|jpeg|png)$/i.test(f))
    .map(f => {
      const m = f.match(/^(WechatIMG)(\d+)\.(jpg|jpeg|png)$/i);
      return { name: f, num: Number(m[2]), ext: m[3].toLowerCase() };
    })
    .sort((a,b) => a.num - b.num);

  // Target range 23..105
  const filtered = files.filter(f => f.num >= 23 && f.num <= 105);
  const need = rows.length; // number of rows
  const used = Math.min(filtered.length, need);
  if (used < need) {
    console.warn(`[WARN] images fewer than rows: ${used} < ${need} — some rows will have no image`);
  }
  if (filtered.length > need) {
    console.warn(`[INFO] extra images detected: ${filtered.length - need} — they will be ignored in this pass`);
  }

  // Load and merge catalog
  const { categories: cat0 = [], products: prod0 = [] } = loadCatalog();
  const categories = Array.isArray(cat0) ? [...cat0] : [];
  if (!categories.find(c => c.id === 'girls-cake')) categories.push({ id: 'girls-cake', name: '女生款蛋糕' });
  const others = (Array.isArray(prod0) ? prod0 : []).filter(p => p.categoryId !== 'girls-cake');

  const products = [];
  let copied = 0;
  for (let i = 0; i < rows.length; i++) {
    const { r, displayName, rawName, priceRaw } = rows[i];
    const slug = slugify(displayName);
    const variants = parseVariantsFromE(priceRaw);
    const minPrice = variants.length ? Math.min(...variants.map(v => Number(v.price||0))) : 0;
    // Images already exported previously: collect all girls-cake-<slug>-*.jpg
    const dirFiles = fs.existsSync(ASSET_DIR) ? fs.readdirSync(ASSET_DIR) : [];
    const imgs = dirFiles
      .filter(f => new RegExp(`^girls-cake-${slug}-\\d+\\.(jpg|jpeg|png)$`, 'i').test(f))
      .sort((a,b) => {
        const na = Number((a.match(/-(\d+)\./)||[])[1]||'0');
        const nb = Number((b.match(/-(\d+)\./)||[])[1]||'0');
        return na - nb;
      })
      .map(f => assetUrl('girls-cake', f));
    if (imgs.length === 0 && i < filtered.length) {
      // Fallback: ensure at least one image by copying the i-th WechatIMG
      const src = path.join(IMG_SRC_DIR, filtered[i].name);
      const dstFile = `girls-cake-${slug}-1.jpg`;
      const dstPath = path.join(ASSET_DIR, dstFile);
      try {
        fs.copyFileSync(src, dstPath);
        imgs.push(assetUrl('girls-cake', dstFile));
        copied++;
      } catch (e) {
        console.warn(`[WARN] copy failed for row ${r} (${displayName}): ${e.message}`);
      }
    }
    products.push({
      id: `girls-cake-${slug}`,
      categoryId: 'girls-cake',
      name: displayName,
      brief: rawName,
      images: imgs,
      cover: imgs[0] || (ASSET_BASE_URL? assetUrl('', 'p1.jpg') : '/assets/p1.jpg'),
      price: Number(minPrice),
      variants: variants.length ? variants : [{ size: '默认', price: Number(minPrice) }]
    });
  }

  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(others.concat(products), null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');

  console.log(`[IMPORT DONE] rows: ${rows.length}, images ensured: ${copied} copied if missing`);
}

main().catch(e => { console.error(e); process.exit(1); });
