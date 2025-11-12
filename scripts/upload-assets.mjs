#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { ASSET_BASE_URL, ASSET_SUBDIR } = require('./config.cjs');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'miniprogram', 'assets');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');

function walk(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (/\.(png|jpe?g|webp|gif)$/i.test(ent.name)) out.push(p);
  }
  return out;
}

function relUnderAssets(abs) {
  const rel = path.relative(SRC, abs).replace(/\\/g, '/');
  return rel; // like 'girls-cake/xxx.jpeg'
}

function urlFor(rel) {
  const relClean = rel.replace(/^\/+/, '');
  if (ASSET_BASE_URL) {
    const base = ASSET_BASE_URL.replace(/\/$/, '');
    const sub = String(ASSET_SUBDIR||'').replace(/^\/+|\/+$/g,'');
    const mid = sub? `/${sub}` : '';
    return `${base}${mid}/${relClean}`;
  }
  return `/assets/${relClean}`;
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('Assets dir not found:', SRC);
    process.exit(1);
  }
  const files = walk(SRC);
  console.log(`[UPLOAD] total files: ${files.length}`);
  for (const abs of files) {
    const rel = relUnderAssets(abs);
    const url = urlFor(rel);
    if (DRY_RUN || !ASSET_BASE_URL) {
      console.log('[DRY]', rel, '->', url);
      continue;
    }
    // Placeholder: implement your actual uploader here.
    // e.g., call COS/OSS SDK or external CLI via child_process.
    // For now we just log.
    console.log('[UPLOAD]', rel, '->', url);
  }
}

main().catch((e)=>{ console.error(e); process.exit(1); });
