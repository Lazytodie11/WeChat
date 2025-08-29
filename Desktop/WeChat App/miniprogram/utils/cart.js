const STORAGE_KEY = 'cart';

let listeners = [];

function load() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || [];
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

function findIndex(cart, id) {
  return cart.findIndex((x) => x.id === id);
}

function addItem(item) {
  const cart = load();
  const idx = findIndex(cart, item.id);
  if (idx >= 0) {
    cart[idx].count += 1;
  } else {
    cart.push({ ...item, count: 1 });
  }
  save(cart);
}

function removeItem(id) {
  const cart = load();
  const idx = findIndex(cart, id);
  if (idx >= 0) {
    cart[idx].count -= 1;
    if (cart[idx].count <= 0) cart.splice(idx, 1);
    save(cart);
  }
}

function clear() {
  save([]);
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
  getCart,
  getSummary,
  subscribe,
};

