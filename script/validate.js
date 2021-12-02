const validateForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "input-text_type_error",
  errorClass: "popup__input-error_visible",
};

function setEventListeners(formElement, config) {
  const { inputSelector, submitButtonSelector } = config;
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(document.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(formElement, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement,config);
      toggleButtonState(formElement, buttonElement, config);
    });
  });
}

function checkInputValidity(inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement, config);
  } else {
    showInputError(inputElement, config);
  }
}

function hideInputError(inputElement, config) {
  const { inputErrorClass, errorClass } = config;

  const errorElement = inputElement
    .closest("form")
    .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function showInputError(inputElement, config) {
  const { inputErrorClass,errorClass } = config;
  const errorElement = inputElement
    .closest("form")
    .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(formElement, buttonElement, config) {
  const { inactiveButtonClass } = config;
  const isFormValid = formElement.checkValidity();

  buttonElement.classList.toggle(inactiveButtonClass, !isFormValid);
  buttonElement.disabled = !isFormValid;
}

function enableValidation(config) {
  const { formSelector } = config;
  const forms = document.querySelectorAll(formSelector);
  forms.forEach((form) => {
    setEventListeners(form, config);
  });
}
enableValidation(validateForm);
