// Data rules and helpers for assets and categories

export const CATEGORY_MAP = {
  "口味奶糕": "flavor-milk-cake",
  "女生款蛋糕": "girls-cake",
  "男生款蛋糕": "boys-cake",
  // 兼容两种写法（以云目录为准：T.y …）
  "T·y 堆堆千层系列": "ty-mille",
  "T·y 堆堆蛋糕系列": "ty-cake",
  "T.y 堆堆千层系列": "ty-mille",
  "T.y 堆堆蛋糕系列": "ty-cake",
  "法式千层蛋糕": "french-mille",
  "巴斯克蛋糕": "basque",
  "提拉米苏蛋糕": "tiramisu",
  // 兼容：Ins瑞士卷（云目录无空格）
  "Ins瑞士卷": "ins-roll",
  "4寸蛋糕": "four-inch",
  "8寸蛋糕": "eight-inch",
  "爆浆瀑布蛋糕": "lava-falls",
  "蛋糕配件": "accessories",
};

export const ENV_ID = process.env.TCB_ENV_ID || "";
export const BUCKET = process.env.TCB_BUCKET || "";

export function buildFileID(categoryName, fileName) {
  const env = ENV_ID;
  const bucket = BUCKET;
  return `cloud://${env}.${bucket}/prod-images/${categoryName}/${fileName}`;
}

// Reverse mapping: categoryId (slug/id variants) -> Chinese display name
export const CATEGORY_NAME_FROM_ID = {
  // Primary ids
  "flavor-milk-cake": "口味奶糕",
  "girls-cake": "女生款蛋糕",
  "boys-cake": "男生款蛋糕",
  // 以云目录为准：T.y …
  "ty-mille": "T.y 堆堆千层系列",
  "ty-cake": "T.y 堆堆蛋糕系列",
  "french-mille": "法式千层蛋糕",
  "basque": "巴斯克蛋糕",
  "tiramisu": "提拉米苏蛋糕",
  // 以云目录为准：Ins瑞士卷（无空格）
  "ins-roll": "Ins瑞士卷",
  "four-inch": "4寸蛋糕",
  "eight-inch": "8寸蛋糕",
  "lava-falls": "爆浆瀑布蛋糕",
  "accessories": "蛋糕配件",

  // Known variants used across scripts/data
  "french-mille-cake": "法式千层蛋糕",
  "basque-cake": "巴斯克蛋糕",
  "tiramisu-cake": "提拉米苏蛋糕",
  "cake-4inch": "4寸蛋糕",
  "cake-8inch": "8寸蛋糕",
  "lava-waterfall": "爆浆瀑布蛋糕",
  "cake-accessories": "蛋糕配件",
  "cake-parts": "蛋糕配件",
  "stack-mille": "T.y 堆堆千层系列",
};
