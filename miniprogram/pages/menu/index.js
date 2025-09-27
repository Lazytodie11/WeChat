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
    if (!this._unsubCart) {
      this._unsubCart = cart.subscribe(() => {
        try { this.refreshCounts(); } catch (e) {}
      });
    }
  },
  onHide() { if (this._unsubCart) { try { this._unsubCart(); } catch(e) {} this._unsubCart = null; } },
  onUnload() { if (this._unsubCart) { try { this._unsubCart(); } catch(e) {} this._unsubCart = null; } },
  onSelectCategory(e) {
    const id = e.detail.id;
    this.setData({ currentCatId: id, currentCatName: (function(){ const c = categories.find(function(c){return c.id===id;}); return (c && c.name) || ''; })() });
    this.applyFilter();
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({ showBackTop: scrollTop > 120 });
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => {
      m[x.id] = (m[x.id] || 0) + (x.count || 0);
    });
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
  onCardDetail(e) {
    const id = (e && e.detail && e.detail.id) || '';
    if (!id) return;
    wx.navigateTo({ url: `/pages/product/index?id=${id}` });
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
