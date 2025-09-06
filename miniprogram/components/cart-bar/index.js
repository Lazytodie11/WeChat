const cart = require('../../utils/cart');

Component({
  data: {
    summary: cart.getSummary()
  },
  lifetimes: {
    attached() {
      this.unsubscribe = cart.subscribe((summary) => {
        this.setData({ summary });
      });
    },
    detached() {
      if (this.unsubscribe) this.unsubscribe();
    }
  },
  methods: {
    goCheckout() {
      if (this.data.summary.totalCount === 0) return;
      wx.navigateTo({ url: '/pages/checkout/index' });
    }
  }
});

