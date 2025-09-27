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
const ROW_IMG_START = 2; // D2 .. D9
const ROW_IMG_END = 9;
const COL_D_NATIVE = 3; // zero-based column index for D
const CELL_C2 = 'C2';
const CELL_E2 = 'E2';
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

function getImageData(workbook, imageId) {
  const media = (workbook.model && workbook.model.media) || [];
  const found = media.find(m => m && m.index === imageId);
  if (!found) return null;
  if (found.buffer) return { buffer: found.buffer, ext: (found.extension || found.type || 'jpeg').toLowerCase() };
  if (found.base64) return { buffer: Buffer.from(found.base64, 'base64'), ext: (found.extension || 'jpeg').toLowerCase() };
  return null;
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
  if (!fs.existsSync(EXCEL_PATH)) throw new Error(`Excel not found: ${EXCEL_PATH}`);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_PATH);
  const sheet = workbook.worksheets[SHEET_INDEX - 1];
  if (!sheet) throw new Error(`Sheet ${SHEET_INDEX} not found`);

  // Collect images anchored to D column and rows 2..9
  const imgs = (sheet.getImages ? sheet.getImages() : [])
    .filter(img => img.range && img.range.tl && img.range.tl.nativeCol === COL_D_NATIVE)
    .filter(img => {
      const r = img.range.tl.nativeRow; // 0-based
      return r >= (ROW_IMG_START - 1) && r <= (ROW_IMG_END - 1);
    })
    .sort((a,b) => a.range.tl.nativeRow - b.range.tl.nativeRow);

  // Prepare asset dir: clear then ensure
  ensureDir(ASSET_DIR);
  clearDir(ASSET_DIR);

  const outImages = [];
  for (let i = 0; i < imgs.length; i++) {
    const data = getImageData(workbook, imgs[i].imageId);
    if (!data || !data.buffer) continue;
    const idx = i + 1; // 1..n
    const filename = `stack-mille-${idx}.jpeg`;
    const abs = path.join(ASSET_DIR, filename);
    fs.writeFileSync(abs, data.buffer);
    outImages.push(`/assets/stack-mille/${filename}`);
  }

  // Fallback: if no embedded images found, try local directory
  if (outImages.length === 0) {
    const envDir = process.env.STACK_MILLE_IMG_DIR && String(process.env.STACK_MILLE_IMG_DIR).trim();
    const candidates = [
      envDir,
      path.resolve(__dirname, '..', 'tmp', 'stack-mille-src'),
      path.resolve(__dirname, '..', 'tmp', 'debug-D-col'),
    ].filter(Boolean).filter(p => fs.existsSync(p) && fs.statSync(p).isDirectory());
    if (candidates.length) {
      const srcDir = candidates[0];
      const list = fs.readdirSync(srcDir)
        .filter(f => /\.(jpe?g|png)$/i.test(f))
        .map(f => ({ f, n: Number((f.match(/(\d+)/)||[])[1] || '0') }))
        .sort((a,b) => a.n - b.n || a.f.localeCompare(b.f))
        .slice(0, 8);
      list.forEach((it, i) => {
        const idx = i + 1;
        const src = path.join(srcDir, it.f);
        const dst = path.join(ASSET_DIR, `stack-mille-${idx}.jpeg`);
        try { fs.copyFileSync(src, dst); outImages.push(`/assets/stack-mille/stack-mille-${idx}.jpeg`); } catch(_) {}
      });
    }
  }

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
  const products = others.concat([product]);

  const out = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(products, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(CATALOG_PATH, out, 'utf8');

  console.log(`[STACK-MILLE] images: ${outImages.length}, price: ${price}, options: ${options.length}`);
  if (outImages.length === 0) {
    console.warn('[STACK-MILLE] Fallback not found images. Set env STACK_MILLE_IMG_DIR to a folder with 8 images to import.');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
