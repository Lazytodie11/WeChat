const cart = require('../../utils/cart');
const { isCloudEnabled } = require('../../utils/env');

Page({
  data: {
    cart: [],
    summary: cart.getSummary(),
    contact: { name: '', phone: '', note: '' },
    submitting: false
  },
  onLoad() {
    this.updateFromStorage();
  },
  onShow() {
    // 确保从其他页面返回时数据也同步
    this.updateFromStorage();
  },
  updateFromStorage() {
    const list = cart.getCart().map((it) => {
      const qty = (it.qty != null ? it.qty : it.count) || 0;
      const price = Number(it.price || 0);
      const subtotal = Number((qty * price).toFixed(2));
      return { ...it, displayQty: qty, subtotal };
    });
    this.setData({ cart: list, summary: cart.getSummary() });
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
      if (!isCloudEnabled()) {
        // 游客模式：模拟成功，写入本地 orders
        const orderId = 'LOCAL-' + Date.now();
        const now = new Date();
        const order = {
          _id: orderId,
          items: this.data.cart,
          totalPrice: this.data.summary.totalPrice,
          contact: this.data.contact,
          status: 'pending',
          createdAt: now,
        };
        try {
          const key = 'local_orders';
          const list = (wx.getStorageSync(key) || []);
          list.unshift(order);
          wx.setStorageSync(key, list);
        } catch (e) {}
        cart.clear();
        wx.redirectTo({ url: `/pages/success/index?orderId=${orderId}` });
      } else {
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
      }
    } catch (e) {
      console.error(e);
      wx.showToast({ title: '下单失败，请稍后再试', icon: 'none' });
    } finally {
      this.setData({ submitting: false });
    }
  }
});
