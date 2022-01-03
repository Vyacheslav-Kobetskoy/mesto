import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleSubmit = handleSubmit;
    this._form = this._popupSelector.querySelector(".popup__form");
    this.handleSubmit = handleSubmit;
    this._inputList = Array.from(
      this._popupSelector.querySelectorAll(".popup__input-text")
    );
  }

  _getInputValues() {
    this._inputValues = this._inputList.map((inputElement) => {
      return inputElement.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleSubmit);
  }
  
  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this.handleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
