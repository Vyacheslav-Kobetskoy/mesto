export class Section {
  constructor(items, renderer, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderer() {
    const initialInems = this._items.map((item) =>
      this._containerSelector.append(this._renderer(item))
    );
    return initialInems;
  }
  
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
