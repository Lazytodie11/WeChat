// 数据源由脚本生成/更新
const categories = [
  {
    "id": "flavor-milk-cake",
    "name": "口味奶糕"
  },
  {
    "id": "girls-cake",
    "name": "女生款蛋糕"
  }
];

const products = [
  {
    "id": "flavor-milk-cake-伯牙绝弦",
    "categoryId": "flavor-milk-cake",
    "name": "伯牙绝弦",
    "brief": "可做4/6/8寸",
    "cover": "",
    "price": 39.9,
    "variants": [
      {
        "size": "4寸",
        "price": 39.9
      },
      {
        "size": "6寸",
        "price": 79.9
      },
      {
        "size": "8寸",
        "price": 159.9
      }
    ]
  }
];

module.exports = { categories, products };
