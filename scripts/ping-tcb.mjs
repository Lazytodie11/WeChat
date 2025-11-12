// scripts/ping-tcb.mjs
import cloudbase from '@cloudbase/node-sdk';

const trim = (s) => (s || '').trim();
const ENV_ID     = trim(process.env.TCB_ENV || process.env.TCB_ENV_ID || process.env.TCB_ENVID);
const SECRET_ID  = trim(process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID);
const SECRET_KEY = trim(process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY);

console.log('[PING ENV]', { ENV_ID, hasSID: !!SECRET_ID, hasSKEY: !!SECRET_KEY });

if (!ENV_ID || !SECRET_ID || !SECRET_KEY) {
  console.error('[FATAL] 缺少 ENV/SECRET 值'); process.exit(1);
}

let app;
try {
  // 优先：根级写法（很多版本要求这样）
  app = cloudbase.init({
    env: ENV_ID,
    secretId: SECRET_ID,
    secretKey: SECRET_KEY
  });
} catch {
  // 兜底：credentials 写法（个别版本才需要）
  app = cloudbase.init({
    env: ENV_ID,
    credentials: { secretId: SECRET_ID, secretKey: SECRET_KEY }
  });
}

const db = app.database();
try {
  const ret = await db.collection('products').limit(1).get();
  console.log('[PING DB OK]', ret?.data?.[0]?._id || '(no doc)');
} catch (e) {
  console.error('[PING DB FAIL]', e);
  process.exit(1);
}
