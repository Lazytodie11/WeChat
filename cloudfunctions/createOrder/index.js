const cloud = require('wx-server-sdk');
const fetch = require('node-fetch');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const { items = [], totalPrice = 0, contact = {}, userProfile = {} } = event || {};
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'EMPTY_ITEMS' };
  }
  const now = new Date();
  const order = {
    items,
    totalPrice: 0,
    contact,
    userProfile: {
      nickName: (userProfile && userProfile.nickName) || '',
      avatarUrl: (userProfile && userProfile.avatarUrl) || ''
    },
    status: 'pending',
    _openid: wxContext.OPENID,
    createTime: now,
    createdAt: now,
  };

  try {
    const res = await db.collection('orders').add({ data: order });
    const orderId = res._id;

    // Notify via WeCom robot if webhook is set
    const webhook = process.env.WEWORK_WEBHOOK;
    if (webhook) {
      const lines = [];
      lines.push(`【新订单】#${orderId}`);
      lines.push('金额：待确认');
      const nick = (order.userProfile && order.userProfile.nickName) || '';
      lines.push(`客户：${nick || contact.name || ''} ${contact.phone || ''}`);
      if (contact.note) lines.push(`备注：${contact.note}`);
      lines.push('商品：');
      items.forEach(it => lines.push(`- ${it.name} x ${it.count}`));
      const content = lines.join('\n');
      try {
        await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ msgtype: 'markdown', markdown: { content } })
        });
      } catch (notifyErr) {
        console.error('Notify error', notifyErr);
      }
    } else {
      console.log('WEWORK_WEBHOOK not set; skip notify');
    }

    return { ok: true, orderId };
  } catch (e) {
    console.error(e);
    return { ok: false, error: 'DB_ERROR' };
  }
};
