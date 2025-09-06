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
  const dImages = collectDImages(ws, wb);
  // 归一化 D 列图片的行号：以最上面的图片作为 D2，依次递增
  const minNativeRow = Math.min(...dImages.map((_,i)=>{
    // getImages 里无法直接获取 nativeRow，这里重新从 ws.getImages 取一遍有序列表
    return (ws.getImages().filter(im=> (im?.range?.tl?.nativeCol??-1)===3)
      .sort((a,b)=>(a.range.tl.nativeRow||0)-(b.range.tl.nativeRow||0))[i].range.tl.nativeRow)||0;
  }));
  const imgEntries = ws.getImages().filter(im=> (im?.range?.tl?.nativeCol??-1)===3)
    .sort((a,b)=>(a.range.tl.nativeRow||0)-(b.range.tl.nativeRow||0))
    .map((im, idx)=>({ nativeRow: im.range.tl.nativeRow||0, row: 2+idx }));

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

  // 构建一个从“视觉顺序行号(2..)”到图片 buffer 的索引
  const dImagesOrdered = collectDImages(ws, wb); // 与 imgEntries 同序

  for (const map of mapping) {
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

    // 从 D 列有序图片中，截取 row 区间 [start..end]
    const images = [];
    for (let rr = map.start; rr <= map.end; rr++) {
      const idx = rr - 2; // D2 对应 dImagesOrdered[0]
      const g = dImagesOrdered[idx];
      if (!g) continue;
      const ext = (g.ext || 'png').toLowerCase();
      const fname = `flavor-milk-cake-${slug}-${images.length+1}.${ext}`;
      const out = path.join(subDir, fname);
      fs.writeFileSync(out, g.buffer);
      const rel = '/assets/flavor-milk-cake/' + fname;
      images.push(rel);
      imported.push(fname);
    }
    const cover = images[0] || '';
    const item = { id: `flavor-milk-cake-${slug}`, categoryId: TARGET_CATEGORY_ID, name: map.name, brief, cover, images, price, variants };
    imported.push(item);
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
  for (const it of imported.filter(x=>x && x.id)) {
    prodMap.set(it.id, it);
  }
  products = Array.from(prodMap.values());

  writeCatalog(categories, products);

  const addedNames = imported.filter(x=>typeof x === 'string');
  console.log(JSON.stringify({ count: imported.filter(x=>x && x.id).length, images: addedNames }, null, 2));
})();
