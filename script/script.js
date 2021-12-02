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

const gallery = document.querySelector(".gallery");
const template = document.querySelector(".template");

const popupZoom = document.querySelector(".zoom");
const zoomImg = document.querySelector(".zoom__img");
const zoomTitle = document.querySelector(".zoom__title");

const createCard = (item) => {
  const galleryCard = template.content
    .querySelector(".gallery__card")
    .cloneNode(true);
  const galleryPhoto = galleryCard.querySelector(".gallery__photo");
  const galleryPhotoTitle = galleryCard.querySelector(".gallery__photo-title");

  galleryPhoto.src = item.link;
  galleryPhoto.alt = item.name;
  galleryPhotoTitle.textContent = item.name;

  const deleteCardBtn = galleryCard.querySelector(".gallery__delete-btn");

  deleteCardBtn.addEventListener("click", () => {
    galleryCard.remove();
  });

  const like = galleryCard.querySelector(".gallery__like");

  like.addEventListener("click", () => {
    like.classList.toggle("gallery__like_active");
  });

  galleryPhoto.addEventListener("click", () => {
    zoomImg.src = galleryPhoto.src;
    zoomImg.alt = galleryPhoto.alt;
    zoomTitle.textContent = item.name;
    openPopup(popupZoom);
  });

  return galleryCard;
};

const сardsСollection = initialCards.map((item) => {
  return createCard(item);
});

gallery.append(...сardsСollection);

const addBtn = document.querySelector(".profile__add-btn");
const popupAddImg = document.querySelector(".popup_type_add-img");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
const formAdd = document.forms["add-imgForm"];
const formAddSaveBtn = formAdd.querySelector(".popup__save-btn");
addBtn.addEventListener("click", () => {
  openPopup(popupAddImg);
  addFormClear();
  clearErrorValidateMessage(formAdd);
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

function saveImg(evt) {
  evt.preventDefault();
  gallery.prepend(createCard({ name: titleImg.value, link: linkImg.value }));
  closePopup(popupAddImg);
}
formAdd.addEventListener("submit", saveImg);

function closePopupEscape(evt) {
  if (evt.key === "Escape") {
    openElement = document.querySelector(".popup_opened");
    closePopup(openElement);
  }
}

function clearErrorValidateMessage(formElement) {
  allerror = formElement.querySelectorAll(".popup__input-error_visible");
  allerror.forEach((errormessage) => {
    errormessage.classList.remove("popup__input-error_visible");
  });
}
