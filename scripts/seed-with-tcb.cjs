#!/usr/bin/env node
const { execSync } = require('child_process');

function hasTCB() {
  try {
    const v = execSync('tcb -v', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return !!v;
  } catch (_) {
    return false;
  }
}

const cats = 'out/db-seed/categories.jsonl';
const prods = 'out/db-seed/products.jsonl';

if (!hasTCB()) {
  console.log('[seed:db] tcb CLI 未检测到。请选择其一：');
  console.log('- 控制台 > 数据库 > 导入 > 选择 JSON 行文件：');
  console.log(`  1) ${cats}`);
  console.log(`  2) ${prods}`);
  console.log('或安装 tcb: npm i -g @cloudbase/cli');
  process.exit(0);
}

console.log('[seed:db] 已检测到 tcb CLI。请执行以下命令导入：');
console.log(`tcb db:import -f ${cats} -c categories`);
console.log(`tcb db:import -f ${prods} -c products`);

