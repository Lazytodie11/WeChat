// scripts/find-placeholders.mjs
// 列出所有 cover 或 images[*] 仍指向 placeholder.png 的商品（仅打印，不写库）

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database();

// 匹配任何目录下的 placeholder.png（无论 cloud:// 或 https://）
const PLACEHOLDER_RE = /\/placeholder\.png(\?.*)?$/i;

async function* iterAll(col, where = {}, pageSize = 100) {
  let skip = 0;
  while (true) {
    const { data } = await col.where(where).skip(skip).limit(pageSize).get();
    if (!data || data.length === 0) return;
    for (const d of data) yield d;
    skip += data.length;
  }
}

function isPlaceholder(s) {
  return typeof s === 'string' && PLACEHOLDER_RE.test(s);
}

async function run() {
  const argv = process.argv.slice(2);
  // 可选：按某个分类过滤，例如： --category ty-cake
  const categoryFilterArg = argv.find(a => a.startsWith('--category='));
  const categoryId = categoryFilterArg ? categoryFilterArg.split('=')[1] : null;

  const col = db.collection('products');
  const where = categoryId ? { categoryId } : {};

  let total = 0;
  let hitDocs = 0;
  const perCategory = new Map();

  for await (const d of iterAll(col, where)) {
    total++;
    const hits = [];
    if (isPlaceholder(d.cover)) hits.push(['cover', d.cover]);
    if (Array.isArray(d.images)) {
      d.images.forEach((s, i) => {
        if (isPlaceholder(s)) hits.push([`images[${i}]`, s]);
      });
    }

    if (hits.length) {
      hitDocs++;
      const cat = d.categoryId || '(none)';
      perCategory.set(cat, (perCategory.get(cat) || 0) + 1);

      console.log(`\n[PH] ${d._id}  (${cat})  ${d.name || ''}`);
      for (const [slot, val] of hits) {
        console.log(`  - ${slot}: ${val}`);
      }
    }
  }

  console.log('\n===== SUMMARY =====');
  console.log(`scanned: ${total}`);
  console.log(`docs with placeholder: ${hitDocs}`);
  if (perCategory.size) {
    console.log('by category:');
    for (const [cat, n] of perCategory.entries()) {
      console.log(`  - ${cat}: ${n}`);
    }
  }
}

run().catch(err => {
  console.error('[ERROR]', err);
  process.exit(1);
});
