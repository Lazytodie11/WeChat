const cloud = require('wx-server-sdk');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();
  if (!OPENID) return { isAdmin: false };

  try {
    // 1) Check environment variable ADMIN_OPENIDS: comma-separated list
    const envList = (process.env.ADMIN_OPENIDS || '').split(',').map(s => s.trim()).filter(Boolean);
    if (envList.length && envList.includes(OPENID)) {
      return { isAdmin: true };
    }

    // 2) Check database collection 'admins'
    // Support two styles:
    //  - a) docs with field `openids: [ ... ]`
    //  - b) one doc per admin with field `openid: 'xxx'`
    let found = false;
    try {
      const resA = await db.collection('admins').where({ openids: db.command.all([OPENID]) }).limit(1).get();
      if (resA.data && resA.data.length) found = true;
    } catch (_) {}
    if (!found) {
      try {
        const resB = await db.collection('admins').where({ openid: OPENID }).limit(1).get();
        if (resB.data && resB.data.length) found = true;
      } catch (_) {}
    }

    return { isAdmin: found };
  } catch (e) {
    return { isAdmin: false };
  }
};

