import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validateForm = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "input-text_type_error",
  errorClass: "popup__input-error_visible",
};

const Validator = new FormValidator(validateForm);
Validator.enableValidation();

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

const template = document.querySelector(".template");

const сardsСollection = initialCards.map((item) => {
  const card = new Card(template, item);
  return card.createCard();
});

const popupZoom = document.querySelector(".zoom");
const zoomImg = document.querySelector(".zoom__img");
const zoomTitle = document.querySelector(".zoom__title");

сardsСollection.forEach((card) => {
  zoomCard(card);
});

const gallery = document.querySelector(".gallery");
gallery.append(...сardsСollection);

const popupEdit = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formEdit = document.forms["editForm"];
const pageContainer = document.querySelector(".container");

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  pageContainer.addEventListener("keydown", closePopupEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  pageContainer.removeEventListener("keydown", closePopupEscape);
}

function saveChanges(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupEdit);
}

editBtn.addEventListener("click", () => {
  clearErrorValidateMessage(formEdit);
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

formEdit.addEventListener("submit", saveChanges);

const addBtn = document.querySelector(".profile__add-btn");
const popupAddImg = document.querySelector(".popup_type_add-img");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
const formAdd = document.forms["add-imgForm"];
const formAddSaveBtn = formAdd.querySelector(".popup__save-btn");
addBtn.addEventListener("click", () => {
  addFormClear();
  clearErrorValidateMessage(formAdd);
  openPopup(popupAddImg);
  formAddSaveBtn.classList.add("popup__save-btn_disabled");
  formAddSaveBtn.disabled = true;
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-btn")) {
      closePopup(popup);
    }
  });
});

function addFormClear() {
  titleImg.value = "";
  linkImg.value = "";
}

function zoomCard(zoomElement) {
  const galleryPhoto = zoomElement.querySelector(".gallery__photo");
  const galleryPhotoTitle = zoomElement.querySelector(".gallery__photo-title");
  galleryPhoto.addEventListener("click", () => {
    zoomImg.src = galleryPhoto.src;
    zoomImg.alt = galleryPhoto.alt;
    zoomTitle.textContent = galleryPhotoTitle.textContent;
    openPopup(popupZoom);
  });
}
function saveImg(evt) {
  evt.preventDefault();
  const card = new Card(template, {
    name: titleImg.value,
    link: linkImg.value,
  });
  const newCard = card.createCard();
  zoomCard(newCard);

  gallery.prepend(newCard);
  closePopup(popupAddImg);
}
formAdd.addEventListener("submit", saveImg);

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const openElement = document.querySelector(".popup_opened");
    closePopup(openElement);
  }
}

function clearErrorValidateMessage(formElement) {
  const allerror = formElement.querySelectorAll(".popup__input-error_visible");
  allerror.forEach((errormessage) => {
    errormessage.classList.remove("popup__input-error_visible");
  });
}
