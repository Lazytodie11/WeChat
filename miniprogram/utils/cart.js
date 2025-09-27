const STORAGE_KEY = 'cart';

let listeners = [];

function load() {
  try {
    const arr = wx.getStorageSync(STORAGE_KEY) || [];
    // 兼容旧数据：补齐 variant 字段
    arr.forEach((it) => {
      if (!it) return;
      if (!it.variantSize) {
        const size = (Array.isArray(it.variants) && it.variants[0] && it.variants[0].size) || it.size || '默认';
        it.variantSize = size;
      }
      if (!it.variantKey && it.id) {
        it.variantKey = `${it.id}__${it.variantSize}`;
      }
      if (it.price == null) {
        // 尝试从 variants 补充价格
        const price = (Array.isArray(it.variants) && it.variants[0] && it.variants[0].price) || it.price || 0;
        it.price = Number(price);
      }
    });
    return arr;
  } catch (e) {
    return [];
  }
}

function save(cart) {
  try {
    wx.setStorageSync(STORAGE_KEY, cart);
  } catch (e) {}
  notify();
}

function notify() {
  const summary = getSummary();
  listeners.forEach((fn) => {
    try { fn(summary); } catch (e) {}
  });
}

function findIndex(cart, id, variantKey) {
  if (variantKey) return cart.findIndex((x) => x.id === id && x.variantKey === variantKey);
  return cart.findIndex((x) => x.id === id);
}

function addItem(item, variant) {
  if (!item || !item.id) return;
  const cart = load();
  const size = (variant && variant.size) || (Array.isArray(item.variants) && item.variants[0] && item.variants[0].size) || item.size || '默认';
  const price = Number((variant && variant.price != null) ? variant.price : (Array.isArray(item.variants) && item.variants[0] && item.variants[0].price != null ? item.variants[0].price : item.price || 0));
  const optName = (variant && (variant.optName || variant.optionName)) || item.optionName || '';
  const fillings = Array.isArray(variant && variant.fillings) ? variant.fillings : (Array.isArray(item && item.fillings) ? item.fillings : []);
  const fillKey = fillings && fillings.length ? `__fill:${fillings.join('|')}` : '';
  const optionsSignature = (variant && variant.optionsSignature) || (item && item.optionsSignature) || '';
  const sigKey = optionsSignature ? `__sig:${optionsSignature}` : '';
  const variantKey = `${item.id}__${size}__${optName}${fillKey}${sigKey}`;
  const idx = findIndex(cart, item.id, variantKey);
  if (idx >= 0) {
    cart[idx].count += 1;
  } else {
    const toSave = { ...item, price, count: 1, variantSize: size, variantKey, optionName: optName };
    if (fillings && fillings.length) toSave.fillings = fillings.slice();
    if (optionsSignature) toSave.optionsSignature = optionsSignature;
    if ((variant && variant.options) || (item && item.options)) toSave.options = (variant && variant.options) || (item && item.options);
    if ((variant && variant.optionsDesc) || (item && item.optionsDesc)) toSave.optionsDesc = (variant && variant.optionsDesc) || (item && item.optionsDesc);
    // 减少冗余字段体积
    delete toSave.variants;
    cart.push(toSave);
  }
  save(cart);
}

function removeItem(id, variant) {
  if (!id) return;
  const cart = load();
  let idx = -1;
  if (variant && (variant.size || variant.variantSize)) {
    const size = variant.size || variant.variantSize;
    const optName = (variant && (variant.optName || variant.optionName)) || '';
    const fillings = Array.isArray(variant && variant.fillings) ? variant.fillings : [];
    const fillKey = fillings && fillings.length ? `__fill:${fillings.join('|')}` : '';
    const optionsSignature = (variant && variant.optionsSignature) || '';
    const sigKey = optionsSignature ? `__sig:${optionsSignature}` : '';
    const variantKey = `${id}__${size}__${optName}${fillKey}${sigKey}`;
    idx = findIndex(cart, id, variantKey);
  }
  if (idx < 0) idx = findIndex(cart, id);
  if (idx >= 0) {
    cart[idx].count -= 1;
    if (cart[idx].count <= 0) cart.splice(idx, 1);
    save(cart);
  }
}

function clear() {
  save([]);
}

function removeProduct(id) {
  if (!id) return;
  const cart = load();
  const next = cart.filter(x => x.id !== id);
  save(next);
}

function getCart() {
  return load();
}

function getSummary() {
  const cart = load();
  let totalCount = 0;
  let totalPrice = 0;
  cart.forEach((x) => {
    totalCount += x.count;
    totalPrice += x.count * x.price;
  });
  return { totalCount, totalPrice: Number(totalPrice.toFixed(2)) };
}

function subscribe(fn) {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((x) => x !== fn);
  };
}

module.exports = {
  addItem,
  removeItem,
  clear,
  removeProduct,
  getCart,
  getSummary,
  subscribe,
};
