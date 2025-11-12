// 数据源由脚本生成/更新
const categories = [
  {
    "id": "stack-mille",
    "name": "T·y堆堆千层系列",
    "sort": 1400
  },
  {
    "id": "ty-stack-cake",
    "name": "T·y堆堆蛋糕系列",
    "sort": 1300
  },
  {
    "id": "lava-waterfall",
    "name": "虎皮瀑布蛋糕",
    "sort": 1200
  },
  {
    "id": "flavor-milk-cake",
    "name": "口味奶糕",
    "sort": 1100
  },
  {
    "id": "french-mille-cake",
    "name": "法式千层蛋糕",
    "sort": 1000
  },
  {
    "id": "cake-4inch",
    "name": "4寸蛋糕",
    "sort": 900
  },
  {
    "id": "cake-8inch",
    "name": "8寸蛋糕",
    "sort": 800
  },
  {
    "id": "girls-cake",
    "name": "女生款",
    "sort": 700
  },
  {
    "id": "boys-cake",
    "name": "男生款",
    "sort": 600
  },
  {
    "id": "basque-cake",
    "name": "巴斯克蛋糕",
    "sort": 500
  },
  {
    "id": "tiramisu-cake",
    "name": "提拉米苏蛋糕",
    "sort": 400
  },
  {
    "id": "ins-swiss-roll",
    "name": "Ins瑞士卷",
    "sort": 300
  },
  {
    "id": "korean-cream-pie",
    "name": "韩式脆皮奶油派",
    "sort": 200
  },
  {
    "id": "cake-accessories",
    "name": "蛋糕配件",
    "sort": 100
  }
];

