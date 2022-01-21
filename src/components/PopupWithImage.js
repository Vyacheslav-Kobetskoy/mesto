import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._zoomImg = this._popup.querySelector(".zoom__img");
    this._zoomTitle = this._popup.querySelector(".zoom__title");
  }

  open({ name, link }) {
    this._zoomImg.src = link;
    this._zoomImg.alt = name;
    this._zoomTitle.textContent = name;
    super.open();
  }
}
