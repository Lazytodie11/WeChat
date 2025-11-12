// Audit products data and optionally fix simple issues
// Usage:
// node scripts/audit-products.js [--fix]
// Env: TCB_ENV_ID, TCB_SECRET_ID, TCB_SECRET_KEY, TCB_BUCKET

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });
import minimist from 'minimist';

function ensureEnv() {
  const missing = [];
  if (!process.env.TCB_ENV_ID) missing.push('TCB_ENV_ID');
  if (!process.env.TCB_SECRET_ID) missing.push('TCB_SECRET_ID');
  if (!process.env.TCB_SECRET_KEY) missing.push('TCB_SECRET_KEY');
  if (!process.env.TCB_BUCKET) missing.push('TCB_BUCKET');
  if (missing.length) {
    console.error(`[ERROR] Missing env: ${missing.join(', ')}`);
    process.exit(1);
  }
}

function isFileID(val) {
  return /^cloud:\/\//i.test(String(val || ''));
}

function validateVariants(v) {
  if (!Array.isArray(v)) return false;
  for (const it of v) {
    if (!it || typeof it !== 'object') return false;
    if (typeof it.id !== 'string' || typeof it.name !== 'string') return false;
    if (typeof it.price !== 'number' || Number.isNaN(it.price)) return false;
  }
  return true;
}

function validateOptions(opts) {
  if (opts == null) return true; // optional
  if (!Array.isArray(opts)) return false;
  for (const o of opts) {
    if (!o || typeof o !== 'object') return false;
    if (typeof o.id !== 'string' || typeof o.name !== 'string') return false;
    if (o.type !== 'single' && o.type !== 'multi') return false;
    if (!Array.isArray(o.items)) return false;
    for (const it of o.items) {
      if (!it || typeof it !== 'object') return false;
      if (typeof it.id !== 'string' || typeof it.name !== 'string') return false;
    }
    if (o.type === 'multi') {
      if (typeof o.min !== 'number' || typeof o.max !== 'number') return false;
      if (o.min < 0 || o.max < o.min) return false;
    }
  }
  return true;
}

async function fetchAllCategoryIds(db) {
  const col = db.collection('categories');
  const { total } = await col.count();
  const pageSize = 100;
  const pages = Math.ceil(total / pageSize) || 1;
  const ids = new Set();
  for (let i = 0; i < pages; i++) {
    const { data } = await col.skip(i * pageSize).limit(pageSize).get();
    for (const d of data || []) {
      if (d && typeof d.id === 'string') ids.add(d.id);
      if (d && typeof d._id === 'string') ids.add(d._id);
    }
  }
  return ids;
}

async function verifyFileIDs(app, fileIDs) {
  if (!fileIDs.length) return { ok: [], bad: [] };
  const batchSize = 50; // conservative per request
  const bad = [];
  const ok = [];
  for (let i = 0; i < fileIDs.length; i += batchSize) {
    const slice = fileIDs.slice(i, i + batchSize);
    try {
      const res = await app.getTempFileURL({ fileList: slice });
      const list = (res && (res.fileList || [])) || [];
      for (const item of list) {
        const fid = item.fileID || item.fileId || item.fileid || '';
        const tmp = item.tempFileURL || item.tempUrl || '';
        const code = item.code ?? item.status ?? 0;
        if (fid && tmp && (code === 0 || code === 'SUCCESS')) ok.push(fid);
        else bad.push(fid || '(unknown)');
      }
    } catch (e) {
      // If API fails, mark whole slice as bad
      bad.push(...slice);
    }
  }
  return { ok, bad };
}

