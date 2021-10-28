const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".popup__close-btn");
const еditBtn = document.querySelector(".profile__еdit-btn");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const popupName = document.querySelector(".popup__name");
const popupStatus = document.querySelector(".popup__status");
const formElement = document.querySelector(".popup__container");

еditBtn.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
});

closeBtn.addEventListener("click", () => {
  popup.classList.remove("popup_opened");
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;
  popup.classList.remove("popup_opened");
});

const like = document.querySelectorAll(".gallery__like");
for (let i = 0; i < like.length; i++) {
  like[i].addEventListener("click", (evt) => {
    evt.target.setAttribute("src", "./images/likeActive.svg");
  });
}
