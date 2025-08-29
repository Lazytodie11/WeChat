Page({
  data: {
    orders: [],
    loading: true,
    page: 0,
    pageSize: 10,
    hasMore: true,
    statusFilter: 'all'
  },
  onShow() {
    this.resetAndFetch();
  },
  resetAndFetch() {
    this.setData({ orders: [], page: 0, hasMore: true });
    this.fetchOrders();
  },
  async fetchOrders() {
    this.setData({ loading: true });
    try {
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
        createdAtStr: this.formatTime(o.createdAt || o.createTime)
      }));
      const newList = page === 0 ? list : this.data.orders.concat(list);
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
