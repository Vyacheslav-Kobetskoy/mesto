import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  validateConfig,
  popupSelector,
} from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import "./index.css";
import { PopupWithAccept } from "../components/PopupWithAccept.js";
//import { Popup } from "../components/Popup.js";

const template = document.querySelector(".template");
const gallery = document.querySelector(".gallery");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formEdit = document.forms["editForm"];
const addBtn = document.querySelector(".profile__add-btn");
const formAdd = document.forms["add-imgForm"];
const profileAvatar = document.querySelector(".profile__avatar");
const EditAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarForm = document.forms["edit-avatarForm"];

function renderer(item) {
  const card = new Card(template, item, handleCardClick, handleDeleteClick);
  return card.createCard();
}

const gallerySection = new Section(initialCards, renderer, gallery);
gallerySection.renderer();

function saveImg() {
  gallerySection.addItem(
    renderer({
      name: popupAddImg.getInputValues().TitleImg,
      link: popupAddImg.getInputValues().linkImg,
    })
  );
  popupAddImg.close();
}

const popupWithImage = new PopupWithImage(popupSelector.popupZoomSelector);

function handleCardClick() {
  popupWithImage.open();
}

const userInfo = new UserInfo(profileName, profileStatus);

function handleEditProfile() {
  userInfo.setUserInfo({
    name: popupEdit.getInputValues().editName,
    status: popupEdit.getInputValues().editStatus,
  });
  popupEdit.close();
}

editBtn.addEventListener("click", () => {
  editFormValidator.resetValidation();
  popupName.value = userInfo.getUserInfo().name;
  popupStatus.value = userInfo.getUserInfo().status;
  editFormValidator.toggleButtonState();
  popupEdit.open();
});

const popupAddImg = new PopupWithForm(
  popupSelector.popupAddImgSelector,
  saveImg
);

const editFormValidator = new FormValidator(formEdit, validateConfig);
editFormValidator.enableValidation();

const popupEdit = new PopupWithForm(
  popupSelector.popupEditSelector,
  handleEditProfile
);

const addFormValidator = new FormValidator(formAdd, validateConfig);
addFormValidator.enableValidation();

addBtn.addEventListener("click", () => {
  addFormValidator.resetValidation();
  popupAddImg.open();
});

const popupEditAvatar = new PopupWithForm(
  popupSelector.popupEditAvatarSelector,
  handleEditAvatar
);

function handleEditAvatar() {
  profileAvatar.src = popupEditAvatar.getInputValues().linkAvatar;
  popupEditAvatar.close();
}

EditAvatarBtn.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();

  popupEditAvatar.open();
});

const editAvatarFormValidator = new FormValidator(
  editAvatarForm,
  validateConfig
);
editAvatarFormValidator.enableValidation();

const popupDeleteCard = new PopupWithAccept(
  popupSelector.popupDeleteCardSelector,
  handleDeleteCard
);

let targetCard

function handleDeleteCard(evt) {
  evt.preventDefault();
  targetCard.remove();
  popupDeleteCard.close();
}

function handleDeleteClick() {
  targetCard=event.target.closest(".gallery__card")
  popupDeleteCard.open();
}

