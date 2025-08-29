const cart = require('../../utils/cart');

Page({
  data: {
    cart: [],
    summary: cart.getSummary(),
    contact: { name: '', phone: '', note: '' },
    submitting: false
  },
  onShow() {
    this.setData({ cart: cart.getCart(), summary: cart.getSummary() });
  },
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({ [`contact.${field}`]: e.detail.value });
  },
  async submitOrder() {
    const { name, phone } = this.data.contact;
    if (!name || !phone) {
      wx.showToast({ title: '请填写姓名和手机', icon: 'none' });
      return;
    }
    if (this.data.summary.totalCount === 0) {
      wx.showToast({ title: '购物车为空', icon: 'none' });
      return;
    }
    this.setData({ submitting: true });
    try {
      const res = await wx.cloud.callFunction({
        name: 'createOrder',
        data: {
          items: this.data.cart,
          totalPrice: this.data.summary.totalPrice,
          contact: this.data.contact
        }
      });
      const orderId = res?.result?.orderId || '';
      cart.clear();
      wx.redirectTo({ url: `/pages/success/index?orderId=${orderId}` });
    } catch (e) {
      console.error(e);
      wx.showToast({ title: '下单失败，请稍后再试', icon: 'none' });
    } finally {
      this.setData({ submitting: false });
    }
  }
});

