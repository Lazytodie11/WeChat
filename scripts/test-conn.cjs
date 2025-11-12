// scripts/test-conn.cjs
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const envPath = fs.existsSync(path.resolve(__dirname, '..', '.env.tcb'))
  ? path.resolve(__dirname, '..', '.env.tcb')
  : path.resolve(process.cwd(), '.env.tcb');
dotenv.config({ path: envPath, override: true });

const cloudbase = require('@cloudbase/node-sdk');

function reqEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

const ENV_ID = reqEnv('TCB_ENV_ID');
const SECRET_ID = reqEnv('TCB_SECRET_ID');
const SECRET_KEY = reqEnv('TCB_SECRET_KEY');
const BUCKET = reqEnv('TCB_BUCKET');

// ⭐ 同时传 envId 和 env（兼容不同版本）
const app = cloudbase.init({
  envId: ENV_ID,
  env: ENV_ID,
  secretId: SECRET_ID,
  secretKey: SECRET_KEY,
});

(async () => {
  try {
    // ⭐ 再次在数据库层显式指定环境，双保险
    const db = app.database({ env: ENV_ID });

    const cat = await db.collection('categories').limit(1).get();
    console.log('DB ok:', cat.data);

    const fileID = `cloud://${ENV_ID}.${BUCKET}/prod-images/4寸蛋糕/WechatIMG150.jpg`; // 换成确实存在的一张
    const { fileList } = await app.getTempFileURL({ fileList: [fileID] });
    console.log('File URL ok:', fileList[0]);
  } catch (e) {
    console.error('TEST FAIL:', e);
  }
})();
