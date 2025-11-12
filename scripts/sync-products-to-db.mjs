// scripts/sync-products-to-db.mjs
// 同步 categories / products 种子数据到云数据库，支持 dry-run
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });

const envId = process.env.TCB_ENV_ID || process.env.TCB_ENV || process.env.TCB_ENVID;
const secretId = process.env.TCB_SECRET_ID || process.env.TENCENTCLOUD_SECRETID;
const secretKey = process.env.TCB_SECRET_KEY || process.env.TENCENTCLOUD_SECRETKEY;

if (!envId || !secretId || !secretKey) {
  console.error('[sync] 缺少 TCB_ENV_ID / TCB_SECRET_ID / TCB_SECRET_KEY，对应值请在 .env.tcb 中配置');
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
const isApply = args.has('--apply') || args.has('-a');
const verbose = args.has('--verbose') || args.has('-v');

const app = cloudbase.init({ envId, env: envId, secretId, secretKey });
const db = app.database({ env: envId });
const _ = db.command;

function readJsonOrJsonl(filePath) {
  const abs = path.join(process.cwd(), filePath);
  const raw = fs.readFileSync(abs, 'utf8').trim();
  if (!raw) return [];
  if (filePath.endsWith('.jsonl')) {
    return raw.split('\n').filter(Boolean).map((line) => JSON.parse(line));
  }
  return JSON.parse(raw);
}

function normalizeDoc(doc) {
  if (!doc || typeof doc !== 'object') return doc;
  const out = {};
  Object.keys(doc).forEach((key) => {
    const val = doc[key];
    if (val === undefined) return;
    if (Array.isArray(val)) {
      out[key] = val.map((item) => normalizeDoc(item));
    } else if (val && typeof val === 'object' && !(val instanceof Date)) {
      out[key] = normalizeDoc(val);
    } else {
      out[key] = val;
    }
  });
  return out;
}

function docEqual(a, b) {
  return JSON.stringify(normalizeDoc(a)) === JSON.stringify(normalizeDoc(b));
}

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

async function fetchRemote(collection, ids) {
  const col = db.collection(collection);
  const result = new Map();
  const chunks = chunk(ids, 100);
  for (const group of chunks) {
    if (!group.length) continue;
    const { data = [] } = await col.where({ _id: _.in(group) }).get();
    data.forEach((doc) => result.set(doc._id, doc));
  }
  return result;
}

async function syncCollection({ collection, file, idKey = '_id' }) {
  const records = readJsonOrJsonl(file);
  if (!Array.isArray(records) || !records.length) {
    console.warn(`[sync] ${collection}: 本地文件 ${file} 未读取到任何记录`);
    return { collection, total: 0, toCreate: [], toUpdate: [] };
  }

  const byId = new Map();
  records.forEach((doc) => {
    const id = doc[idKey];
    if (!id) return;
    byId.set(id, normalizeDoc({ ...doc, _id: id }));
  });

  const ids = Array.from(byId.keys());
  const remoteMap = await fetchRemote(collection, ids);

  const toCreate = [];
  const toUpdate = [];

  ids.forEach((id) => {
    const localDoc = byId.get(id);
    const remoteDoc = remoteMap.get(id);
    if (!remoteDoc) {
      toCreate.push(localDoc);
    } else if (!docEqual(localDoc, remoteDoc)) {
      toUpdate.push({ local: localDoc, remote: remoteDoc });
    }
  });

  if (verbose) {
    console.log(`[sync] ${collection} 检查完成: ` +
      `总计=${ids.length}, 待新增=${toCreate.length}, 待更新=${toUpdate.length}`);
  } else {
    console.log(`[sync] ${collection}: 待新增 ${toCreate.length} 条，待更新 ${toUpdate.length} 条`);
  }

  if (!isApply) {
    if (verbose) {
      if (toCreate.length) {
        console.log(`[dry-run] ${collection} 待新增:`);
        toCreate.forEach((doc) => console.log('  +', doc._id));
      }
      if (toUpdate.length) {
        console.log(`[dry-run] ${collection} 待更新:`);
        toUpdate.forEach(({ local }) => console.log('  ~', local._id));
      }
    }
    return { collection, total: ids.length, toCreate, toUpdate };
  }

  const col = db.collection(collection);
  for (const doc of toCreate) {
    try {
      await col.doc(doc._id).set(doc);
      console.log(`[apply] ${collection} 新增 ${doc._id}`);
    } catch (err) {
      console.error(`[apply] ${collection} 新增失败 ${doc._id}`, err);
    }
  }
  for (const item of toUpdate) {
    const doc = item.local;
    try {
      await col.doc(doc._id).set(doc);
      console.log(`[apply] ${collection} 更新 ${doc._id}`);
    } catch (err) {
      console.error(`[apply] ${collection} 更新失败 ${doc._id}`, err);
    }
  }

  return { collection, total: ids.length, toCreate, toUpdate };
}

async function main() {
  console.log(`[sync] 目标环境: ${envId} (${isApply ? '执行写入' : 'dry-run'})`);
  const results = [];
  results.push(await syncCollection({
    collection: 'categories',
    file: 'out/db-seed/categories.jsonl'
  }));
  results.push(await syncCollection({
    collection: 'products',
    file: 'out/db-seed/products.jsonl'
  }));

  const summary = results.map((res) => {
    return `${res.collection}: 总计${res.total}，新增${res.toCreate.length}，更新${res.toUpdate.length}`;
  }).join(' | ');
  console.log(`[sync] 总结 => ${summary}`);

  if (!isApply) {
    console.log('[sync] 当前为 dry-run，如需执行写入请加上 --apply');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
