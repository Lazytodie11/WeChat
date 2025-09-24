const userApi = require('../../utils/user');

Page({
  data: {
    user: null
  },
  onShow() {
    const u = userApi.getStoredUser();
    this.setData({ user: u || null });
  },
  login() {
    try {
      wx.getUserProfile({
        desc: '用于完善会员资料',
        success: async (res) => {
          const info = res && res.userInfo ? res.userInfo : null;
          if (info) {
            userApi.setStoredUser(info);
            this.setData({ user: info });
          }
          // 若有云环境，则尝试拿 openid
          if (wx.cloud) {
            await userApi.fetchOpenId();
          }
          wx.showToast({ title: '登录成功', icon: 'success' });
        },
        fail: () => {
          wx.showToast({ title: '未授权', icon: 'none' });
        }
      });
    } catch (e) {
      wx.showToast({ title: '当前版本不支持获取头像昵称', icon: 'none' });
    }
  },
  logout() {
    try { userApi.setStoredUser(null); } catch (e) {}
    this.setData({ user: null });
  },
  goOrders() { wx.switchTab({ url: '/pages/orders/index' }); }
});
