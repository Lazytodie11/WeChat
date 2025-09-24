#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ExcelJS from 'exceljs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Config per request
const EXCEL_PATH = '/Users/yipengli/Desktop/Products_name.xlsx';
const IMG_SRC_DIR = '/Users/yipengli/Desktop/女生款蛋糕/';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 19;
const ROW_END = 96;
const COL_NAME = 2; // B
const COL_PRICE = 5; // E
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'girls-cake');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

function slugify(text) {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function parseVariants(raw) {
  const txt = String(raw || '').trim();
  const variants = [];
  if (!txt) return variants;
  // Examples: 4寸/39.9 6寸/79.9 8寸/159.9 | 4/39.9 6/79.9 | 39.9
  const parts = txt.split(/[，,\s]+/).filter(Boolean);
  for (const part of parts) {
    const m = part.match(/([0-9]+\s*[^/]*?)\s*\/?\s*([0-9]+(?:\.[0-9]+)?)/);
    if (m) {
      const size = m[1].replace(/\s+/g, '').replace(/[^\u4e00-\u9fa5a-zA-Z0-9]+/g, '') || '默认';
      const price = Number(m[2]);
      variants.push({ size, price });
    }
  }
  if (variants.length === 0) {
    const p = Number(txt.replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(p)) variants.push({ size: '默认', price: p });
  }
  return variants;
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
    const name = String(nameCell && nameCell.value ? (nameCell.value.richText ? nameCell.value.richText.map(x=>x.text).join('') : nameCell.value) : '').trim();
    if (!name) continue;
    const priceRaw = String(priceCell && priceCell.value ? (priceCell.value.richText ? priceCell.value.richText.map(x=>x.text).join('') : priceCell.value) : '').trim();
    rows.push({ r, name, priceRaw });
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
    const { r, name, priceRaw } = rows[i];
    const slug = slugify(name);
    const variants = parseVariants(priceRaw);
    const minPrice = variants.length ? Math.min(...variants.map(v => Number(v.price||0))) : 0;
    const imgs = [];
    if (i < filtered.length) {
      const src = path.join(IMG_SRC_DIR, filtered[i].name);
      const dstFile = `girls-cake-${slug}-1.jpg`;
      const dstPath = path.join(ASSET_DIR, dstFile);
      try {
        // Convert to .jpg by copying as-is; if source is png, keep content but name .jpg for consistency
        fs.copyFileSync(src, dstPath);
        imgs.push(`/assets/girls-cake/${dstFile}`);
        copied++;
      } catch (e) {
        console.warn(`[WARN] copy failed for row ${r} (${name}): ${e.message}`);
      }
    }
    products.push({
      id: `girls-cake-${slug}`,
      categoryId: 'girls-cake',
      name,
      brief: name,
      images: imgs,
      cover: imgs[0] || '',
      price: Number(minPrice),
      variants: variants.length ? variants : [{ size: '默认', price: Number(minPrice) }]
    });
  }

  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(others.concat(products), null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');

  console.log(`[IMPORT DONE] rows: ${rows.length}, images copied: ${copied}`);
}

main().catch(e => { console.error(e); process.exit(1); });

