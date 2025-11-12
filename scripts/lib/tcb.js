// scripts/lib/tcb.js
import cloudbase from '@cloudbase/node-sdk';

const trim = (s) => (s || '').trim();

const ENV_ID     = trim(process.env.TCB_ENV || process.env.TCB_ENV_ID || process.env.TCB_ENVID);
const SECRET_ID  = trim(process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID);
const SECRET_KEY = trim(process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY);

if (!ENV_ID || !SECRET_ID || !SECRET_KEY) {
  console.error('[TCB INIT] 缺少凭据或环境ID，请确认已加载 .env.tcb', {
    ENV_ID: !!ENV_ID, SECRET_ID: !!SECRET_ID, SECRET_KEY: !!SECRET_KEY
  });
  process.exit(1);
}

const app = cloudbase.init({
  env: ENV_ID,
  credentials: {
    secretId: SECRET_ID,
    secretKey: SECRET_KEY,
  },
});

export const db = app.database();
// 如果以后确实需要存储，再根据你的 SDK 版本补充合适的方法；当前先不导出 storage 以避免报错。
export const appEnv = {
  ENV_ID,
  SECRET_ID: SECRET_ID.slice(0, 6) + '***',
  SECRET_KEY: SECRET_KEY.slice(0, 3) + '***'
};
