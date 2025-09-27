// 数据源由脚本生成/更新
const { INS_ROLL_FLAVORS, CAKE_FILLINGS } = require('../constants/options.js');
// 统一“口味自选”的可选项
const TASTE_OPTIONS = [
  { id: 'choco-crust', name: '巧克力脆皮瑞士卷' },
  { id: 'silk-red', name: '红丝绒瑞士卷' },
  { id: 'matcha', name: '黑金抹茶瑞士卷' },
  { id: 'caramel', name: '焦糖饼干瑞士卷' },
  { id: 'original', name: '原味瑞士卷' },
  { id: 'double-happy', name: '双重开心果瑞士卷' },
  { id: 'yam-mango', name: '夹心芋泥＋芒果' },
  { id: 'coconut', name: '玻灼椰子瑞士卷' },
  { id: 'earlgrey', name: '伯爵红茶瑞士卷' },
];

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
  },
  {
    "id": "ty-stack-cake",
    "name": "T·y堆堆蛋糕"
  },
  {
    "id": "french-mille-cake",
    "name": "法式千层蛋糕"
  },
  {
    "id": "boys-cake",
    "name": "男生款蛋糕"
  },
  {
    "id": "basque-cake",
    "name": "巴斯克蛋糕"
  },
  {
    "id": "tiramisu-cake",
    "name": "提拉米苏蛋糕"
  },
  {
    "id": "ins-swiss-roll",
    "name": "Ins瑞士卷"
  },
  {
    "id": "cake-accessories",
    "name": "蛋糕配件"
  },
  {
    "id": "cake-4inch",
    "name": "4寸蛋糕"
  },
  {
    "id": "cake-8inch",
    "name": "8寸蛋糕"
  },
  {
    "id": "lava-waterfall",
    "name": "爆浆瀑布蛋糕"
  }
];

