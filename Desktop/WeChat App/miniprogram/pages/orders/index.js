Page({
  data: {
    orders: [],
    loading: true
  },
  onShow() {
    this.fetchOrders();
  },
  async fetchOrders() {
    this.setData({ loading: true });
    try {
      const db = wx.cloud.database();
      // 优先按 createdAt 倒序；若字段不存在可回退到 createTime
      let res;
      try {
        res = await db.collection('orders').orderBy('createdAt', 'desc').get();
      } catch (e) {
        res = await db.collection('orders').orderBy('createTime', 'desc').get();
      }
      const list = res.data.map(o => ({
        ...o,
        createdAtStr: this.formatTime(o.createdAt || o.createTime)
      }));
      this.setData({ orders: list });
    } catch (e) {
      console.error(e);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },
  formatTime(d) {
    try {
      const date = new Date(d);
      const p = (n) => (n < 10 ? '0' + n : n);
      return `${date.getFullYear()}-${p(date.getMonth()+1)}-${p(date.getDate())} ${p(date.getHours())}:${p(date.getMinutes())}`;
    } catch (e) {
      return '';
    }
  }
});
