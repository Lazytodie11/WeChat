// scripts/import-products-from-excel.js
// 将 Excel 商品批量写入云开发数据库（TCB）
//
// 用法：
// node scripts/import-products-from-excel.js \
//   --excel "data/Products_name.xlsx:all" \
//   --excel "data/cake_name3.xlsx:2-9,11-28,30-39,41-63,65-73,75-80,82-98,100-107,109-134,136-156,158-162"
//
// 环境变量（.env.tcb）：TCB_ENV_ID, TCB_SECRET_ID, TCB_SECRET_KEY, TCB_BUCKET
// 图片将按 cloud://<ENV>.<BUCKET>/prod-images/<中文分类目录>/<文件名> 生成 FileID

import * as XLSXmod from 'xlsx/xlsx.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import minimist from 'minimist';
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

const XLSX = XLSXmod.default || XLSXmod;

// 加载环境变量
dotenv.config({ path: '.env.tcb', override: true });

// 初始化 CloudBase
const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });

// ===== 分类映射：中文分类名 -> { id(写DB), dir(存储中文目录) } =====
// ⚠️ dir 必须和你存储里“prod-images/*”的中文目录一致
const CATEGORY_MAP = {
  '口味奶糕':        { id: 'flavor-milk-cake', dir: '口味奶糕' },
  '女生款蛋糕':      { id: 'girls-cake',       dir: '女生款蛋糕' },
  '男生款蛋糕':      { id: 'boys-cake',        dir: '男生款蛋糕' },
  // 以云存储实际目录为准（中间点为英文句点 .，Ins 无空格）
  'T·y堆堆千层系列': { id: 'ty-mille',         dir: 'T.y 堆堆千层系列' },
  'T·y堆堆蛋糕系列': { id: 'ty-cake',          dir: 'T.y 堆堆蛋糕系列' },
  '法式千层蛋糕':    { id: 'french-mille',     dir: '法式千层蛋糕' },
  '巴斯克蛋糕':      { id: 'basque',           dir: '巴斯克蛋糕' },
  '提拉米苏蛋糕':    { id: 'tiramisu',         dir: '提拉米苏蛋糕' },
  'Ins瑞士卷':       { id: 'ins-roll',         dir: 'Ins瑞士卷' },
  '蛋糕配件':        { id: 'accessories',      dir: '蛋糕配件' },
  '4寸蛋糕':         { id: 'four-inch',        dir: '4寸蛋糕' },
  '8寸蛋糕':         { id: 'eight-inch',       dir: '8寸蛋糕' },
  '爆浆瀑布蛋糕':    { id: 'lava-falls',       dir: '爆浆瀑布蛋糕' }
};

// 若缺图，用占位图 FileID 顶上（可在存储建：prod-images/common/placeholder.png）
const PLACEHOLDER = `cloud://${process.env.TCB_ENV_ID}.${process.env.TCB_BUCKET}/prod-images/common/placeholder.png`;

// ========== 小工具 ==========

// 统一：强制用 Buffer 读取工作簿（避免 xlsx 内部 readFileSync）
async function readWorkbook(p) {
  const abs = path.resolve(p);
  const buf = await fs.readFile(abs);
  return XLSX.read(buf, { type: 'buffer' });
}

function parseExcelArgs(argv) {
  const specs = Array.isArray(argv.excel) ? argv.excel : [argv.excel].filter(Boolean);
  const tasks = [];
  for (const spec of specs) {
    const i = spec.indexOf(':');
    const file = (i >= 0 ? spec.slice(0, i) : spec).trim();
    const ranges = (i >= 0 ? spec.slice(i + 1) : 'all').trim(); // 无冒号默认 all
    if (file) tasks.push({ file, ranges });
  }
  return tasks;
}

// "2-17,19-96" -> Set(2..17,19..96)；"all" -> null（代表全取）
function buildAllowedSet(ranges, maxRow) {
  if (!ranges || ranges.toLowerCase() === 'all') return null;
  const set = new Set();
  ranges.split(',').map(s => s.trim()).filter(Boolean).forEach(seg => {
    const m = seg.match(/^(\d+)-(\d+)$/);
    if (m) {
      let a = Number(m[1]), b = Number(m[2]);
      if (a > b) [a, b] = [b, a];
      for (let i = a; i <= b; i++) if (i >= 2 && i <= maxRow) set.add(i);
    } else if (/^\d+$/.test(seg)) {
      const n = Number(seg);
      if (n >= 2 && n <= maxRow) set.add(n);
    }
  });
  return set;
}

