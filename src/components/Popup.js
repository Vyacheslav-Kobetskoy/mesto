export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._pageContainer = document.querySelector(".container");
    this._handleClickClose = this._handleClickClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClickClose(evt) {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", this._handleClickClose);
    this._pageContainer.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._popup.removeEventListener("click", this._handleClickClose);
    this._pageContainer.removeEventListener("keydown", this._handleEscClose);
  }
}
