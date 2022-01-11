import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards, validateConfig } from "./constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";

import './index.css'

const template = document.querySelector(".template");
const gallery = document.querySelector(".gallery");
const popupZoomSelector = document.querySelector(".zoom");
const popupEditSelector = document.querySelector(".popup_type_edit");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formEdit = document.forms["editForm"];
const addBtn = document.querySelector(".profile__add-btn");
const popupAddImgSelector = document.querySelector(".popup_type_add-img");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
const formAdd = document.forms["add-imgForm"];

function renderer(item) {
  const card = new Card(template, item, handleCardClick);
  return card.createCard();
}

const gallerySection = new Section(initialCards, renderer, gallery);
gallerySection.renderer();

function saveImg() {
  gallerySection.addItem(
    renderer({
      name: titleImg.value,
      link: linkImg.value,
    })
  );
  popupAddImg.close();
}

const popupWithImage = new PopupWithImage(popupZoomSelector);

function handleCardClick() {
  popupWithImage.open();
}

const userInfo = new UserInfo(profileName, profileStatus);

function handleEditProfile() {
  userInfo.setUserInfo({ name: popupName.value, status: popupStatus.value });
  popupEdit.close();
}

editBtn.addEventListener("click", () => {
  editFormValidator.resetValidation();
  popupName.value = userInfo.getUserInfo().name;
  popupStatus.value = userInfo.getUserInfo().status;
  editFormValidator.toggleButtonState();
  popupEdit.open();
});

const popupAddImg = new PopupWithForm(popupAddImgSelector, saveImg);

const editFormValidator = new FormValidator(formEdit, validateConfig);
editFormValidator.enableValidation();

const popupEdit = new PopupWithForm(popupEditSelector, handleEditProfile);

const addFormValidator = new FormValidator(formAdd, validateConfig);
addFormValidator.enableValidation();

addBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  popupAddImg.open();
});
