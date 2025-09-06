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
const subDir = path.join(assetsDir, 'flavor-milk-cake');
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

function getDImagesWithMeta(ws, wb) {
  const imgs = (typeof ws.getImages === 'function') ? ws.getImages() : [];
  const pools = [ wb?.model?.media || [], wb?.media || [], wb?._media || [] ];
  const findMedia = (id)=>{ for (const p of pools){ const m=p.find(x=>x?.index===id||x?.id===id); if(m) return m; } return null; };
  // Map to metadata including tl/br (1-based) and buffers
  const meta = [];
  for (const im of imgs){
    const m = findMedia(im.imageId);
    const tl = im?.range?.tl || {};
    const br = im?.range?.br || tl; // when oneCell anchor
    const tlC = (tl?.nativeCol ?? 0)+1; const tlR = (tl?.nativeRow ?? 0)+1;
    const brC = (br?.nativeCol ?? (tl?.nativeCol ?? 0))+1; const brR = (br?.nativeRow ?? (tl?.nativeRow ?? 0))+1;
    const ext = (m?.extension || m?.ext || (m?.name||'').split('.').pop() || 'png').toLowerCase();
    const buffer = m?.buffer || m?.data || Buffer.from([]);
    meta.push({ id: im.imageId, tlC, tlR, brC, brR, ext, buffer });
  }
  // Only D-column intersection
  return meta.filter(x => intervalsOverlap(x.tlC, x.brC, 4, 4))
             .sort((a,b)=> a.tlR - b.tlR);
}

function intervalsOverlap(a1,a2,b1,b2){ return Math.max(a1,b1) <= Math.min(a2,b2); }

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
function emptyDirSync(dir){
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir)) {
      fs.rmSync(path.join(dir, f), { recursive: true, force: true });
    }
  } else {
    fs.mkdirSync(dir, { recursive: true });
  }
}

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
  // 清理子目录，避免旧文件残留
  ensureDir(subDir);
  emptyDirSync(subDir);
  const wb = await loadWorkbook(EXCEL_PATH);
  const ws = wb.worksheets[0];
  if (!ws) throw new Error('No first worksheet');
  const dImages = getDImagesWithMeta(ws, wb);

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

  // 映射表：名称与 D 列图片行号区间
  const mapping = [
    { name: '伯牙绝弦', start: 2, end: 4 },
    { name: '海盐奥利奥', start: 5, end: 6 },
    { name: '可可蓝莓', start: 7, end: 8 },
    { name: '梦龙巧克力', start: 9, end: 9 },
    { name: '焦糖玛奇朵', start: 10, end: 10 },
    { name: '开心果奶芙', start: 11, end: 12 },
    { name: '蜜桃红茶', start: 13, end: 14 },
    { name: '芋泥椰香斑斓', start: 15, end: 16 },
    { name: '特调草莓奶糕', start: 17, end: 17 },
  ];

  // 校验与分组：按区间交集取图
  const expectedCounts = [3,2,2,1,1,2,2,2,1];
  const results = [];
  // 自动行偏移：将最小 tlR 对齐到 D2
  const minTlR = dImages.length ? dImages[0].tlR : 0;
  const rowOffset = minTlR ? (minTlR - 2) : 0; // nativeRow = visualRow + rowOffset

  for (let i=0;i<mapping.length;i++){
    const map = mapping[i];
    // 找到对应名称的行（B 列）
    // 在 2..17 范围内按名称匹配一次
    let row = -1;
    for (let r = START_ROW; r <= END_ROW; r++) {
      const nm = (ws.getCell(`B${r}`).text||'').trim();
      if (nm === map.name) { row = r; break; }
    }
    if (row === -1) continue; // 未找到名称则跳过

    const brief = (ws.getCell(`C${row}`).text||'').trim();
    const priceSpec = (ws.getCell(`E${row}`).text||'').trim();
    const variants = parseVariants(priceSpec);
    const price = minPrice(variants);
    const slug = slugify(map.name);

    // 通过交集判断筛图
    const imgsForMap = dImages.filter(im =>
      intervalsOverlap(im.tlR, im.brR, map.start + rowOffset, map.end + rowOffset) &&
      intervalsOverlap(im.tlC, im.brC, 4, 4)
    ).sort((a,b)=>a.tlR-b.tlR);

    // 强校验数量
    const expect = expectedCounts[i];
    if (imgsForMap.length !== expect){
      console.error(`IMAGE_COUNT_MISMATCH name=${map.name} expect=${expect} actual=${imgsForMap.length}`);
      imgsForMap.forEach(x=>console.error(`  img#${x.id} tl(r${x.tlR}c${x.tlC}) br(r${x.brR}c${x.brC})`));
      process.exit(1);
    }

    const images = [];
    imgsForMap.forEach((g, idx)=>{
      const ext = (g.ext || 'png').toLowerCase();
      const fname = `flavor-milk-cake-${slug}-${idx+1}.${ext}`;
      const out = path.join(subDir, fname);
      fs.writeFileSync(out, g.buffer);
      const rel = '/assets/flavor-milk-cake/' + fname;
      images.push(rel);
      imported.push(fname);
    });
    const cover = images[0] || '';
    const item = { id: `flavor-milk-cake-${slug}`, categoryId: TARGET_CATEGORY_ID, name: map.name, brief, cover, images, price, variants };
    results.push(item);
  }

  // load existing catalog
  let { categories, products } = loadExistingCatalog();
  // ensure categories include TARGET and keep others
  const mapCat = new Map(categories.map(c => [c.id, c]));
  mapCat.set('flavor-milk-cake', { id: 'flavor-milk-cake', name: '口味奶糕' });
  categories = Array.from(mapCat.values());

  // append/merge products: replace by id if exists
  // 清理旧的 flavor-milk-cake 图片路径与占位条目（尽量保留其它类）
  products = products.filter(p => !(p.categoryId === TARGET_CATEGORY_ID && (!p.name || /-item$/.test(p.id))));
  const prodMap = new Map(products.map(p => [p.id, p]));
  for (const it of results) { prodMap.set(it.id, it); }
  products = Array.from(prodMap.values());

  writeCatalog(categories, products);

  const addedNames = imported.filter(x=>typeof x === 'string');
  console.log(JSON.stringify({ count: results.length, imageFiles: addedNames }, null, 2));
})();
