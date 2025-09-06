const cart = require('../../utils/cart');
const { categories, products } = require('../../data/catalog');

function buildSections() {
  return categories.map(c => ({ id: c.id, name: c.name, items: products.filter(p => p.categoryId === c.id) }));
}

Page({
  data: {
    categories,
    sectionsView: buildSections().map(s => ({...s, items: s.items.map(i => ({...i, count: 0}))})),
    currentCatId: categories[0].id,
    currentCatName: categories[0].name,
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
    this.setData({ currentCatId: id, currentCatName: categories.find(c=>c.id===id)?.name || '', toView: `section-${id}` });
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
    if (current !== this.data.currentCatId) update.currentCatName = categories.find(c=>c.id===current)?.name || '';
    update.showBackTop = scrollTop > 120;
    if (Object.keys(update).length) this.setData(update);
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => m[x.id] = x.count);
    // rebuild sectionsView with counts
    const sections = buildSections().map(s => ({
      ...s,
      items: s.items.map(i => ({ ...i, count: m[i.id] || 0 }))
    }));
    this.setData({ countMap: m, sectionsView: sections });
  },
  onCardChange() {
    this.refreshCounts();
  },
  goTop() {
    this.setData({ toView: 'section-top' });
  }
});
