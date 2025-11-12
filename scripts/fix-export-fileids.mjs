// scripts/fix-export-fileids.mjs
import fs from "fs";

// 用法：node scripts/fix-export-fileids.mjs <in.json> <out.json> --category=ty-cake --folder="T.y 堆堆蛋糕系列"
const [, , inFile, outFile, ...argv] = process.argv;

if (!inFile || !outFile) {
  console.error("Usage: node scripts/fix-export-fileids.mjs <in.json> <out.json> --category=ty-cake --folder=\"T.y 堆堆蛋糕系列\"");
  process.exit(1);
}

const args = Object.fromEntries(
  argv
    .filter(s => s.startsWith("--"))
    .map(kv => {
      const [k, ...rest] = kv.replace(/^--/, "").split("=");
      return [k, rest.join("=")];
    })
);

const TARGET_CATEGORY = args.category || "ty-cake";
const FOLDER = args.folder || "T.y 堆堆蛋糕系列";

// 匹配还没有子目录的 fileID：prod-images/<文件名.后缀>（jpg/jpeg/png）
const reNeedsFolder = new RegExp(`(prod-images/)(?!${FOLDER.replace(/\./g, "\\.")}/)([^/]+\\.(?:jpg|jpeg|png))$`, "i");

// 已经正确含有子目录的检测
const reAlreadyHasFolder = new RegExp(`prod-images/${FOLDER.replace(/\./g, "\\.")}/`, "i");

function fixOneFileId(fid) {
  if (typeof fid !== "string") return fid;
  if (reAlreadyHasFolder.test(fid)) return fid;
  if (reNeedsFolder.test(fid)) {
    return fid.replace(reNeedsFolder, `$1${FOLDER}/$2`);
  }
  return fid;
}

function fixOneDoc(doc) {
  if (!doc || doc.categoryId !== TARGET_CATEGORY) return { changed: 0 };

  let changed = 0;

  // cover: string
  if (typeof doc.cover === "string") {
    const next = fixOneFileId(doc.cover);
    if (next !== doc.cover) {
      doc.cover = next;
      changed++;
    }
  }

  // images: string[]
  if (Array.isArray(doc.images)) {
    doc.images = doc.images.map((s) => {
      const next = fixOneFileId(s);
      if (next !== s) changed++;
      return next;
    });
  }

  return { changed };
}

// 兼容两种导出：JSON 数组 或 NDJSON（每行一条）
function loadExport(filePath) {
  const raw = fs.readFileSync(filePath, "utf8").trim();
  try {
    const arr = JSON.parse(raw);
    if (Array.isArray(arr)) return arr;
  } catch (e) {
    // 不是数组，尝试 NDJSON
  }
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const docs = [];
  for (const line of lines) {
    try {
      docs.push(JSON.parse(line));
    } catch (e) {
      console.error("[WARN] skip bad line:", line.slice(0, 120));
    }
  }
  return docs;
}

const docs = loadExport(inFile);
if (!Array.isArray(docs) || docs.length === 0) {
  console.error("No docs loaded from", inFile);
  process.exit(1);
}

let touchedDocs = 0;
let touchedFields = 0;

for (const doc of docs) {
  const { changed } = fixOneDoc(doc);
  if (changed > 0) {
    touchedDocs++;
    touchedFields += changed;
  }
}

// 输出为 JSON 数组（控制台导入支持）
fs.writeFileSync(outFile, JSON.stringify(docs, null, 2), "utf8");

console.log("[DONE]", {
  input: inFile,
  output: outFile,
  category: TARGET_CATEGORY,
  folder: FOLDER,
  docs: docs.length,
  touchedDocs,
  touchedFields,
});
