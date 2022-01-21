import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this.handleSubmit = handleSubmit;
    this._inputList = Array.from(
      this._popup.querySelectorAll(".popup__input-text")
    );
    this._formValues = {};
    this._submitBtn = this._popup.querySelector(".popup__save-btn");
    this._submitBtnDefaultText = this._submitBtn.value;
  }

  isLoad(state) {
    if (state) {
      this._submitBtn.value = "Сохранение...";
    } else {
      this._submitBtn.value = this._submitBtnDefaultText;
    }
  }

  getInputValues() {
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
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
