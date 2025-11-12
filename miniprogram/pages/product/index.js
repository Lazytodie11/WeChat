const cart = require('../../utils/cart');
const { products } = require('../../data/catalog');
const { toTempURLs } = require('../../utils/fileurl');
const { INS_ROLL_FLAVORS, TY_MILLE_FLAVORS, CAKE_FILLINGS } = require('../../constants/options');
const { USE_DB } = require('../../config');

function sanitizeVariants(list = [], fallbackSize = '默认') {
  if (Array.isArray(list) && list.length) {
    return list.map((v) => {
      if (!v || typeof v !== 'object') return v;
      const { price, priceLowest, priceText, ...rest } = v;
      return rest;
    });
  }
  return [{ size: fallbackSize }];
}

Page({
  data: {
    product: {},
    images: [],
    imageUrls: [],
    variants: [],
    minPrice: 0,
    current: 0,
    selectedVariant: null,
    count: 0,
    showSheet: false,
    sheetItems: [],
    // 分组选项选择状态
    selected: { variant: '', extras: [] },
    selectedDesc: ''
  },
  onLoad(query) {
    const id = (query && query.id) ? query.id : '';
    if (USE_DB) {
      const db = wx.cloud.database();
      db.collection('products').doc(id).get().then(async res => {
        const p = (res && res.data) ? res.data : {};
        // 将 _id 映射回 id，便于与现有购物车逻辑兼容
        p.id = p._id || id;
        const images = (Array.isArray(p.images) && p.images.length) ? p.images : (p.cover ? [p.cover] : []);
        let imageUrls = images;
        try {
          const hasCloud = (images || []).some(x => typeof x === 'string' && x.indexOf('cloud://') === 0);
          if (hasCloud) imageUrls = await toTempURLs(images);
        } catch (e) { try { console.warn('[toTempURLs] failed', e); } catch(_) {} }
        const variants = sanitizeVariants(p.variants, '默认');
        const minPrice = 0;
        // 使用后端提供的 options（若存在）；否则按旧规则构造 groups
        if (Array.isArray(p.options) && p.options.length) {
          // 将 options 标准化为前端使用的 groups：key 为 'variant' 或 'extras'
          const mapped = [];
          let variantSet = false;
          (p.options || []).forEach(function(opt){
            const type = opt && opt.type;
            const title = (opt && (opt.title || opt.name)) || '';
            const items = Array.isArray(opt && opt.items) ? opt.items.map(function(it){
              return { id: (it && it.id) || String((it && it.name) || ''), name: (it && it.name) || String((it && it.id) || '') };
            }) : [];
            if (type === 'single' && !variantSet) {
              mapped.push({ key:'variant', title: title || '可选项', type:'single', min:0, max:1, items });
              variantSet = true;
            } else if (type === 'multi') {
              const min = (opt && typeof opt.min === 'number') ? opt.min : 1;
              const max = (opt && typeof opt.max === 'number') ? opt.max : 2;
              mapped.push({ key:'extras', title: title || '可选项', type:'multi', min, max, items });
            }
          });
          p.groups = mapped;
        } else {
          const isInsRoll = (p.categoryId === 'ins-swiss-roll' || p.categoryId === 'ins-roll' || /瑞士卷/.test(p.name||''));
          const isTyMille = (p.categoryId === 'ty-mille' || /堆堆千层/.test(p.name||''));
          const isFour = (p.categoryId === 'cake-4inch' || p.categoryId === 'cake-4-inch');
          const isEight = (p.categoryId === 'cake-8inch' || p.categoryId === 'cake-8-inch');
          if (isInsRoll || isTyMille) {
            p.groups = [ { key:'variant', title:'口味', type:'single', min:0, max:1, items: ((isTyMille?TY_MILLE_FLAVORS:INS_ROLL_FLAVORS)||[]).map(x=>({ id:x.id, name:x.name })) } ];
          } else if (isFour || isEight) {
            const vItems = sanitizeVariants(p.variants, '默认').map(v => ({ id: String(v.size || '默认'), name: String(v.size || '默认') }));
            p.groups = [
              { key:'variant', title:'可选尺寸', type:'single', min:1, max:1, items: vItems },
              { key:'extras',  title:'蛋糕夹心', type:'multi',  min:1, max:2, items: (CAKE_FILLINGS||[]).map(x=>({ id:x.id, name:x.name })) }
            ];
          }
        }
        // 初始化选择
        let defVariantId = '';
        const g0 = (Array.isArray(p.groups) && p.groups.find(g=>g.key==='variant'));
        if (g0 && Array.isArray(g0.items) && g0.items.length) defVariantId = g0.items[0].id;
        const selected = { variant: defVariantId, extras: [] };
        const groupsWithUI = this.computeGroupUI(p.groups || [], selected);
        p.groups = groupsWithUI;
        const initialDesc = this.buildOptionsDescFrom(p.groups || [], selected);
        this.setData({ 
          product: p, images, imageUrls, variants, minPrice, current: 0, selectedVariant: variants[0],
          selected,
          selectedDesc: initialDesc
        });
        try { console.log('[product.groups]', p.name, JSON.stringify(p.groups || [])); } catch(_) {}
        this.refreshCount();
      }).catch(err => {
        console.warn('[DB] product get failed, fallback local', err);
        this.loadFromLocal(id);
      });
    } else {
      this.loadFromLocal(id);
    }
  },
  loadFromLocal(id) {
    const p = products.find(x => x.id === id) || {};
    const images = (p.images && p.images.length) ? p.images : (p.cover ? [p.cover] : []);
    const imageUrls = images;
    const variants = sanitizeVariants(p.variants, '默认');
    const minPrice = 0;
    const isInsRoll = (p.categoryId === 'ins-swiss-roll' || p.categoryId === 'ins-roll' || /瑞士卷/.test(p.name||''));
    const isFour = (p.categoryId === 'cake-4inch' || p.categoryId === 'cake-4-inch');
    const isEight = (p.categoryId === 'cake-8inch' || p.categoryId === 'cake-8-inch');
    if (isInsRoll) {
      p.groups = [ { key:'variant', title:'口味', type:'single', min:0, max:1, items: (INS_ROLL_FLAVORS||[]).map(x=>({ id:x.id, name:x.name })) } ];
    } else if (isFour || isEight) {
      const vItems = sanitizeVariants(p.variants, '默认').map(v => ({ id: String(v.size || '默认'), name: String(v.size || '默认') }));
      p.groups = [
        { key:'variant', title:'可选尺寸', type:'single', min:1, max:1, items: vItems },
        { key:'extras',  title:'蛋糕夹心', type:'multi',  min:1, max:2, items: (CAKE_FILLINGS||[]).map(x=>({ id:x.id, name:x.name })) }
      ];
    }
    let defVariantId = '';
    const g0 = (Array.isArray(p.groups) && p.groups.find(g=>g.key==='variant'));
    if (g0 && Array.isArray(g0.items) && g0.items.length) defVariantId = g0.items[0].id;
    const selected = { variant: defVariantId, extras: [] };
    const groupsWithUI = this.computeGroupUI(p.groups || [], selected);
    p.groups = groupsWithUI;
    const initialDesc = this.buildOptionsDescFrom(p.groups || [], selected);
    this.setData({ 
      product: p, images, imageUrls, variants, minPrice, current: 0, selectedVariant: variants[0],
      selected,
      selectedDesc: initialDesc
    });
    try { console.log('[product.groups]', p.name, JSON.stringify(p.groups || [])); } catch(_) {}
    this.refreshCount();
  },
  computeGroupUI(groups=[], selected={}){
    const s = selected || {}; const out = (Array.isArray(groups)?groups:[]).map(function(g){
      const isMulti = g.type === 'multi';
      const items = Array.isArray(g.items)? g.items.slice() : [];
      const selExtras = Array.isArray(s.extras)? s.extras : [];
      let selectedCount = 0;
      const items2 = items.map(function(it){
        const chosen = (g.key==='variant') ? (s.variant && s.variant===it.id) : (selExtras.indexOf(it.id) >= 0);
        if (chosen) selectedCount++;
        return { ...it, __selected: chosen };
      });
      const atMax = isMulti && g.max!=null ? (selectedCount >= Number(g.max)) : false;
      const items3 = items2.map(function(it){
        const disabled = isMulti ? (!it.__selected && atMax) : false;
        return { ...it, __disabled: disabled };
      });
      return { ...g, items: items3 };
    });
    return out;
  },
  onTapGroupItem(e) {
    const key = e.currentTarget.dataset.gkey; const oid = e.currentTarget.dataset.oid;
    try { console.log('[tap chip]', key, oid); } catch(_) {}
    const groups = this.data.product.groups || []; const g = groups.find(x=>x.key===key); if(!g) return;
    let selected = this.data.selected || { variant:'', extras: [] };
    if (key === 'variant') {
      selected = { ...selected, variant: oid };
    } else if (key === 'extras') {
      const cur = new Set(selected.extras || []);
      if (cur.has(oid)) cur.delete(oid); else {
        if (g.max && cur.size >= g.max) { try { console.log('[max reached]', g.max); } catch(_) {} return; }
        cur.add(oid);
      }
      selected = { ...selected, extras: Array.from(cur) };
    }
    // 更新 groups UI 选中/禁用态
    const nextGroups = this.computeGroupUI(this.data.product.groups || [], selected);
    this.setData({ selected, selectedDesc: this.buildOptionsDesc(), 'product.groups': nextGroups }, () => { try { console.log('[selected]', JSON.stringify(this.data.selected)); } catch(_) {} this.refreshCount(); });
  },
  buildOptionsSignature() {
    const s = this.data.selected || {}; const v = s.variant || '默认';
    const eList = Array.isArray(s.extras) ? s.extras.slice() : [];
    const e = eList.sort().join('+') || '默认';
    return `variant:${v}|extras:${e}`;
  },
  buildOptionsDesc() {
    const g = this.data.product.groups || []; const s = this.data.selected || {}; const parts = [];
    const gV = g.find(function(x){ return x.key==='variant'; });
    if (gV) {
      const items = Array.isArray(gV.items) ? gV.items : [];
      const target = items.find(function(o){ return o.id === (s.variant||''); });
      const vname = target ? target.name : '';
      if (vname) parts.push(`${gV.title}：${vname}`);
    }
    const gE = g.find(function(x){ return x.key==='extras'; });
    if (gE) {
      const items = Array.isArray(gE.items) ? gE.items : [];
      const sel = Array.isArray(s.extras) ? s.extras : [];
      const names = items.filter(function(o){ return sel.indexOf(o.id) >= 0; }).map(function(o){ return o.name; });
      parts.push(`${gE.title}：${names.length?names.join('、'):'默认'}`);
    }
    return parts.join(' ｜ ');
  },
  buildOptionsDescFrom(groups, selected) {
    const g = Array.isArray(groups) ? groups : []; const s = selected || {}; const parts = [];
    const gV = g.find(function(x){ return x.key==='variant'; }); if (gV) {
      const items = Array.isArray(gV.items) ? gV.items : [];
      const target = items.find(function(o){ return o.id === (s.variant||''); });
      const vname = target ? target.name : '';
      if (vname) parts.push(gV.title + '：' + vname);
    }
    const gE = g.find(function(x){ return x.key==='extras'; }); if (gE) {
      const items = Array.isArray(gE.items) ? gE.items : [];
      const sel = Array.isArray(s.extras) ? s.extras : [];
      const names = items.filter(function(o){ return sel.indexOf(o.id) >= 0; }).map(function(o){ return o.name; });
      parts.push(gE.title + '：' + (names.length?names.join('、'):'默认'));
    }
    return parts.join(' ｜ ');
  },
  onShow() { this.refreshCount(); },
  refreshCount() {
    const list = cart.getCart();
    const id = (this.data.product && this.data.product.id) ? this.data.product.id : '';
    if (!id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current];
    let count = 0;
    if (variant && variant.size) {
      const opt = '';
      const sig = this.buildOptionsSignature();
      const key = `${id}__${variant.size}__${opt}__sig:${sig}`;
      const found = list.find(x => x.variantKey === key);
      count = found ? (found.count || 0) : 0;
    } else {
      const found = list.find(x => x.id === id);
      count = found ? (found.count || 0) : 0;
    }
    this.setData({ count });
  },
  goBack(){ wx.navigateBack({ delta: 1 }); },
  chooseVariant(e) {
    const idx = Number(e.currentTarget.dataset.idx || 0);
    const v = this.data.variants[idx];
    this.setData({ current: idx, selectedVariant: v }, () => this.refreshCount());
  },
  inc() {
    const item = this.data.product;
    if (!item || !item.id) return;
    // 校验 extras 分组 min/max（若存在）
    const groups = this.data.product.groups || [];
    const gE = groups.find(function(x){ return x.key==='extras'; });
    if (gE) {
      const sel = (this.data.selected && Array.isArray(this.data.selected.extras)) ? this.data.selected.extras : [];
      const n = sel.length;
      const min = Number(gE.min||0); const max = Number(gE.max||Infinity);
      if (n < min || n > max) {
        wx.showToast({ icon:'none', title: `请先选择口味/夹心（至少${min}种，至多${max}种）` });
        return;
      }
    }
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认' };
    const optionsSignature = this.buildOptionsSignature();
    const optionsDesc = this.buildOptionsDesc();
    const selected = this.data.selected || {};
    const optObj = {
      variantId: selected.variant || null,
      variantName: (function(){
        const g = (this.data.product.groups||[]).find(function(x){return x.key==='variant';});
        const items = g && Array.isArray(g.items) ? g.items : [];
        const t = items.find(function(o){ return o.id === selected.variant; });
        return (t && t.name) || (variant.size||'默认');
      }).call(this),
      extras: (function(){
        const g = (this.data.product.groups||[]).find(function(x){return x.key==='extras';});
        const items = g && Array.isArray(g.items) ? g.items : [];
        const sel = Array.isArray(selected.extras) ? selected.extras : [];
        return items.filter(function(o){ return sel.indexOf(o.id) >= 0; }).map(function(o){ return {id:o.id, name:o.name}; });
      }).call(this)
    };
    // 将口味名称作为 optName 传入购物车，便于列表页展示
    const chosenVariantName = optObj.variantName || '';
    const variantPayload = {
      size: (variant && variant.size) || '默认',
      optName: chosenVariantName,
      optionsSignature,
      options: optObj,
      optionsDesc
    };
    cart.addItem({ ...item, optionsSignature, options: optObj, optionsDesc }, variantPayload);
    this.setData({ count: this.data.count + 1 });
  },
  dec() {
    const item = this.data.product;
    if (!item || !item.id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认' };
    const optionsSignature = this.buildOptionsSignature();
    const optionsDesc = this.buildOptionsDesc();
    const groups = this.data.product.groups || [];
    const selected = this.data.selected || {};
    let variantName = '';
    const g = groups.find(function(x){ return x.key==='variant'; });
    if (g) {
      const items = Array.isArray(g.items) ? g.items : [];
      const target = items.find(function(o){ return o.id === selected.variant; });
      variantName = (target && target.name) || '';
    }
    const variantPayload = {
      size: (variant && variant.size) || '默认',
      optName: variantName,
      optionsSignature,
      optionsDesc
    };
    cart.removeItem(item.id, variantPayload);
    this.setData({ count: Math.max(0, this.data.count - 1) });
  },
  // Bottom sheet logic
  openSheet() {
    const list = cart.getCart();
    const id = (this.data.product && this.data.product.id) ? this.data.product.id : '';
    const items = list.filter(x => x.id === id).map(x => {
      const desc = this.buildCartItemDesc(x);
      return {
        name: x.name,
        variantSize: x.variantSize,
        optionName: x.optionName,
        optionsDetail: x.optionsDetail,
        optionsSignature: x.optionsSignature,
        optionsDesc: desc,
        count: x.count,
        variantKey: x.variantKey
      };
    });
    this.setData({ showSheet: true, sheetItems: items });
  },
  closeSheet() { this.setData({ showSheet: false }); },
  noop() {},
  sheetInc(e) {
    const size = e.currentTarget.dataset.size;
    const opt = e.currentTarget.dataset.optname || '';
    const optionsSignature = e.currentTarget.dataset.sig || '';
    const optionsDetail = {}; // not needed for key
    const optionsDesc = ''; // purely display, not required here
    const item = this.data.product;
    if (!item || !item.id || !size) return;
    cart.addItem({ ...item, optionsSignature, optionsDetail, optionsDesc }, { size, optName: opt, optionsSignature, optionsDetail, optionsDesc });
    this.refreshCount();
    this.openSheet();
  },
  sheetDec(e) {
    const size = e.currentTarget.dataset.size;
    const opt = e.currentTarget.dataset.optname || '';
    const optionsSignature = e.currentTarget.dataset.sig || '';
    const optionsDetail = {}; const optionsDesc='';
    const item = this.data.product;
    if (!item || !item.id || !size) return;
    cart.removeItem(item.id, { size, optName: opt, optionsSignature, optionsDetail, optionsDesc });
    this.refreshCount();
    this.openSheet();
  },
  clearCurrent() {
    const id = this.data.product && this.data.product.id;
    if (!id) return;
    cart.removeProduct(id);
    this.refreshCount();
    this.openSheet();
  },
  clearAll() {
    cart.clear();
    this.refreshCount();
    this.openSheet();
  }
  ,
  buildCartItemDesc(x){
    if (x && x.optionsDesc) return x.optionsDesc;
    if (x && x.options) {
      const v = x.options.variantName || '';
      const extras = Array.isArray(x.options.extras) ? x.options.extras.map(function(e){return e.name;}) : [];
      const parts = [];
      parts.push('可选尺寸：' + (v || '默认'));
      if (extras.length) parts.push('蛋糕夹心：' + extras.join('、'));
      return parts.join(' ｜ ');
    }
    if (x && x.optionsDetail && x.optionsDetail.flavors && x.optionsDetail.flavors.length) {
      return '可选尺寸：' + (x.variantSize || '默认') + ' ｜ 口味：' + x.optionsDetail.flavors.join('、');
    }
    if (x && Array.isArray(x.fillings) && x.fillings.length) {
      return '可选尺寸：' + (x.variantSize || '默认') + ' ｜ 夹心：' + x.fillings.join('、');
    }
    return '';
  }
});
