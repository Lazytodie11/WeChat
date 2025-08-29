const cart = require('../../utils/cart');

const categories = [
  { id: 'cakes', name: '蛋糕' },
  { id: 'drinks', name: '饮品' },
  { id: 'snacks', name: '小食' }
];

const goods = [
  { id: 'p1', cat: 'cakes', name: '草莓蛋糕', price: 28, image: 'assets/p1.jpg', desc: '新鲜草莓搭配奶油' },
  { id: 'p2', cat: 'cakes', name: '巧克力蛋糕', price: 26, image: 'assets/p2.jpg', desc: '丝滑巧克力口味' },
  { id: 'p3', cat: 'cakes', name: '芝士蛋糕', price: 32, image: 'assets/p3.jpg', desc: '醇厚芝士' },
  { id: 'p4', cat: 'drinks', name: '拿铁咖啡', price: 18, image: 'assets/p4.jpg', desc: '顺滑拿铁' },
  { id: 'p5', cat: 'drinks', name: '抹茶拿铁', price: 20, image: 'assets/p5.jpg', desc: '清新抹茶' },
  { id: 'p6', cat: 'drinks', name: '鲜榨橙汁', price: 16, image: 'assets/p6.jpg', desc: '每日鲜榨' },
  { id: 'p7', cat: 'snacks', name: '曲奇饼干', price: 10, image: 'assets/p7.jpg', desc: '黄油香味' },
  { id: 'p8', cat: 'snacks', name: '马卡龙', price: 12, image: 'assets/p8.jpg', desc: '缤纷口味' }
];

Page({
  data: {
    categories,
    goods,
    currentCatId: categories[0].id,
    filteredGoods: goods.filter(g => g.cat === categories[0].id),
    countMap: {}
  },
  onShow() {
    this.refreshCounts();
  },
  switchCat(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({
      currentCatId: id,
      filteredGoods: goods.filter(g => g.cat === id)
    });
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => m[x.id] = x.count);
    this.setData({ countMap: m });
  },
  inc(e) {
    const item = e.currentTarget.dataset.item;
    cart.addItem(item);
    this.refreshCounts();
  },
  dec(e) {
    const id = e.currentTarget.dataset.id;
    cart.removeItem(id);
    this.refreshCounts();
  }
});

