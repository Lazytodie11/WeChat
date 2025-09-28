#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { ASSET_BASE_URL } = require('./config.cjs');

const CATALOG = path.resolve(process.cwd(), 'miniprogram', 'data', 'catalog.js');

if (!ASSET_BASE_URL) {
  console.error('[migrate:cdn] ASSET_BASE_URL not set');
}

function loadCatalog() {
  const src = fs.readFileSync(CATALOG, 'utf8');
  const m = { exports: {} };
  const fn = new Function('module', 'exports', src + '\n;return module.exports;');
  return { mod: fn(m, m.exports) || {}, raw: src };
}

function backup() {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, '');
  const bak = path.join(path.dirname(CATALOG), `catalog.bak.${ts}.js`);
  fs.writeFileSync(bak, fs.readFileSync(CATALOG, 'utf8'));
  return bak;
}

function encSeg(s = '') { return encodeURIComponent(String(s)); }
function assetToCdn(u) {
  // expect /assets/<category>/<filename>
  const m = String(u).match(/^\/?assets\/(.+?)\/(.+)$/);
  if (!m) return u; // not an /assets path
  const cat = m[1];
  const file = m[2];
  const base = (ASSET_BASE_URL || '').replace(/\/$/, '');
  if (!base) return u; // leave as is if no base
  return `${base}/prod-images/${encSeg(cat)}/${encSeg(file)}`;
}

function isHttp(s){ return /^https?:\/\//i.test(String(s)); }

function migrate() {
  const { mod } = loadCatalog();
  const categories = Array.isArray(mod.categories) ? mod.categories : [];
  const products = Array.isArray(mod.products) ? mod.products : [];

  let changedProducts = 0;
  const sampleByCat = new Map();
  const httpCount = { images: 0, cover: 0 };

  const next = products.map((p) => {
    const out = { ...p };
    let changed = false;
    const imgs = Array.isArray(p.images) ? [...p.images] : [];
    for (let i = 0; i < imgs.length; i++) {
      const old = imgs[i];
      if (isHttp(old)) { httpCount.images++; continue; }
      if (/^\/assets\//.test(old)) {
        const nu = assetToCdn(old.replace(/^\//, ''));
        if (!sampleByCat.has(p.categoryId)) sampleByCat.set(p.categoryId, { old, nu });
        imgs[i] = nu;
        changed = true;
      }
    }
    out.images = imgs;
    // cover
    const coverOld = p.cover;
    if (isHttp(coverOld)) {
      httpCount.cover++;
    } else if (typeof coverOld === 'string' && /^\/assets\//.test(coverOld)) {
      const nu = assetToCdn(coverOld.replace(/^\//, ''));
      out.cover = nu;
      changed = true;
    }
    // ensure cover === images[0] if images exist
    if (out.images && out.images.length > 0 && out.cover !== out.images[0]) { out.cover = out.images[0]; changed = true; }
    if (changed) changedProducts++;
    return out;
  });

  // Write back (preserve structure)
  const outText = `// 数据源由脚本生成/更新\nconst categories = ${JSON.stringify(categories, null, 2)};\n\nconst products = ${JSON.stringify(next, null, 2)};\n\nmodule.exports = { categories, products };\n`;
  const bak = backup();
  fs.writeFileSync(CATALOG, outText, 'utf8');

  console.log(`[migrate:cdn] backup: ${path.relative(process.cwd(), bak)}`);
  console.log(`[migrate:cdn] products total: ${products.length}, changed: ${changedProducts}`);
  let shown = 0;
  for (const [cat, v] of sampleByCat.entries()) {
    if (shown >= 10) break;
    console.log(` [${cat}] ${v.old} -> ${v.nu}`);
    shown++;
  }
}

migrate();

