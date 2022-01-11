export class Card {
  constructor(template, cardInfo, handleCardClick) {
    this._template = template;
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._galleryCard = this._template.content
      .querySelector(".gallery__card")
      .cloneNode(true);
    this._galleryPhoto = this._galleryCard.querySelector(".gallery__photo");
    this._galleryPhotoTitle = this._galleryCard.querySelector(
      ".gallery__photo-title"
    );
    this._like = this._galleryCard.querySelector(".gallery__like");
    this._deleteCardBtn = this._galleryCard.querySelector(
      ".gallery__delete-btn"
    );
  }

  _deleteCard = () => {
    this._galleryCard.remove();
    this._galleryCard = null;
  };

  _toggleLike = () => {
    this._like.classList.toggle("gallery__like_active");
  };

  _setEventListeners = () => {
    this._deleteCardBtn.addEventListener("click", this._deleteCard);

    this._like.addEventListener("click", this._toggleLike);

    this._galleryPhoto.addEventListener("click", () => {
      this._handleCardClick();
    });
  };

  createCard = () => {
    this._galleryPhoto.src = this._cardInfo.link;
    this._galleryPhoto.alt = this._cardInfo.name;
    this._galleryPhotoTitle.textContent = this._cardInfo.name;
    this._setEventListeners();
    return this._galleryCard;
  };
}
