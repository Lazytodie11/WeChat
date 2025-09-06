const ENV_ID = '';

App({
  onLaunch() {
    try {
      if (wx.cloud && ENV_ID) {
        wx.cloud.init({ env: ENV_ID, traceUser: true });
      } else {
        console.warn('Skip cloud init (tourist mode or no env id).');
      }
    } catch (e) {
      console.warn('Cloud init skipped due to environment:', e);
    }
    this.globalData = { cartCount: 0, envId: ENV_ID, cloudEnabled: !!ENV_ID };
  }
});
