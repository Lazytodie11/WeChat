const userApi = require('../../utils/user');

Page({
  data: {
    user: null,
    isAdmin: false,
    isCreator: false,
    needAuth: false,
    creatorOpenId: '',
    showCreatorSetup: false
  },
  async onShow() {
    try {
      const s = this.selectComponent('#splash');
      const cfg = require('../../config');
      const fid = (cfg && cfg.LOADING_SPLASH_FILEID) || '';
      const MIN_MS = 600; const start = Date.now();
      if (s && s.show) s.show({ fileId: fid });
      // 数据准备
      const u = userApi.getStoredUser();
      const app = getApp && getApp();
      const isAdmin = !!(app && app.globalData && app.globalData.isAdmin);
      const needAuth = !!(app && app.globalData && app.globalData.needAuth);
      this.setData({ user: u || null, isAdmin, needAuth }, async () => {
        // 计算是否创作者（仅创作者可见管理员入口）
        try {
          let myOpenId = (app && app.globalData && app.globalData.openid) || '';
          if (!myOpenId && wx.cloud) {
            const r = await wx.cloud.callFunction({ name: 'login' });
            myOpenId = (r && r.result && r.result.openid) || '';
            if (myOpenId) app.globalData.openid = myOpenId;
          }
          const res = await wx.cloud.callFunction({ name: 'admin', data: { action: 'list' } });
          const creator = (res && res.result && res.result.creatorOpenId) || '';
          const isCreator = !!(creator && myOpenId && creator === myOpenId);
          this.setData({ isCreator, creatorOpenId: creator, showCreatorSetup: !creator });
        } catch(_) {}
        const left = Math.max(0, MIN_MS - (Date.now()-start));
        setTimeout(()=>{ 
          try{ s && s.hide && s.hide(); }catch(_){ }
          // 尝试展示授权引导（可选）
          try {
            const app = getApp && getApp();
            const needAuth = !!(app && app.globalData && app.globalData.needAuth);
            if (needAuth) { const gate = this.selectComponent('#auth'); gate && gate.show && gate.show(); }
          } catch(_) {}
        }, left);
      });
      return;
    } catch(_) {}
    const app = getApp && getApp();
    const u = userApi.getStoredUser();
    const isAdmin = !!(app && app.globalData && app.globalData.isAdmin);
    const needAuth = !!(app && app.globalData && app.globalData.needAuth);
    this.setData({ user: u || null, isAdmin, needAuth });
    // 异步补齐 isCreator
    try {
      let myOpenId = (app && app.globalData && app.globalData.openid) || '';
      if (!myOpenId && wx.cloud) {
        const r = await wx.cloud.callFunction({ name: 'login' });
        myOpenId = (r && r.result && r.result.openid) || '';
        if (myOpenId) app.globalData.openid = myOpenId;
      }
      const res = await wx.cloud.callFunction({ name: 'admin', data: { action: 'list' } });
      const creator = (res && res.result && res.result.creatorOpenId) || '';
      const isCreator = !!(creator && myOpenId && creator === myOpenId);
      this.setData({ isCreator, creatorOpenId: creator, showCreatorSetup: !creator });
    } catch(_) {}
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
  goOrders() {
    wx.showToast({ title: '仅供展示使用', icon: 'none' });
  },
  goAdmin() { wx.navigateTo({ url: '/pages/admin/index' }); },
  async setCreator(){
    try {
      await wx.cloud.callFunction({ name: 'admin', data: { action: 'ensure' } });
      wx.showToast({ title: '已设置为创作者', icon: 'success' });
      // 重新拉取一次
      await this.onShow();
    } catch(e){ wx.showToast({ title: '设置失败', icon: 'none' }); }
  },
  onAvatarTouchStart(){
    try{
      if (!(this.data && this.data.showCreatorSetup && this.data.user && this.data.user.nickName)) return;
      if (this.__avatarPressTimer) { clearTimeout(this.__avatarPressTimer); this.__avatarPressTimer = null; }
      this.__avatarPressTimer = setTimeout(async ()=>{
        this.__avatarPressTimer = null;
        try{
          wx.showModal({
            title: '初始化创作者',
            content: '将把当前账号设为创作者，仅首次初始化使用。确认继续？',
            confirmText: '设为创作者',
            success: async (r)=>{ if (r.confirm) { await this.setCreator(); } }
          });
        }catch(_){ }
      }, 3000);
    }catch(_){ }
  },
  onAvatarTouchEnd(){
    try{ if (this.__avatarPressTimer) { clearTimeout(this.__avatarPressTimer); this.__avatarPressTimer = null; } }catch(_){ }
  },
  // 授权组件事件：统一落地 needAuth=false
  onAuthAuthed(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} },
  onAuthSkipped(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} }
});
