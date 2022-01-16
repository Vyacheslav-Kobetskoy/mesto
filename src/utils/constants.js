const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validateConfig = {
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "input-text_type_error",
  errorClass: "popup__input-error_visible",
};

const popupSelector = {
  popupZoomSelector: ".zoom",
  popupAddImgSelector: ".popup_type_add-img",
  popupEditSelector: ".popup_type_edit",
  popupEditAvatarSelector: ".popup_type_edit-avatar",
  popupDeleteCardSelector: ".popup_type_delete-card",
};

export { initialCards, validateConfig, popupSelector };
