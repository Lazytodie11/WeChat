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

function collectDImages(ws, wb) {
  const imgs = (typeof ws.getImages === 'function') ? ws.getImages() : [];
  const pools = [ wb?.model?.media || [], wb?._media || [], wb?.media || [] ];
  const findMedia = (imageId) => {
    for (const pool of pools) {
      const hit = pool.find(m => m?.index === imageId || m?.id === imageId);
      if (hit) return hit;
    }
    return null;
  };
  const colDImgs = imgs
    .filter(img => (img?.range?.tl?.nativeCol ?? -1) === 3)
    .sort((a,b)=> (a.range.tl.nativeRow||0) - (b.range.tl.nativeRow||0));
  const out = [];
  for (const img of colDImgs) {
    const media = findMedia(img.imageId);
    if (!media) continue;
    const ext = (media.extension || media.ext || (media.name?.split('.').pop()))?.toLowerCase() || 'png';
    const buffer = media.buffer || media.data || Buffer.from([]);
    out.push({ buffer, ext });
  }
  return out;
}

function parseVariants(text='') {
  const variants = [];
  const s = String(text).replace(/，/g, ' ').replace(/；/g, ' ').replace(/,/g,' ');
  const re = /([^\s\/]+)\s*\/\s*([0-9]+(?:\.[0-9]+)?)/g;
  let m;
  while ((m = re.exec(s))) {
    const size = m[1];
    const price = Number(m[2]);
    if (!Number.isNaN(price)) variants.push({ size, price });
  }
  if (variants.length === 0) {
    // 尝试提取单个价格
    const m2 = s.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (m2) variants.push({ size: '默认', price: Number(m2[1]) });
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
  const dImages = collectDImages(ws, wb);

  const imported = [];
  let lastCat = '';
  const selectedRows = [];
  for (let r = START_ROW; r <= END_ROW; r++) {
    const cellA = ws.getCell(`A${r}`);
    const cat = (cellA && (cellA.text || cellA.value || '')).toString().trim();
    if (cat) lastCat = cat; // 处理合并单元格导致的空白
    if (lastCat !== TARGET_CATEGORY_NAME) continue;
    const name = ws.getCell(`B${r}`).text.trim();
    if (!name) continue; // 跳过无名称的空行
    selectedRows.push(r);
  }

  // Group images per your explicit mapping for rows 2..17
  const groups = [3,2,2,1,1,2,2,2,1];
  let imgIdx = 0;
  for (let i = 0; i < selectedRows.length && i < groups.length; i++) {
    const r = selectedRows[i];
    const take = groups[i];
    const name = ws.getCell(`B${r}`).text.trim();
    const brief = ws.getCell(`C${r}`).text.trim();
    const priceSpec = ws.getCell(`E${r}`).text.trim();
    const slug = slugify(name);
    const variants = parseVariants(priceSpec);
    const price = minPrice(variants);

    let cover = '';
    const images = [];
    for (let k = 0; k < take && imgIdx < dImages.length; k++, imgIdx++) {
      const g = dImages[imgIdx];
      const ext = (g.ext || 'png').toLowerCase();
      const fname = `flavor-milk-cake-${slug}-${k+1}.${ext}`;
      const out = path.join(assetsDir, fname);
      fs.writeFileSync(out, g.buffer);
      const rel = '/assets/' + fname;
      if (!cover) cover = rel;
      images.push(rel);
      imported.push(fname);
    }
    const item = { id: `flavor-milk-cake-${slug}`, categoryId: TARGET_CATEGORY_ID, name, brief, cover, images, price, variants };
    imported.push(item);
  }

  // load existing catalog
  let { categories, products } = loadExistingCatalog();
  // ensure categories include TARGET and keep others
  const mapCat = new Map(categories.map(c => [c.id, c]));
  mapCat.set('flavor-milk-cake', { id: 'flavor-milk-cake', name: '口味奶糕' });
  categories = Array.from(mapCat.values());

  // append/merge products: replace by id if exists
  // drop legacy placeholder item entries
  products = products.filter(p => !(p.categoryId === TARGET_CATEGORY_ID && (!p.name || /-item$/.test(p.id))));
  const prodMap = new Map(products.map(p => [p.id, p]));
  for (const it of imported.filter(x=>x && x.id)) {
    prodMap.set(it.id, it);
  }
  products = Array.from(prodMap.values());

  writeCatalog(categories, products);

  const addedNames = imported.filter(x=>typeof x === 'string');
  console.log(JSON.stringify({ count: imported.filter(x=>x && x.id).length, images: addedNames }, null, 2));
})();