let products = [
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
  },
  {
    "id": "ty-stack-cake-生椰拿铁",
    "categoryId": "ty-stack-cake",
    "name": "生椰拿铁",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-生椰拿铁-1.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-生椰拿铁-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "6寸",
        "price": 138
      },
      {
        "size": "8寸",
        "price": 198
      }
    ]
  },
  {
    "id": "ty-stack-cake-榴芒与白糯",
    "categoryId": "ty-stack-cake",
    "name": "榴芒与白糯",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-榴芒与白糯-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-榴芒与白糯-2.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-榴芒与白糯-3.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-榴芒与白糯-1.jpeg",
    "price": 178,
    "variants": [
      {
        "size": "6寸",
        "price": 178
      },
      {
        "size": "8寸",
        "price": 268
      }
    ]
  },
  {
    "id": "ty-stack-cake-薄荷巧克力",
    "categoryId": "ty-stack-cake",
    "name": "薄荷巧克力",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-薄荷巧克力-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-薄荷巧克力-2.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-薄荷巧克力-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "6寸",
        "price": 138
      },
      {
        "size": "8寸",
        "price": 198
      }
    ]
  },
  {
    "id": "ty-stack-cake-杨枝甘露",
    "categoryId": "ty-stack-cake",
    "name": "杨枝甘露",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-杨枝甘露-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-杨枝甘露-2.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-杨枝甘露-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "6寸",
        "price": 138
      },
      {
        "size": "8寸",
        "price": 198
      }
    ]
  },
  {
    "id": "ty-stack-cake-斑斓芋芒",
    "categoryId": "ty-stack-cake",
    "name": "斑斓芋芒",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-斑斓芋芒-1.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-斑斓芋芒-1.jpeg",
    "price": 128,
    "variants": [
      {
        "size": "6寸",
        "price": 128
      },
      {
        "size": "8寸",
        "price": 188
      }
    ]
  },
  {
    "id": "ty-stack-cake-桃之夭夭",
    "categoryId": "ty-stack-cake",
    "name": "桃之夭夭",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-桃之夭夭-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-桃之夭夭-2.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-桃之夭夭-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "6寸",
        "price": 138
      },
      {
        "size": "8寸",
        "price": 198
      }
    ]
  },
  {
    "id": "ty-stack-cake-开心的榴莲",
    "categoryId": "ty-stack-cake",
    "name": "开心的榴莲",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-开心的榴莲-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-开心的榴莲-2.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-开心的榴莲-1.jpeg",
    "price": 189,
    "variants": [
      {
        "size": "6寸",
        "price": 189
      },
      {
        "size": "8寸",
        "price": 289
      }
    ]
  },
  {
    "id": "ty-stack-cake-巧可遇蓝莓",
    "categoryId": "ty-stack-cake",
    "name": "巧可遇蓝莓",
    "brief": "可做6/8寸",
    "images": [
      "/assets/ty-stack-cake/ty-stack-cake-巧可遇蓝莓-1.jpeg",
      "/assets/ty-stack-cake/ty-stack-cake-巧可遇蓝莓-2.jpeg"
    ],
    "cover": "/assets/ty-stack-cake/ty-stack-cake-巧可遇蓝莓-1.jpeg",
    "price": 128,
    "variants": [
      {
        "size": "6寸",
        "price": 128
      },
      {
        "size": "8寸",
        "price": 188
      }
    ]
  },
  {
    "id": "french-mille-cake-海蓝椰椰千层",
    "categoryId": "french-mille-cake",
    "name": "海蓝椰椰千层",
    "brief": "6寸海蓝椰椰千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-海蓝椰椰千层-1.jpeg",
      "/assets/french-mille-cake/french-mille-cake-海蓝椰椰千层-2.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-海蓝椰椰千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "french-mille-cake-开心果奶油千层",
    "categoryId": "french-mille-cake",
    "name": "开心果奶油千层",
    "brief": "6寸开心果奶油千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-开心果奶油千层-1.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-开心果奶油千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "french-mille-cake-伯爵红茶千层",
    "categoryId": "french-mille-cake",
    "name": "伯爵红茶千层",
    "brief": "6寸伯爵红茶千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-伯爵红茶千层-1.jpeg",
      "/assets/french-mille-cake/french-mille-cake-伯爵红茶千层-2.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-伯爵红茶千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "french-mille-cake-覆盆子草莓千层",
    "categoryId": "french-mille-cake",
    "name": "覆盆子草莓千层",
    "brief": "6寸覆盆子草莓千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-覆盆子草莓千层-1.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-覆盆子草莓千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "french-mille-cake-超薄抹茶千层",
    "categoryId": "french-mille-cake",
    "name": "超薄抹茶千层",
    "brief": "6寸超薄抹茶千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-超薄抹茶千层-1.jpeg",
      "/assets/french-mille-cake/french-mille-cake-超薄抹茶千层-2.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-超薄抹茶千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "french-mille-cake-超薄榴莲千层",
    "categoryId": "french-mille-cake",
    "name": "超薄榴莲千层",
    "brief": "6寸超薄榴莲千层",
    "images": [
      "/assets/french-mille-cake/french-mille-cake-超薄榴莲千层-1.jpeg",
      "/assets/french-mille-cake/french-mille-cake-超薄榴莲千层-2.jpeg"
    ],
    "cover": "/assets/french-mille-cake/french-mille-cake-超薄榴莲千层-1.jpeg",
    "price": 138,
    "variants": [
      {
        "size": "默认",
        "price": 138
      }
    ]
  },
  {
    "id": "boys-cake-水果多多-应季水果",
    "categoryId": "boys-cake",
    "name": "水果多多(应季水果",
    "brief": "6寸水果多多（应季水果",
    "images": [
      "/assets/boys-cake/boys-cake-水果多多-应季水果-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-水果多多-应季水果-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-简约水果款",
    "categoryId": "boys-cake",
    "name": "简约水果款",
    "brief": "6寸简约水果款",
    "images": [
      "/assets/boys-cake/boys-cake-简约水果款-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-简约水果款-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "boys-cake-简约款-1",
    "categoryId": "boys-cake",
    "name": "简约款_1",
    "brief": "6寸简约款_1",
    "images": [
      "/assets/boys-cake/boys-cake-简约款-1-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-简约款-1-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "boys-cake-简约款-2",
    "categoryId": "boys-cake",
    "name": "简约款_2",
    "brief": "6寸简约款_2",
    "images": [
      "/assets/boys-cake/boys-cake-简约款-2-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-简约款-2-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "boys-cake-当地小有名气的好老公",
    "categoryId": "boys-cake",
    "name": "当地小有名气的好老公",
    "brief": "6寸当地小有名气的好老公",
    "images": [
      "/assets/boys-cake/boys-cake-当地小有名气的好老公-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-当地小有名气的好老公-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-男士胡子纽扣",
    "categoryId": "boys-cake",
    "name": "男士胡子纽扣",
    "brief": "6寸男士胡子纽扣",
    "images": [
      "/assets/boys-cake/boys-cake-男士胡子纽扣-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-男士胡子纽扣-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-海盐奥利奥口味奶油",
    "categoryId": "boys-cake",
    "name": "海盐奥利奥口味奶油",
    "brief": "6寸海盐奥利奥口味奶油",
    "images": [
      "/assets/boys-cake/boys-cake-海盐奥利奥口味奶油-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-海盐奥利奥口味奶油-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "boys-cake-灰色富士山",
    "categoryId": "boys-cake",
    "name": "灰色富士山",
    "brief": "6寸灰色富士山",
    "images": [
      "/assets/boys-cake/boys-cake-灰色富士山-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-灰色富士山-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "boys-cake-北极熊主题",
    "categoryId": "boys-cake",
    "name": "北极熊主题",
    "brief": "6寸北极熊主题",
    "images": [
      "/assets/boys-cake/boys-cake-北极熊主题-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-北极熊主题-1.jpeg",
    "price": 119,
    "variants": [
      {
        "size": "默认",
        "price": 119
      }
    ]
  },
  {
    "id": "boys-cake-暗黑富士山",
    "categoryId": "boys-cake",
    "name": "暗黑富士山",
    "brief": "6寸暗黑富士山",
    "images": [
      "/assets/boys-cake/boys-cake-暗黑富士山-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-暗黑富士山-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "boys-cake-三十而立",
    "categoryId": "boys-cake",
    "name": "三十而立",
    "brief": "6寸 三十而立",
    "images": [
      "/assets/boys-cake/boys-cake-三十而立-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-三十而立-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-小熊手绘头像",
    "categoryId": "boys-cake",
    "name": "小熊手绘头像",
    "brief": "6寸 小熊手绘头像",
    "images": [
      "/assets/boys-cake/boys-cake-小熊手绘头像-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-小熊手绘头像-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "boys-cake-黑白二次元蛋糕",
    "categoryId": "boys-cake",
    "name": "黑白二次元蛋糕",
    "brief": "6寸 黑白二次元蛋糕",
    "images": [
      "/assets/boys-cake/boys-cake-黑白二次元蛋糕-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-黑白二次元蛋糕-1.jpeg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "boys-cake-小熊翻糖蝴蝶结",
    "categoryId": "boys-cake",
    "name": "小熊翻糖蝴蝶结",
    "brief": "6寸小熊翻糖蝴蝶结",
    "images": [
      "/assets/boys-cake/boys-cake-小熊翻糖蝴蝶结-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-小熊翻糖蝴蝶结-1.jpeg",
    "price": 129,
    "variants": [
      {
        "size": "默认",
        "price": 129
      }
    ]
  },
  {
    "id": "boys-cake-灰色巧克力零食款",
    "categoryId": "boys-cake",
    "name": "灰色巧克力零食款",
    "brief": "6寸 灰色巧克力零食款",
    "images": [
      "/assets/boys-cake/boys-cake-灰色巧克力零食款-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-灰色巧克力零食款-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-方形风生水起",
    "categoryId": "boys-cake",
    "name": "方形风生水起",
    "brief": "6寸方形风生水起",
    "images": [
      "/assets/boys-cake/boys-cake-方形风生水起-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-方形风生水起-1.jpeg",
    "price": 169,
    "variants": [
      {
        "size": "默认",
        "price": 169
      }
    ]
  },
  {
    "id": "boys-cake-风生水起",
    "categoryId": "boys-cake",
    "name": "风生水起",
    "brief": "6寸风生水起",
    "images": [
      "/assets/boys-cake/boys-cake-风生水起-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-风生水起-1.jpeg",
    "price": 169,
    "variants": [
      {
        "size": "默认",
        "price": 169
      }
    ]
  },
  {
    "id": "boys-cake-多财多亿-可改颜色",
    "categoryId": "boys-cake",
    "name": "多财多亿(可改颜色)",
    "brief": "6寸多财多亿（可改颜色）",
    "images": [
      "/assets/boys-cake/boys-cake-多财多亿-可改颜色-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-多财多亿-可改颜色-1.jpeg",
    "price": 168,
    "variants": [
      {
        "size": "默认",
        "price": 168
      }
    ]
  },
  {
    "id": "boys-cake-男士款黑金方形蛋糕",
    "categoryId": "boys-cake",
    "name": "男士款黑金方形蛋糕",
    "brief": "6寸 男士款黑金方形蛋糕",
    "images": [
      "/assets/boys-cake/boys-cake-男士款黑金方形蛋糕-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-男士款黑金方形蛋糕-1.jpeg",
    "price": 168,
    "variants": [
      {
        "size": "默认",
        "price": 168
      }
    ]
  },
  {
    "id": "boys-cake-简约ins风",
    "categoryId": "boys-cake",
    "name": "简约ins风",
    "brief": "6寸简约ins风",
    "images": [
      "/assets/boys-cake/boys-cake-简约ins风-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-简约ins风-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "boys-cake-4ins简约蛋糕",
    "categoryId": "boys-cake",
    "name": "4ins简约蛋糕",
    "brief": "4ins简约蛋糕",
    "images": [
      "/assets/boys-cake/boys-cake-4ins简约蛋糕-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-4ins简约蛋糕-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "boys-cake-海浪蛋糕",
    "categoryId": "boys-cake",
    "name": "海浪蛋糕",
    "brief": "6寸海浪蛋糕",
    "images": [
      "/assets/boys-cake/boys-cake-海浪蛋糕-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-海浪蛋糕-1.jpeg",
    "price": 188,
    "variants": [
      {
        "size": "默认",
        "price": 188
      }
    ]
  },
  {
    "id": "boys-cake-黑玫瑰",
    "categoryId": "boys-cake",
    "name": "黑玫瑰",
    "brief": "4寸黑玫瑰",
    "images": [
      "/assets/boys-cake/boys-cake-黑玫瑰-1.jpeg"
    ],
    "cover": "/assets/boys-cake/boys-cake-黑玫瑰-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "basque-cake-伯爵红茶巴斯克",
    "categoryId": "basque-cake",
    "name": "伯爵红茶巴斯克",
    "brief": "6寸伯爵红茶巴斯克",
    "images": [
      "/assets/basque-cake/basque-cake-伯爵红茶巴斯克-1.jpeg"
    ],
    "cover": "/assets/basque-cake/basque-cake-伯爵红茶巴斯克-1.jpeg",
    "price": 74.9,
    "variants": [
      {
        "size": "默认",
        "price": 74.9
      }
    ]
  },
  {
    "id": "basque-cake-树莓开心果巴斯克",
    "categoryId": "basque-cake",
    "name": "树莓开心果巴斯克",
    "brief": "6寸树莓开心果巴斯克",
    "images": [
      "/assets/basque-cake/basque-cake-树莓开心果巴斯克-1.jpeg",
      "/assets/basque-cake/basque-cake-树莓开心果巴斯克-2.jpeg"
    ],
    "cover": "/assets/basque-cake/basque-cake-树莓开心果巴斯克-1.jpeg",
    "price": 74.9,
    "variants": [
      {
        "size": "默认",
        "price": 74.9
      }
    ]
  },
  {
    "id": "basque-cake-柠檬巴斯克",
    "categoryId": "basque-cake",
    "name": "柠檬巴斯克",
    "brief": "6寸柠檬巴斯克",
    "images": [
      "/assets/basque-cake/basque-cake-柠檬巴斯克-1.jpeg",
      "/assets/basque-cake/basque-cake-柠檬巴斯克-2.jpeg",
      "/assets/basque-cake/basque-cake-柠檬巴斯克-3.jpeg"
    ],
    "cover": "/assets/basque-cake/basque-cake-柠檬巴斯克-1.jpeg",
    "price": 74.9,
    "variants": [
      {
        "size": "默认",
        "price": 74.9
      }
    ]
  },
  {
    "id": "basque-cake-奥利奥生巧巴斯克",
    "categoryId": "basque-cake",
    "name": "奥利奥生巧巴斯克",
    "brief": "6寸奥利奥生巧巴斯克",
    "images": [
      "/assets/basque-cake/basque-cake-奥利奥生巧巴斯克-1.jpeg",
      "/assets/basque-cake/basque-cake-奥利奥生巧巴斯克-2.jpeg",
      "/assets/basque-cake/basque-cake-奥利奥生巧巴斯克-3.jpeg"
    ],
    "cover": "/assets/basque-cake/basque-cake-奥利奥生巧巴斯克-1.jpeg",
    "price": 74.9,
    "variants": [
      {
        "size": "默认",
        "price": 74.9
      }
    ]
  },
  {
    "id": "tiramisu-cake-经典提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "经典提拉米苏",
    "brief": "6寸经典提拉米苏",
    "images": [
      "/assets/tiramisu-cake/tiramisu-cake-经典提拉米苏-1.jpeg"
    ],
    "cover": "/assets/tiramisu-cake/tiramisu-cake-经典提拉米苏-1.jpeg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "tiramisu-cake-柠檬提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "柠檬提拉米苏",
    "brief": "6寸柠檬提拉米苏",
    "images": [
      "/assets/tiramisu-cake/tiramisu-cake-柠檬提拉米苏-1.jpeg",
      "/assets/tiramisu-cake/tiramisu-cake-柠檬提拉米苏-2.jpeg",
      "/assets/tiramisu-cake/tiramisu-cake-柠檬提拉米苏-3.jpeg"
    ],
    "cover": "/assets/tiramisu-cake/tiramisu-cake-柠檬提拉米苏-1.jpeg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "tiramisu-cake-抹茶茉莉提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "抹茶茉莉提拉米苏",
    "brief": "6寸抹茶茉莉提拉米苏",
    "images": [
      "/assets/tiramisu-cake/tiramisu-cake-抹茶茉莉提拉米苏-1.jpeg",
      "/assets/tiramisu-cake/tiramisu-cake-抹茶茉莉提拉米苏-2.jpeg"
    ],
    "cover": "/assets/tiramisu-cake/tiramisu-cake-抹茶茉莉提拉米苏-1.jpeg",
    "price": 89.9,
    "variants": [
      {
        "size": "默认",
        "price": 89.9
      }
    ]
  },
  {
    "id": "ins-swiss-roll",
    "categoryId": "ins-swiss-roll",
    "name": "Ins 瑞士卷",
    "brief": "Ins 瑞士卷",
    "images": [
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-1.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-2.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-3.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-4.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-5.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-6.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-7.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-8.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-9.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-10.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-11.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-12.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-13.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-14.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-15.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-16.jpeg",
      "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-17.jpeg"
    ],
    "cover": "/assets/ins-swiss-roll/ins-swiss-roll-ins-瑞士卷-口味自选-1.jpeg",
    "price": 54.9,
    "variants": [
      {
        "size": "默认",
        "price": 54.9
      }
    ],
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 0,
        "max": 1,
        "items": TASTE_OPTIONS.map(x=>({ id:x.id, name:x.name }))
      }
    ]
  },
  {
    "id": "cake-accessories-礼花帽",
    "categoryId": "cake-accessories",
    "name": "礼花帽",
    "brief": "礼花帽",
    "images": [
      "/assets/cake-accessories/cake-accessories-礼花帽-1.jpeg",
      "/assets/cake-accessories/cake-accessories-礼花帽-2.jpeg",
      "/assets/cake-accessories/cake-accessories-礼花帽-3.jpeg"
    ],
    "cover": "/assets/cake-accessories/cake-accessories-礼花帽-1.jpeg",
    "price": 7,
    "variants": [
      {
        "size": "默认",
        "price": 7
      }
    ]
  },
  {
    "id": "cake-accessories-薄纱帽",
    "categoryId": "cake-accessories",
    "name": "薄纱帽",
    "brief": "薄纱帽",
    "images": [
      "/assets/cake-accessories/cake-accessories-薄纱帽-1.jpeg",
      "/assets/cake-accessories/cake-accessories-薄纱帽-2.jpeg"
    ],
    "cover": "/assets/cake-accessories/cake-accessories-薄纱帽-1.jpeg",
    "price": 7,
    "variants": [
      {
        "size": "默认",
        "price": 7
      }
    ]
  },
  {
    "id": "cake-accessories-星星帽",
    "categoryId": "cake-accessories",
    "name": "星星帽",
    "brief": "星星帽",
    "images": [
      "/assets/cake-accessories/cake-accessories-星星帽-1.jpeg",
      "/assets/cake-accessories/cake-accessories-星星帽-2.jpeg",
      "/assets/cake-accessories/cake-accessories-星星帽-3.jpeg"
    ],
    "cover": "/assets/cake-accessories/cake-accessories-星星帽-1.jpeg",
    "price": 7,
    "variants": [
      {
        "size": "默认",
        "price": 7
      }
    ]
  },
  {
    "id": "four-inch-cake-方形礼物蛋糕",
    "categoryId": "cake-4inch",
    "name": "方形礼物蛋糕",
    "brief": "方形礼物蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-方形礼物蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-方形礼物蛋糕-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "four-inch-cake-ins钻石糖蛋糕",
    "categoryId": "cake-4inch",
    "name": "INS钻石糖蛋糕",
    "brief": "INS钻石糖蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-ins钻石糖蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-ins钻石糖蛋糕-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "four-inch-cake-简约奥利奥",
    "categoryId": "cake-4inch",
    "name": "简约奥利奥",
    "brief": "简约奥利奥",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-简约奥利奥-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-简约奥利奥-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-简约款",
    "categoryId": "cake-4inch",
    "name": "简约款",
    "brief": "简约款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-简约款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-简约款-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "four-inch-cake-抱抱熊蛋糕",
    "categoryId": "cake-4inch",
    "name": "抱抱熊蛋糕",
    "brief": "抱抱熊蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-抱抱熊蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-抱抱熊蛋糕-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-线条小狗蛋糕",
    "categoryId": "cake-4inch",
    "name": "线条小狗蛋糕",
    "brief": "线条小狗蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-线条小狗蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-线条小狗蛋糕-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-ins可爱奶油霜",
    "categoryId": "cake-4inch",
    "name": "INS可爱奶油霜",
    "brief": "INS可爱奶油霜",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-ins可爱奶油霜-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-ins可爱奶油霜-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-主题爱心糖牌",
    "categoryId": "cake-4inch",
    "name": "主题爱心糖牌",
    "brief": "主题爱心糖牌",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-主题爱心糖牌-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-主题爱心糖牌-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "four-inch-cake-玫红love-you",
    "categoryId": "cake-4inch",
    "name": "玫红LOVE YOU",
    "brief": "玫红LOVE YOU",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-玫红love-you-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-玫红love-you-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "four-inch-cake-可爱雪人款",
    "categoryId": "cake-4inch",
    "name": "可爱雪人款",
    "brief": "可爱雪人款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-可爱雪人款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-可爱雪人款-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-基础款蛋糕",
    "categoryId": "cake-4inch",
    "name": "基础款蛋糕",
    "brief": "基础款蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-基础款蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-基础款蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-水果基础款",
    "categoryId": "cake-4inch",
    "name": "水果基础款",
    "brief": "水果基础款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-水果基础款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-水果基础款-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-简约字母款",
    "categoryId": "cake-4inch",
    "name": "简约字母款",
    "brief": "简约字母款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-简约字母款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-简约字母款-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-基础水果款",
    "categoryId": "cake-4inch",
    "name": "基础水果款",
    "brief": "基础水果款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-基础水果款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-基础水果款-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-紫色氛围鲜花",
    "categoryId": "cake-4inch",
    "name": "紫色氛围鲜花",
    "brief": "紫色氛围鲜花",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-紫色氛围鲜花-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-紫色氛围鲜花-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "four-inch-cake-小熊玩偶款",
    "categoryId": "cake-4inch",
    "name": "小熊玩偶款",
    "brief": "小熊玩偶款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-小熊玩偶款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-小熊玩偶款-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-简约字幕款",
    "categoryId": "cake-4inch",
    "name": "简约字幕款",
    "brief": "简约字幕款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-简约字幕款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-简约字幕款-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-小熊蜡烛款",
    "categoryId": "cake-4inch",
    "name": "小熊蜡烛款",
    "brief": "小熊蜡烛款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-小熊蜡烛款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-小熊蜡烛款-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "four-inch-cake-女生鲜花蛋糕",
    "categoryId": "cake-4inch",
    "name": "女生鲜花蛋糕",
    "brief": "女生鲜花蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-女生鲜花蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-女生鲜花蛋糕-1.jpeg",
    "price": 88,
    "variants": [
      {
        "size": "默认",
        "price": 88
      }
    ]
  },
  {
    "id": "four-inch-cake-ins简约款",
    "categoryId": "cake-4inch",
    "name": "INS简约款",
    "brief": "INS简约款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-ins简约款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-ins简约款-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "默认",
        "price": 49.9
      }
    ]
  },
  {
    "id": "four-inch-cake-粉色爱心款",
    "categoryId": "cake-4inch",
    "name": "粉色爱心款",
    "brief": "粉色爱心款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-粉色爱心款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-粉色爱心款-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "four-inch-cake-奶油霜宝宝小狗",
    "categoryId": "cake-4inch",
    "name": "奶油霜宝宝小狗",
    "brief": "奶油霜宝宝小狗",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-奶油霜宝宝小狗-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-奶油霜宝宝小狗-1.jpeg",
    "price": 79.9,
    "variants": [
      {
        "size": "默认",
        "price": 79.9
      }
    ]
  },
  {
    "id": "four-inch-cake-鲜花复古蛋糕",
    "categoryId": "cake-4inch",
    "name": "鲜花复古蛋糕",
    "brief": "鲜花复古蛋糕",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-鲜花复古蛋糕-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-鲜花复古蛋糕-1.jpeg",
    "price": 99,
    "variants": [
      {
        "size": "默认",
        "price": 99
      }
    ]
  },
  {
    "id": "four-inch-cake-草莓公主款",
    "categoryId": "cake-4inch",
    "name": "草莓公主款",
    "brief": "草莓公主款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-草莓公主款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-草莓公主款-1.jpeg",
    "price": 69.9,
    "variants": [
      {
        "size": "默认",
        "price": 69.9
      }
    ]
  },
  {
    "id": "four-inch-cake-ins草莓款",
    "categoryId": "cake-4inch",
    "name": "INS草莓款",
    "brief": "INS草莓款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-ins草莓款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-ins草莓款-1.jpeg",
    "price": 88,
    "variants": [
      {
        "size": "默认",
        "price": 88
      }
    ]
  },
  {
    "id": "four-inch-cake-简约草莓款",
    "categoryId": "cake-4inch",
    "name": "简约草莓款",
    "brief": "简约草莓款",
    "images": [
      "/assets/four-inch-cake/four-inch-cake-简约草莓款-1.jpeg"
    ],
    "cover": "/assets/four-inch-cake/four-inch-cake-简约草莓款-1.jpeg",
    "price": 59.9,
    "variants": [
      {
        "size": "默认",
        "price": 59.9
      }
    ]
  },
  {
    "id": "eight-inch-cake-主题淋面款",
    "categoryId": "cake-8inch",
    "name": "主题淋面款",
    "brief": "主题淋面款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-主题淋面款-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-主题淋面款-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-主题淋面款-1.jpeg",
    "price": 228,
    "variants": [
      {
        "size": "默认",
        "price": 228
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins风仙女款",
    "categoryId": "cake-8inch",
    "name": "INS风仙女款",
    "brief": "INS风仙女款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-ins风仙女款-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-ins风仙女款-1.jpeg",
    "price": 218,
    "variants": [
      {
        "size": "默认",
        "price": 218
      }
    ]
  },
  {
    "id": "eight-inch-cake-爱心裱花款",
    "categoryId": "cake-8inch",
    "name": "爱心裱花款",
    "brief": "爱心裱花款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-爱心裱花款-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-爱心裱花款-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-爱心裱花款-1.jpeg",
    "price": 238,
    "variants": [
      {
        "size": "默认",
        "price": 238
      }
    ]
  },
  {
    "id": "eight-inch-cake-kitty猫翻糖款",
    "categoryId": "cake-8inch",
    "name": "KITTY猫翻糖款",
    "brief": "KITTY猫翻糖款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-kitty猫翻糖款-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-kitty猫翻糖款-1.jpeg",
    "price": 228,
    "variants": [
      {
        "size": "默认",
        "price": 228
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins裱花款",
    "categoryId": "cake-8inch",
    "name": "INS裱花款",
    "brief": "INS裱花款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-ins裱花款-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-ins裱花款-1.jpeg",
    "price": 188,
    "variants": [
      {
        "size": "默认",
        "price": 188
      }
    ]
  },
  {
    "id": "eight-inch-cake-粉粉爱心",
    "categoryId": "cake-8inch",
    "name": "粉粉爱心",
    "brief": "粉粉爱心",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-粉粉爱心-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-粉粉爱心-1.jpeg",
    "price": 178,
    "variants": [
      {
        "size": "默认",
        "price": 178
      }
    ]
  },
  {
    "id": "eight-inch-cake-简约水果裱花",
    "categoryId": "cake-8inch",
    "name": "简约水果裱花",
    "brief": "简约水果裱花",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-简约水果裱花-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-简约水果裱花-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-简约水果裱花-1.jpeg",
    "price": 139,
    "variants": [
      {
        "size": "默认",
        "price": 139
      }
    ]
  },
  {
    "id": "eight-inch-cake-水果多多款",
    "categoryId": "cake-8inch",
    "name": "水果多多款",
    "brief": "水果多多款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-水果多多款-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-水果多多款-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-水果多多款-1.jpeg",
    "price": 149,
    "variants": [
      {
        "size": "默认",
        "price": 149
      }
    ]
  },
  {
    "id": "eight-inch-cake-青提table-cake",
    "categoryId": "cake-8inch",
    "name": "青提TABLE CAKE",
    "brief": "青提TABLE CAKE",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-青提table-cake-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-青提table-cake-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-青提table-cake-1.jpeg",
    "price": 179,
    "variants": [
      {
        "size": "默认",
        "price": 179
      }
    ]
  },
  {
    "id": "eight-inch-cake-翻糖蝴蝶结",
    "categoryId": "cake-8inch",
    "name": "翻糖蝴蝶结",
    "brief": "翻糖蝴蝶结",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-翻糖蝴蝶结-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-翻糖蝴蝶结-1.jpeg",
    "price": 179,
    "variants": [
      {
        "size": "默认",
        "price": 179
      }
    ]
  },
  {
    "id": "eight-inch-cake-许愿池与花",
    "categoryId": "cake-8inch",
    "name": "许愿池与花",
    "brief": "许愿池与花",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-许愿池与花-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-许愿池与花-1.jpeg",
    "price": 218,
    "variants": [
      {
        "size": "默认",
        "price": 218
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins天使款",
    "categoryId": "cake-8inch",
    "name": "INS天使款",
    "brief": "INS天使款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-ins天使款-1.jpeg",
      "/assets/eight-inch-cake/eight-inch-cake-ins天使款-2.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-ins天使款-1.jpeg",
    "price": 188,
    "variants": [
      {
        "size": "默认",
        "price": 188
      }
    ]
  },
  {
    "id": "eight-inch-cake-可爱小狗",
    "categoryId": "cake-8inch",
    "name": "可爱小狗",
    "brief": "可爱小狗",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-可爱小狗-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-可爱小狗-1.jpeg",
    "price": 169,
    "variants": [
      {
        "size": "默认",
        "price": 169
      }
    ]
  },
  {
    "id": "eight-inch-cake-青提与鲜花",
    "categoryId": "cake-8inch",
    "name": "青提与鲜花",
    "brief": "青提与鲜花",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-青提与鲜花-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-青提与鲜花-1.jpeg",
    "price": 198,
    "variants": [
      {
        "size": "默认",
        "price": 198
      }
    ]
  },
  {
    "id": "eight-inch-cake-kitty猫款",
    "categoryId": "cake-8inch",
    "name": "KITTY猫款",
    "brief": "KITTY猫款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-kitty猫款-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-kitty猫款-1.jpeg",
    "price": 168,
    "variants": [
      {
        "size": "默认",
        "price": 168
      }
    ]
  },
  {
    "id": "eight-inch-cake-粉粉kt猫",
    "categoryId": "cake-8inch",
    "name": "粉粉KT猫",
    "brief": "粉粉KT猫",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-粉粉kt猫-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-粉粉kt猫-1.jpeg",
    "price": 199,
    "variants": [
      {
        "size": "默认",
        "price": 199
      }
    ]
  },
  {
    "id": "eight-inch-cake-氛围裱花款",
    "categoryId": "cake-8inch",
    "name": "氛围裱花款",
    "brief": "氛围裱花款",
    "images": [
      "/assets/eight-inch-cake/eight-inch-cake-氛围裱花款-1.jpeg"
    ],
    "cover": "/assets/eight-inch-cake/eight-inch-cake-氛围裱花款-1.jpeg",
    "price": 188,
    "variants": [
      {
        "size": "默认",
        "price": 188
      }
    ]
  },
  
  {
    "id": "lava-waterfall-虎皮抹茶瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮抹茶瀑布蛋糕",
    "brief": "虎皮抹茶瀑布蛋糕",
    "images": [
      "/assets/lava-waterfall/lava-waterfall-虎皮抹茶瀑布蛋糕-1.jpeg"
    ],
    "cover": "/assets/lava-waterfall/lava-waterfall-虎皮抹茶瀑布蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "4寸",
        "price": 49.9
      },
      {
        "size": "6寸",
        "price": 79.9
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮椰蓝瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮椰蓝瀑布蛋糕",
    "brief": "虎皮椰蓝瀑布蛋糕",
    "images": [
      "/assets/lava-waterfall/lava-waterfall-虎皮椰蓝瀑布蛋糕-1.jpeg"
    ],
    "cover": "/assets/lava-waterfall/lava-waterfall-虎皮椰蓝瀑布蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "4寸",
        "price": 49.9
      },
      {
        "size": "6寸",
        "price": 79.9
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮红丝绒瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮红丝绒瀑布蛋糕",
    "brief": "虎皮红丝绒瀑布蛋糕",
    "images": [
      "/assets/lava-waterfall/lava-waterfall-虎皮红丝绒瀑布蛋糕-1.jpeg"
    ],
    "cover": "/assets/lava-waterfall/lava-waterfall-虎皮红丝绒瀑布蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "4寸",
        "price": 49.9
      },
      {
        "size": "6寸",
        "price": 79.9
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮芋泥瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮芋泥瀑布蛋糕",
    "brief": "虎皮芋泥瀑布蛋糕",
    "images": [
      "/assets/lava-waterfall/lava-waterfall-虎皮芋泥瀑布蛋糕-1.jpeg"
    ],
    "cover": "/assets/lava-waterfall/lava-waterfall-虎皮芋泥瀑布蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "4寸",
        "price": 49.9
      },
      {
        "size": "6寸",
        "price": 79.9
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮巧克力瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮巧克力瀑布蛋糕",
    "brief": "虎皮巧克力瀑布蛋糕",
    "images": [
      "/assets/lava-waterfall/lava-waterfall-虎皮巧克力瀑布蛋糕-1.jpeg"
    ],
    "cover": "/assets/lava-waterfall/lava-waterfall-虎皮巧克力瀑布蛋糕-1.jpeg",
    "price": 49.9,
    "variants": [
      {
        "size": "4寸",
        "price": 49.9
      },
      {
        "size": "6寸",
        "price": 79.9
      }
    ]
  }
];

// 修正与增强：仅对 Ins 瑞士卷 / 4寸蛋糕 / 8寸蛋糕 注入 groups，并去重重复的 Ins 瑞士卷
function normalizeInsName(s=''){ return String(s).replace(/（口味自选）|\(口味自选\)/g,'').trim(); }
function isInsRoll(p){ return p && (p.categoryId==='ins-swiss-roll' || p.categoryId==='ins-roll' || /瑞士卷/.test(String(p.name||''))); }
function isCake4(p){ return p && (p.categoryId==='cake-4inch' || p.categoryId==='cake-4-inch'); }
function isCake8(p){ return p && (p.categoryId==='cake-8inch' || p.categoryId==='cake-8-inch'); }

const out=[]; const seenIns=new Set();
for(const p0 of products){
  let p = { ...p0 };
  if (isInsRoll(p)){
    // 标准化名称，注入 groups（单选，最多1）
    p.name = normalizeInsName(p.name);
    p.brief = normalizeInsName(p.brief||p.name);
    p.groups = [ { key:'variant', title:'可选尺寸', type:'single', min:0, max:1, items: INS_ROLL_FLAVORS.map(x=>({id:x.id, name:x.name})) } ];
    const key = `${p.categoryId}::${p.name}`;
    if (seenIns.has(key)) continue; // 去重，保留第一次
    seenIns.add(key);
  } else if (isCake4(p) || isCake8(p)){
    // 保留原 variants，添加夹心多选组（1~2）
    const vItems = (Array.isArray(p.variants)&&p.variants.length ? p.variants : [{ size:'默认', price: Number(p.price||0) }]).map(v=>({ id:String(v.size||'default'), name:String(v.size||'默认') }));
    p.groups = [
      { key:'variant', title:'可选尺寸', type:'single', min:1, max:1, items: vItems },
      { key:'extras', title:'蛋糕夹心', type:'multi', min:1, max:2, items: CAKE_FILLINGS.map(x=>({id:x.id, name:x.name})) }
    ];
  }
  out.push(p);
}
products = out;

module.exports = { categories, products };
