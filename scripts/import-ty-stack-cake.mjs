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

// Config
const EXCEL_PATH = process.env.TY_STACK_EXCEL || '/Users/yipengli/Desktop/cake_name5.xlsx';
const SHEET_INDEX = 1; // 1-based
const ROW_START = 11;
const ROW_END = 28;
const COL_B = 2; // name raw
const COL_C = 3; // brief text
const COL_D = 4; // images (embedded)
const COL_E = 5; // price text (only source)

const CATEGORY_ID = 'ty-stack-cake';
const CATEGORY_NAME = 'T·y堆堆蛋糕';
const ASSET_DIR = path.resolve(__dirname, '..', 'miniprogram', 'assets', 'ty-stack-cake');
const CATALOG_PATH = path.resolve(__dirname, '..', 'miniprogram', 'data', 'catalog.js');

// Optional local fallback dir via env or tmp
const SRC_DIR_ENV = process.env.TY_STACK_IMG_DIR ? String(process.env.TY_STACK_IMG_DIR) : '';
const FALLBACK_DIRS = [SRC_DIR_ENV, path.resolve(__dirname, '..', 'tmp', 'ty-stack-cake-src')]
  .filter(Boolean)
  .filter(p => fs.existsSync(p) && fs.statSync(p).isDirectory());

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }

