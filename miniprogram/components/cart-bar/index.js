const cart = require('../../utils/cart');

Component({
  data: {
    summary: cart.getSummary(),
    showSheet: false,
    items: [],
    total: 0
  },
  lifetimes: {
    attached() {
      this.unsubscribe = cart.subscribe((summary) => {
        this.setData({ summary });
        if (this.data.showSheet) this.refreshSheet();
      });
    },
    detached() {
      if (this.unsubscribe) this.unsubscribe();
    }
  },
  methods: {
    refreshSheet() {
      const list = cart.getCart();
      const items = list.map(x => {
        const subtotal = Number(((Number(x.price || 0)) * (Number(x.count || 0))).toFixed(2));
        return { id: x.id, name: x.name, variantSize: x.variantSize, price: Number(x.price || 0), count: x.count, subtotal, variantKey: x.variantKey };
      });
      const total = items.reduce((s, it) => s + it.subtotal, 0);
      this.setData({ items, total: Number(total.toFixed(2)) });
    },
    openSheet() {
      this.refreshSheet();
      this.setData({ showSheet: true });
    },
    closeSheet() { this.setData({ showSheet: false }); },
    noop() {},
    goCheckout() {
      if (this.data.summary.totalCount === 0) return;
      wx.navigateTo({ url: '/pages/checkout/index' });
    },
    sheetInc(e) {
      const id = e.currentTarget.dataset.id;
      const size = e.currentTarget.dataset.size;
      const name = e.currentTarget.dataset.name;
      const price = Number(e.currentTarget.dataset.price || 0);
      if (!id || !size) return;
      cart.addItem({ id, name }, { size, price });
      this.refreshSheet();
    },
    sheetDec(e) {
      const id = e.currentTarget.dataset.id;
      const size = e.currentTarget.dataset.size;
      if (!id || !size) return;
      cart.removeItem(id, { size });
      this.refreshSheet();
    },
    clearAll() {
      cart.clear();
      this.refreshSheet();
    }
  }
});
