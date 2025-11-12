// Convert cloud fileIDs to temporary URLs in a safe, per-item manner.
// Exports:
// - async toTempURLs(fileIds=[]): returns array of URLs in the same order
// - async toTempURL(fileId): returns single URL (or empty string)

function isCloudFileID(s) {
  return typeof s === 'string' && /^cloud:\/\//i.test(s);
}

async function toTempURLs(fileIds = []) {
  const list = Array.isArray(fileIds) ? fileIds.filter(Boolean) : [];
  if (!list.length) return [];
  // If wx.cloud not available or inputs are not cloud fileIDs, pass through
  if (typeof wx === 'undefined' || !wx.cloud || typeof wx.cloud.getTempFileURL !== 'function') {
    return list.map(x => x);
  }
  const reqList = list.map(x => (isCloudFileID(x) ? x : x));
  try {
    const res = await wx.cloud.getTempFileURL({ fileList: reqList });
    const arr = (res && res.fileList) ? res.fileList : [];
    // Build map by fileID for stable lookup
    const map = new Map();
    arr.forEach(item => {
      const fid = item && (item.fileID || item.fileId || item.fileid);
      const url = item && (item.tempFileURL || item.tempUrl || '');
      if (fid) map.set(fid, url || '');
    });
    return list.map(fid => {
      if (!isCloudFileID(fid)) return fid; // non-cloud stays as-is
      return map.get(fid) || '';
    });
  } catch (e) {
    // On failure, do not break UI; fall back to original values
    return list.map(x => (isCloudFileID(x) ? '' : x));
  }
}

async function toTempURL(fileId) {
  const [u] = await toTempURLs([fileId]);
  return u || '';
}

module.exports = { toTempURLs, toTempURL };

