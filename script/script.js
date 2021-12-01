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
const closeEditBtn = document.querySelector(".popup__close-edit");
const editBtn = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formEdit = document.forms["editForm"];

function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
}

function saveChanges(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup(popupEdit);
}

editBtn.addEventListener("click", () => {
  openPopup(popupEdit);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

closeEditBtn.addEventListener("click", () => closePopup(popupEdit));
formEdit.addEventListener("submit", saveChanges);

const gallery = document.querySelector(".gallery");
const template = document.querySelector(".template");

const popupZoom = document.querySelector(".zoom");
const closeZoom = document.querySelector(".popup__close-zoom");
const zoomImg = document.querySelector(".zoom__img");
const zoomTitle = document.querySelector(".zoom__title");

closeZoom.addEventListener("click", () => closePopup(popupZoom));

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
const closeAddBtn = document.querySelector(".popup__close-add");
const titleImg = document.querySelector(".popup__input-text_type_title-img");
const linkImg = document.querySelector(".popup__input-text_type_link-img");
addBtn.addEventListener("click", () => openPopup(popupAddImg));

closeAddBtn.addEventListener("click", () => {
  closePopup(popupAddImg);
  titleImg.value = "";
  linkImg.value = "";
});

const formAdd = document.forms["add-imgForm"];

function saveImg(evt) {
  evt.preventDefault();
  gallery.prepend(createCard({ name: titleImg.value, link: linkImg.value }));
  closePopup(popupAddImg);
  titleImg.value = "";
  linkImg.value = "";
}
formAdd.addEventListener("submit", saveImg);
