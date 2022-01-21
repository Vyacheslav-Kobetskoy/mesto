import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  validateConfig,
  popupSelector,
} from "../utils/constants.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Section } from "../components/Section.js";
import "./index.css";
import { PopupWithAccept } from "../components/PopupWithAccept.js";
import { Api } from "../components/Api.js";

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
const userId = "cfad2ebb79cc596182c2fb2d";

function renderer(item) {
  const card = new Card(
    template,
    item,
    handleCardClick,
    handleDeleteClick,
    userId,
    handleLikeCounter
  );
  return card.createCard();
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "0b8e8a44-387a-4c30-987b-fa48af305c4f",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((cards) => {
    const gallerySection = new Section(cards, renderer, gallery);
    gallerySection.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

api
  .getProfile()
  .then((profileInfo) => {
    userInfo.setUserInfo({
      name: profileInfo.name,
      status: profileInfo.about,
    });
    profileAvatar.src = profileInfo.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

function saveImg() {
  popupAddImg.isLoad(true);
  api
    .postAddCard(
      popupAddImg.getInputValues().TitleImg,
      popupAddImg.getInputValues().linkImg
    )
    .then((card) => {
      const newCardySection = new Section({}, renderer, gallery);
      newCardySection.addItem(renderer(card));
      popupAddImg.isLoad(false);
      popupAddImg.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const popupWithImage = new PopupWithImage(popupSelector.popupZoomSelector);

function handleCardClick() {
  popupWithImage.open();
}

const userInfo = new UserInfo(profileName, profileStatus);

function handleEditProfile() {
  popupEdit.isLoad(true);
  api
    .patchEditProfile(
      popupEdit.getInputValues().editName,
      popupEdit.getInputValues().editStatus
    )
    .then((ProfileInfo) => {
      userInfo.setUserInfo({
        name: ProfileInfo.name,
        status: ProfileInfo.about,
      });
      popupEdit.isLoad(false);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    });
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
  popupEditAvatar.isLoad(true);
  api
    .patchAvatar(popupEditAvatar.getInputValues().linkAvatar)
    .then((profile) => {
      profileAvatar.src = profile.avatar;
      popupEditAvatar.isLoad(false);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    });
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

function handleDeleteClick(cardId, handleDelete) {
  const popupDeleteCard = new PopupWithAccept(
    popupSelector.popupDeleteCardSelector,
    handleDeleteCard
  );
  popupDeleteCard.open();
  function handleDeleteCard(evt) {
    evt.preventDefault();
    api
      .deleteCard(cardId)
      .then(() => handleDelete())
      .catch((err) => {
        console.log(err);
      });
    popupDeleteCard.close();
  }
}

function handleLikeCounter(cardId, state) {
  if (state) {
    api.deleteLike(cardId);
  } else {
    api.putLike(cardId);
  }
}