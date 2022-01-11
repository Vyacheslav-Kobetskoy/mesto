export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._pageContainer = document.querySelector(".container");
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
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
    this._popupSelector.addEventListener("click", this._handleClickClose.bind(this));
    this._pageContainer.addEventListener("keydown", this._handleEscClose.bind(this));
  }
  
  removeEventListeners() {
    this._popupSelector.removeEventListener("click", this._handleClickClose);
    this._pageContainer.removeEventListener("keydown", this._handleEscClose);
  }
}
