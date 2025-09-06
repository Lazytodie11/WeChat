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
      const cover = (it && (it.cover || it.image)) ? (it.cover || (it.image.startsWith('/') ? it.image : '/' + it.image)) : '/assets/p1.jpg';
      const viewItem = { cover };
      this.setData({ viewItem });
    }
  },
  methods: {
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
