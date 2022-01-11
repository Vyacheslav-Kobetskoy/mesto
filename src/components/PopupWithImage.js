import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._zoomImg = this._popup.querySelector(".zoom__img");
    this._zoomTitle = this._popup.querySelector(".zoom__title");
  }

  open() {
    this._zoomImg.src = event.target.src;
    this._zoomImg.alt = event.target.alt;
    this._zoomTitle.textContent = event.target.alt;
    super.open();
  }
}
