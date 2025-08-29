Page({
  data: { orderId: '' },
  onLoad(query) {
    this.setData({ orderId: query.orderId || '' });
  },
  goOrders() {
    wx.switchTab({ url: '/pages/orders/index' });
  },
  goMenu() {
    wx.switchTab({ url: '/pages/menu/index' });
  }
});

