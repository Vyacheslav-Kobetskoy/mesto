const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close-btn");
const editBtn = document.querySelector(".profile__edit-btn");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__input-text_type_name");
const popupStatus = document.querySelector(".popup__input-text_type_status");
const formElement = document.querySelector(".popup__form");

function openPopup() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

function saveChanges(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  closePopup();
}

editBtn.addEventListener("click", openPopup);
closeBtn.addEventListener("click", closePopup);
formElement.addEventListener("submit", saveChanges);

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
const gallery = document.querySelector(".gallery");
const template = document.querySelector(".template");

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

  return galleryCard;
};

const result = initialCards.map((item) => {
  return createCard(item);
});

gallery.append(...result);
