const cart = require('../../utils/cart');

Component({
  properties: {
    item: { type: Object, value: {} },
    count: { type: Number, value: 0 }
  },
  data: {
    viewItem: { cover: '/assets/p1.jpg' }
  },
  observers: {
    'item': function(it) {
      let cover = '/assets/p1.jpg';
      if (it) {
        if (Array.isArray(it.images) && it.images.length) cover = it.images[0];
        else if (it.cover) cover = it.cover;
        else if (it.image) cover = it.image.startsWith('/') ? it.image : '/' + it.image;
      }
      const viewItem = { cover };
      try { console.log('CARD_COVER', it?.name || '', cover); } catch(_) {}
      this.setData({ viewItem });
    }
  },
  methods: {
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
