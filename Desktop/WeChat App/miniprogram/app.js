App({
  onLaunch() {
    if (!wx.cloud) {
      console.error('基础库版本过低，需 2.2.3 及以上以使用云能力');
    } else {
      // 请在 README 指引下，将 env 替换为你的云环境 ID
      wx.cloud.init({
        env: 'your-env-id',
        traceUser: true
      });
    }
    this.globalData = {
      cartCount: 0
    };
  }
});

