function getAppSafe() {
  try { return getApp(); } catch (e) { return null; }
}

function isCloudEnabled() {
  const app = getAppSafe();
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

