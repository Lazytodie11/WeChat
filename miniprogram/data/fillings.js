// 口味夹心配置
const FILLINGS = [
  "奥利奥三件套","椰奶冻子","原味奶冻","抹茶奶冻","伯爵红茶奶冻","葡萄奶冻","芋泥奶冻","自制芋泥",
  "麻薯","血糯米","椰蓉白巧","巧克力慕斯","树莓慕斯","开心果慕斯",
  "芒果草莓","蓝莓and新鲜蓝莓酱","青提/红提","网纹瓜 /蜜瓜","黄桃罐头","香蕉巧克力"
];
const FILLINGS_LIMIT = { min: 1, max: 2 };
const FILLINGS_ENABLED_CATEGORIES = new Set(["cake-4inch","cake-8inch"]);
// 价格预留（当前不启用加价逻辑）
const FILLING_PRICING = { };

module.exports = { FILLINGS, FILLINGS_LIMIT, FILLINGS_ENABLED_CATEGORIES, FILLING_PRICING };
