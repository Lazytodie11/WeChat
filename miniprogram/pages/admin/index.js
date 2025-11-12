Page({
  data: {
    myOpenId: '',
    creatorOpenId: '',
    admins: [],
    isCreator: false,
    isAdmin: false,
    target: ''
  },
  async onShow(){
    try { const s = this.selectComponent('#splash'); const cfg = require('../../config'); const fid = (cfg && cfg.LOADING_SPLASH_FILEID) || ''; this._splashStart = Date.now(); s && s.show && s.show({ fileId: fid }); } catch(_) {}
    await this.refresh();
    // 页面级拦截：仅创作者或管理员可停留
    try {
      if (!this.data.isCreator && !this.data.isAdmin) {
        wx.showToast({ title: '仅管理员可访问', icon: 'none' });
        setTimeout(() => {
          try { wx.navigateBack(); } catch(_) { try { wx.switchTab({ url: '/pages/profile/index' }); } catch(__) {} }
        }, 600);
      }
    } catch(_) {}
    try { const s = this.selectComponent('#splash'); const MIN_MS = 400; const elapsed = Date.now() - (this._splashStart||Date.now()); const left = Math.max(0, MIN_MS - elapsed); setTimeout(()=>{ try{ s && s.hide && s.hide(); }catch(_){ } }, left); } catch(_) {}
  },
  async refresh(){
    const app = getApp && getApp();
    let openid = (app && app.globalData && app.globalData.openid) || '';
    try { if (!openid && wx.cloud) { const r = await wx.cloud.callFunction({ name:'login' }); openid = (r && r.result && r.result.openid) || ''; } } catch(_){ }
    let isAdmin = !!(app && app.globalData && app.globalData.isAdmin);
    try { const r = await wx.cloud.callFunction({ name:'isAdmin' }); isAdmin = !!(r && r.result && r.result.isAdmin); } catch(_){ }
    let creatorOpenId = '';
    let admins = [];
    try {
      const res = await wx.cloud.callFunction({ name:'admin', data:{ action:'list' } });
      creatorOpenId = (res && res.result && res.result.creatorOpenId) || '';
      admins = (res && res.result && res.result.openids) || [];
    } catch(_){ }
    const isCreator = !!openid && creatorOpenId && (openid === creatorOpenId);
    this.setData({ myOpenId: openid, creatorOpenId, admins, isCreator, isAdmin });
  },
  onInput(e){ this.setData({ target: (e && e.detail && e.detail.value) || '' }); },
  async add(){
    if (!this.data.isCreator) return wx.showToast({ title:'仅创作者可操作', icon:'none' });
    const oid = (this.data.target||'').trim(); if (!oid) return wx.showToast({ title:'请输入 openid', icon:'none' });
    try { await wx.cloud.callFunction({ name:'admin', data:{ action:'add', openid: oid } }); wx.showToast({ title:'已添加', icon:'success' }); this.setData({ target:'' }); await this.refresh(); } catch(e){ wx.showToast({ title:'失败', icon:'none' }); }
  },
  async remove(e){
    if (!this.data.isCreator) return wx.showToast({ title:'仅创作者可操作', icon:'none' });
    const oid = (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.oid) || '';
    if (!oid) return;
    try { await wx.cloud.callFunction({ name:'admin', data:{ action:'remove', openid: oid } }); wx.showToast({ title:'已移除', icon:'success' }); await this.refresh(); } catch(e){ wx.showToast({ title:'失败', icon:'none' }); }
  }
});
