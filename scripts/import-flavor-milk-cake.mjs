#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const EXCEL_PATH = '/Users/yipengli/Desktop/Product Price List1.xlsx';
const TARGET_CATEGORY_NAME = '口味奶糕';
const TARGET_CATEGORY_ID = 'flavor-milk-cake';
const START_ROW = 2, END_ROW = 17; // inclusive

const repoRoot = process.cwd();
const assetsDir = path.join(repoRoot, 'miniprogram', 'assets');
const catalogFile = path.join(repoRoot, 'miniprogram', 'data', 'catalog.js');

function slugify(s) {
  return String(s||'')
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'') || 'item';
}

async function loadWorkbook(p) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(p);
  return wb;
}

function mapImagesByRow(ws, wb) {
  const result = {};
  const imgs = (typeof ws.getImages === 'function') ? ws.getImages() : [];
  for (const img of imgs) {
    const id = img.imageId;
    // find media by id
    const media = (wb.model && wb.model.media || []).find(m => m.index === id) || (wb._media || []).find(m=>m.index===id);
    if (!media) continue;
    const ext = media.extension || (media.type === 'image' ? (media.name?.split('.').pop() || 'png') : 'png');
    const buf = media.buffer || media.data;
    const tl = img.range?.tl || img.range?.native || img.range || {};
    const row0 = Math.round(tl.nativeRow ?? tl.row ?? 0); // zero-based
    const row = row0 + 1; // excel rows start at 1
    // only map first image per row
    if (!result[row]) result[row] = { buffer: buf, ext };
  }
  return result;
}

function parseVariants(text='') {
  const variants = [];
  const tokens = String(text).trim().replace(/\n/g,' ').split(/\s+/).filter(Boolean);
  for (const tok of tokens) {
    const [size, price] = tok.split('/');
    const p = Number((price||'').replace(/[^0-9.]/g,''));
    if (size && !Number.isNaN(p)) variants.push({ size, price: p });
  }
  return variants;
}

function minPrice(variants) {
  if (!variants || variants.length === 0) return 0;
  return Math.min(...variants.map(v => Number(v.price||0)));
}

function ensureDir(d){ if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); }

function loadExistingCatalog() {
  let categories = [];
  let products = [];
  try {
    // fallback require in CommonJS via eval
    const mod = { exports: {} };
    const fn = new Function('module','exports', fs.readFileSync(catalogFile,'utf8'));
    fn(mod, mod.exports);
    categories = mod.exports.categories || [];
    products = mod.exports.products || [];
  } catch {}
  return { categories, products };
}

function writeCatalog(categories, products) {
  const header = `// 数据源由脚本生成/更新\n`;
  const catStr = JSON.stringify(categories, null, 2);
  const prodStr = JSON.stringify(products, null, 2);
  const code = `${header}const categories = ${catStr};\n\nconst products = ${prodStr};\n\nmodule.exports = { categories, products };\n`;
  fs.writeFileSync(catalogFile, code);
}

(async () => {
  ensureDir(assetsDir);
  const wb = await loadWorkbook(EXCEL_PATH);
  const ws = wb.worksheets[0];
  if (!ws) throw new Error('No first worksheet');
  const imgByRow = mapImagesByRow(ws, wb);

  const imported = [];
  for (let r = START_ROW; r <= END_ROW; r++) {
    const cat = ws.getCell(`A${r}`).text.trim();
    if (cat !== TARGET_CATEGORY_NAME) continue;
    const name = ws.getCell(`B${r}`).text.trim();
    const brief = ws.getCell(`C${r}`).text.trim();
    const priceSpec = ws.getCell(`E${r}`).text.trim();
    const slug = slugify(name);
    const variants = parseVariants(priceSpec);
    const price = minPrice(variants);

    let cover = '';
    const img = imgByRow[r];
    if (img && img.buffer) {
      const ext = (img.ext || 'png').toLowerCase();
      const fname = `flavor-milk-cake-${slug}-1.${ext}`;
      const out = path.join(assetsDir, fname);
      fs.writeFileSync(out, img.buffer);
      cover = '/assets/' + fname;
      imported.push(fname);
    }

    const item = {
      id: `flavor-milk-cake-${slug}`,
      categoryId: TARGET_CATEGORY_ID,
      name,
      brief,
      cover,
      price,
      variants,
    };
    imported.push(item);
  }

  // load existing catalog
  let { categories, products } = loadExistingCatalog();
  // ensure categories include TARGET and keep others
  const mapCat = new Map(categories.map(c => [c.id, c]));
  mapCat.set('flavor-milk-cake', { id: 'flavor-milk-cake', name: '口味奶糕' });
  categories = Array.from(mapCat.values());

  // append/merge products: replace by id if exists
  const prodMap = new Map(products.map(p => [p.id, p]));
  for (const it of imported.filter(x=>x && x.id)) {
    prodMap.set(it.id, it);
  }
  products = Array.from(prodMap.values());

  writeCatalog(categories, products);

  const addedNames = imported.filter(x=>typeof x === 'string');
  console.log(JSON.stringify({ count: imported.filter(x=>x && x.id).length, images: addedNames }, null, 2));
})();
