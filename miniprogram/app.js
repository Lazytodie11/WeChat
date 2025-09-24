const ENV_ID = '';
const user = require('./utils/user');

App({
  onLaunch() {
    try {
      if (wx.cloud) {
        if (ENV_ID) wx.cloud.init({ env: ENV_ID, traceUser: true });
        else wx.cloud.init({ traceUser: true }); // 使用工具选择的默认环境
      } else {
        console.warn('Skip cloud init (tourist mode or no env id).');
      }
    } catch (e) {
      console.warn('Cloud init skipped due to environment:', e);
    }
    // 读取本地用户档案与 openid
    const profile = user.getStoredUser();
    const openid = user.getStoredOpenId();
    this.globalData = { cartCount: 0, envId: ENV_ID, cloudEnabled: false, user: profile, openid };

    // 探测云可用性：尝试调用 login 云函数，并检测管理员
    try {
      if (wx.cloud) {
        wx.cloud.callFunction({ name: 'login' }).then(res => {
          const oid = (res && res.result && res.result.openid) || '';
          if (oid) {
            try { user.setStoredOpenId(oid); } catch(e) {}
            this.globalData.openid = oid;
          }
          this.globalData.cloudEnabled = true;
          return wx.cloud.callFunction({ name: 'isAdmin' });
        }).then(r2 => {
          this.globalData.isAdmin = !!(r2 && r2.result && r2.result.isAdmin);
        }).catch(() => {
          this.globalData.cloudEnabled = false;
          this.globalData.isAdmin = false;
        });
      }
    } catch (e) {
      this.globalData.cloudEnabled = false;
      this.globalData.isAdmin = false;
    }
  }
});
