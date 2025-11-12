// Unified splash preloading and show/hide helpers
// Usage:
//  - In app.js onLaunch:  const splash = require('./utils/splash'); splash.preloadSplash();
//  - In a page onShow:    splash.showSplash(this);
//  - When data ready:     splash.hideSplash(this);

const cfg = require('../config');

function getSplashFileId(){
  return (cfg && cfg.LOADING_SPLASH_FILEID) || '';
}

async function preloadSplash(){
  try{
    const fid = getSplashFileId();
    if(!fid || !wx.cloud || !wx.cloud.getTempFileURL) return;
    const { fileList } = await wx.cloud.getTempFileURL({ fileList: [fid] });
    const url = (fileList && fileList[0] && fileList[0].tempFileURL) || '';
    const app = getApp && getApp();
    if (app) {
      app.globalData = app.globalData || {};
      app.globalData.splashTempUrl = url;
      app.globalData.splashPreloadedAt = Date.now();
    }
  }catch(_){ /* ignore */ }
}

function showSplash(page){
  try{
    const comp = page.selectComponent && page.selectComponent('#splash');
    const app = getApp && getApp();
    const url = (app && app.globalData && app.globalData.splashTempUrl) || '';
    page.__splashStart = Date.now();
    if (comp && comp.showWithUrl && url){ comp.showWithUrl(url); }
    else if (comp && comp.show){ comp.show({ fileId: getSplashFileId() }); }
  }catch(_){ /* ignore */ }
}

function hideSplash(page, minMs){
  try{
    const MIN_MS = typeof minMs === 'number' ? minMs : (cfg && cfg.LOADING_MIN_MS) || 600;
    const start = page.__splashStart || Date.now();
    const left = Math.max(0, MIN_MS - (Date.now() - start));
    const comp = page.selectComponent && page.selectComponent('#splash');
    setTimeout(()=>{ try{ comp && comp.hide && comp.hide(); }catch(_){ } }, left);
  }catch(_){ /* ignore */ }
}

module.exports = { preloadSplash, showSplash, hideSplash };

