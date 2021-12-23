export class FormValidator {
  constructor(form, config) {
    this._config = config;
    this.form = form;
    this._inputList = Array.from(
      this.form.querySelectorAll(this._config.inputSelector)
    );
    this.buttonElement = this.form.querySelector(
      this._config.submitButtonSelector
    );
  }

  enableValidation = () => {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
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

    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _showInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._config;
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(inputErrorClass);
    errorElement.classList.add(errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  toggleButtonState() {
    const { inactiveButtonClass } = this._config;
    const isFormValid = this.form.checkValidity();

    this.buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
    this.buttonElement.disabled = !isFormValid;
  }

  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

 
}
