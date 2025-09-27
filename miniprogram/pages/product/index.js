const cart = require('../../utils/cart');
const { products } = require('../../data/catalog');

Page({
  data: {
    product: {},
    images: [],
    variants: [],
    minPrice: 0,
    current: 0,
    selectedVariant: null,
    count: 0,
    showSheet: false,
    sheetItems: [],
    options: []
  },
  onLoad(query) {
    const id = (query && query.id) ? query.id : '';
    const p = products.find(x => x.id === id) || {};
    const images = (p.images && p.images.length) ? p.images : (p.cover ? [p.cover] : ['/assets/p1.jpg']);
    const variants = Array.isArray(p.variants) && p.variants.length ? p.variants : [{ size: '默认', price: Number(p.price || 0) }];
    const firstPrice = Number((variants[0] && variants[0].price) != null ? variants[0].price : 0);
    const minPrice = variants.reduce((m, v) => Math.min(m, Number(v.price||0)), firstPrice);
    const options = Array.isArray(p.options) ? p.options : [];
    const optKey = `options_${p.id}`;
    let saved = [];
    try { saved = wx.getStorageSync(optKey) || []; } catch(_) {}
    // merge saved selected state by name
    const mergedOpts = options.map(o => ({ ...o, selected: !!(saved.find(s => s.name===o.name)?.selected) }));
    this.setData({ product: p, images, variants, minPrice, current: 0, selectedVariant: variants[0], options: mergedOpts });
    this.refreshCount();
  },
  toggleOption(e) {
    const name = e.currentTarget.dataset.name;
    const list = (this.data.options || []).map(o => o.name===name ? ({ ...o, selected: !o.selected }) : o);
    this.setData({ options: list });
    const key = `options_${this.data.product.id}`;
    try { wx.setStorageSync(key, list); } catch(_) {}
  },
  onShow() { this.refreshCount(); },
  refreshCount() {
    const list = cart.getCart();
    const id = (this.data.product && this.data.product.id) ? this.data.product.id : '';
    if (!id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current];
    let count = 0;
    if (variant && variant.size) {
      const key = `${id}__${variant.size}`;
      const found = list.find(x => x.variantKey === key);
      count = found ? (found.count || 0) : 0;
    } else {
      const found = list.find(x => x.id === id);
      count = found ? (found.count || 0) : 0;
    }
    this.setData({ count });
  },
  goBack(){ wx.navigateBack({ delta: 1 }); },
  chooseVariant(e) {
    const idx = Number(e.currentTarget.dataset.idx || 0);
    const v = this.data.variants[idx];
    this.setData({ current: idx, selectedVariant: v }, () => this.refreshCount());
  },
  inc() {
    const item = this.data.product;
    if (!item || !item.id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认', price: Number(item.price || 0) };
    cart.addItem(item, variant);
    this.setData({ count: this.data.count + 1 });
  },
  dec() {
    const item = this.data.product;
    if (!item || !item.id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认', price: Number(item.price || 0) };
    cart.removeItem(item.id, variant);
    this.setData({ count: Math.max(0, this.data.count - 1) });
  },
  // Bottom sheet logic
  openSheet() {
    const list = cart.getCart();
    const id = this.data.product?.id;
    const items = list.filter(x => x.id === id).map(x => {
      const subtotal = Number(((Number(x.price || 0)) * (Number(x.count || 0))).toFixed(2));
      return {
        name: x.name,
        variantSize: x.variantSize,
        count: x.count,
        price: Number(x.price || 0),
        subtotal,
        variantKey: x.variantKey
      };
    });
    const sheetTotal = items.reduce((sum, it) => sum + it.subtotal, 0);
    this.setData({ showSheet: true, sheetItems: items, sheetTotal: Number(sheetTotal.toFixed(2)) });
  },
  closeSheet() { this.setData({ showSheet: false }); },
  noop() {},
  sheetInc(e) {
    const size = e.currentTarget.dataset.size;
    const item = this.data.product;
    if (!item || !item.id || !size) return;
    cart.addItem(item, { size });
    this.refreshCount();
    this.openSheet();
  },
  sheetDec(e) {
    const size = e.currentTarget.dataset.size;
    const item = this.data.product;
    if (!item || !item.id || !size) return;
    cart.removeItem(item.id, { size });
    this.refreshCount();
    this.openSheet();
  },
  clearCurrent() {
    const id = this.data.product && this.data.product.id;
    if (!id) return;
    cart.removeProduct(id);
    this.refreshCount();
    this.openSheet();
  },
  clearAll() {
    cart.clear();
    this.refreshCount();
    this.openSheet();
  }
});
