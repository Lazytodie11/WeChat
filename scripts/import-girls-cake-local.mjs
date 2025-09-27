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

// Config from user instruction
const EXCEL_PATH = '/Users/yipengli/Desktop/Products_name.xlsx';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 19;
const ROW_END = 96;
const COL_NAME = 2; // B
const COL_IMAGES = 4; // D
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
  // Examples: 4寸/39.9 6寸/79.9 | 4/39.9 6/79.9 | 4寸 / 39.9 | 39.9
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
    // Single price
    const p = Number(txt.replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(p)) variants.push({ size: '默认', price: p });
  }
  return variants;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function getImageData(workbook, imageId) {
  // exceljs keeps media in workbook.model.media with index starting 1
  const media = (workbook.model && workbook.model.media) || [];
  const found = media.find(m => m && m.index === imageId);
  if (!found) return null;
  if (found.buffer) return { buffer: found.buffer, extension: found.extension || found.type || 'png' };
  if (found.base64) return { buffer: Buffer.from(found.base64, 'base64'), extension: found.extension || 'png' };
  return null;
}

async function main() {
  if (!fs.existsSync(EXCEL_PATH)) {
    console.error(`[ERROR] Excel not found: ${EXCEL_PATH}`);
    process.exit(1);
  }
  ensureDir(ASSET_DIR);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.worksheets[SHEET_INDEX - 1];
  if (!sheet) {
    console.error(`[ERROR] Sheet ${SHEET_INDEX} not found`);
    process.exit(1);
  }

  // Collect images that intersect column D
  const imgs = sheet.getImages ? sheet.getImages() : [];
  const colRange = { from: COL_IMAGES, to: COL_IMAGES };

  const imagesByRow = new Map();
  for (const img of imgs) {
    const { imageId, range } = img;
    if (!range || !range.tl || !range.br) continue;
    const tl = range.tl; // { nativeRow, nativeCol, row, col, etc }
    const br = range.br;
    const rowFrom = (tl.nativeRow ?? tl.row ?? tl.nativeRow) + 1;
    const rowTo = (br.nativeRow ?? br.row ?? br.nativeRow) + 1;
    const colFrom = (tl.nativeCol ?? tl.col ?? tl.nativeCol) + 1;
    const colTo = (br.nativeCol ?? br.col ?? br.nativeCol) + 1;
    // check if intersects column D
    const intersectsCol = !(colTo < colRange.from || colFrom > colRange.to);
    if (!intersectsCol) continue;
    // clamp rows to import range
    for (let r = Math.max(ROW_START, rowFrom); r <= Math.min(ROW_END, rowTo); r++) {
      if (!imagesByRow.has(r)) imagesByRow.set(r, []);
      // sort key: by tl.nativeRow then tl.offsetY
      const keyRow = (tl.nativeRow ?? tl.row ?? 0);
      const keyOff = tl.offsetY ?? 0;
      imagesByRow.get(r).push({ imageId, keyRow, keyOff });
    }
  }
  // Sort lists
  for (const [r, arr] of imagesByRow) {
    arr.sort((a,b) => (a.keyRow - b.keyRow) || (a.keyOff - b.keyOff));
  }

  // Load current catalog (CommonJS style)
  const catalogSrc = fs.readFileSync(CATALOG_PATH, 'utf8');
  // crude parse: require existing module format; we'll eval in a sandbox-like function
  let categories = [];
  let products = [];
  try {
    const m = { exports: {} };
    const fn = new Function('module','exports',catalogSrc + '\n;return module.exports;');
    const res = fn(m, m.exports) || {};
    categories = Array.isArray(res.categories) ? res.categories : categories;
    products = Array.isArray(res.products) ? res.products : products;
  } catch (e) {
    console.error('[WARN] Failed to parse catalog.js, starting from current file with regex fallback');
  }

  // Ensure girls-cake category
  if (!categories.find(c => c.id === 'girls-cake')) {
    categories.push({ id: 'girls-cake', name: '女生款蛋糕' });
  }

  const newProducts = [];
  let savedImagesCount = 0;

  for (let r = ROW_START; r <= ROW_END; r++) {
    const nameCell = sheet.getCell(r, COL_NAME);
    const priceCell = sheet.getCell(r, COL_PRICE);
    const nameRaw = String(nameCell && nameCell.value ? (nameCell.value.richText ? nameCell.value.richText.map(x=>x.text).join('') : nameCell.value) : '').trim();
    if (!nameRaw) continue; // skip empty row
    const name = nameRaw;
    const brief = nameRaw; // per instruction: 若含尺寸/规格说明，同时当做 brief
    const slug = slugify(name);
    const imgsForRow = imagesByRow.get(r) || [];
    const outImages = [];
    let imgIndex = 0;
    for (const it of imgsForRow) {
      const data = getImageData(workbook, it.imageId);
      if (!data || !data.buffer) continue;
      const ext = (data.extension || 'png').replace(/^\./,'').toLowerCase();
      imgIndex++;
      const fileName = `girls-cake-${slug}-${imgIndex}.${ext}`;
      const abs = path.join(ASSET_DIR, fileName);
      fs.writeFileSync(abs, data.buffer);
      outImages.push(assetUrl('girls-cake', fileName));
      savedImagesCount++;
    }

    const variants = parseVariants(priceCell && priceCell.value ? (priceCell.value.richText ? priceCell.value.richText.map(x=>x.text).join('') : priceCell.value) : '');
    let price = 0;
    if (variants.length) price = Math.min(...variants.map(v => Number(v.price||0)));
    else price = 0;
    const product = {
      id: `girls-cake-${slug}`,
      categoryId: 'girls-cake',
      name,
      brief: brief || '',
      images: outImages,
      cover: outImages[0] || '',
      price: Number(price),
      variants: variants.length ? variants : [{ size: '默认', price: Number(price) }]
    };
    newProducts.push(product);
  }

  // Merge with existing products: drop existing girls-cake entries first to avoid duplicates
  const others = products.filter(p => p.categoryId !== 'girls-cake');
  const merged = others.concat(newProducts);

  // Reconstruct catalog.js preserving CommonJS export style
  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(merged, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');

  console.log(`[IMPORT DONE] girls-cake products: ${newProducts.length}, images saved: ${savedImagesCount}`);
}

main().catch(e => { console.error(e); process.exit(1); });