const products = [
  {
    "id": "flavor-milk-cake-伯牙绝弦",
    "categoryId": "flavor-milk-cake",
    "name": "伯牙绝弦",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG2.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG2.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-海盐奥利奥",
    "categoryId": "flavor-milk-cake",
    "name": "海盐奥利奥",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG5.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG5.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-可可蓝莓",
    "categoryId": "flavor-milk-cake",
    "name": "可可蓝莓",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG7.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG7.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-梦龙巧克力",
    "categoryId": "flavor-milk-cake",
    "name": "梦龙巧克力",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG9.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG9.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-焦糖玛奇朵",
    "categoryId": "flavor-milk-cake",
    "name": "焦糖玛奇朵",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG10.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG10.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-开心果奶芙",
    "categoryId": "flavor-milk-cake",
    "name": "开心果奶芙",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG11.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG11.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-蜜桃红茶",
    "categoryId": "flavor-milk-cake",
    "name": "蜜桃红茶",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG13.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG13.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-芋泥椰香斑斓",
    "categoryId": "flavor-milk-cake",
    "name": "芋泥椰香斑斓",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG19.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG19.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "flavor-milk-cake-特调草莓奶糕",
    "categoryId": "flavor-milk-cake",
    "name": "特调草莓奶糕",
    "brief": "可做4/6/8寸",
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG21.jpg",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%8F%A3%E5%91%B3%E5%A5%B6%E7%B3%95/WechatIMG21.jpg"
    ],
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "girls-cake-草莓蛋糕2025",
    "categoryId": "girls-cake",
    "name": "草莓蛋糕2025",
    "brief": "6寸草莓蛋糕2025",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG23.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG23.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-郁金香蛋糕",
    "categoryId": "girls-cake",
    "name": "郁金香蛋糕",
    "brief": "4寸加高郁金香蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG24.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG24.jpg",
    "variants": [
      {
        "size": "4寸"
      }
    ]
  },
  {
    "id": "girls-cake-纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "纪念日蛋糕",
    "brief": "6寸纪念日蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG25.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG25.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约巧克力爱心蛋糕",
    "categoryId": "girls-cake",
    "name": "简约巧克力爱心蛋糕",
    "brief": "6寸简约巧克力爱心蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG26.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG26.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-4-2淋面丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "4➕2淋面丝带蛋糕",
    "brief": "4➕2淋面丝带蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG27.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG27.jpg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "girls-cake-高脚杯蛋糕",
    "categoryId": "girls-cake",
    "name": "高脚杯蛋糕",
    "brief": "6寸高脚杯蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG28.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG28.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约水果款",
    "categoryId": "girls-cake",
    "name": "简约水果款",
    "brief": "6寸简约水果款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG29.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG29.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-仿真白色郁金香蛋糕",
    "categoryId": "girls-cake",
    "name": "仿真白色郁金香蛋糕",
    "brief": "6寸仿真白色郁金香蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG30.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG30.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-ins风鱼尾纱丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "ins风鱼尾纱丝带蛋糕",
    "brief": "6寸ins风鱼尾纱丝带蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG31.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG31.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-日历纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "日历纪念日蛋糕",
    "brief": "6寸 日历纪念日蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG32.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG32.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-抱抱熊蛋糕-手绘小熊款",
    "categoryId": "girls-cake",
    "name": "抱抱熊蛋糕(手绘小熊款)",
    "brief": "6寸抱抱熊蛋糕（手绘小熊款）",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG33.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG33.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约裱花黑丝带蛋糕",
    "categoryId": "girls-cake",
    "name": "简约裱花黑丝带蛋糕",
    "brief": "6寸简约裱花黑丝带蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG34.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG34.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-翻糖糖牌爱心",
    "categoryId": "girls-cake",
    "name": "翻糖糖牌爱心",
    "brief": "6寸翻糖糖牌爱心",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG35.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG35.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-应季水果巧克力淋面",
    "categoryId": "girls-cake",
    "name": "应季水果巧克力淋面",
    "brief": "6寸应季水果巧克力淋面",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG36.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG36.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-海盐奥利奥-公主请发财",
    "categoryId": "girls-cake",
    "name": "海盐奥利奥 公主请发财",
    "brief": "6寸海盐奥利奥 公主请发财",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG37.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG37.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-恶搞便便-可可口味",
    "categoryId": "girls-cake",
    "name": "恶搞便便 可可口味",
    "brief": "6寸 恶搞便便 可可口味",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG38.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG38.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-蓝色笑脸",
    "categoryId": "girls-cake",
    "name": "蓝色笑脸",
    "brief": "6寸蓝色笑脸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG39.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG39.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-二次元破壳纪念",
    "categoryId": "girls-cake",
    "name": "二次元破壳纪念",
    "brief": "6寸二次元破壳纪念",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG40.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG40.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-破壳纪念",
    "categoryId": "girls-cake",
    "name": "破壳纪念",
    "brief": "6寸破壳纪念",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG41.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG41.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-暗黑雏菊-可改字",
    "categoryId": "girls-cake",
    "name": "暗黑雏菊(可改字)",
    "brief": "6寸暗黑雏菊（可改字）",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG42.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG42.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约happy",
    "categoryId": "girls-cake",
    "name": "简约happy",
    "brief": "6寸 简约happy",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG43.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG43.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约裱花款",
    "categoryId": "girls-cake",
    "name": "简约裱花款",
    "brief": "6寸简约裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG71.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG71.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-手绘小动物情侣款",
    "categoryId": "girls-cake",
    "name": "手绘小动物情侣款",
    "brief": "6寸手绘小动物情侣款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG45.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG45.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-半圆小动物情侣款",
    "categoryId": "girls-cake",
    "name": "半圆小动物情侣款",
    "brief": "6寸半圆小动物情侣款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG46.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG46.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-玫红色简约写字款",
    "categoryId": "girls-cake",
    "name": "玫红色简约写字款",
    "brief": "6寸玫红色简约写字款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG47.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG47.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约风裱花款",
    "categoryId": "girls-cake",
    "name": "简约风裱花款",
    "brief": "6寸简约风裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG48.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG48.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-三十-鹅-立",
    "categoryId": "girls-cake",
    "name": "三十\"鹅\"立",
    "brief": "6寸三十\"鹅\"立",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG49.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG49.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约星之卡比",
    "categoryId": "girls-cake",
    "name": "简约星之卡比",
    "brief": "6寸 简约星之卡比",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG50.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG50.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-日历纪念日裱花蛋糕",
    "categoryId": "girls-cake",
    "name": "日历纪念日裱花蛋糕",
    "brief": "6寸 日历纪念日裱花蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG51.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG51.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-小王子玫瑰",
    "categoryId": "girls-cake",
    "name": "小王子玫瑰",
    "brief": "6寸小王子玫瑰",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG52.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG52.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-荔枝玫瑰",
    "categoryId": "girls-cake",
    "name": "荔枝玫瑰",
    "brief": "6寸 荔枝玫瑰",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG53.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG53.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约款裱花鲜花",
    "categoryId": "girls-cake",
    "name": "简约款裱花鲜花",
    "brief": "6寸简约款裱花鲜花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG55.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG55.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-黑色奶油爱心loveforever",
    "categoryId": "girls-cake",
    "name": "黑色奶油爱心LoveForever",
    "brief": "6寸 黑色奶油爱心LoveForever",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG56.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG56.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-奶油裱花蛋糕",
    "categoryId": "girls-cake",
    "name": "奶油裱花蛋糕",
    "brief": "6寸奶油裱花蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG57.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG57.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-白色桔梗花蛋糕",
    "categoryId": "girls-cake",
    "name": "白色桔梗花蛋糕",
    "brief": "6寸 白色桔梗花蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG58.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG58.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-鲜花红玫瑰",
    "categoryId": "girls-cake",
    "name": "鲜花红玫瑰",
    "brief": "6寸鲜花红玫瑰",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG59.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG59.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-鲜花白色桔梗花",
    "categoryId": "girls-cake",
    "name": "鲜花白色桔梗花",
    "brief": "6寸 鲜花白色桔梗花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG60.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG60.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-爱心loveyou",
    "categoryId": "girls-cake",
    "name": "爱心loveyou",
    "brief": "6寸 爱心loveyou",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG61.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG61.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约韩式裱花",
    "categoryId": "girls-cake",
    "name": "简约韩式裱花",
    "brief": "6寸简约韩式裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG62.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG62.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-羊了个羊",
    "categoryId": "girls-cake",
    "name": "羊了个羊",
    "brief": "6寸 羊了个羊",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG63.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG63.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-小熊奶油小动物",
    "categoryId": "girls-cake",
    "name": "小熊奶油小动物",
    "brief": "6寸 小熊奶油小动物",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG64.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG64.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-粉色裱花-小蛋糕",
    "categoryId": "girls-cake",
    "name": "粉色裱花➕小蛋糕",
    "brief": "6寸 粉色裱花➕小蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG65.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG65.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-仙女粉色系鲜花",
    "categoryId": "girls-cake",
    "name": "仙女粉色系鲜花",
    "brief": "6寸 仙女粉色系鲜花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG66.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG66.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-仙女裱花款",
    "categoryId": "girls-cake",
    "name": "仙女裱花款",
    "brief": "6寸 仙女裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG67.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG67.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-粉色系裱花",
    "categoryId": "girls-cake",
    "name": "粉色系裱花",
    "brief": "6寸粉色系裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG68.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG68.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-郁金香手绘",
    "categoryId": "girls-cake",
    "name": "郁金香手绘",
    "brief": "6寸郁金香手绘",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG69.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG69.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约淋面裱花",
    "categoryId": "girls-cake",
    "name": "简约淋面裱花",
    "brief": "6寸 简约淋面裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG70.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG70.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-白色系蝴蝶款",
    "categoryId": "girls-cake",
    "name": "白色系蝴蝶款",
    "brief": "6寸白色系蝴蝶款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG72.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG72.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-极简风梯形款",
    "categoryId": "girls-cake",
    "name": "极简风梯形款",
    "brief": "6寸极简风梯形款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG73.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG73.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-莓有烦恼-草莓熊",
    "categoryId": "girls-cake",
    "name": "\"莓有烦恼\"草莓熊",
    "brief": "6寸\"莓有烦恼\"草莓熊",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG74.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG74.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-鲜花蛋糕",
    "categoryId": "girls-cake",
    "name": "鲜花蛋糕",
    "brief": "6寸鲜花蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG75.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG75.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-心形纪念日蛋糕",
    "categoryId": "girls-cake",
    "name": "心形纪念日蛋糕",
    "brief": "6寸 心形纪念日蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG76.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG76.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-奶油裱花爱心淋面",
    "categoryId": "girls-cake",
    "name": "奶油裱花爱心淋面",
    "brief": "6寸 奶油裱花爱心淋面",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG77.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG77.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-复古奶油裱花",
    "categoryId": "girls-cake",
    "name": "复古奶油裱花",
    "brief": "6寸复古奶油裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG78.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG78.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-简约-卡布奇诺鲜花",
    "categoryId": "girls-cake",
    "name": "简约 卡布奇诺鲜花",
    "brief": "6寸简约 卡布奇诺鲜花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG79.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG79.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-二次元系列心形定制蛋糕",
    "categoryId": "girls-cake",
    "name": "二次元系列心形定制蛋糕",
    "brief": "6寸 二次元系列心形定制蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG80.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG80.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-裱花手绘小熊",
    "categoryId": "girls-cake",
    "name": "裱花手绘小熊",
    "brief": "6寸 裱花手绘小熊",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG81.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG81.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-维尼熊主题手绘蛋糕",
    "categoryId": "girls-cake",
    "name": "维尼熊主题手绘蛋糕",
    "brief": "6寸 维尼熊主题手绘蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG82.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG82.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-草莓奶油裱花芝士淋面",
    "categoryId": "girls-cake",
    "name": "草莓奶油裱花芝士淋面",
    "brief": "6寸草莓奶油裱花芝士淋面",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG83.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG83.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-爱心款蛋糕",
    "categoryId": "girls-cake",
    "name": "爱心款蛋糕",
    "brief": "6寸爱心款蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG84.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG84.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-草莓奶油裱花",
    "categoryId": "girls-cake",
    "name": "草莓奶油裱花",
    "brief": "6寸草莓奶油裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG85.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG85.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-异形立体小动物手绘",
    "categoryId": "girls-cake",
    "name": "异形立体小动物手绘",
    "brief": "6寸 异形立体小动物手绘",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG86.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG86.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-ins风立体小猪手绘",
    "categoryId": "girls-cake",
    "name": "ins风立体小猪手绘",
    "brief": "6寸 ins风立体小猪手绘",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG87.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG87.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-小猪猪复古手绘",
    "categoryId": "girls-cake",
    "name": "小猪猪复古手绘",
    "brief": "6寸 小猪猪复古手绘",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG88.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG88.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-猪猪立体小动物款",
    "categoryId": "girls-cake",
    "name": "猪猪立体小动物款",
    "brief": "6寸猪猪立体小动物款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG89.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG89.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-手绘草莓熊-裱花款",
    "categoryId": "girls-cake",
    "name": "手绘草莓熊 裱花款",
    "brief": "6寸 手绘草莓熊 裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG90.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG90.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-手绘kt猫",
    "categoryId": "girls-cake",
    "name": "手绘kt猫",
    "brief": "6寸手绘kt猫",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG91.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG91.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-星之卡比奶油霜",
    "categoryId": "girls-cake",
    "name": "星之卡比奶油霜",
    "brief": "6寸星之卡比奶油霜",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG92.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG92.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-立体小动物蛋糕裱花",
    "categoryId": "girls-cake",
    "name": "立体小动物蛋糕裱花",
    "brief": "6寸立体小动物蛋糕裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG93.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG93.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-立体小动物蛋糕",
    "categoryId": "girls-cake",
    "name": "立体小动物蛋糕",
    "brief": "6寸立体小动物蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG94.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG94.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-玉桂狗主题裱花款",
    "categoryId": "girls-cake",
    "name": "玉桂狗主题裱花款",
    "brief": "6寸 玉桂狗主题裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG95.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG95.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-异形立体派大星",
    "categoryId": "girls-cake",
    "name": "异形立体派大星",
    "brief": "6寸 加高异形立体派大星",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG96.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG96.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-三只立体小动物裱花",
    "categoryId": "girls-cake",
    "name": "三只立体小动物裱花",
    "brief": "6寸三只立体小动物裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG97.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG97.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-圆形猪猪翻糖定制",
    "categoryId": "girls-cake",
    "name": "圆形猪猪翻糖定制",
    "brief": "6寸 圆形猪猪翻糖定制",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG98.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG98.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-kt猫玉桂狗手绘裱花定制",
    "categoryId": "girls-cake",
    "name": "kT猫玉桂狗手绘裱花定制",
    "brief": "6寸kT猫玉桂狗手绘裱花定制",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG99.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG99.jpg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "girls-cake-8-6双层鲜花生日蛋糕",
    "categoryId": "girls-cake",
    "name": "8➕6双层鲜花生日蛋糕",
    "brief": "8➕6双层鲜花生日蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG100.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG100.jpg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "girls-cake-立体异形小熊",
    "categoryId": "girls-cake",
    "name": "立体异形小熊",
    "brief": "4寸加高立体异形小熊",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG101.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/%E5%A5%B3%E7%94%9F%E6%AC%BE%E8%9B%8B%E7%B3%95/WechatIMG101.jpg",
    "variants": [
      {
        "size": "4寸"
      }
    ]
  },
  {
    "id": "stack-mille",
    "categoryId": "stack-mille",
    "name": "堆堆千层",
    "brief": "堆堆千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/stack-mille/stack-mille-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/stack-mille/stack-mille-1.jpeg",
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
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "ty-stack-cake-生椰拿铁",
    "categoryId": "ty-stack-cake",
    "name": "生椰拿铁",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E7%94%9F%E6%A4%B0%E6%8B%BF%E9%93%81-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E7%94%9F%E6%A4%B0%E6%8B%BF%E9%93%81-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-榴芒与白糯",
    "categoryId": "ty-stack-cake",
    "name": "榴芒与白糯",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A6%B4%E8%8A%92%E4%B8%8E%E7%99%BD%E7%B3%AF-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A6%B4%E8%8A%92%E4%B8%8E%E7%99%BD%E7%B3%AF-2.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A6%B4%E8%8A%92%E4%B8%8E%E7%99%BD%E7%B3%AF-3.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A6%B4%E8%8A%92%E4%B8%8E%E7%99%BD%E7%B3%AF-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-薄荷巧克力",
    "categoryId": "ty-stack-cake",
    "name": "薄荷巧克力",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E8%96%84%E8%8D%B7%E5%B7%A7%E5%85%8B%E5%8A%9B-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E8%96%84%E8%8D%B7%E5%B7%A7%E5%85%8B%E5%8A%9B-2.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E8%96%84%E8%8D%B7%E5%B7%A7%E5%85%8B%E5%8A%9B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-杨枝甘露",
    "categoryId": "ty-stack-cake",
    "name": "杨枝甘露",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%9D%A8%E6%9E%9D%E7%94%98%E9%9C%B2-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%9D%A8%E6%9E%9D%E7%94%98%E9%9C%B2-2.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%9D%A8%E6%9E%9D%E7%94%98%E9%9C%B2-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-斑斓芋芒",
    "categoryId": "ty-stack-cake",
    "name": "斑斓芋芒",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%96%91%E6%96%93%E8%8A%8B%E8%8A%92-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%96%91%E6%96%93%E8%8A%8B%E8%8A%92-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-桃之夭夭",
    "categoryId": "ty-stack-cake",
    "name": "桃之夭夭",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A1%83%E4%B9%8B%E5%A4%AD%E5%A4%AD-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A1%83%E4%B9%8B%E5%A4%AD%E5%A4%AD-2.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E6%A1%83%E4%B9%8B%E5%A4%AD%E5%A4%AD-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-开心的榴莲",
    "categoryId": "ty-stack-cake",
    "name": "开心的榴莲",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%BC%80%E5%BF%83%E7%9A%84%E6%A6%B4%E8%8E%B2-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%BC%80%E5%BF%83%E7%9A%84%E6%A6%B4%E8%8E%B2-2.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%BC%80%E5%BF%83%E7%9A%84%E6%A6%B4%E8%8E%B2-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "ty-stack-cake-巧可遇蓝莓",
    "categoryId": "ty-stack-cake",
    "name": "巧可遇蓝莓",
    "brief": "可做6/8寸",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%B7%A7%E5%8F%AF%E9%81%87%E8%93%9D%E8%8E%93-1.jpeg",
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%B7%A7%E5%8F%AF%E9%81%87%E8%93%9D%E8%8E%93-2.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/T.y%E5%A0%86%E5%A0%86%E8%9B%8B%E7%B3%95%E7%B3%BB%E5%88%97/ty-stack-cake-%E5%B7%A7%E5%8F%AF%E9%81%87%E8%93%9D%E8%8E%93-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      },
      {
        "size": "8寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-海蓝椰椰千层",
    "categoryId": "french-mille-cake",
    "name": "海蓝椰椰千层",
    "brief": "6寸海蓝椰椰千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E6%B5%B7%E8%93%9D%E6%A4%B0%E6%A4%B0%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E6%B5%B7%E8%93%9D%E6%A4%B0%E6%A4%B0%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-开心果奶油千层",
    "categoryId": "french-mille-cake",
    "name": "开心果奶油千层",
    "brief": "6寸开心果奶油千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E5%BC%80%E5%BF%83%E6%9E%9C%E5%A5%B6%E6%B2%B9%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E5%BC%80%E5%BF%83%E6%9E%9C%E5%A5%B6%E6%B2%B9%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-伯爵红茶千层",
    "categoryId": "french-mille-cake",
    "name": "伯爵红茶千层",
    "brief": "6寸伯爵红茶千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E4%BC%AF%E7%88%B5%E7%BA%A2%E8%8C%B6%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E4%BC%AF%E7%88%B5%E7%BA%A2%E8%8C%B6%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-覆盆子草莓千层",
    "categoryId": "french-mille-cake",
    "name": "覆盆子草莓千层",
    "brief": "6寸覆盆子草莓千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%A6%86%E7%9B%86%E5%AD%90%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%A6%86%E7%9B%86%E5%AD%90%E8%8D%89%E8%8E%93%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-超薄抹茶千层",
    "categoryId": "french-mille-cake",
    "name": "超薄抹茶千层",
    "brief": "6寸超薄抹茶千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%B6%85%E8%96%84%E6%8A%B9%E8%8C%B6%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%B6%85%E8%96%84%E6%8A%B9%E8%8C%B6%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "french-mille-cake-超薄榴莲千层",
    "categoryId": "french-mille-cake",
    "name": "超薄榴莲千层",
    "brief": "6寸超薄榴莲千层",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%B6%85%E8%96%84%E6%A6%B4%E8%8E%B2%E5%8D%83%E5%B1%82-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/french-mille-cake/french-mille-cake-%E8%B6%85%E8%96%84%E6%A6%B4%E8%8E%B2%E5%8D%83%E5%B1%82-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-水果多多-应季水果",
    "categoryId": "boys-cake",
    "name": "水果多多(应季水果",
    "brief": "6寸水果多多（应季水果",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B0%B4%E6%9E%9C%E5%A4%9A%E5%A4%9A-%E5%BA%94%E5%AD%A3%E6%B0%B4%E6%9E%9C-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B0%B4%E6%9E%9C%E5%A4%9A%E5%A4%9A-%E5%BA%94%E5%AD%A3%E6%B0%B4%E6%9E%9C-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-简约水果款",
    "categoryId": "boys-cake",
    "name": "简约水果款",
    "brief": "6寸简约水果款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%B0%B4%E6%9E%9C%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%B0%B4%E6%9E%9C%E6%AC%BE-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-简约款-1",
    "categoryId": "boys-cake",
    "name": "简约款_1",
    "brief": "6寸简约款_1",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-1-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-简约款-2",
    "categoryId": "boys-cake",
    "name": "简约款_2",
    "brief": "6寸简约款_2",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-2-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-2-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-当地小有名气的好老公",
    "categoryId": "boys-cake",
    "name": "当地小有名气的好老公",
    "brief": "6寸当地小有名气的好老公",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%BD%93%E5%9C%B0%E5%B0%8F%E6%9C%89%E5%90%8D%E6%B0%94%E7%9A%84%E5%A5%BD%E8%80%81%E5%85%AC-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%BD%93%E5%9C%B0%E5%B0%8F%E6%9C%89%E5%90%8D%E6%B0%94%E7%9A%84%E5%A5%BD%E8%80%81%E5%85%AC-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-男士胡子纽扣",
    "categoryId": "boys-cake",
    "name": "男士胡子纽扣",
    "brief": "6寸男士胡子纽扣",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%94%B7%E5%A3%AB%E8%83%A1%E5%AD%90%E7%BA%BD%E6%89%A3-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%94%B7%E5%A3%AB%E8%83%A1%E5%AD%90%E7%BA%BD%E6%89%A3-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-海盐奥利奥口味奶油",
    "categoryId": "boys-cake",
    "name": "海盐奥利奥口味奶油",
    "brief": "6寸海盐奥利奥口味奶油",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B5%B7%E7%9B%90%E5%A5%A5%E5%88%A9%E5%A5%A5%E5%8F%A3%E5%91%B3%E5%A5%B6%E6%B2%B9-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B5%B7%E7%9B%90%E5%A5%A5%E5%88%A9%E5%A5%A5%E5%8F%A3%E5%91%B3%E5%A5%B6%E6%B2%B9-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-灰色富士山",
    "categoryId": "boys-cake",
    "name": "灰色富士山",
    "brief": "6寸灰色富士山",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%81%B0%E8%89%B2%E5%AF%8C%E5%A3%AB%E5%B1%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%81%B0%E8%89%B2%E5%AF%8C%E5%A3%AB%E5%B1%B1-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-北极熊主题",
    "categoryId": "boys-cake",
    "name": "北极熊主题",
    "brief": "6寸北极熊主题",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%8C%97%E6%9E%81%E7%86%8A%E4%B8%BB%E9%A2%98-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%8C%97%E6%9E%81%E7%86%8A%E4%B8%BB%E9%A2%98-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-暗黑富士山",
    "categoryId": "boys-cake",
    "name": "暗黑富士山",
    "brief": "6寸暗黑富士山",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%9A%97%E9%BB%91%E5%AF%8C%E5%A3%AB%E5%B1%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%9A%97%E9%BB%91%E5%AF%8C%E5%A3%AB%E5%B1%B1-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-三十而立",
    "categoryId": "boys-cake",
    "name": "三十而立",
    "brief": "6寸 三十而立",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E4%B8%89%E5%8D%81%E8%80%8C%E7%AB%8B-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E4%B8%89%E5%8D%81%E8%80%8C%E7%AB%8B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-小熊手绘头像",
    "categoryId": "boys-cake",
    "name": "小熊手绘头像",
    "brief": "6寸 小熊手绘头像",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%B0%8F%E7%86%8A%E6%89%8B%E7%BB%98%E5%A4%B4%E5%83%8F-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%B0%8F%E7%86%8A%E6%89%8B%E7%BB%98%E5%A4%B4%E5%83%8F-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-黑白二次元蛋糕",
    "categoryId": "boys-cake",
    "name": "黑白二次元蛋糕",
    "brief": "6寸 黑白二次元蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%BB%91%E7%99%BD%E4%BA%8C%E6%AC%A1%E5%85%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%BB%91%E7%99%BD%E4%BA%8C%E6%AC%A1%E5%85%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-小熊翻糖蝴蝶结",
    "categoryId": "boys-cake",
    "name": "小熊翻糖蝴蝶结",
    "brief": "6寸小熊翻糖蝴蝶结",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%B0%8F%E7%86%8A%E7%BF%BB%E7%B3%96%E8%9D%B4%E8%9D%B6%E7%BB%93-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%B0%8F%E7%86%8A%E7%BF%BB%E7%B3%96%E8%9D%B4%E8%9D%B6%E7%BB%93-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-灰色巧克力零食款",
    "categoryId": "boys-cake",
    "name": "灰色巧克力零食款",
    "brief": "6寸 灰色巧克力零食款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%81%B0%E8%89%B2%E5%B7%A7%E5%85%8B%E5%8A%9B%E9%9B%B6%E9%A3%9F%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%81%B0%E8%89%B2%E5%B7%A7%E5%85%8B%E5%8A%9B%E9%9B%B6%E9%A3%9F%E6%AC%BE-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-方形风生水起",
    "categoryId": "boys-cake",
    "name": "方形风生水起",
    "brief": "6寸方形风生水起",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%96%B9%E5%BD%A2%E9%A3%8E%E7%94%9F%E6%B0%B4%E8%B5%B7-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%96%B9%E5%BD%A2%E9%A3%8E%E7%94%9F%E6%B0%B4%E8%B5%B7-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-风生水起",
    "categoryId": "boys-cake",
    "name": "风生水起",
    "brief": "6寸风生水起",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%A3%8E%E7%94%9F%E6%B0%B4%E8%B5%B7-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%A3%8E%E7%94%9F%E6%B0%B4%E8%B5%B7-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-多财多亿-可改颜色",
    "categoryId": "boys-cake",
    "name": "多财多亿(可改颜色)",
    "brief": "6寸多财多亿（可改颜色）",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%A4%9A%E8%B4%A2%E5%A4%9A%E4%BA%BF-%E5%8F%AF%E6%94%B9%E9%A2%9C%E8%89%B2-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E5%A4%9A%E8%B4%A2%E5%A4%9A%E4%BA%BF-%E5%8F%AF%E6%94%B9%E9%A2%9C%E8%89%B2-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-男士款黑金方形蛋糕",
    "categoryId": "boys-cake",
    "name": "男士款黑金方形蛋糕",
    "brief": "6寸 男士款黑金方形蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%94%B7%E5%A3%AB%E6%AC%BE%E9%BB%91%E9%87%91%E6%96%B9%E5%BD%A2%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%94%B7%E5%A3%AB%E6%AC%BE%E9%BB%91%E9%87%91%E6%96%B9%E5%BD%A2%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-简约ins风",
    "categoryId": "boys-cake",
    "name": "简约ins风",
    "brief": "6寸简约ins风",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6ins%E9%A3%8E-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E7%AE%80%E7%BA%A6ins%E9%A3%8E-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-4ins简约蛋糕",
    "categoryId": "boys-cake",
    "name": "4ins简约蛋糕",
    "brief": "4ins简约蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-4ins%E7%AE%80%E7%BA%A6%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-4ins%E7%AE%80%E7%BA%A6%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "boys-cake-海浪蛋糕",
    "categoryId": "boys-cake",
    "name": "海浪蛋糕",
    "brief": "6寸海浪蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B5%B7%E6%B5%AA%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E6%B5%B7%E6%B5%AA%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "boys-cake-黑玫瑰",
    "categoryId": "boys-cake",
    "name": "黑玫瑰",
    "brief": "4寸黑玫瑰",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%BB%91%E7%8E%AB%E7%91%B0-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/boys-cake/boys-cake-%E9%BB%91%E7%8E%AB%E7%91%B0-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      }
    ]
  },
  {
    "id": "basque-cake-伯爵红茶巴斯克",
    "categoryId": "basque-cake",
    "name": "伯爵红茶巴斯克",
    "brief": "6寸伯爵红茶巴斯克",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E4%BC%AF%E7%88%B5%E7%BA%A2%E8%8C%B6%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E4%BC%AF%E7%88%B5%E7%BA%A2%E8%8C%B6%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "basque-cake-树莓开心果巴斯克",
    "categoryId": "basque-cake",
    "name": "树莓开心果巴斯克",
    "brief": "6寸树莓开心果巴斯克",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E6%A0%91%E8%8E%93%E5%BC%80%E5%BF%83%E6%9E%9C%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E6%A0%91%E8%8E%93%E5%BC%80%E5%BF%83%E6%9E%9C%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "basque-cake-柠檬巴斯克",
    "categoryId": "basque-cake",
    "name": "柠檬巴斯克",
    "brief": "6寸柠檬巴斯克",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E6%9F%A0%E6%AA%AC%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E6%9F%A0%E6%AA%AC%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "basque-cake-奥利奥生巧巴斯克",
    "categoryId": "basque-cake",
    "name": "奥利奥生巧巴斯克",
    "brief": "6寸奥利奥生巧巴斯克",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E5%A5%A5%E5%88%A9%E5%A5%A5%E7%94%9F%E5%B7%A7%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/basque-cake/basque-cake-%E5%A5%A5%E5%88%A9%E5%A5%A5%E7%94%9F%E5%B7%A7%E5%B7%B4%E6%96%AF%E5%85%8B-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "tiramisu-cake-经典提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "经典提拉米苏",
    "brief": "6寸经典提拉米苏",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E7%BB%8F%E5%85%B8%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E7%BB%8F%E5%85%B8%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "tiramisu-cake-柠檬提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "柠檬提拉米苏",
    "brief": "6寸柠檬提拉米苏",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E6%9F%A0%E6%AA%AC%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E6%9F%A0%E6%AA%AC%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "tiramisu-cake-抹茶茉莉提拉米苏",
    "categoryId": "tiramisu-cake",
    "name": "抹茶茉莉提拉米苏",
    "brief": "6寸抹茶茉莉提拉米苏",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E6%8A%B9%E8%8C%B6%E8%8C%89%E8%8E%89%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/tiramisu-cake/tiramisu-cake-%E6%8A%B9%E8%8C%B6%E8%8C%89%E8%8E%89%E6%8F%90%E6%8B%89%E7%B1%B3%E8%8B%8F-1.jpeg",
    "variants": [
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "ins-swiss-roll",
    "categoryId": "ins-swiss-roll",
    "name": "Ins 瑞士卷",
    "brief": "Ins 瑞士卷",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/Ins%E7%91%9E%E5%A3%AB%E5%8D%B7/WechatIMG203.jpg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/Ins%E7%91%9E%E5%A3%AB%E5%8D%B7/WechatIMG203.jpg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 0,
        "max": 1,
        "items": [
          {
            "id": "qiaokelicuipi",
            "name": "巧克力脆皮瑞士卷"
          },
          {
            "id": "hongsiling",
            "name": "红丝绒瑞士卷"
          },
          {
            "id": "heijincaomacha",
            "name": "黑金抹茶瑞士卷"
          },
          {
            "id": "jiaotangbinggan",
            "name": "焦糖饼干瑞士卷"
          },
          {
            "id": "yuanwei",
            "name": "原味瑞士卷"
          },
          {
            "id": "shuangchongkaixin-guo",
            "name": "双重开心果瑞士卷"
          },
          {
            "id": "xiangyu",
            "name": "香芋瑞士卷"
          },
          {
            "id": "jixin-yuni-plus-mangguo",
            "name": "夹心芋泥＋芒果"
          },
          {
            "id": "banlianyezi",
            "name": "斑斓椰子瑞士卷"
          },
          {
            "id": "bojuanhongcha",
            "name": "伯爵红茶瑞士"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "cake-accessories-礼花帽",
    "categoryId": "cake-accessories",
    "name": "礼花帽",
    "brief": "礼花帽",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E7%A4%BC%E8%8A%B1%E5%B8%BD-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E7%A4%BC%E8%8A%B1%E5%B8%BD-1.jpeg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "cake-accessories-薄纱帽",
    "categoryId": "cake-accessories",
    "name": "薄纱帽",
    "brief": "薄纱帽",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E8%96%84%E7%BA%B1%E5%B8%BD-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E8%96%84%E7%BA%B1%E5%B8%BD-1.jpeg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "cake-accessories-星星帽",
    "categoryId": "cake-accessories",
    "name": "星星帽",
    "brief": "星星帽",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E6%98%9F%E6%98%9F%E5%B8%BD-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/cake-accessories/cake-accessories-%E6%98%9F%E6%98%9F%E5%B8%BD-1.jpeg",
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-方形礼物蛋糕",
    "categoryId": "cake-4inch",
    "name": "方形礼物蛋糕",
    "brief": "方形礼物蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%96%B9%E5%BD%A2%E7%A4%BC%E7%89%A9%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%96%B9%E5%BD%A2%E7%A4%BC%E7%89%A9%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-ins钻石糖蛋糕",
    "categoryId": "cake-4inch",
    "name": "INS钻石糖蛋糕",
    "brief": "INS钻石糖蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E9%92%BB%E7%9F%B3%E7%B3%96%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E9%92%BB%E7%9F%B3%E7%B3%96%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-简约奥利奥",
    "categoryId": "cake-4inch",
    "name": "简约奥利奥",
    "brief": "简约奥利奥",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%A5%A5%E5%88%A9%E5%A5%A5-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%A5%A5%E5%88%A9%E5%A5%A5-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-简约款",
    "categoryId": "cake-4inch",
    "name": "简约款",
    "brief": "简约款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-抱抱熊蛋糕",
    "categoryId": "cake-4inch",
    "name": "抱抱熊蛋糕",
    "brief": "抱抱熊蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%8A%B1%E6%8A%B1%E7%86%8A%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%8A%B1%E6%8A%B1%E7%86%8A%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-线条小狗蛋糕",
    "categoryId": "cake-4inch",
    "name": "线条小狗蛋糕",
    "brief": "线条小狗蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%BA%BF%E6%9D%A1%E5%B0%8F%E7%8B%97%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%BA%BF%E6%9D%A1%E5%B0%8F%E7%8B%97%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-ins可爱奶油霜",
    "categoryId": "cake-4inch",
    "name": "INS可爱奶油霜",
    "brief": "INS可爱奶油霜",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E5%8F%AF%E7%88%B1%E5%A5%B6%E6%B2%B9%E9%9C%9C-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E5%8F%AF%E7%88%B1%E5%A5%B6%E6%B2%B9%E9%9C%9C-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-主题爱心糖牌",
    "categoryId": "cake-4inch",
    "name": "主题爱心糖牌",
    "brief": "主题爱心糖牌",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E4%B8%BB%E9%A2%98%E7%88%B1%E5%BF%83%E7%B3%96%E7%89%8C-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E4%B8%BB%E9%A2%98%E7%88%B1%E5%BF%83%E7%B3%96%E7%89%8C-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-玫红love-you",
    "categoryId": "cake-4inch",
    "name": "玫红LOVE YOU",
    "brief": "玫红LOVE YOU",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%8E%AB%E7%BA%A2love-you-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%8E%AB%E7%BA%A2love-you-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-可爱雪人款",
    "categoryId": "cake-4inch",
    "name": "可爱雪人款",
    "brief": "可爱雪人款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%8F%AF%E7%88%B1%E9%9B%AA%E4%BA%BA%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%8F%AF%E7%88%B1%E9%9B%AA%E4%BA%BA%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-基础款蛋糕",
    "categoryId": "cake-4inch",
    "name": "基础款蛋糕",
    "brief": "基础款蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%9F%BA%E7%A1%80%E6%AC%BE%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%9F%BA%E7%A1%80%E6%AC%BE%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-水果基础款",
    "categoryId": "cake-4inch",
    "name": "水果基础款",
    "brief": "水果基础款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%B0%B4%E6%9E%9C%E5%9F%BA%E7%A1%80%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E6%B0%B4%E6%9E%9C%E5%9F%BA%E7%A1%80%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-简约字母款",
    "categoryId": "cake-4inch",
    "name": "简约字母款",
    "brief": "简约字母款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%AD%97%E6%AF%8D%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%AD%97%E6%AF%8D%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-基础水果款",
    "categoryId": "cake-4inch",
    "name": "基础水果款",
    "brief": "基础水果款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%9F%BA%E7%A1%80%E6%B0%B4%E6%9E%9C%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%9F%BA%E7%A1%80%E6%B0%B4%E6%9E%9C%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-紫色氛围鲜花",
    "categoryId": "cake-4inch",
    "name": "紫色氛围鲜花",
    "brief": "紫色氛围鲜花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%B4%AB%E8%89%B2%E6%B0%9B%E5%9B%B4%E9%B2%9C%E8%8A%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%B4%AB%E8%89%B2%E6%B0%9B%E5%9B%B4%E9%B2%9C%E8%8A%B1-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-小熊玩偶款",
    "categoryId": "cake-4inch",
    "name": "小熊玩偶款",
    "brief": "小熊玩偶款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%B0%8F%E7%86%8A%E7%8E%A9%E5%81%B6%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%B0%8F%E7%86%8A%E7%8E%A9%E5%81%B6%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-简约字幕款",
    "categoryId": "cake-4inch",
    "name": "简约字幕款",
    "brief": "简约字幕款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%AD%97%E5%B9%95%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E5%AD%97%E5%B9%95%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-小熊蜡烛款",
    "categoryId": "cake-4inch",
    "name": "小熊蜡烛款",
    "brief": "小熊蜡烛款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%B0%8F%E7%86%8A%E8%9C%A1%E7%83%9B%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%B0%8F%E7%86%8A%E8%9C%A1%E7%83%9B%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-女生鲜花蛋糕",
    "categoryId": "cake-4inch",
    "name": "女生鲜花蛋糕",
    "brief": "女生鲜花蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%A5%B3%E7%94%9F%E9%B2%9C%E8%8A%B1%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%A5%B3%E7%94%9F%E9%B2%9C%E8%8A%B1%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-ins简约款",
    "categoryId": "cake-4inch",
    "name": "INS简约款",
    "brief": "INS简约款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E7%AE%80%E7%BA%A6%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E7%AE%80%E7%BA%A6%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-粉色爱心款",
    "categoryId": "cake-4inch",
    "name": "粉色爱心款",
    "brief": "粉色爱心款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%B2%89%E8%89%B2%E7%88%B1%E5%BF%83%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%B2%89%E8%89%B2%E7%88%B1%E5%BF%83%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-奶油霜宝宝小狗",
    "categoryId": "cake-4inch",
    "name": "奶油霜宝宝小狗",
    "brief": "奶油霜宝宝小狗",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%A5%B6%E6%B2%B9%E9%9C%9C%E5%AE%9D%E5%AE%9D%E5%B0%8F%E7%8B%97-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E5%A5%B6%E6%B2%B9%E9%9C%9C%E5%AE%9D%E5%AE%9D%E5%B0%8F%E7%8B%97-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-鲜花复古蛋糕",
    "categoryId": "cake-4inch",
    "name": "鲜花复古蛋糕",
    "brief": "鲜花复古蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E9%B2%9C%E8%8A%B1%E5%A4%8D%E5%8F%A4%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E9%B2%9C%E8%8A%B1%E5%A4%8D%E5%8F%A4%E8%9B%8B%E7%B3%95-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-草莓公主款",
    "categoryId": "cake-4inch",
    "name": "草莓公主款",
    "brief": "草莓公主款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E8%8D%89%E8%8E%93%E5%85%AC%E4%B8%BB%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E8%8D%89%E8%8E%93%E5%85%AC%E4%B8%BB%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-ins草莓款",
    "categoryId": "cake-4inch",
    "name": "INS草莓款",
    "brief": "INS草莓款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E8%8D%89%E8%8E%93%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-ins%E8%8D%89%E8%8E%93%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "four-inch-cake-简约草莓款",
    "categoryId": "cake-4inch",
    "name": "简约草莓款",
    "brief": "简约草莓款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E8%8D%89%E8%8E%93%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/four-inch-cake/four-inch-cake-%E7%AE%80%E7%BA%A6%E8%8D%89%E8%8E%93%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-主题淋面款",
    "categoryId": "cake-8inch",
    "name": "主题淋面款",
    "brief": "主题淋面款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E4%B8%BB%E9%A2%98%E6%B7%8B%E9%9D%A2%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E4%B8%BB%E9%A2%98%E6%B7%8B%E9%9D%A2%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins风仙女款",
    "categoryId": "cake-8inch",
    "name": "INS风仙女款",
    "brief": "INS风仙女款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E9%A3%8E%E4%BB%99%E5%A5%B3%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E9%A3%8E%E4%BB%99%E5%A5%B3%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-爱心裱花款",
    "categoryId": "cake-8inch",
    "name": "爱心裱花款",
    "brief": "爱心裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%88%B1%E5%BF%83%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%88%B1%E5%BF%83%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-kitty猫翻糖款",
    "categoryId": "cake-8inch",
    "name": "KITTY猫翻糖款",
    "brief": "KITTY猫翻糖款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-kitty%E7%8C%AB%E7%BF%BB%E7%B3%96%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-kitty%E7%8C%AB%E7%BF%BB%E7%B3%96%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins裱花款",
    "categoryId": "cake-8inch",
    "name": "INS裱花款",
    "brief": "INS裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-粉粉爱心",
    "categoryId": "cake-8inch",
    "name": "粉粉爱心",
    "brief": "粉粉爱心",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%B2%89%E7%B2%89%E7%88%B1%E5%BF%83-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%B2%89%E7%B2%89%E7%88%B1%E5%BF%83-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-简约水果裱花",
    "categoryId": "cake-8inch",
    "name": "简约水果裱花",
    "brief": "简约水果裱花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%AE%80%E7%BA%A6%E6%B0%B4%E6%9E%9C%E8%A3%B1%E8%8A%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%AE%80%E7%BA%A6%E6%B0%B4%E6%9E%9C%E8%A3%B1%E8%8A%B1-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-水果多多款",
    "categoryId": "cake-8inch",
    "name": "水果多多款",
    "brief": "水果多多款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E6%B0%B4%E6%9E%9C%E5%A4%9A%E5%A4%9A%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E6%B0%B4%E6%9E%9C%E5%A4%9A%E5%A4%9A%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-青提table-cake",
    "categoryId": "cake-8inch",
    "name": "青提TABLE CAKE",
    "brief": "青提TABLE CAKE",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E9%9D%92%E6%8F%90table-cake-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E9%9D%92%E6%8F%90table-cake-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-翻糖蝴蝶结",
    "categoryId": "cake-8inch",
    "name": "翻糖蝴蝶结",
    "brief": "翻糖蝴蝶结",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%BF%BB%E7%B3%96%E8%9D%B4%E8%9D%B6%E7%BB%93-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%BF%BB%E7%B3%96%E8%9D%B4%E8%9D%B6%E7%BB%93-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-许愿池与花",
    "categoryId": "cake-8inch",
    "name": "许愿池与花",
    "brief": "许愿池与花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E8%AE%B8%E6%84%BF%E6%B1%A0%E4%B8%8E%E8%8A%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E8%AE%B8%E6%84%BF%E6%B1%A0%E4%B8%8E%E8%8A%B1-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-ins天使款",
    "categoryId": "cake-8inch",
    "name": "INS天使款",
    "brief": "INS天使款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E5%A4%A9%E4%BD%BF%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-ins%E5%A4%A9%E4%BD%BF%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-可爱小狗",
    "categoryId": "cake-8inch",
    "name": "可爱小狗",
    "brief": "可爱小狗",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E5%8F%AF%E7%88%B1%E5%B0%8F%E7%8B%97-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E5%8F%AF%E7%88%B1%E5%B0%8F%E7%8B%97-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-青提与鲜花",
    "categoryId": "cake-8inch",
    "name": "青提与鲜花",
    "brief": "青提与鲜花",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E9%9D%92%E6%8F%90%E4%B8%8E%E9%B2%9C%E8%8A%B1-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E9%9D%92%E6%8F%90%E4%B8%8E%E9%B2%9C%E8%8A%B1-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-kitty猫款",
    "categoryId": "cake-8inch",
    "name": "KITTY猫款",
    "brief": "KITTY猫款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-kitty%E7%8C%AB%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-kitty%E7%8C%AB%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-粉粉kt猫",
    "categoryId": "cake-8inch",
    "name": "粉粉KT猫",
    "brief": "粉粉KT猫",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%B2%89%E7%B2%89kt%E7%8C%AB-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E7%B2%89%E7%B2%89kt%E7%8C%AB-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "eight-inch-cake-氛围裱花款",
    "categoryId": "cake-8inch",
    "name": "氛围裱花款",
    "brief": "氛围裱花款",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E6%B0%9B%E5%9B%B4%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/eight-inch-cake/eight-inch-cake-%E6%B0%9B%E5%9B%B4%E8%A3%B1%E8%8A%B1%E6%AC%BE-1.jpeg",
    "groups": [
      {
        "key": "variant",
        "title": "可选尺寸",
        "type": "single",
        "min": 1,
        "max": 1,
        "items": [
          {
            "id": "默认",
            "name": "默认"
          }
        ]
      },
      {
        "key": "extras",
        "title": "蛋糕夹心",
        "type": "multi",
        "min": 1,
        "max": 2,
        "items": [
          {
            "id": "aoliao-3set",
            "name": "奥利奥三件套"
          },
          {
            "id": "yennai-dongzi",
            "name": "椰奶冻子"
          },
          {
            "id": "yuanwei-naidong",
            "name": "原味奶冻"
          },
          {
            "id": "matcha-naidong",
            "name": "抹茶奶冻"
          },
          {
            "id": "bojuanhongcha-naidong",
            "name": "伯爵红茶奶冻"
          },
          {
            "id": "putao-naidong",
            "name": "葡萄奶冻"
          },
          {
            "id": "yuni-naidong",
            "name": "芋泥奶冻"
          },
          {
            "id": "zizhi-yuni",
            "name": "自制芋泥"
          },
          {
            "id": "mashu",
            "name": "麻薯"
          },
          {
            "id": "xuenoumi",
            "name": "血糯米"
          },
          {
            "id": "yelong-baichao",
            "name": "椰蓉白巧"
          },
          {
            "id": "chocolate-mousse",
            "name": "巧克力慕斯"
          },
          {
            "id": "raspberry-mousse",
            "name": "树莓慕斯"
          },
          {
            "id": "pistachio-mousse",
            "name": "开心果慕斯"
          },
          {
            "id": "mango-strawberry",
            "name": "芒果草莓"
          },
          {
            "id": "blueberry-mix",
            "name": "蓝莓and新鲜蓝莓酱"
          },
          {
            "id": "grape-green-red",
            "name": "青提/红提"
          },
          {
            "id": "honeydew",
            "name": "网纹瓜 /蜜瓜"
          },
          {
            "id": "yellow-peach",
            "name": "黄桃罐头"
          },
          {
            "id": "banana-choco",
            "name": "香蕉巧克力"
          }
        ]
      }
    ],
    "variants": [
      {
        "size": "默认"
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮抹茶瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮抹茶瀑布蛋糕",
    "brief": "虎皮抹茶瀑布蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E6%8A%B9%E8%8C%B6%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E6%8A%B9%E8%8C%B6%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮椰蓝瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮椰蓝瀑布蛋糕",
    "brief": "虎皮椰蓝瀑布蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E6%A4%B0%E8%93%9D%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E6%A4%B0%E8%93%9D%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮红丝绒瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮红丝绒瀑布蛋糕",
    "brief": "虎皮红丝绒瀑布蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E7%BA%A2%E4%B8%9D%E7%BB%92%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E7%BA%A2%E4%B8%9D%E7%BB%92%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮芋泥瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮芋泥瀑布蛋糕",
    "brief": "虎皮芋泥瀑布蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E8%8A%8B%E6%B3%A5%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E8%8A%8B%E6%B3%A5%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "lava-waterfall-虎皮巧克力瀑布蛋糕",
    "categoryId": "lava-waterfall",
    "name": "虎皮巧克力瀑布蛋糕",
    "brief": "虎皮巧克力瀑布蛋糕",
    "images": [
      "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E5%B7%A7%E5%85%8B%E5%8A%9B%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg"
    ],
    "cover": "https://cloud1-7gk4rj31c1fce8b0-1380779246.tcloudbaseapp.com/prod-images/lava-waterfall/lava-waterfall-%E8%99%8E%E7%9A%AE%E5%B7%A7%E5%85%8B%E5%8A%9B%E7%80%91%E5%B8%83%E8%9B%8B%E7%B3%95-1.jpeg",
    "variants": [
      {
        "size": "4寸"
      },
      {
        "size": "6寸"
      }
    ]
  },
  {
    "id": "korean-cream-pie-韩式脆皮奶油派",
    "categoryId": "korean-cream-pie",
    "name": "韩式脆皮奶油派",
    "brief": "",
    "cover": "cloud://cloud1-7gk4rj31c1fce8b0.636c-cloud1-7gk4rj31c1fce8b0-1380779246/prod-images/韩式脆皮奶油派/WechatIMG170.jpg",
    "images": [
      "cloud://cloud1-7gk4rj31c1fce8b0.636c-cloud1-7gk4rj31c1fce8b0-1380779246/prod-images/韩式脆皮奶油派/WechatIMG170.jpg"
    ],
    "variants": [
      {
        "size": "玉米派"
      },
      {
        "size": "草莓派"
      },
      {
        "size": "开心果奶油"
      },
      {
        "size": "栗子味儿"
      },
      {
        "size": "薄荷青提奶油派"
      },
      {
        "size": "蜜桃派"
      }
    ],
    "sort": 1300
  }
];

module.exports = { categories, products };
