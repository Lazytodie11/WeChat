const USER_KEY = 'user_profile';
const OPENID_KEY = 'openid_cache';

function getStoredUser() {
  try { return wx.getStorageSync(USER_KEY) || null; } catch (e) { return null; }
}

function setStoredUser(user) {
  try { wx.setStorageSync(USER_KEY, user || null); } catch (e) {}
}

function getStoredOpenId() {
  try { return wx.getStorageSync(OPENID_KEY) || ''; } catch (e) { return ''; }
}

function setStoredOpenId(openid) {
  try { wx.setStorageSync(OPENID_KEY, openid || ''); } catch (e) {}
}

async function fetchOpenId() {
  if (!wx.cloud) return '';
  try {
    const res = await wx.cloud.callFunction({ name: 'login' });
    const openid = (res && res.result && res.result.openid) || '';
    if (openid) setStoredOpenId(openid);
    return openid;
  } catch (e) {
    return '';
  }
}

module.exports = {
  getStoredUser,
  setStoredUser,
  getStoredOpenId,
  setStoredOpenId,
  fetchOpenId,
};

