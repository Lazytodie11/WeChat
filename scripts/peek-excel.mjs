// scripts/peek-excel.mjs
import * as XLSXmod from 'xlsx/xlsx.mjs';
import fs from 'node:fs/promises';
const XLSX = XLSXmod.default || XLSXmod;

async function readWorkbook(p) {
  // 强制走 Buffer，规避 readFileSync/权限问题
  const buf = await fs.readFile(p);
  return XLSX.read(buf, { type: 'buffer' });
}

async function peek(file) {
  const wb = await readWorkbook(file);
  console.log('\n===', file, '===');
  console.log('Sheets:', wb.SheetNames);
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 'A', defval: '' });
  console.log('First 12 rows (A-E):');
  for (let i = 0; i < Math.min(12, rows.length); i++) {
    const r = rows[i];
    console.log(String(i + 1).padStart(3, ' '), { A: r.A, B: r.B, C: r.C, D: r.D, E: r.E });
  }
}

await peek("data/Products_name.xlsx");
await peek("data/cake_name3.xlsx");
