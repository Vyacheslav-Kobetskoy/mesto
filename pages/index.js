import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validateConfig } from "./constants.js";

const template = document.querySelector(".template");
const gallery = document.querySelector(".gallery");
const popupZoom = document.querySelector(".zoom");
const zoomImg = document.querySelector(".zoom__img");
const zoomTitle = document.querySelector(".zoom__title");
const popupEdit = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formEdit = document.forms["editForm"];
const pageContainer = document.querySelector(".container");
const addBtn = document.querySelector(".profile__add-btn");
const popupAddImg = document.querySelector(".popup_type_add-img");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
const formAdd = document.forms["add-imgForm"];
const popups = document.querySelectorAll(".popup");

function createCard(item) {
  const card = new Card(template, item, handleCardClick);
  return card.createCard();
}

function handleCardClick(link, name) {
  zoomImg.src = link;
  zoomImg.alt = name;
  zoomTitle.textContent = name;
  openPopup(popupZoom);
}

initialCards.forEach((item) => gallery.append(createCard(item)));

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  pageContainer.addEventListener("keydown", closePopupEscape);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  pageContainer.removeEventListener("keydown", closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    const openElement = document.querySelector(".popup_opened");
    closePopup(openElement);
  }
}

function handleEditProfile() {
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupEdit);
}

function saveImg(evt) {
  const newCard = createCard({
    name: titleImg.value,
    link: linkImg.value,
  });
  gallery.prepend(newCard);
  closePopup(popupAddImg);
  formAdd.reset();
}

const editFormValidator = new FormValidator(formEdit, validateConfig);
editFormValidator.enableValidation();

editBtn.addEventListener("click", () => {
  editFormValidator.resetValidation();
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
  editFormValidator.toggleButtonState();
  openPopup(popupEdit);
});

formEdit.addEventListener("submit", handleEditProfile);

const addFormValidator = new FormValidator(formAdd, validateConfig);
addFormValidator.enableValidation();

addBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  openPopup(popupAddImg);
});

formAdd.addEventListener("submit", saveImg);

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
