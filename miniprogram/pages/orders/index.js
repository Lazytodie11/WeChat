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
const user = require('../../utils/user');

Page({
  data: {
    orders: [],
    loading: true,
    page: 0,
    pageSize: 10,
    hasMore: true,
    statusFilter: 'all',
    touristMode: false,
    touristTips: '游客模式暂不支持订单同步',
    needLogin: false
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
        // 无云环境时，读取本地下单记录作为回退显示
        let local = [];
        try { local = wx.getStorageSync('local_orders') || []; } catch(e) { local = []; }
        const list = (Array.isArray(local) ? local : []).map(o => ({
          ...o,
          createdAtStr: this.formatTime(o.createdAt || o.createTime),
          statusText: o.status || 'pending'
        }));
        const enriched = enrichOrders(list);
        this.setData({ loading: false, hasMore: false, orders: enriched });
        return;
      }
      const db = wx.cloud.database();
      // 获取 openid 并仅查询当前用户订单
      let openid = user.getStoredOpenId();
      if (!openid) {
        try { const r = await wx.cloud.callFunction({ name: 'login' }); openid = r?.result?.openid || ''; } catch(_) {}
        if (openid) user.setStoredOpenId(openid);
      }
      const { page, pageSize, statusFilter } = this.data;
      const isAdmin = !!(getApp() && getApp().globalData && getApp().globalData.isAdmin);
      if (!isAdmin && !openid) {
        // 非管理员且无法获取 openid 时，不允许查询所有订单
        this.setData({ loading: false, hasMore: false, orders: [], needLogin: true });
        return;
      }
      let query = db.collection('orders');
      if (openid && !isAdmin) query = query.where({ _openid: openid });
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
      // 若云权限错误（-601034）或其他云相关失败，则回退到本地订单
      const msg = (e && (e.errMsg || e.message)) || '';
      const code = (typeof e === 'object' && e !== null && 'errCode' in e) ? e.errCode : undefined;
      if (code === -601034 || /开通云开发|没有权限|cloud/.test(msg)) {
        let local = [];
        try { local = wx.getStorageSync('local_orders') || []; } catch(_) { local = []; }
        const list = (Array.isArray(local) ? local : []).map(o => ({
          ...o,
          createdAtStr: this.formatTime(o.createdAt || o.createTime),
          statusText: o.status || 'pending'
        }));
        const enriched = enrichOrders(list);
        this.setData({ loading: false, hasMore: false, orders: enriched });
      } else {
        console.error(e);
        wx.showToast({ title: '加载失败', icon: 'none' });
        this.setData({ loading: false });
      }
    } finally {
      this.setData({ loading: false });
    }
  },
  loadMore() {
    if (!this.data.hasMore || this.data.loading) return;
    this.fetchOrders();
  },
  goLogin() {
    // 跳转到“我的”页进行头像昵称授权
    wx.switchTab({ url: '/pages/profile/index' });
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