// 取文件名（支持网站托管 https 链接；忽略 "=DISPIMG(...)" 公式）
function filenameFromUrl(s = '') {
  if (!s) return '';
  if (/^=DISPIMG/i.test(s)) return '';
  try {
    if (s.startsWith('http')) {
      const u = new URL(s);
      const base = decodeURIComponent(u.pathname.split('/').pop() || '');
      return base.trim();
    }
  } catch {}
  return String(s).trim();
}

const buildFileID = (dir, fname) =>
  `cloud://${process.env.TCB_ENV_ID}.${process.env.TCB_BUCKET}/prod-images/${dir}/${fname}`;

// “4寸/39.9  6寸/79.9  8寸/159.9” -> variants[]；或单价“69.9”
function parseVariants(s = '') {
  const variants = [];
  const str = String(s).replace(/\s+/g, ' ').trim();
  const pairRe = /(\d+)\s*寸\s*\/\s*([0-9.]+)/g;
  let m;
  while ((m = pairRe.exec(str))) {
    const size = `${m[1]}寸`;
    variants.push({ id: `${m[1]}inch`, name: size, price: Number(m[2]) });
  }
  if (!variants.length && str) {
    const p = Number(str);
    if (!Number.isNaN(p)) variants.push({ id: 'default', name: '默认', price: p });
  }
  return variants;
}

const slug = s => String(s).trim()
  .replace(/[^\p{L}\p{N}]+/gu, '-')
  .replace(/^-+|-+$/g, '')
  .toLowerCase();

function* iterRows(sheet) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 'A', defval: '' });
  for (let i = 2; i <= rows.length; i++) { // 从第 2 行开始（第 1 行是表头）
    const r = rows[i - 1] || {};
    yield {
      idx: i,
      A: String(r.A || '').trim(), // 分类（分段第一行写，后续空行继承）
      B: String(r.B || '').trim(), // 名称（若空且有 D=图片 → 续图）
      C: String(r.C || '').trim(), // 简述 / 规格提示
      D: String(r.D || '').trim(), // 图片（https 或 文件名；可能有 DISPIMG 公式）
      E: String(r.E || '').trim()  // 价格（规格/价格对 或 单价）
    };
  }
}

// 给特定类目注入 options（符合前端 key/title/type/min/max/items）
function applyOptionsByCategory(doc) {
  if (doc.categoryId === 'ins-roll') {
    doc.options = [{
      key: 'flavor', title: '口味', type: 'single', min: 0, max: 1,
      items: [
        { id:'choco-crisp',name:'巧克力脆皮瑞士卷' }, { id:'red-velvet',name:'红丝绒瑞士卷' },
        { id:'matcha-black',name:'黑金抹茶瑞士卷' }, { id:'biscoff',name:'焦糖饼干瑞士卷' },
        { id:'original',name:'原味瑞士卷' },       { id:'pistachio-duo',name:'双重开心果瑞士卷' },
        { id:'taro',name:'香芋瑞士卷' },           { id:'taro-mango',name:'夹心芋泥➕芒果' },
        { id:'pandan-coconut',name:'斑斓椰子瑞士卷' }, { id:'earl-grey',name:'伯爵红茶瑞士' }
      ]
    }];
  }
  if (doc.categoryId === 'four-inch' || doc.categoryId === 'eight-inch') {
    doc.options = [{
      key: 'filling', title: '蛋糕夹心', type: 'multi', min: 1, max: 2,
      items: [
        {id:'oreo-set',name:'奥利奥三件套'}, {id:'coco-panna',name:'椰奶冻子'},
        {id:'plain-panna',name:'原味奶冻'}, {id:'matcha-panna',name:'抹茶奶冻'},
        {id:'earlgrey-panna',name:'伯爵红茶奶冻'}, {id:'grape-panna',name:'葡萄奶冻'},
        {id:'taro-panna',name:'芋泥奶冻'}, {id:'taro-homemade',name:'自制芋泥'},
        {id:'mochi',name:'麻薯'}, {id:'black-glutinous',name:'血糯米'},
        {id:'coconut-white-choc',name:'椰蓉白巧'}, {id:'choco-mousse',name:'巧克力慕斯'},
        {id:'raspberry-mousse',name:'树莓慕斯'}, {id:'pistachio-mousse',name:'开心果慕斯'},
        {id:'mango-strawberry',name:'芒果草莓'}, {id:'blueberry-fresh',name:'蓝莓and新鲜蓝莓酱'},
        {id:'grape-green-red',name:'青提/红提'}, {id:'melon',name:'网纹瓜 /蜜瓜'},
        {id:'canned-peach',name:'黄桃罐头'}, {id:'banana-choco',name:'香蕉巧克力'}
      ]
    }];
  }
  return doc;
}

