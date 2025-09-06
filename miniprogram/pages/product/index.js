const cart = require('../../utils/cart');
const { products } = require('../../data/catalog');

Page({
  data: {
    product: {},
    images: [],
    variants: [],
    minPrice: 0,
    current: 0,
    count: 0,
  },
  onLoad(query) {
    const id = query?.id || '';
    const p = products.find(x => x.id === id) || {};
    const images = (p.images && p.images.length) ? p.images : (p.cover ? [p.cover] : ['/assets/p1.jpg']);
    const variants = Array.isArray(p.variants) && p.variants.length ? p.variants : [{ size: '默认', price: Number(p.price || 0) }];
    const minPrice = variants.reduce((m, v) => Math.min(m, Number(v.price||0)), Number(variants[0]?.price||0));
    this.setData({ product: p, images, variants, minPrice, current: 0 });
  },
  goBack(){ wx.navigateBack({ delta: 1 }); },
  chooseVariant(e) {
    const idx = Number(e.currentTarget.dataset.idx || 0);
    this.setData({ current: idx });
  },
  inc() {
    const item = this.data.product;
    if (!item || !item.id) return;
    cart.addItem(item);
    this.setData({ count: this.data.count + 1 });
  },
  dec() {
    const item = this.data.product;
    if (!item || !item.id) return;
    cart.removeItem(item.id);
    this.setData({ count: Math.max(0, this.data.count - 1) });
  }
});
