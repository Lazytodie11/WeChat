const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();
const _ = db.command;

const SYS_DOC_ID = 'sys_admins';

async function getMeta() {
  try {
    const { data } = await db.collection('admins').doc(SYS_DOC_ID).get();
    return data || null;
  } catch (e) { return null; }
}

async function ensureMeta(openid) {
  // Create meta doc if not exists, and set creatorOpenId to current caller
  const meta = await getMeta();
  if (meta) return meta;
  const doc = { _id: SYS_DOC_ID, creatorOpenId: openid, openids: [] };
  await db.collection('admins').add(doc);
  return doc;
}

function envCreator() {
  const s = (process.env.CREATOR_OPENID || '').trim();
  return s || '';
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  const action = (event && event.action) || 'list';
  const target = (event && (event.openid || event.targetOpenid)) || '';

  // Bootstrap meta if needed
  if (action === 'ensure') {
    const meta = await ensureMeta(OPENID);
    return { ok: true, meta, creatorOpenId: meta.creatorOpenId };
  }

  // Resolve creator: env has highest priority; fallback to meta.creatorOpenId; fallback to caller when no meta
  const envOwner = envCreator();
  let meta = await getMeta();
  if (!meta) meta = await ensureMeta(OPENID);
  const creatorOpenId = envOwner || (meta && meta.creatorOpenId) || '';

  if (action === 'list') {
    const openids = (meta && Array.isArray(meta.openids)) ? meta.openids : [];
    return { ok: true, creatorOpenId, openids };
  }

  // Only creator can mutate admin list
  if (!creatorOpenId || OPENID !== creatorOpenId) {
    return { ok: false, errCode: 'PERMISSION_DENIED', message: 'Only creator can mutate admin list' };
  }

  if (action === 'add') {
    const oid = String(target || '').trim();
    if (!oid) return { ok: false, errCode: 'INVALID_ARG', message: 'openid required' };
    await db.collection('admins').doc(SYS_DOC_ID).update({ openids: _.addToSet(oid) });
    const after = await getMeta();
    return { ok: true, creatorOpenId, openids: after.openids || [] };
  }
  if (action === 'remove') {
    const oid = String(target || '').trim();
    if (!oid) return { ok: false, errCode: 'INVALID_ARG', message: 'openid required' };
    await db.collection('admins').doc(SYS_DOC_ID).update({ openids: _.pull(oid) });
    const after = await getMeta();
    return { ok: true, creatorOpenId, openids: after.openids || [] };
  }

  return { ok: false, errCode: 'UNKNOWN_ACTION', message: `Unknown action: ${action}` };
};

