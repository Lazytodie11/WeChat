const cart = require('../../utils/cart');
const { isCloudEnabled } = require('../../utils/env');
const user = require('../../utils/user');

Page({
  data: {
    cart: [],
    summary: cart.getSummary(),
    submitting: false
  },
  onLoad() {
    this.updateFromStorage();
  },
  onShow() {
    // 确保从其他页面返回时数据也同步
    this.updateFromStorage();
  },
  goBack(){ wx.navigateBack({ delta: 1 }); },
  updateFromStorage() {
    const list = cart.getCart().map((it) => {
      const qty = (it.qty != null ? it.qty : it.count) || 0;
      const { price, subtotal, ...rest } = it;
      return { ...rest, displayQty: qty };
    });
    this.setData({ cart: list, summary: cart.getSummary() });
  },
  inc(e) {
    const id = e.currentTarget.dataset.id;
    const size = e.currentTarget.dataset.size;
    const name = e.currentTarget.dataset.name;
    const sig = e.currentTarget.dataset.sig || '';
    if (!id || !size) return;
    cart.addItem({ id, name, optionsSignature: sig }, { size, optionsSignature: sig });
    this.updateFromStorage();
  },
  dec(e) {
    const id = e.currentTarget.dataset.id;
    const size = e.currentTarget.dataset.size;
    const sig = e.currentTarget.dataset.sig || '';
    if (!id || !size) return;
    cart.removeItem(id, { size, optionsSignature: sig });
    this.updateFromStorage();
  },
  async submitOrder() {
    const contact = { name: '', phone: '', note: '' };
    if (this.data.summary.totalCount === 0) {
      wx.showToast({ title: '已选为空', icon: 'none' });
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
          totalPrice: 0,
          contact,
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
        // 可选带上用户微信昵称/头像（若已授权）
        const profile = user.getStoredUser() || {};
        const res = await wx.cloud.callFunction({
          name: 'createOrder',
          data: {
            items: this.data.cart,
            totalPrice: 0,
            contact,
            userProfile: {
              nickName: profile.nickName || '',
              avatarUrl: profile.avatarUrl || ''
            }
          }
        });
        const orderId = (res && res.result && res.result.orderId) || '';
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
