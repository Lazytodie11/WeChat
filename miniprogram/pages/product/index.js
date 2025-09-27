const cart = require('../../utils/cart');
const { products } = require('../../data/catalog');
const { INS_ROLL_FLAVORS, CAKE_FILLINGS } = require('../../constants/options');

Page({
  data: {
    product: {},
    images: [],
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
    const p = products.find(x => x.id === id) || {};
    const images = (p.images && p.images.length) ? p.images : (p.cover ? [p.cover] : ['/assets/p1.jpg']);
    const variants = Array.isArray(p.variants) && p.variants.length ? p.variants : [{ size: '默认', price: Number(p.price || 0) }];
    const firstPrice = Number((variants[0] && variants[0].price) != null ? variants[0].price : 0);
    const minPrice = variants.reduce((m, v) => Math.min(m, Number(v.price||0)), firstPrice);
    // 构造 groups：仅修改 Ins瑞士卷/4寸/8寸，其它不变
    const isInsRoll = (p.categoryId === 'ins-swiss-roll' || p.categoryId === 'ins-roll' || /瑞士卷/.test(p.name||''));
    const isFour = (p.categoryId === 'cake-4inch' || p.categoryId === 'cake-4-inch');
    const isEight = (p.categoryId === 'cake-8inch' || p.categoryId === 'cake-8-inch');
    if (isInsRoll) {
      p.groups = [ { key:'variant', title:'可选尺寸', type:'single', min:0, max:1, items: (INS_ROLL_FLAVORS||[]).map(x=>({ id:x.id, name:x.name })) } ];
    } else if (isFour || isEight) {
      const vItems = (Array.isArray(p.variants)&&p.variants.length ? p.variants : [{ size:'默认', price: Number(p.price||0) }]).map(v=>({ id:String(v.size||'默认'), name:String(v.size||'默认') }));
      p.groups = [
        { key:'variant', title:'可选尺寸', type:'single', min:1, max:1, items: vItems },
        { key:'extras',  title:'蛋糕夹心', type:'multi',  min:1, max:2, items: (CAKE_FILLINGS||[]).map(x=>({ id:x.id, name:x.name })) }
      ];
    }
    // 初始化选择
    let defVariantId = '';
    const g0 = (Array.isArray(p.groups) && p.groups.find(g=>g.key==='variant'));
    if (g0 && Array.isArray(g0.items) && g0.items.length) defVariantId = g0.items[0].id;
    const selected = { variant: defVariantId, extras: [] };
    this.setData({ 
      product: p, images, variants, minPrice, current: 0, selectedVariant: variants[0],
      selected,
      selectedDesc: ''
    });
    try { console.log('[product.groups]', p.name, JSON.stringify(p.groups || [])); } catch(_) {}
    this.refreshCount();
  },
  groupSelectedCount(key) { return Array.isArray(this.data.selected?.extras) && key==='extras' ? this.data.selected.extras.length : (key==='variant' && this.data.selected?.variant ? 1 : 0); },
  isGroupSelected(key, index) {
    const groups = this.data.product.groups || []; const g = groups.find(x=>x.key===key); if(!g) return false;
    const oid = (g.items && g.items[index] && g.items[index].id) || '';
    if (key==='variant') return this.data.selected?.variant === oid;
    if (key==='extras') return (this.data.selected?.extras||[]).includes(oid);
    return false;
  },
  isGroupSelectedId(key, oid) {
    if (!oid) return false;
    if (key==='variant') return this.data.selected?.variant === oid;
    if (key==='extras') return (this.data.selected?.extras||[]).includes(oid);
    return false;
  },
  onTapGroupItem(e) {
    const key = e.currentTarget.dataset.gkey; const oid = e.currentTarget.dataset.oid;
    const groups = this.data.product.groups || []; const g = groups.find(x=>x.key===key); if(!g) return;
    let selected = this.data.selected || { variant:'', extras: [] };
    if (key === 'variant') {
      selected = { ...selected, variant: oid };
    } else if (key === 'extras') {
      const cur = new Set(selected.extras || []);
      if (cur.has(oid)) cur.delete(oid); else {
        if (g.max && cur.size >= g.max) return; // 达上限
        cur.add(oid);
      }
      selected = { ...selected, extras: Array.from(cur) };
    }
    this.setData({ selected, selectedDesc: this.buildOptionsDesc() }, () => this.refreshCount());
  },
  buildOptionsSignature() {
    const s = this.data.selected || {}; const v = s.variant || '默认';
    const e = (s.extras||[]).slice().sort().join('+') || '默认';
    return `variant:${v}|extras:${e}`;
  },
  buildOptionsDesc() {
    const g = this.data.product.groups || []; const s = this.data.selected || {}; const parts = [];
    const gV = g.find(x=>x.key==='variant'); if (gV) { const vname = (gV.items||[]).find(o=>o.id===(s.variant||''))?.name; if (vname) parts.push(`${gV.title}：${vname}`); }
    const gE = g.find(x=>x.key==='extras'); if (gE) { const names = (gE.items||[]).filter(o => (s.extras||[]).includes(o.id)).map(o=>o.name); parts.push(`${gE.title}：${names.length?names.join('、'):'默认'}`); }
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
    const gE = (this.data.product.groups||[]).find(x=>x.key==='extras');
    if (gE) {
      const n = (this.data.selected?.extras||[]).length;
      const min = Number(gE.min||0); const max = Number(gE.max||Infinity);
      if (n < min || n > max) {
        wx.showToast({ icon:'none', title: `请先选择口味/夹心（至少${min}种，至多${max}种）` });
        return;
      }
    }
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认', price: Number(item.price || 0) };
    const optionsSignature = this.buildOptionsSignature();
    const optionsDesc = this.buildOptionsDesc();
    const selected = this.data.selected || {};
    const optObj = {
      variantId: selected.variant || null,
      variantName: (this.data.product.groups||[]).find(x=>x.key==='variant')?.items?.find(o=>o.id===selected.variant)?.name || (variant.size||'默认'),
      extras: ((this.data.product.groups||[]).find(x=>x.key==='extras')?.items||[]).filter(o=>(selected.extras||[]).includes(o.id)).map(o=>({id:o.id,name:o.name}))
    };
    cart.addItem({ ...item, optionsSignature, options: optObj, optionsDesc }, { ...variant, optionsSignature, options: optObj, optionsDesc });
    this.setData({ count: this.data.count + 1 });
  },
  dec() {
    const item = this.data.product;
    if (!item || !item.id) return;
    const variant = this.data.selectedVariant || this.data.variants[this.data.current] || { size: '默认', price: Number(item.price || 0) };
    const optionsSignature = this.buildOptionsSignature();
    const optionsDesc = this.buildOptionsDesc();
    cart.removeItem(item.id, { ...variant, optionsSignature, optionsDesc });
    this.setData({ count: Math.max(0, this.data.count - 1) });
  },
  // Bottom sheet logic
  openSheet() {
    const list = cart.getCart();
    const id = this.data.product?.id;
    const items = list.filter(x => x.id === id).map(x => {
      const subtotal = Number(((Number(x.price || 0)) * (Number(x.count || 0))).toFixed(2));
      return {
        name: x.name,
        variantSize: x.variantSize,
        optionName: x.optionName,
        optionsDetail: x.optionsDetail,
        optionsSignature: x.optionsSignature,
        optionsDesc: x.optionsDesc,
        count: x.count,
        price: Number(x.price || 0),
        subtotal,
        variantKey: x.variantKey
      };
    });
    const sheetTotal = items.reduce((sum, it) => sum + it.subtotal, 0);
    this.setData({ showSheet: true, sheetItems: items, sheetTotal: Number(sheetTotal.toFixed(2)) });
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
});
