const cart = require('../../utils/cart');
const { categories, products } = require('../../data/catalog');

Page({
  data: {
    categories,
    currentCatId: categories[0].id,
    currentCatName: categories[0].name,
    filteredProducts: [],
    countMap: {},
    showBackTop: false
  },
  onShow() {
    this.refreshCounts();
  },
  onSelectCategory(e) {
    const id = e.detail.id;
    this.setData({ currentCatId: id, currentCatName: categories.find(c=>c.id===id)?.name || '' });
    this.applyFilter();
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({ showBackTop: scrollTop > 120 });
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => m[x.id] = x.count);
    this.setData({ countMap: m }, () => this.applyFilter());
  },
  applyFilter() {
    const { currentCatId, countMap } = this.data;
    const list = products.filter(p => p.categoryId === currentCatId).map(p => ({
      ...p,
      count: countMap[p.id] || 0,
    }));
    this.setData({ filteredProducts: list });
  },
  onCardChange() {
    this.refreshCounts();
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/product/index?id=${id}` });
  },
  goTop() {
    // 右侧滚动视图回顶（通过设置 scroll-top on scroll-view 可以实现，这里省略）
  }
});
