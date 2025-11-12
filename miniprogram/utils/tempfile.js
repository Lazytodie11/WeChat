// utils/tempfile.js
// 将一组 cloud:// fileID 与 http(s) 混合的链接，统一转换为可渲染的 https URL 映射。
// - http(s) 直通
// - cloud:// 通过 wx.cloud.getTempFileURL 获取临时链接，分片最多 50 个

function isHttp(s) { return typeof s === 'string' && /^https?:\/\//i.test(s); }
function isCloud(s) { return typeof s === 'string' && /^cloud:\/\//i.test(s); }

async function fileIDsToTempUrlMap(mixedList, maxAge = 3600 * 24 * 7) {
  const passthrough = new Map();
  const fileIDs = [];
  for (const s of Array.isArray(mixedList) ? mixedList : []) {
    if (!s) continue;
    if (isHttp(s)) passthrough.set(s, s);
    else if (isCloud(s)) fileIDs.push(s);
  }
  const uniq = Array.from(new Set(fileIDs));
  const chunks = [];
  for (let i = 0; i < uniq.length; i += 50) chunks.push(uniq.slice(i, i + 50));

  const map = new Map(passthrough);
  for (const list of chunks) {
    if (!list.length) continue;
    try {
      const { fileList } = await wx.cloud.getTempFileURL({ fileList: list.map(fileID => ({ fileID, maxAge })) });
      (fileList || []).forEach(({ fileID, tempFileURL, status }) => {
        if ((status === 0 || status === 'SUCCESS') && tempFileURL) map.set(fileID, tempFileURL);
      });
    } catch (_) {
      // ignore batch error; keep partial results
    }
  }
  return map;
}

module.exports = { fileIDsToTempUrlMap };

