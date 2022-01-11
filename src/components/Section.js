export class Section {
  constructor(items, renderer, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderer() {
    const initialInems = this._items.map((item) =>
      this._container.append(this._renderer(item))
    );
    return initialInems;
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
