export class Section {
  constructor({ items, renderer }, selector) {
    this.items = items;
    this.renderer = renderer;
    this.selector = selector;
  }

  renderer() {}

  addItem() {}
}
