import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';
dotenv.config({ path: '.env.tcb', override: true });

const app = cloudbase.init({
  envId: process.env.TCB_ENV_ID,
  secretId: process.env.TCB_SECRET_ID,
  secretKey: process.env.TCB_SECRET_KEY
});
const db = app.database({ env: process.env.TCB_ENV_ID });

const CATEGORY = 'flavor-milk-cake'; // 口味奶糕

const snapshot = await db.collection('products')
  .where({ categoryId: CATEGORY })
  .orderBy('sort', 'desc')
  .limit(20)
  .get();

console.log('count=', snapshot.data.length);
for (const p of snapshot.data) {
  console.log('\n==', p.name, '==');
  console.log('cover:', p.cover);
  console.log('images:', p.images);
}
