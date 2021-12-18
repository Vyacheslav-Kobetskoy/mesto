export class FormValidator {
  constructor(config) {
    this._config = config;
    this._forms = document.querySelectorAll(this._config.formSelector);
  }

  _setEventListeners(formElement) {
    const { inputSelector, submitButtonSelector } = this._config;
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const inputList = Array.from(document.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(formElement, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(formElement, buttonElement);
      });
    });
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;

    const errorElement = inputElement
      .closest("form")
      .querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;
    const errorElement = inputElement
      .closest("form")
      .querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _toggleButtonState(formElement, buttonElement) {
    const { inactiveButtonClass } = this._config;
    const isFormValid = formElement.checkValidity();

    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
    buttonElement.disabled = !isFormValid;
  }

  enableValidation() {
    this._forms.forEach((form) => {
      this._setEventListeners(form);
    });
  }
}