function enrichOrders(orders = []) {
  return orders.map(o => {
    const items = (o.items || []).map(it => {
      const qty = (it.qty != null ? it.qty : it.count) || 0;
      const price = Number(it.price || 0);
      const subtotal = Number((qty * price).toFixed(2));
      return { ...it, displayQty: qty, subtotal };
    });
    const total = Number(items.reduce((s, i) => s + i.subtotal, 0).toFixed(2));
    return { ...o, items, total };
  });
}

const { isCloudEnabled } = require('../../utils/env');

Page({
  data: {
    orders: [],
    loading: true,
    page: 0,
    pageSize: 10,
    hasMore: true,
    statusFilter: 'all',
    touristMode: false,
    touristTips: '游客模式暂不支持订单同步'
  },
  onShow() {
    const tourist = !isCloudEnabled();
    this.setData({ touristMode: tourist });
    this.resetAndFetch();
  },
  resetAndFetch() {
    this.setData({ orders: [], page: 0, hasMore: true });
    this.fetchOrders();
  },
  async fetchOrders() {
    this.setData({ loading: true });
    try {
      if (!isCloudEnabled() || !wx.cloud || !wx.cloud.database) {
        // 游客模式下跳过云调用
        this.setData({ loading: false, hasMore: false, orders: [] });
        return;
      }
      const db = wx.cloud.database();
      const { page, pageSize, statusFilter } = this.data;
      let query = db.collection('orders');
      if (statusFilter !== 'all') query = query.where({ status: statusFilter });
      let res;
      try {
        res = await query.orderBy('createdAt', 'desc').skip(page * pageSize).limit(pageSize).get();
      } catch (e) {
        res = await query.orderBy('createTime', 'desc').skip(page * pageSize).limit(pageSize).get();
      }
      const list = res.data.map(o => ({
        ...o,
        createdAtStr: this.formatTime(o.createdAt || o.createTime),
        statusText: o.status || 'pending'
      }));
      const enriched = enrichOrders(list);
      const newList = page === 0 ? enriched : this.data.orders.concat(enriched);
      this.setData({
        orders: newList,
        page: page + 1,
        hasMore: list.length === pageSize
      });
    } catch (e) {
      console.error(e);
      wx.showToast({ title: '加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },
  loadMore() {
    if (!this.data.hasMore || this.data.loading) return;
    this.fetchOrders();
  },
  setFilter(e) {
    const v = e.currentTarget.dataset.v;
    if (v === this.data.statusFilter) return;
    this.setData({ statusFilter: v });
    this.resetAndFetch();
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
