/*const configForm={
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
}
*/

function setEventListeners(formElement) {
  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
  const inputList = Array.from(document.querySelectorAll(".popup__input-text"));
  const buttonElement = formElement.querySelector(".popup__save-btn");
  toggleButtonState(formElement, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(formElement, buttonElement);
    });
  });
}

function checkInputValidity(formElement, inputElement) {
  if (inputElement.validity.valid) {
    hideInputError(inputElement);
  } else {
    showInputError(inputElement);
  }
}

function hideInputError(inputElement) {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove("popup__input-text_type_error");
  errorElement.classList.remove("popup__input-error_visible");
  errorElement.textContent = "";
}

function showInputError(inputElement) {
  const errorElement = inputElement
    .closest("form")
    .querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add("popup__input-text_type_error");
  errorElement.classList.add("popup__input-error_visible");
  errorElement.textContent = inputElement.validationMessage;
}

function toggleButtonState(formElement, buttonElement) {
  const isFormValid = formElement.checkValidity();

  buttonElement.classList.toggle("popup__save-btn_disabled", !isFormValid);
  buttonElement.disabled = !isFormValid;
}

function enableValidation() {
  const forms = document.querySelectorAll(".popup__form");
  forms.forEach((form) => {
    setEventListeners(form);
    console.log(form);
  });
}
enableValidation();

