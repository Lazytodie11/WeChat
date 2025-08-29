const cart = require('../../utils/cart');

Component({
  properties: {
    item: { type: Object, value: {} },
    count: { type: Number, value: 0 }
  },
  methods: {
    inc(e) {
      const item = this.data.item;
      cart.addItem(item);
      this.triggerEvent('change');
    },
    dec(e) {
      cart.removeItem(this.data.item.id);
      this.triggerEvent('change');
    }
  }
});

