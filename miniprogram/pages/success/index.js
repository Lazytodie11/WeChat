Page({
  data: {},
  onLoad() {},
  goHome() {
    wx.switchTab({ url: '/pages/home/index' });
  },
  goMenu() {
    wx.switchTab({ url: '/pages/menu/index' });
  }
});