async function main() {
  ensureEnv();
  const args = minimist(process.argv.slice(2));
  const doFix = !!args.fix;

  const app = cloudbase.init({
    envId: process.env.TCB_ENV_ID,   // 明确指定环境
    secretId: process.env.TCB_SECRET_ID,
    secretKey: process.env.TCB_SECRET_KEY,
  });

  // 数据库也显式指定一次，双保险
  const db = app.database({ env: process.env.TCB_ENV_ID });
  const products = db.collection('products');
  const { total } = await products.count();
  const pageSize = 100;
  const pages = Math.ceil(total / pageSize) || 1;

  const categoryIds = await fetchAllCategoryIds(db);

  const stats = {
    total,
    imagesEmpty: [],
    imagesNotFileID: [],
    coverEmpty: [],
    coverNotFileID: [],
    coverFixed: 0,
    categoryMissing: [],
    variantsInvalid: [],
    optionsInvalid: [],
    fileIDVerifyBad: [], // { _id, fileIDs: [] }
  };

  for (let i = 0; i < pages; i++) {
    const { data: docs } = await products.skip(i * pageSize).limit(pageSize).get();
    // Map product -> fileIDs to verify
    const perDocFileIDs = new Map();
    const allFileIDs = new Set();

    for (const doc of docs) {
      if (!doc) continue;
      const pid = doc._id;
      const imgs = Array.isArray(doc.images) ? doc.images : [];
      const cover = doc.cover || '';

      if (!imgs.length) stats.imagesEmpty.push(pid);

      // images must be fileIDs
      for (const im of imgs) {
        if (isFileID(im)) allFileIDs.add(im);
        else stats.imagesNotFileID.push({ _id: pid, value: im });
      }

      if (!cover) stats.coverEmpty.push(pid);
      else if (!isFileID(cover)) stats.coverNotFileID.push(pid);
      else allFileIDs.add(cover);

      // Category check
      const cat = String(doc.categoryId || '').trim();
      if (!cat || !categoryIds.has(cat)) stats.categoryMissing.push(pid);

      // Variants/options shape
      if (!validateVariants(doc.variants)) stats.variantsInvalid.push(pid);
      if (!validateOptions(doc.options)) stats.optionsInvalid.push(pid);

      // prepare per doc fileIDs for verification
      const fids = [];
      for (const im of imgs) if (isFileID(im)) fids.push(im);
      if (isFileID(cover)) fids.push(cover);
      perDocFileIDs.set(pid, fids);
    }

    // Verify fileIDs for this page
    const { bad } = await verifyFileIDs(app, Array.from(allFileIDs));
    if (bad.length) {
      // Map back to docs
      const badSet = new Set(bad);
      for (const [pid, fids] of perDocFileIDs.entries()) {
        const failed = fids.filter(f => badSet.has(f));
        if (failed.length) stats.fileIDVerifyBad.push({ _id: pid, fileIDs: failed });
      }
    }

    if (doFix) {
      // Fix: if cover is empty and first image is a fileID, set cover = images[0]
      for (const doc of docs) {
        if (!doc) continue;
        const pid = doc._id;
        const imgs = Array.isArray(doc.images) ? doc.images : [];
        const cover = doc.cover || '';
        if ((!cover || !isFileID(cover)) && imgs.length > 0 && isFileID(imgs[0])) {
          try {
            await products.doc(pid).update({ cover: imgs[0] });
            stats.coverFixed++;
            // Remove from coverEmpty if present
            // Not strictly necessary to mutate stats arrays here
          } catch (e) {
            // ignore update failures in audit mode
          }
        }
      }
    }
  }

  // Print report
  console.log('\n[AUDIT SUMMARY]');
  console.log(`total=${stats.total}`);
  console.log(`imagesEmpty=${stats.imagesEmpty.length}`);
  console.log(`imagesNotFileID=${stats.imagesNotFileID.length}`);
  console.log(`coverEmpty=${stats.coverEmpty.length}`);
  console.log(`coverNotFileID=${stats.coverNotFileID.length}`);
  console.log(`fileIDVerifyBad=${stats.fileIDVerifyBad.length}`);
  console.log(`categoryMissing=${stats.categoryMissing.length}`);
  console.log(`variantsInvalid=${stats.variantsInvalid.length}`);
  console.log(`optionsInvalid=${stats.optionsInvalid.length}`);
  if (doFix) console.log(`coverFixed=${stats.coverFixed}`);

  function dump(label, arr) {
    if (!arr || !arr.length) return;
    console.log(`\n[${label}] count=${arr.length}`);
    for (const it of arr) console.log(it);
  }

  dump('imagesEmpty', stats.imagesEmpty);
  dump('imagesNotFileID', stats.imagesNotFileID);
  dump('coverEmpty', stats.coverEmpty);
  dump('coverNotFileID', stats.coverNotFileID);
  dump('fileIDVerifyBad', stats.fileIDVerifyBad);
  dump('categoryMissing', stats.categoryMissing);
  dump('variantsInvalid', stats.variantsInvalid);
  dump('optionsInvalid', stats.optionsInvalid);
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
