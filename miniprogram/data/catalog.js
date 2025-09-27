// 数据源由脚本生成/更新
const categories = [
  {
    "id": "flavor-milk-cake",
    "name": "口味奶糕"
  },
  {
    "id": "girls-cake",
    "name": "女生款蛋糕"
  },
  {
    "id": "stack-mille",
    "name": "T·y堆堆千层系列"
  }
];

const products = [
  {
    "id": "flavor-milk-cake-伯牙绝弦",
    "categoryId": "flavor-milk-cake",
    "name": "伯牙绝弦",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-伯牙绝弦-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-伯牙绝弦-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-伯牙绝弦-2.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-伯牙绝弦-3.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-海盐奥利奥",
    "categoryId": "flavor-milk-cake",
    "name": "海盐奥利奥",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-海盐奥利奥-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-海盐奥利奥-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-海盐奥利奥-2.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-可可蓝莓",
    "categoryId": "flavor-milk-cake",
    "name": "可可蓝莓",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-可可蓝莓-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-可可蓝莓-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-可可蓝莓-2.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-梦龙巧克力",
    "categoryId": "flavor-milk-cake",
    "name": "梦龙巧克力",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-梦龙巧克力-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-梦龙巧克力-1.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-焦糖玛奇朵",
    "categoryId": "flavor-milk-cake",
    "name": "焦糖玛奇朵",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-焦糖玛奇朵-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-焦糖玛奇朵-1.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-开心果奶芙",
    "categoryId": "flavor-milk-cake",
    "name": "开心果奶芙",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-开心果奶芙-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-开心果奶芙-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-开心果奶芙-2.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-蜜桃红茶",
    "categoryId": "flavor-milk-cake",
    "name": "蜜桃红茶",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-蜜桃红茶-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-蜜桃红茶-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-蜜桃红茶-2.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-芋泥椰香斑斓",
    "categoryId": "flavor-milk-cake",
    "name": "芋泥椰香斑斓",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-芋泥椰香斑斓-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-芋泥椰香斑斓-1.jpg",
      "/assets/flavor-milk-cake/flavor-milk-cake-芋泥椰香斑斓-2.jpg"
    ],
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
  },
  {
    "id": "flavor-milk-cake-特调草莓奶糕",
    "categoryId": "flavor-milk-cake",
    "name": "特调草莓奶糕",
    "brief": "可做4/6/8寸",
    "cover": "/assets/flavor-milk-cake/flavor-milk-cake-特调草莓奶糕-1.jpg",
    "images": [
      "/assets/flavor-milk-cake/flavor-milk-cake-特调草莓奶糕-1.jpg"
    ],
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
  },
  {
    "id": "girls-cake-草莓蛋糕2025",
    "categoryId": "girls-cake",
    "name": "草莓蛋糕2025",
    "brief": "6寸草莓蛋糕2025",
    "images": [
      "/assets/girls-cake/girls-cake-草莓蛋糕2025-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-草莓蛋糕2025-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-郁金香蛋糕",
    "categoryId": "girls-cake",
    "name": "郁金香蛋糕",
    "brief": "4寸加高郁金香蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-郁金香蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-郁金香蛋糕-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "纪念日蛋糕",
    "brief": "6寸纪念日蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-纪念日蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-纪念日蛋糕-1.jpg",
    "price": 58,
    "variants": [
      {
        "size": "默认",
        "price": 58
      }
    ]
  },
  {
    "id": "girls-cake-简约巧克力爱心蛋糕",
    "categoryId": "girls-cake",
    "name": "简约巧克力爱心蛋糕",
    "brief": "6寸简约巧克力爱心蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-简约巧克力爱心蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约巧克力爱心蛋糕-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-4-2淋面丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "4➕2淋面丝带蛋糕",
    "brief": "4➕2淋面丝带蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-4-2淋面丝带蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-4-2淋面丝带蛋糕-1.jpg",
    "price": 78,
    "variants": [
      {
        "size": "默认",
        "price": 78
      }
    ]
  },
  {
    "id": "girls-cake-高脚杯蛋糕",
    "categoryId": "girls-cake",
    "name": "高脚杯蛋糕",
    "brief": "6寸高脚杯蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-高脚杯蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-高脚杯蛋糕-1.jpg",
    "price": 88,
    "variants": [
      {
        "size": "默认",
        "price": 88
      }
    ]
  },
  {
    "id": "girls-cake-简约水果款",
    "categoryId": "girls-cake",
    "name": "简约水果款",
    "brief": "6寸简约水果款",
    "images": [
      "/assets/girls-cake/girls-cake-简约水果款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约水果款-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-仿真白色郁金香蛋糕",
    "categoryId": "girls-cake",
    "name": "仿真白色郁金香蛋糕",
    "brief": "6寸仿真白色郁金香蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-仿真白色郁金香蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-仿真白色郁金香蛋糕-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-ins风鱼尾纱丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "ins风鱼尾纱丝带蛋糕",
    "brief": "6寸ins风鱼尾纱丝带蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-ins风鱼尾纱丝带蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-ins风鱼尾纱丝带蛋糕-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-日历纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "日历纪念日蛋糕",
    "brief": "6寸 日历纪念日蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-日历纪念日蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-日历纪念日蛋糕-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-抱抱熊蛋糕-手绘小熊款",
    "categoryId": "girls-cake",
    "name": "抱抱熊蛋糕(手绘小熊款)",
    "brief": "6寸抱抱熊蛋糕（手绘小熊款）",
    "images": [
      "/assets/girls-cake/girls-cake-抱抱熊蛋糕-手绘小熊款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-抱抱熊蛋糕-手绘小熊款-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-简约裱花黑丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "简约裱花黑丝带蛋糕",
    "brief": "6寸简约裱花黑丝带蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-简约裱花黑丝带蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约裱花黑丝带蛋糕-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-翻糖糖牌爱心",
    "categoryId": "girls-cake",
    "name": "翻糖糖牌爱心",
    "brief": "6寸翻糖糖牌爱心",
    "images": [
      "/assets/girls-cake/girls-cake-翻糖糖牌爱心-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-翻糖糖牌爱心-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-应季水果巧克力淋面",
    "categoryId": "girls-cake",
    "name": "应季水果巧克力淋面",
    "brief": "6寸应季水果巧克力淋面",
    "images": [
      "/assets/girls-cake/girls-cake-应季水果巧克力淋面-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-应季水果巧克力淋面-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-海盐奥利奥-公主请发财",
    "categoryId": "girls-cake",
    "name": "海盐奥利奥 公主请发财",
    "brief": "6寸海盐奥利奥 公主请发财",
    "images": [
      "/assets/girls-cake/girls-cake-海盐奥利奥-公主请发财-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-海盐奥利奥-公主请发财-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-恶搞便便-可可口味",
    "categoryId": "girls-cake",
    "name": "恶搞便便 可可口味",
    "brief": "6寸 恶搞便便 可可口味",
    "images": [
      "/assets/girls-cake/girls-cake-恶搞便便-可可口味-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-恶搞便便-可可口味-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-蓝色笑脸",
    "categoryId": "girls-cake",
    "name": "蓝色笑脸",
    "brief": "6寸蓝色笑脸",
    "images": [
      "/assets/girls-cake/girls-cake-蓝色笑脸-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-蓝色笑脸-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-二次元破壳纪念",
    "categoryId": "girls-cake",
    "name": "二次元破壳纪念",
    "brief": "6寸二次元破壳纪念",
    "images": [
      "/assets/girls-cake/girls-cake-二次元破壳纪念-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-二次元破壳纪念-1.jpg",
    "price": 96,
    "variants": [
      {
        "size": "默认",
        "price": 96
      }
    ]
  },
  {
    "id": "girls-cake-破壳纪念",
    "categoryId": "girls-cake",
    "name": "破壳纪念",
    "brief": "6寸破壳纪念",
    "images": [
      "/assets/girls-cake/girls-cake-破壳纪念-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-破壳纪念-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-暗黑雏菊-可改字",
    "categoryId": "girls-cake",
    "name": "暗黑雏菊(可改字)",
    "brief": "6寸暗黑雏菊（可改字）",
    "images": [
      "/assets/girls-cake/girls-cake-暗黑雏菊-可改字-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-暗黑雏菊-可改字-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-简约happy",
    "categoryId": "girls-cake",
    "name": "简约happy",
    "brief": "6寸 简约happy",
    "images": [
      "/assets/girls-cake/girls-cake-简约happy-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约happy-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-简约裱花款",
    "categoryId": "girls-cake",
    "name": "简约裱花款",
    "brief": "6寸简约裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-简约裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约裱花款-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-手绘小动物情侣款",
    "categoryId": "girls-cake",
    "name": "手绘小动物情侣款",
    "brief": "6寸手绘小动物情侣款",
    "images": [
      "/assets/girls-cake/girls-cake-手绘小动物情侣款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-手绘小动物情侣款-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-半圆小动物情侣款",
    "categoryId": "girls-cake",
    "name": "半圆小动物情侣款",
    "brief": "6寸半圆小动物情侣款",
    "images": [
      "/assets/girls-cake/girls-cake-半圆小动物情侣款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-半圆小动物情侣款-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-玫红色简约写字款",
    "categoryId": "girls-cake",
    "name": "玫红色简约写字款",
    "brief": "6寸玫红色简约写字款",
    "images": [
      "/assets/girls-cake/girls-cake-玫红色简约写字款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-玫红色简约写字款-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-简约风裱花款",
    "categoryId": "girls-cake",
    "name": "简约风裱花款",
    "brief": "6寸简约风裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-简约风裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约风裱花款-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-三十-鹅-立",
    "categoryId": "girls-cake",
    "name": "三十\"鹅\"立",
    "brief": "6寸三十\"鹅\"立",
    "images": [
      "/assets/girls-cake/girls-cake-三十-鹅-立-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-三十-鹅-立-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-简约星之卡比",
    "categoryId": "girls-cake",
    "name": "简约星之卡比",
    "brief": "6寸 简约星之卡比",
    "images": [
      "/assets/girls-cake/girls-cake-简约星之卡比-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约星之卡比-1.jpg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "girls-cake-日历纪念日裱花蛋糕",
    "categoryId": "girls-cake",
    "name": "日历纪念日裱花蛋糕",
    "brief": "6寸 日历纪念日裱花蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-日历纪念日裱花蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-日历纪念日裱花蛋糕-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-小王子玫瑰",
    "categoryId": "girls-cake",
    "name": "小王子玫瑰",
    "brief": "6寸小王子玫瑰",
    "images": [
      "/assets/girls-cake/girls-cake-小王子玫瑰-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-小王子玫瑰-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-荔枝玫瑰",
    "categoryId": "girls-cake",
    "name": "荔枝玫瑰",
    "brief": "6寸 荔枝玫瑰",
    "images": [
      "/assets/girls-cake/girls-cake-荔枝玫瑰-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-荔枝玫瑰-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-简约款裱花鲜花",
    "categoryId": "girls-cake",
    "name": "简约款裱花鲜花",
    "brief": "6寸简约款裱花鲜花",
    "images": [
      "/assets/girls-cake/girls-cake-简约款裱花鲜花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约款裱花鲜花-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-黑色奶油爱心loveforever",
    "categoryId": "girls-cake",
    "name": "黑色奶油爱心LoveForever",
    "brief": "6寸 黑色奶油爱心LoveForever",
    "images": [
      "/assets/girls-cake/girls-cake-黑色奶油爱心loveforever-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-黑色奶油爱心loveforever-1.jpg",
    "price": 79,
    "variants": [
      {
        "size": "默认",
        "price": 79
      }
    ]
  },
  {
    "id": "girls-cake-奶油裱花蛋糕",
    "categoryId": "girls-cake",
    "name": "奶油裱花蛋糕",
    "brief": "6寸奶油裱花蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-奶油裱花蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-奶油裱花蛋糕-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-白色桔梗花蛋糕",
    "categoryId": "girls-cake",
    "name": "白色桔梗花蛋糕",
    "brief": "6寸 白色桔梗花蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-白色桔梗花蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-白色桔梗花蛋糕-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-鲜花红玫瑰",
    "categoryId": "girls-cake",
    "name": "鲜花红玫瑰",
    "brief": "6寸鲜花红玫瑰",
    "images": [
      "/assets/girls-cake/girls-cake-鲜花红玫瑰-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-鲜花红玫瑰-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-鲜花白色桔梗花",
    "categoryId": "girls-cake",
    "name": "鲜花白色桔梗花",
    "brief": "6寸 鲜花白色桔梗花",
    "images": [
      "/assets/girls-cake/girls-cake-鲜花白色桔梗花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-鲜花白色桔梗花-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-爱心loveyou",
    "categoryId": "girls-cake",
    "name": "爱心loveyou",
    "brief": "6寸 爱心loveyou",
    "images": [
      "/assets/girls-cake/girls-cake-爱心loveyou-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-爱心loveyou-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-简约韩式裱花",
    "categoryId": "girls-cake",
    "name": "简约韩式裱花",
    "brief": "6寸简约韩式裱花",
    "images": [
      "/assets/girls-cake/girls-cake-简约韩式裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约韩式裱花-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-羊了个羊",
    "categoryId": "girls-cake",
    "name": "羊了个羊",
    "brief": "6寸 羊了个羊",
    "images": [
      "/assets/girls-cake/girls-cake-羊了个羊-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-羊了个羊-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-小熊奶油小动物",
    "categoryId": "girls-cake",
    "name": "小熊奶油小动物",
    "brief": "6寸 小熊奶油小动物",
    "images": [
      "/assets/girls-cake/girls-cake-小熊奶油小动物-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-小熊奶油小动物-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-粉色裱花-小蛋糕",
    "categoryId": "girls-cake",
    "name": "粉色裱花➕小蛋糕",
    "brief": "6寸 粉色裱花➕小蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-粉色裱花-小蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-粉色裱花-小蛋糕-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-仙女粉色系鲜花",
    "categoryId": "girls-cake",
    "name": "仙女粉色系鲜花",
    "brief": "6寸 仙女粉色系鲜花",
    "images": [
      "/assets/girls-cake/girls-cake-仙女粉色系鲜花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-仙女粉色系鲜花-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-仙女裱花款",
    "categoryId": "girls-cake",
    "name": "仙女裱花款",
    "brief": "6寸 仙女裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-仙女裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-仙女裱花款-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-粉色系裱花",
    "categoryId": "girls-cake",
    "name": "粉色系裱花",
    "brief": "6寸粉色系裱花",
    "images": [
      "/assets/girls-cake/girls-cake-粉色系裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-粉色系裱花-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-郁金香手绘",
    "categoryId": "girls-cake",
    "name": "郁金香手绘",
    "brief": "6寸郁金香手绘",
    "images": [
      "/assets/girls-cake/girls-cake-郁金香手绘-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-郁金香手绘-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-简约淋面裱花",
    "categoryId": "girls-cake",
    "name": "简约淋面裱花",
    "brief": "6寸 简约淋面裱花",
    "images": [
      "/assets/girls-cake/girls-cake-简约淋面裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约淋面裱花-1.jpg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "girls-cake-简约裱花款",
    "categoryId": "girls-cake",
    "name": "简约裱花款",
    "brief": "6寸简约裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-简约裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约裱花款-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-白色系蝴蝶款",
    "categoryId": "girls-cake",
    "name": "白色系蝴蝶款",
    "brief": "6寸白色系蝴蝶款",
    "images": [
      "/assets/girls-cake/girls-cake-白色系蝴蝶款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-白色系蝴蝶款-1.jpg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "girls-cake-极简风梯形款",
    "categoryId": "girls-cake",
    "name": "极简风梯形款",
    "brief": "6寸极简风梯形款",
    "images": [
      "/assets/girls-cake/girls-cake-极简风梯形款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-极简风梯形款-1.jpg",
    "price": 76,
    "variants": [
      {
        "size": "默认",
        "price": 76
      }
    ]
  },
  {
    "id": "girls-cake-莓有烦恼-草莓熊",
    "categoryId": "girls-cake",
    "name": "\"莓有烦恼\"草莓熊",
    "brief": "6寸\"莓有烦恼\"草莓熊",
    "images": [
      "/assets/girls-cake/girls-cake-莓有烦恼-草莓熊-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-莓有烦恼-草莓熊-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-鲜花蛋糕",
    "categoryId": "girls-cake",
    "name": "鲜花蛋糕",
    "brief": "6寸鲜花蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-鲜花蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-鲜花蛋糕-1.jpg",
    "price": 148,
    "variants": [
      {
        "size": "默认",
        "price": 148
      }
    ]
  },
  {
    "id": "girls-cake-心形纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "心形纪念日蛋糕",
    "brief": "6寸 心形纪念日蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-心形纪念日蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-心形纪念日蛋糕-1.jpg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "girls-cake-奶油裱花爱心淋面",
    "categoryId": "girls-cake",
    "name": "奶油裱花爱心淋面",
    "brief": "6寸 奶油裱花爱心淋面",
    "images": [
      "/assets/girls-cake/girls-cake-奶油裱花爱心淋面-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-奶油裱花爱心淋面-1.jpg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "girls-cake-复古奶油裱花",
    "categoryId": "girls-cake",
    "name": "复古奶油裱花",
    "brief": "6寸复古奶油裱花",
    "images": [
      "/assets/girls-cake/girls-cake-复古奶油裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-复古奶油裱花-1.jpg",
    "price": 128,
    "variants": [
      {
        "size": "默认",
        "price": 128
      }
    ]
  },
  {
    "id": "girls-cake-简约-卡布奇诺鲜花",
    "categoryId": "girls-cake",
    "name": "简约 卡布奇诺鲜花",
    "brief": "6寸简约 卡布奇诺鲜花",
    "images": [
      "/assets/girls-cake/girls-cake-简约-卡布奇诺鲜花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-简约-卡布奇诺鲜花-1.jpg",
    "price": 128,
    "variants": [
      {
        "size": "默认",
        "price": 128
      }
    ]
  },
  {
    "id": "girls-cake-二次元系列心形定制蛋糕",
    "categoryId": "girls-cake",
    "name": "二次元系列心形定制蛋糕",
    "brief": "6寸 二次元系列心形定制蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-二次元系列心形定制蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-二次元系列心形定制蛋糕-1.jpg",
    "price": 118,
    "variants": [
      {
        "size": "默认",
        "price": 118
      }
    ]
  },
  {
    "id": "girls-cake-裱花手绘小熊",
    "categoryId": "girls-cake",
    "name": "裱花手绘小熊",
    "brief": "6寸 裱花手绘小熊",
    "images": [
      "/assets/girls-cake/girls-cake-裱花手绘小熊-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-裱花手绘小熊-1.jpg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "girls-cake-维尼熊主题手绘蛋糕",
    "categoryId": "girls-cake",
    "name": "维尼熊主题手绘蛋糕",
    "brief": "6寸 维尼熊主题手绘蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-维尼熊主题手绘蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-维尼熊主题手绘蛋糕-1.jpg",
    "price": 118,
    "variants": [
      {
        "size": "默认",
        "price": 118
      }
    ]
  },
  {
    "id": "girls-cake-草莓奶油裱花芝士淋面",
    "categoryId": "girls-cake",
    "name": "草莓奶油裱花芝士淋面",
    "brief": "6寸草莓奶油裱花芝士淋面",
    "images": [
      "/assets/girls-cake/girls-cake-草莓奶油裱花芝士淋面-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-草莓奶油裱花芝士淋面-1.jpg",
    "price": 108,
    "variants": [
      {
        "size": "默认",
        "price": 108
      }
    ]
  },
  {
    "id": "girls-cake-爱心款蛋糕",
    "categoryId": "girls-cake",
    "name": "爱心款蛋糕",
    "brief": "6寸爱心款蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-爱心款蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-爱心款蛋糕-1.jpg",
    "price": 128,
    "variants": [
      {
        "size": "默认",
        "price": 128
      }
    ]
  },
  {
    "id": "girls-cake-草莓奶油裱花",
    "categoryId": "girls-cake",
    "name": "草莓奶油裱花",
    "brief": "6寸草莓奶油裱花",
    "images": [
      "/assets/girls-cake/girls-cake-草莓奶油裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-草莓奶油裱花-1.jpg",
    "price": 128,
    "variants": [
      {
        "size": "默认",
        "price": 128
      }
    ]
  },
  {
    "id": "girls-cake-异形立体小动物手绘",
    "categoryId": "girls-cake",
    "name": "异形立体小动物手绘",
    "brief": "6寸 异形立体小动物手绘",
    "images": [
      "/assets/girls-cake/girls-cake-异形立体小动物手绘-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-异形立体小动物手绘-1.jpg",
    "price": 158,
    "variants": [
      {
        "size": "默认",
        "price": 158
      }
    ]
  },
  {
    "id": "girls-cake-ins风立体小猪手绘",
    "categoryId": "girls-cake",
    "name": "ins风立体小猪手绘",
    "brief": "6寸 ins风立体小猪手绘",
    "images": [
      "/assets/girls-cake/girls-cake-ins风立体小猪手绘-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-ins风立体小猪手绘-1.jpg",
    "price": 158,
    "variants": [
      {
        "size": "默认",
        "price": 158
      }
    ]
  },
  {
    "id": "girls-cake-小猪猪复古手绘",
    "categoryId": "girls-cake",
    "name": "小猪猪复古手绘",
    "brief": "6寸 小猪猪复古手绘",
    "images": [
      "/assets/girls-cake/girls-cake-小猪猪复古手绘-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-小猪猪复古手绘-1.jpg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "girls-cake-猪猪立体小动物款",
    "categoryId": "girls-cake",
    "name": "猪猪立体小动物款",
    "brief": "6寸猪猪立体小动物款",
    "images": [
      "/assets/girls-cake/girls-cake-猪猪立体小动物款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-猪猪立体小动物款-1.jpg",
    "price": 188,
    "variants": [
      {
        "size": "默认",
        "price": 188
      }
    ]
  },
  {
    "id": "girls-cake-手绘草莓熊-裱花款",
    "categoryId": "girls-cake",
    "name": "手绘草莓熊 裱花款",
    "brief": "6寸 手绘草莓熊 裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-手绘草莓熊-裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-手绘草莓熊-裱花款-1.jpg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "girls-cake-手绘kt猫",
    "categoryId": "girls-cake",
    "name": "手绘kt猫",
    "brief": "6寸手绘kt猫",
    "images": [
      "/assets/girls-cake/girls-cake-手绘kt猫-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-手绘kt猫-1.jpg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "girls-cake-星之卡比奶油霜",
    "categoryId": "girls-cake",
    "name": "星之卡比奶油霜",
    "brief": "6寸星之卡比奶油霜",
    "images": [
      "/assets/girls-cake/girls-cake-星之卡比奶油霜-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-星之卡比奶油霜-1.jpg",
    "price": 158,
    "variants": [
      {
        "size": "默认",
        "price": 158
      }
    ]
  },
  {
    "id": "girls-cake-立体小动物蛋糕裱花",
    "categoryId": "girls-cake",
    "name": "立体小动物蛋糕裱花",
    "brief": "6寸立体小动物蛋糕裱花",
    "images": [
      "/assets/girls-cake/girls-cake-立体小动物蛋糕裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-立体小动物蛋糕裱花-1.jpg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "girls-cake-立体小动物蛋糕",
    "categoryId": "girls-cake",
    "name": "立体小动物蛋糕",
    "brief": "6寸立体小动物蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-立体小动物蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-立体小动物蛋糕-1.jpg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "girls-cake-玉桂狗主题裱花款",
    "categoryId": "girls-cake",
    "name": "玉桂狗主题裱花款",
    "brief": "6寸 玉桂狗主题裱花款",
    "images": [
      "/assets/girls-cake/girls-cake-玉桂狗主题裱花款-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-玉桂狗主题裱花款-1.jpg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "girls-cake-异形立体派大星",
    "categoryId": "girls-cake",
    "name": "异形立体派大星",
    "brief": "6寸 加高异形立体派大星",
    "images": [
      "/assets/girls-cake/girls-cake-异形立体派大星-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-异形立体派大星-1.jpg",
    "price": 218,
    "variants": [
      {
        "size": "默认",
        "price": 218
      }
    ]
  },
  {
    "id": "girls-cake-三只立体小动物裱花",
    "categoryId": "girls-cake",
    "name": "三只立体小动物裱花",
    "brief": "6寸三只立体小动物裱花",
    "images": [
      "/assets/girls-cake/girls-cake-三只立体小动物裱花-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-三只立体小动物裱花-1.jpg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "girls-cake-圆形猪猪翻糖定制",
    "categoryId": "girls-cake",
    "name": "圆形猪猪翻糖定制",
    "brief": "6寸 圆形猪猪翻糖定制",
    "images": [
      "/assets/girls-cake/girls-cake-圆形猪猪翻糖定制-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-圆形猪猪翻糖定制-1.jpg",
    "price": 238,
    "variants": [
      {
        "size": "默认",
        "price": 238
      }
    ]
  },
  {
    "id": "girls-cake-kt猫玉桂狗手绘裱花定制",
    "categoryId": "girls-cake",
    "name": "kT猫玉桂狗手绘裱花定制",
    "brief": "6寸kT猫玉桂狗手绘裱花定制",
    "images": [
      "/assets/girls-cake/girls-cake-kt猫玉桂狗手绘裱花定制-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-kt猫玉桂狗手绘裱花定制-1.jpg",
    "price": 228,
    "variants": [
      {
        "size": "默认",
        "price": 228
      }
    ]
  },
  {
    "id": "girls-cake-8-6双层鲜花生日蛋糕",
    "categoryId": "girls-cake",
    "name": "8➕6双层鲜花生日蛋糕",
    "brief": "8➕6双层鲜花生日蛋糕",
    "images": [
      "/assets/girls-cake/girls-cake-8-6双层鲜花生日蛋糕-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-8-6双层鲜花生日蛋糕-1.jpg",
    "price": 398,
    "variants": [
      {
        "size": "默认",
        "price": 398
      }
    ]
  },
  {
    "id": "girls-cake-立体异形小熊",
    "categoryId": "girls-cake",
    "name": "立体异形小熊",
    "brief": "4寸加高立体异形小熊",
    "images": [
      "/assets/girls-cake/girls-cake-立体异形小熊-1.jpg"
    ],
    "cover": "/assets/girls-cake/girls-cake-立体异形小熊-1.jpg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "stack-mille",
    "categoryId": "stack-mille",
    "name": "堆堆千层",
    "brief": "堆堆千层",
    "images": [
      "/assets/stack-mille/stack-mille-1.jpeg",
      "/assets/stack-mille/stack-mille-2.jpeg",
      "/assets/stack-mille/stack-mille-3.jpeg",
      "/assets/stack-mille/stack-mille-4.jpeg",
      "/assets/stack-mille/stack-mille-5.jpeg",
      "/assets/stack-mille/stack-mille-6.jpeg",
      "/assets/stack-mille/stack-mille-7.jpeg",
      "/assets/stack-mille/stack-mille-8.jpeg"
    ],
    "cover": "/assets/stack-mille/stack-mille-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ],
    "options": [
      {
        "name": "麻薯",
        "selected": false
      },
      {
        "name": "血糯米",
        "selected": false
      },
      {
        "name": "芋泥",
        "selected": false
      },
      {
        "name": "奥利奥",
        "selected": false
      },
      {
        "name": "榛子巧克力酱",
        "selected": false
      },
      {
        "name": "海盐奥利奥奶芙",
        "selected": false
      },
      {
        "name": "开心果奶芙",
        "selected": false
      },
      {
        "name": "芒果",
        "selected": false
      },
      {
        "name": "蓝莓",
        "selected": false
      },
      {
        "name": "红提",
        "selected": false
      },
      {
        "name": "青提",
        "selected": false
      },
      {
        "name": "凤梨",
        "selected": false
      },
      {
        "name": "草莓",
        "selected": false
      },
      {
        "name": "黄桃（罐头）",
        "selected": false
      },
      {
        "name": "榴莲（80g)哈密瓜",
        "selected": false
      },
      {
        "name": "香蕉",
        "selected": false
      },
      {
        "name": "坚果燕麦脆",
        "selected": false
      },
      {
        "name": "杏仁燕麦脆",
        "selected": false
      },
      {
        "name": "抹茶慕斯",
        "selected": false
      },
      {
        "name": "桑葚慕斯",
        "selected": false
      },
      {
        "name": "可可奶冻",
        "selected": false
      },
      {
        "name": "伯爵红茶奶冻",
        "selected": false
      },
      {
        "name": "开心果奶冻",
        "selected": false
      },
      {
        "name": "椰奶冻",
        "selected": false
      },
      {
        "name": "焦糖布雷",
        "selected": false
      },
      {
        "name": "莓果库里",
        "selected": false
      }
    ]
  }
];

module.exports = { categories, products };
