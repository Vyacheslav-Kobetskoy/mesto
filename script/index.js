import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validateConfig = {
  inputSelector: ".popup__input-text",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_disabled",
  inputErrorClass: "input-text_type_error",
  errorClass: "popup__input-error_visible",
};

const forms = document.querySelectorAll(".popup__form");
forms.forEach((form) => enableValidation(form));

function enableValidation(form) {
  const formValidator = new FormValidator(form, validateConfig);
  formValidator.enableValidation();
}

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

function createCard(item) {
  const card = new Card(template, item, handleCardClick);
  return card.createCard();
}

const сardsСollection = initialCards.map((item) => createCard(item));

const popupZoom = document.querySelector(".zoom");
const zoomImg = document.querySelector(".zoom__img");
const zoomTitle = document.querySelector(".zoom__title");

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

function handleEditProfile(evt) {
  //evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupEdit);
}

const EditFormValidator = new FormValidator(formEdit, validateConfig);
editBtn.addEventListener("click", () => {
  EditFormValidator.resetValidation();
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  EditFormValidator.toggleButtonState()
  openPopup(popupEdit);
});

formEdit.addEventListener("submit", handleEditProfile);

const addBtn = document.querySelector(".profile__add-btn");
const popupAddImg = document.querySelector(".popup_type_add-img");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
const formAdd = document.forms["add-imgForm"];

const AddFormValidator = new FormValidator(formAdd, validateConfig);
addBtn.addEventListener("click", () => {
  AddFormValidator.resetValidation()
  openPopup(popupAddImg);
});

const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-btn")
    ) {
      closePopup(popup);
    }
  });
});

function handleCardClick(link, name) {
  zoomImg.src = link;
  zoomImg.alt = name;
  zoomTitle.textContent = name;
  openPopup(popupZoom);
}

function saveImg(evt) {
  //evt.preventDefault();

  const newCard = createCard({
    name: titleImg.value,
    link: linkImg.value,
  });

  gallery.prepend(newCard);
  closePopup(popupAddImg);
  formAdd.reset();
}
formAdd.addEventListener("submit", saveImg);

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const openElement = document.querySelector(".popup_opened");
    closePopup(openElement);
  }
}


