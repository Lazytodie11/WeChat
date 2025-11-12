// scripts/peek-by-category.mjs
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';
dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY,
});
const db = app.database({ env: process.env.TCB_ENV_ID });

async function main() {
  const cats = await db.collection('categories').orderBy('sort', 'asc').get();
  console.log('categories:', cats.data.map(c => `${c._id}:${c.name}`).join(' | '));

  for (const c of cats.data) {
    const rs = await db.collection('products')
      .where({ categoryId: c._id })
      .orderBy('sort', 'asc')
      .limit(3).get();

    console.log(`\n== ${c.name} (${c._id}) count≈${rs.data.length} (sample) ==`);
    for (const p of rs.data) {
      console.log('-', p.name, p.cover ? '✅cover' : '❌no-cover', Array.isArray(p.images) ? `images:${p.images.length}` : 'images:0');
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
