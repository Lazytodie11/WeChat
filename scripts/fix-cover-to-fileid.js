// Fix products.cover from http(s) URL to cloud fileID
// Requires env: TCB_ENV_ID, TCB_SECRET_ID, TCB_SECRET_KEY, TCB_BUCKET

import dotenv from 'dotenv';
import cloudbase from '@cloudbase/node-sdk';

dotenv.config({ path: '.env.tcb', override: true });
import { buildFileID, CATEGORY_NAME_FROM_ID } from '../src/data-rules.js';

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

function isHttp(url) {
  return /^https?:\/\//i.test(String(url || ''));
}

function isFileID(val) {
  return /^cloud:\/\//i.test(String(val || ''));
}

function lastPathFilename(url) {
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    return decodeURIComponent(last);
  } catch (e) {
    // Fallback: naive split
    const parts = String(url || '').split('?')[0].split('#')[0].split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    try { return decodeURIComponent(last); } catch { return last; }
  }
}

function extractChineseDirFromHttp(url) {
  // Try to extract the directory under /prod-images/<dir>/...
  try {
    const u = new URL(url);
    const parts = u.pathname.split('/').filter(Boolean);
    const idx = parts.findIndex(p => p === 'prod-images');
    if (idx >= 0 && parts[idx + 1]) {
      return decodeURIComponent(parts[idx + 1]);
    }
  } catch (e) {
    // ignore
  }
  return '';
}

async function main() {
  ensureEnv();
  const APPLY = process.argv.includes('--apply') || process.argv.includes('--commit');

  const app = cloudbase.init({
    envId: process.env.TCB_ENV_ID,   // 明确指定环境
    secretId: process.env.TCB_SECRET_ID,
    secretKey: process.env.TCB_SECRET_KEY,
  });

  // 数据库也显式指定一次，双保险
  const db = app.database({ env: process.env.TCB_ENV_ID });
  const _ = db.command;
  const products = db.collection('products');

  const where = { cover: db.RegExp({ regexp: '^https?://', options: 'i' }) };
  const { total } = await products.where(where).count();
  console.log(`[INFO] Records with http cover: ${total}`);

  const pageSize = 100;
  const pages = Math.ceil(total / pageSize);

  const stats = {
    scanned: 0,
    updatedFromImages: 0,
    updatedFromParsed: 0,
    skipped: 0,
    failed: 0,
    failures: [],
  };

  for (let i = 0; i < pages; i++) {
    const { data: docs } = await products.where(where).skip(i * pageSize).limit(pageSize).get();
    for (const doc of docs) {
      stats.scanned++;
      try {
        const imgs = Array.isArray(doc.images) ? doc.images : [];
        const first = imgs[0];
        if (isFileID(first)) {
          if (doc.cover !== first) {
            if (APPLY) {
              await products.doc(doc._id).update({ cover: first });
              console.log(`[OK][APPLY] ${doc._id} cover <- images[0]`);
            } else {
              console.log(`[DRY] ${doc._id} would set cover <- images[0]`);
            }
            stats.updatedFromImages++;
          } else {
            stats.skipped++;
            console.log(`[SKIP] ${doc._id} already matches images[0]`);
          }
          continue;
        }

        // Else: parse from cover URL
        const coverUrl = doc.cover;
        if (!isHttp(coverUrl)) {
          stats.skipped++;
          console.log(`[SKIP] ${doc._id} cover is not http after fetch`);
          continue;
        }

        const fileName = lastPathFilename(coverUrl);
        const catId = String(doc.categoryId || '').trim();
        let catNameCN = CATEGORY_NAME_FROM_ID[catId] || '';

        // Fallback: try extract directory from the http path
        if (!catNameCN) {
          const dir = extractChineseDirFromHttp(coverUrl);
          if (dir) catNameCN = dir;
        }

        if (!fileName || !catNameCN) {
          stats.failed++;
          stats.failures.push({ _id: doc._id, reason: `missing fileName or categoryNameCN`, categoryId: catId, cover: coverUrl });
          console.warn(`[FAIL] ${doc._id} cannot resolve fileID | catId=${catId} catNameCN=${catNameCN} fileName=${fileName}`);
          continue;
        }

        const fid = buildFileID(catNameCN, fileName);
        if (APPLY) {
          await products.doc(doc._id).update({ cover: fid });
          console.log(`[OK][APPLY] ${doc._id} cover <- ${fid}`);
        } else {
          console.log(`[DRY] ${doc._id} would set cover <- ${fid}`);
        }
        stats.updatedFromParsed++;
      } catch (e) {
        stats.failed++;
        stats.failures.push({ _id: doc._id, reason: e.message || String(e) });
        console.error(`[ERR] ${doc._id} ${e.message || e}`);
      }
    }
  }

  console.log('\n[SUMMARY]');
  console.log(`mode=${APPLY ? 'apply' : 'dry-run'}`);
  console.log(`scanned=${stats.scanned}`);
  console.log(`updatedFromImages=${stats.updatedFromImages}`);
  console.log(`updatedFromParsed=${stats.updatedFromParsed}`);
  console.log(`skipped=${stats.skipped}`);
  console.log(`failed=${stats.failed}`);
  if (stats.failures.length) {
    console.log('\n[FAILURES]');
    for (const f of stats.failures) {
      console.log(f);
    }
  }
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});
