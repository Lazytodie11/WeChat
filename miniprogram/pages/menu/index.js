const cart = require('../../utils/cart');
const { categories, products } = require('../../data/catalog');
const { USE_DB, PAGE_SIZE } = require('../../config');

// 旧/自定义分类ID -> 数据库真实 categoryId
const LEGACY_TO_DB = {
  'stack-mille':        'ty-mille',
  'ty-stack-cake':      'ty-cake',
  'french-mille-cake':  'french-mille',
  'basque-cake':        'basque',
  'tiramisu-cake':      'tiramisu',
  'ins-swiss-roll':     'ins-roll',
  'cake-accessories':   'accessories',
  'cake-4inch':         'four-inch',
  'cake-8inch':         'eight-inch',
  'lava-waterfall':     'lava-falls',
};

// ====== 将 cloud:// FileID 分批（<=50）转换为 https 临时链接 ======
async function resolveCloudFileIDs(fileIDs = []) {
  const ids = Array.from(new Set((Array.isArray(fileIDs) ? fileIDs : []).filter(x => typeof x === 'string' && x.startsWith('cloud://'))));
  if (!ids.length) return {};
  const CHUNK = 50;
  const map = {};
  for (let i = 0; i < ids.length; i += CHUNK) {
    const slice = ids.slice(i, i + CHUNK);
    try {
      const { fileList } = await wx.cloud.getTempFileURL({ fileList: slice.map(f => ({ fileID: f, maxAge: 3600 })) });
      (fileList || []).forEach(it => { if (it && it.fileID) map[it.fileID] = it.tempFileURL || ''; });
    } catch (_) { /* ignore batch error */ }
  }
  return map;
}

// 生成渲染用的数据：把 cover/images 里的 cloud:// 换成 https（不改其他字段）
async function normalizeProductsForRender(products = []) {
  const fileIDs = [];
  (products || []).forEach(p => {
    if (p && typeof p.cover === 'string' && p.cover.startsWith('cloud://')) fileIDs.push(p.cover);
    (Array.isArray(p && p.images) ? p.images : []).forEach(img => { if (img && img.startsWith('cloud://')) fileIDs.push(img); });
  });
  const urlMap = await resolveCloudFileIDs(fileIDs);
  // 不引用本地占位图，保持空串兜底，避免“忽略上传”告警
  const placeholderUrl = '';
  return (products || []).map(p => {
    const np = { ...p };
    // 补齐 id，供购物车与计数使用
    np.id = p.id || p._id || '';
    if (np.cover && np.cover.startsWith('cloud://')) np.cover = urlMap[np.cover] || placeholderUrl;
    if (Array.isArray(np.images)) np.images = np.images.map(img => (img && img.startsWith('cloud://')) ? (urlMap[img] || placeholderUrl) : img);
    else np.images = [];
    if (!np.cover) np.cover = placeholderUrl;
    return np;
  });
}

// —— 规范化单个商品 —— 
function normalizeProduct(p, urlMap, countMap) {
  if (!p || typeof p !== 'object') return null;

  const id = p.id || p._id || '';
  if (!id) return null;

  const imgs = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
  const cover = p.cover || imgs[0] || '';

  const variants = Array.isArray(p.variants) && p.variants.length
    ? p.variants.map(v => {
        if (!v || typeof v !== 'object') return v;
        const { price, priceLowest, priceText, ...rest } = v;
        return rest;
      })
    : [{ id: 'default', name: '默认', size: '默认' }];

  const count = Number((countMap && countMap[id]) || p.count || 0) || 0;

  const coverUrl = urlMap && typeof urlMap.get === 'function' ? (urlMap.get(cover) || '') : (urlMap && urlMap[cover]) || '';
  const imagesUrl = imgs.map(fid => (urlMap && typeof urlMap.get === 'function') ? (urlMap.get(fid) || '') : (urlMap && urlMap[fid]) || '').filter(Boolean);

  const normalized = {
    ...p,
    id,
    cover,
    images: imgs,
    variants,
    count,
    coverUrl,
    imagesUrl,
    status: 1,
  };
  delete normalized.price;
  delete normalized.priceLowest;
  return normalized;
}

// —— 统一设置列表：批量 URL 转换 + 规范化 + 过滤 ——
async function setProductsSafely(rawList = [], ctx, reset) {
  const ids = [];
  rawList.forEach(p => {
    if (p && p.cover) ids.push(p.cover);
    if (Array.isArray(p && p.images)) ids.push(...p.images);
  });
  const urlMap = await fileIDsToTempUrlMap(Array.from(new Set(ids)));
  const list = rawList.map(p => normalizeProduct(p, urlMap, ctx.data.countMap)).filter(Boolean);
  const merged = reset ? list : (ctx.data.filteredProducts || []).concat(list);
  ctx.setData({ filteredProducts: merged });
}

