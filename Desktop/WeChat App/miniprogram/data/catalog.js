// 数据源：分类与商品
// 字段：id, categoryId, name, price, brief, cover

const categories = [
  { id: 'cakes', name: '蛋糕' },
  { id: 'drinks', name: '饮品' },
  { id: 'snacks', name: '小食' },
];

const products = [
  { id: 'p1', categoryId: 'cakes', name: '草莓蛋糕', price: 28, brief: '新鲜草莓搭配奶油', cover: '/assets/p1.jpg' },
  { id: 'p2', categoryId: 'cakes', name: '巧克力蛋糕', price: 26, brief: '丝滑巧克力口味', cover: '/assets/p2.jpg' },
  { id: 'p3', categoryId: 'cakes', name: '芝士蛋糕', price: 32, brief: '醇厚芝士', cover: '/assets/p3.jpg' },
  { id: 'p4', categoryId: 'drinks', name: '拿铁咖啡', price: 18, brief: '顺滑拿铁', cover: '/assets/p4.jpg' },
  { id: 'p5', categoryId: 'drinks', name: '抹茶拿铁', price: 20, brief: '清新抹茶', cover: '/assets/p5.jpg' },
  { id: 'p6', categoryId: 'drinks', name: '鲜榨橙汁', price: 16, brief: '每日鲜榨', cover: '/assets/p6.jpg' },
  { id: 'p7', categoryId: 'snacks', name: '曲奇饼干', price: 10, brief: '黄油香味', cover: '/assets/p7.jpg' },
  { id: 'p8', categoryId: 'snacks', name: '马卡龙', price: 12, brief: '缤纷口味', cover: '/assets/p8.jpg' },
];

module.exports = { categories, products };

