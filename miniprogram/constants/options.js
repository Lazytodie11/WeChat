// 统一的口味/夹心常量（Ins 瑞士卷、堆堆千层、4/8 寸）
const INS_ROLL_FLAVORS = [
  { id: 'qiaokelicuipi', name: '巧克力脆皮瑞士卷' },
  { id: 'hongsiling', name: '红丝绒瑞士卷' },
  { id: 'heijincaomacha', name: '黑金抹茶瑞士卷' },
  { id: 'jiaotangbinggan', name: '焦糖饼干瑞士卷' },
  { id: 'yuanwei', name: '原味瑞士卷' },
  { id: 'shuangchongkaixin-guo', name: '双重开心果瑞士卷' },
  { id: 'xiangyu', name: '香芋瑞士卷' },
  { id: 'jixin-yuni-plus-mangguo', name: '夹心芋泥＋芒果' },
  { id: 'banlianyezi', name: '斑斓椰子瑞士卷' },
  { id: 'bojuanhongcha', name: '伯爵红茶瑞士' }
];

// 堆堆千层（T·y/T.y）可选“口味/夹心”列表（单选）
const TY_MILLE_FLAVORS = [
  { id: 'mashu', name: '麻薯' },
  { id: 'xuenoumi', name: '血糯米' },
  { id: 'yuni', name: '芋泥' },
  { id: 'aoliao', name: '奥利奥' },
  { id: 'hazelnut-choco-sauce', name: '榛子巧克力酱' },
  { id: 'sea-salt-oreo-mousse', name: '海盐奥利奥奶芙' },
  { id: 'pistachio-mousse', name: '开心果奶芙' },
  { id: 'mango', name: '芒果' },
  { id: 'blueberry', name: '蓝莓' },
  { id: 'red-grape', name: '红提' },
  { id: 'green-grape', name: '青提' },
  { id: 'pineapple', name: '凤梨' },
  { id: 'strawberry', name: '草莓' },
  { id: 'yellow-peach', name: '黄桃（罐头）' },
  { id: 'durian-80g', name: '榴莲（80g)' },
  { id: 'hami-melon', name: '哈密瓜' },
  { id: 'banana', name: '香蕉' },
  { id: 'nuts-granola', name: '坚果燕麦脆' },
  { id: 'almond-granola', name: '杏仁燕麦脆' },
  { id: 'matcha-mousse', name: '抹茶慕斯' },
  { id: 'mulberry-mousse', name: '桑葚慕斯' },
  { id: 'cocoa-panna', name: '可可奶冻' },
  { id: 'earlgrey-panna', name: '伯爵红茶奶冻' },
  { id: 'pistachio-panna', name: '开心果奶冻' },
  { id: 'coconut-panna', name: '椰奶冻' },
  { id: 'creme-brulee', name: '焦糖布雷' },
  { id: 'berry-couli', name: '莓果库里' }
];

const CAKE_FILLINGS = [
  { id: 'aoliao-3set', name: '奥利奥三件套' },
  { id: 'yennai-dongzi', name: '椰奶冻子' },
  { id: 'yuanwei-naidong', name: '原味奶冻' },
  { id: 'matcha-naidong', name: '抹茶奶冻' },
  { id: 'bojuanhongcha-naidong', name: '伯爵红茶奶冻' },
  { id: 'putao-naidong', name: '葡萄奶冻' },
  { id: 'yuni-naidong', name: '芋泥奶冻' },
  { id: 'zizhi-yuni', name: '自制芋泥' },
  { id: 'mashu', name: '麻薯' },
  { id: 'xuenoumi', name: '血糯米' },
  { id: 'yelong-baichao', name: '椰蓉白巧' },
  { id: 'chocolate-mousse', name: '巧克力慕斯' },
  { id: 'raspberry-mousse', name: '树莓慕斯' },
  { id: 'pistachio-mousse', name: '开心果慕斯' },
  { id: 'mango-strawberry', name: '芒果草莓' },
  { id: 'blueberry-mix', name: '蓝莓and新鲜蓝莓酱' },
  { id: 'grape-green-red', name: '青提/红提' },
  { id: 'honeydew', name: '网纹瓜 /蜜瓜' },
  { id: 'yellow-peach', name: '黄桃罐头' },
  { id: 'banana-choco', name: '香蕉巧克力' }
];

module.exports = { INS_ROLL_FLAVORS, TY_MILLE_FLAVORS, CAKE_FILLINGS };
 
