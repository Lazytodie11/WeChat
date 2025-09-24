function getAppSafe() {
  try { return getApp(); } catch (e) { return null; }
}

function isCloudEnabled() {
  const app = getAppSafe();
  // 仅以全局标识为准（由 app.js 探测后设置）
  return !!(app && app.globalData && app.globalData.cloudEnabled);
}

function getEnvId() {
  const app = getAppSafe();
  return (app && app.globalData && app.globalData.envId) || '';
}

module.exports = {
  cloudEnabled: isCloudEnabled(),
  isCloudEnabled,
  getEnvId,
};