Page({
  data: {
    categories,
    currentCatId: categories[0].id,
    currentCatName: categories[0].name,
    filteredProducts: [],
    countMap: {},
    showBackTop: false,
    // DB 相关
    useDB: !!USE_DB,
    loading: false,
    hasMore: true,
    page: 0,
    pageSize: PAGE_SIZE
  },
  onShow() {
    try { require('../../utils/splash').showSplash(this); } catch(_) {}
    this.refreshCounts();
    if (this.data.useDB) this.fetchProducts(true); else this.applyFilter();
    if (!this._unsubCart) {
      this._unsubCart = cart.subscribe(() => {
        try { this.refreshCounts(); } catch (e) {}
      });
    }
    // 首次进入引导授权（带“跳过”）
    try {
      const app = getApp && getApp();
      const needAuth = !!(app && app.globalData && app.globalData.needAuth);
      if (needAuth) { const gate = this.selectComponent('#auth'); gate && gate.show && gate.show(); }
    } catch(_) {}
  },
  onHide() { if (this._unsubCart) { try { this._unsubCart(); } catch(e) {} this._unsubCart = null; } },
  onUnload() { if (this._unsubCart) { try { this._unsubCart(); } catch(e) {} this._unsubCart = null; } },
  onSelectCategory(e) {
    const id = e.detail.id;
    this.setData({ currentCatId: id, currentCatName: (function(){ const c = categories.find(function(c){return c.id===id;}); return (c && c.name) || ''; })(),
      page: 0, hasMore: true, filteredProducts: []
    });
    if (this.data.useDB) this.fetchProducts(true); else this.applyFilter();
  },
  onScroll(e) {
    const scrollTop = e.detail.scrollTop;
    this.setData({ showBackTop: scrollTop > 120 });
  },
  refreshCounts() {
    const list = cart.getCart();
    const m = {};
    list.forEach(x => {
      m[x.id] = (m[x.id] || 0) + (x.count || 0);
    });
    this.setData({ countMap: m }, () => {
      if (this.data.useDB) {
        // 仅更新数量映射
        const withCounts = (this.data.filteredProducts || []).map(p => ({ ...p, count: m[p.id] || 0 }));
        this.setData({ filteredProducts: withCounts });
      } else {
        this.applyFilter();
      }
    });
  },
  applyFilter() {
    const { currentCatId, countMap } = this.data;
    const list = products.filter(p => p.categoryId === currentCatId).map(p => ({
      ...p,
      count: countMap[p.id] || 0,
    }));
    this.setData({ filteredProducts: list });
  },
  fetchProducts(reset=false) {
    if (!this.data.useDB) return;
    if (this.data.loading) return;
    if (!reset && !this.data.hasMore) return;
    const db = wx.cloud.database();
    const { currentCatId, page, pageSize } = this.data;
    // 映射到数据库中的真实 categoryId
    const usedCategoryId = LEGACY_TO_DB[currentCatId] || currentCatId;
    try { console.log('[DB] fetch categoryId =', currentCatId, '=> used =', usedCategoryId); } catch(_) {}
    const nextPage = reset ? 0 : page;
    this.setData({ loading: true });
    db.collection('products')
      // 仅按分类过滤，status 缺失也能取到；后续 normalize 强制 status=1
      .where({ categoryId: usedCategoryId })
      .orderBy('sort', 'desc')
      .skip(nextPage * pageSize)
      .limit(pageSize)
      .get()
      .then(async res => {
        try { console.log('[DB] products fetched', usedCategoryId, (res && res.data && res.data.length) || 0); } catch(_) {}
        const rows = (res && res.data) ? res.data : [];
        const hasMore = rows.length >= pageSize;
        let renderList = await normalizeProductsForRender(rows);
        // 注入 count 字段，避免组件收到非数字
        const cm = this.data.countMap || {};
        renderList = renderList.map(it => ({ ...it, count: Number(cm[it.id] || 0) }));
        const merged = reset ? renderList : (this.data.filteredProducts || []).concat(renderList);
        this.setData({ filteredProducts: merged, page: nextPage + 1, hasMore, loading: false }, () => {
          // 再次同步一次计数，确保 UI 与购物车一致
          try { this.refreshCounts(); } catch(_) {}
          try { require('../../utils/splash').hideSplash(this); } catch(_) {}
          // 隐藏加载图后再尝试展示授权引导
          try {
            const app = getApp && getApp();
            const needAuth = !!(app && app.globalData && app.globalData.needAuth);
            if (needAuth) { const gate = this.selectComponent('#auth'); gate && gate.show && gate.show(); }
          } catch(_) {}
        });
      })
      .catch(err => {
        console.warn('[DB] fetch products failed, fallback local:', err);
        this.setData({ loading: false });
        // 失败退回本地
        this.applyFilter();
        try { require('../../utils/splash').hideSplash(this); } catch(_) {}
        try {
          const app = getApp && getApp();
          const needAuth = !!(app && app.globalData && app.globalData.needAuth);
          if (needAuth) { const gate = this.selectComponent('#auth'); gate && gate.show && gate.show(); }
        } catch(_) {}
      });
  },
  onScrollLower() {
    if (this.data.useDB) this.fetchProducts(false);
  },
  onCardChange() {
    this.refreshCounts();
  },
  onCardDetail(e) {
    const id = (e && e.detail && e.detail.id) || '';
    if (!id) return;
    wx.navigateTo({ url: `/pages/product/index?id=${id}` });
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id;
    if (!id) return;
    wx.navigateTo({ url: `/pages/product/index?id=${id}` });
  },
  goTop() {
    // 右侧滚动视图回顶（通过设置 scroll-top on scroll-view 可以实现，这里省略）
  }
  ,
  // 授权组件事件：统一落地 needAuth=false
  onAuthAuthed(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} },
  onAuthSkipped(){ try{ const app = getApp && getApp(); if(app){ app.globalData = app.globalData||{}; app.globalData.needAuth=false; } }catch(_){} }
});
