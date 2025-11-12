#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const requireCJS = createRequire(import.meta.url);
const { ASSET_BASE_URL, ASSET_SUBDIR, assetUrl, categoryDirName } = requireCJS('./config.cjs');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
const RETARGET = (ARGS.find(a=>a.startsWith('--retarget='))||'').split('=')[1]||'';
const CATALOG = path.resolve(__dirname, '../miniprogram/data/catalog.js');

if (!ASSET_BASE_URL) {
  console.error('[migrate:cdn] ASSET_BASE_URL not set');
}

function loadCatalog() {
  const catalogPath = path.resolve(__dirname, '../miniprogram/data/catalog.js');
  // Evaluate as CJS with a bound require to preserve relative requires
  const src = fs.readFileSync(catalogPath, 'utf8');
  const m = { exports: {} };
  const req = createRequire(catalogPath);
  const fn = new Function('module','exports','require', src + '\n;return module.exports;');
  const mod = fn(m, m.exports, req) || {};
  const categories = mod.categories || [];
  const products = mod.products || [];
  return { categories, products };
}

function backup() {
  const ts = new Date().toISOString().replace(/[-:.TZ]/g, '');
  const bak = path.join(path.dirname(CATALOG), `catalog.bak.${ts}.js`);
  fs.writeFileSync(bak, fs.readFileSync(CATALOG, 'utf8'));
  return bak;
}

function encSeg(s = '') {
  try { return encodeURIComponent(decodeURIComponent(String(s))); } catch(_) { return encodeURIComponent(String(s)); }
}
function escRe(s=''){ return String(s).replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
function assetToCdn(u) {
  // expect /assets/<category>/<filename>
  const m = String(u).match(/^\/?assets\/(.+?)\/(.+)$/);
  if (!m) return u; // not an /assets path
  const cat = m[1];
  const file = m[2];
  const base = (ASSET_BASE_URL || '').replace(/\/$/, '');
  if (!base) return u; // leave as is if no base
  const sub = String(ASSET_SUBDIR||'').replace(/^\/+|\/+$/g,'');
  const mid = sub ? `/${sub}` : '';
  return `${base}${mid}/${encSeg(cat)}/${encSeg(file)}`;
}

function retargetHttp(u){
  if (!FORCE || RETARGET !== 'strip-prod-images') return null;
  const base = (ASSET_BASE_URL || '').replace(/\/$/, ''); if(!base) return null;
  const sub = String(ASSET_SUBDIR||'').replace(/^\/+|\/+$/g,'');
  const mid = sub ? `/${sub}` : '';
  const re = new RegExp('^'+escRe(base+mid)+'/prod-images/([^/]+)/(.+)$');
  const m = String(u).match(re);
  if(!m) return null;
  const cat=m[1], file=m[2];
  return `${base}${mid}/${encSeg(cat)}/${encSeg(file)}`;
}

function filenameFromUrl(u){
  const last = String(u).split('/').pop() || '';
  try { return decodeURIComponent(last); } catch(_) { return last; }
}
function toChineseDir(p, u){
  const file = filenameFromUrl(u);
  return assetUrl(p.categoryId, file);
}

function isHttp(s){ return /^https?:\/\//i.test(String(s)); }

function migrate() {
  const { categories, products } = loadCatalog();

  let changedProducts = 0;
  const sampleByCat = new Map();
  const httpCount = { images: 0, cover: 0 };

  const next = products.map((p) => {
    const out = { ...p };
    let changed = false;
    const imgs = Array.isArray(p.images) ? [...p.images] : [];
    for (let i = 0; i < imgs.length; i++) {
      const old = imgs[i];
      if (RETARGET === 'to-chinese-dir') {
        const nu = toChineseDir(p, old);
        if (!sampleByCat.has(p.categoryId)) sampleByCat.set(p.categoryId, { old, nu });
        imgs[i] = nu; changed = true; continue;
      }
      if (isHttp(old)) {
        const nu = retargetHttp(old);
        if (nu && nu!==old) { imgs[i]=nu; changed=true; }
        else { httpCount.images++; }
        continue;
      }
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
    if (RETARGET === 'to-chinese-dir') {
      out.cover = imgs[0] ? imgs[0] : toChineseDir(p, coverOld);
      changed = true;
    } else if (isHttp(coverOld)) {
      const nu = retargetHttp(coverOld);
      if (nu && nu!==coverOld) { out.cover = nu; changed = true; }
      else httpCount.cover++;
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
  // unmapped categoryIds
  const cats = Array.from(new Set(products.map(p=>p.categoryId)));
  const unknown = cats.filter(id => categoryDirName(id) === id);
  if (unknown.length) console.warn('[warn] unmapped categoryIds:', JSON.stringify(unknown));
  let shown = 0;
  for (const [cat, v] of sampleByCat.entries()) {
    if (shown >= 10) break;
    console.log(` [${cat}] ${v.old} -> ${v.nu}`);
    shown++;
  }
}

migrate();
