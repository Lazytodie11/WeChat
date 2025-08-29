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

function buildSections() {
  return categories.map(c => ({ id: c.id, name: c.name, items: goods.filter(g => g.cat === c.id) }));
}

Page({
  data: {
    categories,
    sections: buildSections(),
    currentCatId: categories[0].id,
    toView: '',
    countMap: {},
    sectionTops: [],
    containerTop: 0,
    showBackTop: false
  },
  onShow() {
    this.refreshCounts();
    setTimeout(() => this.calcSectionTops(), 100);
  },
  onReady() {
    this.calcSectionTops();
  },
  calcSectionTops() {
    const q = this.createSelectorQuery();
    q.select('.right').boundingClientRect();
    q.selectAll('.section').boundingClientRect();
    q.exec(res => {
      const rightRect = res[0];
      const rects = res[1] || [];
      if (!rightRect || !rects.length) return;
      // Compute content offsets of each section from top of scroll content (at scrollTop 0)
      const offsets = rects.map(r => ({ id: r.id.replace('section-',''), offset: r.top - rightRect.top }));
      this.setData({ sectionTops: offsets, containerTop: rightRect.top });
    });
  },
  onSelectCategory(e) {
    const id = e.detail.id;
    this.setData({ currentCatId: id, toView: `section-${id}` });
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    // Determine current section by comparing scrollTop with cached offsets
    if (!this.data.sectionTops.length) return;
    const tops = this.data.sectionTops.slice().sort((a,b)=>a.offset-b.offset);
    let current = this.data.currentCatId;
    for (let i = tops.length - 1; i >= 0; i--) {
      if (scrollTop >= tops[i].offset - 10) { current = tops[i].id; break; }
    }
    const update = {};
    if (current !== this.data.currentCatId) update.currentCatId = current;
    update.showBackTop = scrollTop > 120;
    if (Object.keys(update).length) this.setData(update);
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => m[x.id] = x.count);
    this.setData({ countMap: m });
  },
  onCardChange() {
    this.refreshCounts();
  },
  goTop() {
    this.setData({ toView: 'section-top' });
  }
});
