import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { validateConfig, popupSelector } from "../utils/constants.js";
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
const profileAbout = document.querySelector(".profile__about");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupAbout = document.querySelector(".popup__input-text_type_about");
const formEdit = document.forms["editForm"];
const addBtn = document.querySelector(".profile__add-btn");
const formAdd = document.forms["add-imgForm"];
const profileAvatar = document.querySelector(".profile__avatar");
const EditAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarForm = document.forms["edit-avatarForm"];

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-34",
  headers: {
    authorization: "0b8e8a44-387a-4c30-987b-fa48af305c4f",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo(profileName, profileAbout, profileAvatar);

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([profileInfo, cards]) => {

    userInfo.setUserInfo({
      name: profileInfo.name,
      about: profileInfo.about,
      avatar: profileInfo.avatar,
      id: profileInfo._id,
    });

    function renderer(item) {
      const card = new Card(
        template,
        item,
        handleCardClick,
        handleDeleteClick,
        userInfo.getUserInfo().id,
        handleLikeCounter
      );
      return card.createCard();
    }

    const gallerySection = new Section(cards, renderer, gallery);
    gallerySection.renderer();

    const popupAddImg = new PopupWithForm(
      popupSelector.popupAddImgSelector,
      saveImg
    );

    function saveImg() {
      popupAddImg.isLoad(true);
      api
        .postAddCard(
          popupAddImg.getInputValues().TitleImg,
          popupAddImg.getInputValues().linkImg
        )
        .then((card) => {
          gallerySection.addItem(renderer(card));
          popupAddImg.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => popupAddImg.isLoad(false));
    }

    addBtn.addEventListener("click", () => {
      addFormValidator.resetValidation();
      popupAddImg.open();
    });
  })
  .catch((err) => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage(popupSelector.popupZoomSelector);

function handleCardClick({name, link}) {
  popupWithImage.open({name, link});
}

function handleEditProfile() {
  popupEdit.isLoad(true);
  api
    .patchEditProfile(
      popupEdit.getInputValues().editName,
      popupEdit.getInputValues().editAbout
    )
    .then((profileInfo) => {
      userInfo.setUserInfo({
        name: profileInfo.name,
        about: profileInfo.about,
        avatar: profileInfo.avatar,
      });
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEdit.isLoad(false));
}

editBtn.addEventListener("click", () => {
  editFormValidator.resetValidation();
  popupName.value = userInfo.getUserInfo().name;
  popupAbout.value = userInfo.getUserInfo().about;
  editFormValidator.toggleButtonState();
  popupEdit.open();
});

const editFormValidator = new FormValidator(formEdit, validateConfig);
editFormValidator.enableValidation();

const popupEdit = new PopupWithForm(
  popupSelector.popupEditSelector,
  handleEditProfile
);

const addFormValidator = new FormValidator(formAdd, validateConfig);
addFormValidator.enableValidation();

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
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => popupEditAvatar.isLoad(false));
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
      .then(() => {
        handleDelete();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleLikeCounter(cardId, toggleLike, state) {
  if (state) {
    api.deleteLike(cardId).then(() => {
      toggleLike(state);
    });
  } else {
    api.putLike(cardId).then(() => {
      toggleLike(state);
    });
  }
}
