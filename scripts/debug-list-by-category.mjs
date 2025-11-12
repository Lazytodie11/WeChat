// scripts/debug-list-by-category.mjs
import dotenv from 'dotenv';
dotenv.config({ path: '.env.tcb', override: true });
import cloudbase from '@cloudbase/node-sdk';

const categoryId = process.argv[2];
if (!categoryId) {
  console.error('用法: node scripts/debug-list-by-category.mjs <categoryId>');
  process.exit(1);
}

function reqEnv(name){
  const v = process.env[name];
  if(!v) throw new Error(`Missing env: ${name} (check .env.tcb)`);
  return v;
}

const app = cloudbase.init({
  envId: reqEnv('TCB_ENV_ID'),
  env: reqEnv('TCB_ENV_ID'),
  secretId: reqEnv('TCB_SECRET_ID'),
  secretKey: reqEnv('TCB_SECRET_KEY'),
});
const db = app.database({ env: reqEnv('TCB_ENV_ID') });
const _ = db.command;

async function main() {
  let skip = 0;
  const limit = 100;
  let all = [];
  // 拉全量（最多几百条足够）
  while (true) {
    const { data } = await db.collection('products')
      .where({ categoryId })
      .orderBy('sort', 'desc')
      .skip(skip)
      .limit(limit)
      .get();
    all = all.concat(data);
    if (data.length < limit) break;
    skip += limit;
  }

  console.log(`[DEBUG] categoryId=${categoryId} count=${all.length}`);
  all.forEach(d => {
    const imgLen = Array.isArray(d.images) ? d.images.length : 0;
    console.log(`- ${d._id} | ${d.name} | images:${imgLen} | cover:${d.cover ? '✓' : '×'}`);
  });
}
main().catch(e => {
  console.error(e);
  process.exit(1);
});
