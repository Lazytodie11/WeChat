#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const EXCEL = '/Users/yipengli/Desktop/Product Price List1.xlsx';
const OUTDIR = path.join(process.cwd(), 'tmp', 'debug-D-col');

function ensureDir(d){ if(!fs.existsSync(d)) fs.mkdirSync(d,{recursive:true}); }

function overlap(a1,a2,b1,b2){ return Math.max(a1,b1) <= Math.min(a2,b2); }

async function main(){
  ensureDir(OUTDIR);
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(EXCEL);
  const ws = wb.worksheets[0];
  const mediaPools = [wb?.model?.media||[], wb?.media||[], wb?._media||[]];
  const findMedia = (id)=>{ for(const p of mediaPools){ const m=p.find(x=>x?.index===id||x?.id===id); if(m) return m; } return null; };

  const imgs = (typeof ws.getImages==='function')? ws.getImages():[];
  for (const img of imgs){
    const id = img.imageId;
    const m = findMedia(id);
    const tl = img?.range?.tl || {};
    const br = img?.range?.br || tl; // oneCell -> br same as tl
    const offTL = tl?.nativeColOff||0;
    const offTR = tl?.nativeRowOff||0;
    const offBRc = img?.range?.ext?.width||0;
    const offBRr = img?.range?.ext?.height||0;
    const tlCol0 = tl?.nativeCol ?? 0; const tlRow0 = tl?.nativeRow ?? 0;
    const brCol0 = br?.nativeCol ?? tlCol0; const brRow0 = br?.nativeRow ?? tlRow0;
    const tlCol = tlCol0+1, tlRow = tlRow0+1, brCol = brCol0+1, brRow = brRow0+1;
    const colHasD = overlap(tlCol, brCol, 4, 4);
    if (!colHasD) continue;
    const ext = (m?.extension || m?.ext || (m?.name||'').split('.').pop() || 'png').toLowerCase();
    const buf = m?.buffer || m?.data;
    const save = path.join(OUTDIR, `${id}-tl(r${tlRow}c${tlCol})-br(r${brRow}c${brCol}).${ext}`);
    if (buf) fs.writeFileSync(save, buf);
    const line = `#${id} tl(r=${tlRow},c=${tlCol}) br(r=${brRow},c=${brCol}) offTL(${offTR},${offTL}) offBR(${offBRr},${offBRc})`;
    console.log(line + (buf?`  --> saved ${path.relative(process.cwd(), save)}`:' (no-buffer)'));
  }
}

main().catch(e=>{ console.error(e); process.exit(1); });

