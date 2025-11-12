const cart = require('../../utils/cart');

Component({
  properties: {
    item: { type: Object, value: null },
    count: {
      type: Number,
      value: 0,
      observer(v) {
        if (typeof v !== 'number') this.setData({ count: 0 });
      }
    }
  },
  data: {
    viewItem: { cover: '' },
    count: 0
  },
  observers: {
    'item': function(it) {
      let cover = '';
      if (it) {
        // Prefer pre-converted temp URL if provided
        if (it.coverUrl) cover = it.coverUrl;
        else if (Array.isArray(it.images) && it.images.length) cover = it.images[0];
        else if (it.cover) cover = it.cover;
        else if (it.image) cover = it.image.startsWith('/') ? it.image : '/' + it.image;
      }
      const viewItem = { cover };
      try { console.log('CARD_COVER', (it && it.name) || '', cover); } catch(_) {}
      this.setData({ viewItem });
    }
  },
  methods: {
    onImgError() {
      const cover = this.data.viewItem && this.data.viewItem.cover;
      if (!cover) {
        this.setData({ 'viewItem.cover': '' });
      }
    },
    detailTap() {
      const item = this.data.item;
      if (!item || !item.id) return;
      this.triggerEvent('detail', { id: item.id });
    },
    inc() {
      const item = this.data.item;
      if (!item || !item.id) return;
      cart.addItem(item);
      this.triggerEvent('change');
    },
    dec() {
      const item = this.data.item;
      if (!item || !item.id) return;
      cart.removeItem(item.id);
      this.triggerEvent('change');
    }
  }
});
