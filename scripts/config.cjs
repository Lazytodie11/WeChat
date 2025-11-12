// CDN/Asset base URL configuration
// Use environment variable ASSET_BASE_URL first, fall back to empty string.
const ASSET_BASE_URL = process.env.ASSET_BASE_URL || '';
const ASSET_SUBDIR   = process.env.ASSET_SUBDIR   || '';

// 英文分类 id → 已在云端的中文目录名（文件夹名称）
const CATEGORY_DIR_MAP = {
  "flavor-milk-cake": "口味奶糕",
  "girls-cake": "女生款蛋糕",
  "boys-cake": "男生款蛋糕",
  "ty-stack-mille": "T.y堆堆千层系列",
  "stack-mille": "T.y堆堆千层系列",
  "ty-stack-cake": "T.y堆堆蛋糕系列",
  "french-mille-cake": "法式千层蛋糕",
  "basque-cake": "巴斯克蛋糕",
  "tiramisu-cake": "提拉米苏蛋糕",
  "ins-swiss-roll": "Ins瑞士卷",
  "cake-accessories": "蛋糕配件",
  "four-inch-cake": "4寸蛋糕",
  "eight-inch-cake": "8寸蛋糕",
  "lava-falls-cake": "爆浆瀑布蛋糕",
  // 基础/公共占位
  "common": "common"
};

function encodeSeg(s) { return encodeURIComponent(String(s)); }
function prefix() { return ASSET_SUBDIR ? `${ASSET_BASE_URL}/${ASSET_SUBDIR}` : `${ASSET_BASE_URL}`; }
function categoryDirName(catId) { return CATEGORY_DIR_MAP[catId] || catId; }

// 统一的 URL 生成：按“中文目录/文件名”输出
function assetUrl(catId, filename) {
  const dir = categoryDirName(catId);
  return `${prefix()}/${encodeSeg(dir)}/${encodeSeg(filename)}`;
}

module.exports = { ASSET_BASE_URL, ASSET_SUBDIR, CATEGORY_DIR_MAP, categoryDirName, assetUrl };
