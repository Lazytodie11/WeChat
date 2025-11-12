function parseEnvBucket(fid=''){
  // cloud://ENV.BUCKET/...
  try{
    if(typeof fid!=='string') return null;
    if(!fid.startsWith('cloud://')) return null;
    const rest=fid.slice('cloud://'.length);
    const idx=rest.indexOf('/');
    if(idx<0) return null;
    const host=rest.slice(0,idx); // ENV.BUCKET
    const dot=host.indexOf('.');
    if(dot<0) return null;
    return { env: host.slice(0,dot), bucket: host.slice(dot+1) };
  }catch(_){ return null; }
}

async function detectEnvBucket(){
  try{
    const db = wx.cloud.database();
    const { data } = await db.collection('products').limit(1).get();
    const doc = Array.isArray(data)&&data[0] ? data[0] : null;
    const imgs = (doc && Array.isArray(doc.images)) ? doc.images : [];
    const cover = (doc && doc.cover) || '';
    const fid = imgs.find(s=>typeof s==='string' && s.startsWith('cloud://')) || (typeof cover==='string' && cover.startsWith('cloud://') ? cover : '');
    const parsed = parseEnvBucket(fid);
    if (parsed) return parsed;
  }catch(_){ }
  return null;
}

function buildCommonFID(env,bucket,filename){
  return `cloud://${env}.${bucket}/prod-images/common/${filename}`;
}

async function toTempURLs(fileIds = []){
  const list = Array.isArray(fileIds) ? fileIds.filter(Boolean) : [];
  if (!list.length) return [];
  const { fileList } = await wx.cloud.getTempFileURL({ fileList: list });
  const map = new Map();
  (fileList||[]).forEach(it=>{ if(it.fileID) map.set(it.fileID, it.tempFileURL||''); });
  return list.map(fid => map.get(fid)||'');
}

Page({
  data:{
    bannerUrl: '',
    logoUrl: '',
    slidesUrls: []
  },
  async onShow(){
    // 展示“加载图”直至首页图片准备完毕；优先使用配置的 LOADING_SPLASH_FILEID
    const splash = require('../../utils/splash');
    const cfg = require('../../config');
    const MIN_MS = (cfg && cfg.LOADING_MIN_MS) || 600;
    splash.showSplash(this);
    await this.loadCommonImages();
    const remain = Math.max(0, MIN_MS - (Date.now()-(this.__splashStart||Date.now())));
    setTimeout(()=>{ try { require('../../utils/splash').hideSplash(this); } catch(_) {} }, remain);
    // 首次进入引导授权（带“跳过”）
    try {
      const app = getApp && getApp();
      const needAuth = !!(app && app.globalData && app.globalData.needAuth);
      if (needAuth) { const gate = this.selectComponent('#auth'); gate && gate.show && gate.show(); }
    } catch(_) {}
  },
  async loadCommonImages(){
    try{
      let detected = await detectEnvBucket();
      if(!detected){
        // 允许从配置手动覆盖
        try{
          const ov = require('../../config').HOME_COMMON_OVERRIDE || {};
          if (ov && ov.envId && ov.bucket) detected = { env: ov.envId, bucket: ov.bucket };
        }catch(_){ }
        if(!detected) return;
      }
      // 从配置读取文件名（位于 prod-images/common/ 目录）
      let COMMON = null;
      try { COMMON = require('../../config').HOME_COMMON_IMAGES; } catch(_) {}
      if (!COMMON) { COMMON = { banner:'banner.jpg', logo:'logo.png', slides:['slide1.jpg','slide2.jpg','slide3.jpg'] }; }
      const fids = [];
      const bannerFID = buildCommonFID(detected.env, detected.bucket, COMMON.banner); fids.push(bannerFID);
      const logoFID = buildCommonFID(detected.env, detected.bucket, COMMON.logo); fids.push(logoFID);
      const slideFIDs = COMMON.slides.map(n=> buildCommonFID(detected.env, detected.bucket, n));
      fids.push(...slideFIDs);
      const urls = await toTempURLs(fids);
      const bannerUrl = urls[0] || '';
      const logoUrl = urls[1] || '';
      const slidesUrls = urls.slice(2).filter(Boolean);
      this.setData({ bannerUrl, logoUrl, slidesUrls });
    }catch(e){ /* ignore */ }
  },
  goMenu() {
    wx.switchTab({ url: '/pages/menu/index' });
  },
  // 授权组件事件：统一落地 needAuth=false
  onAuthAuthed(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} },
  onAuthSkipped(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} }
});
