const cart = require('../../utils/cart');

Component({
  data: {
    summary: cart.getSummary(),
    showSheet: false,
    items: []
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
        let displayName = x.name || '';
        if (x.optionName) {
          try { displayName = displayName.replace(/（.*?）$/, ''); } catch(_) {}
        }
        return {
          id: x.id,
          name: x.name,
          displayName,
          variantSize: x.variantSize,
          optionName: x.optionName,
          optionsDesc: x.optionsDesc || '',
          count: x.count,
          variantKey: x.variantKey
        };
      });
      this.setData({ items });
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
      if (!id || !size) return;
      cart.addItem({ id, name }, { size });
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