// 从一个工作表构建 docs（支持“续图行”与行号过滤）
async function importSheet(wb, sheetName, sourceTag, allowedSet = null) {
  const sh = wb.Sheets[sheetName];
  if (!sh) return [];

  let currentCatCN = '';
  const docs = [];
  let last = null; // 上一条商品（用于续图）

  for (const r of iterRows(sh)) {
    if (allowedSet && !allowedSet.has(r.idx)) continue;

    if (r.A) currentCatCN = r.A;
    if (!currentCatCN) continue;
    const m = CATEGORY_MAP[currentCatCN];
    if (!m) continue; // 未映射分类：跳过（可按需加日志）

    const fname = filenameFromUrl(r.D);

    if (r.B) {
      // 新商品
      const variants = parseVariants(r.E);
      const price = variants[0]?.price ?? 0;
      const images = [];
      if (fname) images.push(buildFileID(m.dir, fname));

      last = {
        _id: `${m.id}-${slug(r.B)}`,
        categoryId: m.id,
        name: r.B,
        brief: r.C || '',
        price,
        variants,
        images,
        cover: images[0] || PLACEHOLDER,
        sort: 100000 - r.idx, // 越靠前行号越小，可按需调整
        status: 1,
        options: [],
        _source: sourceTag
      };
      docs.push(last);
    } else if (!r.B && fname && last) {
      // 续图行：把这张图追加到上一条
      last.images.push(buildFileID(m.dir, fname));
      if (!last.cover) last.cover = last.images[0];
    }
  }
  return docs;
}

// 写库：剔除 _id 再写，避免“不能更新_id”
async function upsertProducts(docs) {
  const col = db.collection('products');
  let ok = 0, fail = 0;

  for (const d of docs) {
    const { _id, _source, ...rest } = d;
    try {
      await col.doc(_id).set(rest);     // 不带 _id
      ok++;
    } catch (e) {
      try {
        await col.doc(_id).update(rest); // 兜底
        ok++;
      } catch (e2) {
        console.error('[UPSERT FAIL]', _id, e2?.message || e2);
        fail++;
      }
    }
  }
  console.log(`[SUMMARY] ok=${ok} failed=${fail}`);
}

// 主流程
async function main() {
  const argv = minimist(process.argv.slice(2));
  const tasks = parseExcelArgs(argv);
  if (!tasks.length) {
    console.error('[ERROR] No --excel');
    return;
  }

  const allDocs = [];

  for (const t of tasks) {
    const wb = await readWorkbook(t.file);

    // Sheet: Product Price List
    if (wb.SheetNames.includes('Product Price List')) {
      const rowsLen = XLSX.utils.sheet_to_json(
        wb.Sheets['Product Price List'], { header: 'A', defval: '' }
      ).length;
      const allow = buildAllowedSet(t.ranges, rowsLen);
      const docs = await importSheet(wb, 'Product Price List', path.basename(t.file), allow);
      for (const d of docs) allDocs.push(applyOptionsByCategory(d));
    }

    // Sheet: Sheet1
    if (wb.SheetNames.includes('Sheet1')) {
      const rowsLen = XLSX.utils.sheet_to_json(
        wb.Sheets['Sheet1'], { header: 'A', defval: '' }
      ).length;
      const allow = buildAllowedSet(t.ranges, rowsLen);
      const docs = await importSheet(wb, 'Sheet1', path.basename(t.file), allow);
      for (const d of docs) allDocs.push(applyOptionsByCategory(d));
    }
  }

  console.log(`[BUILD] ready to upsert ${allDocs.length} docs`);
  await upsertProducts(allDocs);
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
