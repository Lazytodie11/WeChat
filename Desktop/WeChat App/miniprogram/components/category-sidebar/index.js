Component({
  properties: {
    categories: { type: Array, value: [] },
    currentId: { type: String, value: '' }
  },
  methods: {
    onTap(e) {
      const id = e.currentTarget.dataset.id;
      this.triggerEvent('select', { id });
    }
  }
});