function resetDir(dir) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function toHalfWidth(str = '') {
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

// E-column parser
export function parseVariantsFromE(raw = '') {
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
  // Normalize duplicates: keep min price per size
  const map = new Map();
  for (const v of variants) {
    map.set(v.size, Math.min(map.get(v.size) ?? Infinity, v.price));
  }
  return Array.from(map.entries()).map(([size, price]) => ({ size, price }));
}

// Clean display name per rules
export function cleanDisplayName(raw = '') {
  let s = toHalfWidth(String(raw));
  s = s.replace(/[\s\u3000]+/g, ' ').trim();
  const patterns = [
    /^\s*(\d+(?:\.\d+)?\s*寸(?:\s*加高)?)\s*/i,
    /^\s*(\d+\s*\+\s*\d+\s*寸)\s*/i,
    /^\s*(\d+(?:\.\d+)?\s*层)\s*/i,
    /^\s*(\d+(?:\.\d+)?)\s*寸[-/]*\s*/i,
  ];
  let changed = true;
  while (changed) {
    changed = false;
    for (const re of patterns) {
      const ns = s.replace(re, '');
      if (ns !== s) { s = ns; changed = true; }
    }
    s = s.replace(/^[\-_/|·•—–、，,.;:：。]+/, '').replace(/[\s\u3000]+/g, ' ').trim();
  }
  return s;
}

function loadCatalog() {
  const src = fs.readFileSync(CATALOG_PATH, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module','exports', src + '\n;return module.exports;');
  return fn(m, m.exports) || {};
}

function saveCatalog(categories, products) {
  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');
}

function getEmbeddedImagesForRow(sheet, workbook, rowIndex) {
  // rowIndex is 1-based. We need zero-based for anchor compare
  const rowIdx0 = rowIndex - 1;
  const minCol = 2; // C
  const maxCol = 5; // F
  const hits = [];
  const imgs = sheet.getImages ? sheet.getImages() : [];
  for (const img of imgs) {
    const range = img.range || {};
    const tl = range.tl || range || {};
    const br = range.br || range.tl || range || {};
    const tlc = (tl.nativeCol ?? tl.col ?? range.col ?? 0);
    const tlr = (tl.nativeRow ?? tl.row ?? range.row ?? 0);
    const brc = (br.nativeCol ?? br.col ?? tlc);
    const brr = (br.nativeRow ?? br.row ?? tlr);
    const rowHit = tlr <= rowIdx0 && brr >= rowIdx0;
    const colHit = !(brc < minCol || tlc > maxCol); // intersects C..F
    // Aggressive mode: ignore column constraint to maximize hits
    const hit = rowHit; // previously: rowHit && colHit
    if (hit) hits.push({ img, tlc, tlr });
  }
  hits.sort((a,b) => (a.tlr - b.tlr) || (a.tlc - b.tlc));
  // Extract buffers
  const media = (workbook.model && workbook.model.media) || [];
  const out = [];
  for (const h of hits) {
    const found = media.find(m => m && m.index === h.img.imageId);
    if (!found) continue;
    let buffer = found.buffer || (found.base64 ? Buffer.from(found.base64, 'base64') : null);
    if (!buffer) continue;
    const ext0 = (found.extension || found.type || 'jpeg').toLowerCase();
    const ext = ext0 === 'jpg' ? 'jpeg' : ext0;
    out.push({ buffer, ext });
  }
  return out;
}

// Prepare a single global iterator list for fallback mapping 1 image per product
let FALLBACK_GLOBAL = null; let FALLBACK_IDX = 0;
function ensureFallbackList() {
  if (FALLBACK_GLOBAL !== null) return;
  for (const dir of FALLBACK_DIRS) {
    const files = fs.readdirSync(dir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
    if (!files.length) continue;
    const natural = (a,b) => {
      const ax=[]; const bx=[];
      a.replace(/(\d+)|(\D+)/g, (_,d,t)=>ax.push([d?Number(d):Infinity,t||'']));
      b.replace(/(\d+)|(\D+)/g, (_,d,t)=>bx.push([d?Number(d):Infinity,t||'']));
      while(ax.length&&bx.length){const A=ax.shift(),B=bx.shift();const av=A[0]===Infinity?A[1]:A[0];const bv=B[0]===Infinity?B[1]:B[0];if(av===bv)continue;return av>bv?1:-1;}return ax.length-bx.length;
    };
    files.sort(natural);
    FALLBACK_GLOBAL = { dir, files };
    FALLBACK_IDX = 0;
    return;
  }
  FALLBACK_GLOBAL = { dir: '', files: [] };
}
function importFromLocalFallbackOne(slug) {
  ensureFallbackList();
  const { dir, files } = FALLBACK_GLOBAL || { dir:'', files:[] };
  if (!dir || !files.length || FALLBACK_IDX >= files.length) return [];
  const f = files[FALLBACK_IDX++];
  const ext0 = path.extname(f).slice(1).toLowerCase();
  const ext = ext0 === 'jpg' ? 'jpeg' : ext0;
  const dst = path.join(ASSET_DIR, `ty-stack-cake-${slug}-1.${ext}`);
  fs.copyFileSync(path.join(dir, f), dst);
  return [assetUrl('ty-stack-cake', path.basename(dst))];
}

async function main() {
  if (!fs.existsSync(EXCEL_PATH)) throw new Error(`Excel not found: ${EXCEL_PATH}`);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.worksheets[SHEET_INDEX - 1];
  if (!sheet) throw new Error(`Sheet ${SHEET_INDEX} not found`);

  resetDir(ASSET_DIR);

  const { categories: cat0 = [], products: prod0 = [] } = loadCatalog();
  const categories = Array.isArray(cat0) ? [...cat0] : [];
  if (!categories.find(c => c.id === CATEGORY_ID)) categories.push({ id: CATEGORY_ID, name: CATEGORY_NAME });

  const others = (Array.isArray(prod0) ? prod0 : []).filter(p => p.categoryId !== CATEGORY_ID);
  const outProducts = [];
  const sourceMap = {}; // id -> 'excel' | 'fallback' | 'none'

  // 1) starters: B 列非空行
  const starters = [];
  for (let r = ROW_START; r <= ROW_END; r++) {
    const bRaw = sheet.getCell(r, COL_B)?.value;
    const rawName = String(bRaw && bRaw.richText ? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim();
    if (rawName) starters.push(r);
  }
  const ranges = starters.map((p, i) => ({ start: p, end: (i < starters.length - 1 ? starters[i+1] - 1 : ROW_END) }));

  // 2) flatten images with anchors, sort
  const allImgs = (sheet.getImages ? sheet.getImages() : []).map(img => {
    const range = img.range || {};
    const tl = range.tl || range || {};
    const br = range.br || range.tl || range || {};
    const tlc = (tl.nativeCol ?? tl.col ?? range.col ?? 0);
    const tlr = (tl.nativeRow ?? tl.row ?? range.row ?? 0);
    const brc = (br.nativeCol ?? br.col ?? tlc);
    const brr = (br.nativeRow ?? br.row ?? tlr);
    return { img, tlc, tlr, brc, brr };
  }).sort((a,b) => (a.tlr - b.tlr) || (a.tlc - b.tlc));

  const media = (workbook.model && workbook.model.media) || [];

  for (let i = 0; i < starters.length; i++) {
    const r = starters[i];
    const bRaw = sheet.getCell(r, COL_B)?.value;
    const cText = sheet.getCell(r, COL_C)?.value;
    const eText = sheet.getCell(r, COL_E)?.value;
    const rawName = String(bRaw && bRaw.richText ? bRaw.richText.map(x=>x.text).join('') : bRaw || '').trim();
    const displayName = cleanDisplayName(rawName);
    const brief = String(cText && cText.richText ? cText.richText.map(x=>x.text).join('') : cText || '').trim() || rawName || displayName;
    const variants = parseVariantsFromE(String(eText && eText.richText ? eText.richText.map(x=>x.text).join('') : eText || ''));
    const price = variants.length ? Math.min(...variants.map(v=>Number(v.price||0))) : 0;
    const slug = slugify(displayName);

    const range = ranges[i];
    const hits = allImgs.filter(h => {
      const row0 = h.tlr;
      return (row0 + 1) >= range.start && (row0 + 1) <= range.end;
    });
    let images = [];
    if (hits.length) {
      hits.forEach((h, k) => {
        const found = media.find(m => m && m.index === h.img.imageId);
        if (!found) return;
        const buffer = found.buffer || (found.base64 ? Buffer.from(found.base64, 'base64') : null);
        if (!buffer) return;
        const ext0 = (found.extension || found.type || 'jpeg').toLowerCase();
        const ext = ext0 === 'jpg' ? 'jpeg' : ext0;
        const filename = `ty-stack-cake-${slug}-${k+1}.${ext}`;
        const abs = path.join(ASSET_DIR, filename);
        fs.writeFileSync(abs, buffer);
        images.push(assetUrl('ty-stack-cake', filename));
      });
      sourceMap[`ty-stack-cake-${slug}`] = 'excel';
    } else {
      images = importFromLocalFallbackOne(slug);
      sourceMap[`ty-stack-cake-${slug}`] = images.length ? 'fallback' : 'none';
    }
    console.log(`row ${r} -> images:${images.length}, from:${sourceMap[`ty-stack-cake-${slug}`]}`);
    const cover = images[0] || (ASSET_BASE_URL? assetUrl('', 'p1.jpg') : '/assets/p1.jpg');

    outProducts.push({
      id: `ty-stack-cake-${slug}`,
      categoryId: CATEGORY_ID,
      name: displayName,
      brief,
      images,
      cover,
      price: Number(price),
      variants: variants.length ? variants : [{ size: '默认', price: Number(price) }]
    });
  }

  const products = others.concat(outProducts);
  saveCatalog(categories, products);
  // write source map for verifier
  try {
    const tmpDir = path.resolve(__dirname, '..', 'tmp');
    ensureDir(tmpDir);
    fs.writeFileSync(path.join(tmpDir, 'ty-stack-cake-source.json'), JSON.stringify(sourceMap, null, 2));
  } catch(_) {}
  console.log(`[TY-STACK] rows: ${outProducts.length}, assets: ${ASSET_DIR}`);
}

main().catch(e => { console.error(e); process.exit(1); });
