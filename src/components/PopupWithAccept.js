import { Popup } from "./Popup.js";

export class PopupWithAccept extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
  }
  open() {
    super.open();
    this._form.addEventListener("submit", this._handleSubmit);
  }
  close(){
    super.close()
    this._form.removeEventListener("submit", this._handleSubmit);
  }
}
