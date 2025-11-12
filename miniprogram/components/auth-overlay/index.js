const user = require('../../utils/user');
const { HOME_COMMON_IMAGES, HOME_COMMON_OVERRIDE } = require('../../config');

Component({
  properties: {
    visible: { type: Boolean, value: false }
  },
  data: { logoUrl: '' },
  methods: {
    async show(){
      try{
        const env = (HOME_COMMON_OVERRIDE && HOME_COMMON_OVERRIDE.envId) || '';
        const bucket = (HOME_COMMON_OVERRIDE && HOME_COMMON_OVERRIDE.bucket) || '';
        const file = (HOME_COMMON_IMAGES && HOME_COMMON_IMAGES.logo) || '';
        if (env && bucket && file) {
          const fid = `cloud://${env}.${bucket}/prod-images/common/${file}`;
          const { fileList } = await wx.cloud.getTempFileURL({ fileList: [fid] });
          const url = (fileList && fileList[0] && fileList[0].tempFileURL) || '';
          this.setData({ logoUrl: url });
        }
      }catch(_){ }
      this.setData({ visible: true });
    },
    hide(){ this.setData({ visible:false }); },
    async onAuthorizeTap(){
      try{
        const res = await wx.getUserProfile({ desc: '用于完善会员资料' });
        const info = (res && res.userInfo) ? res.userInfo : null;
        if (info) user.setStoredUser(info);
        try { await user.fetchOpenId(); } catch(_) {}
        const app = getApp && getApp(); if (app){ app.globalData = app.globalData || {}; app.globalData.needAuth = false; }
        this.hide();
        this.triggerEvent('authed', { ok: true });
      }catch(e){ wx.showToast({ title:'未授权', icon:'none' }); }
    },
    onSkip(){
      try { wx.setStorageSync('auth_skipped', true); } catch(_) {}
      const app = getApp && getApp(); if (app){ app.globalData = app.globalData || {}; app.globalData.needAuth = false; }
      this.hide();
      this.triggerEvent('skipped', { ok: true });
    }
  }
});

