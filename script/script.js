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
