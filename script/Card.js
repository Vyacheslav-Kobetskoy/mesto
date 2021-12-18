export class Card {
  constructor(template, cardInfo) {
    this._template = template;
    this._cardInfo = cardInfo;
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

  _addEventListeners = () => {
    this._deleteCardBtn.addEventListener("click", () => {
      this._galleryCard.remove();
    });

    this._like.addEventListener("click", () => {
      this._like.classList.toggle("gallery__like_active");
    });
  };

  createCard = () => {
    this._galleryPhoto.src = this._cardInfo.link;
    this._galleryPhoto.alt = this._cardInfo.name;
    this._galleryPhotoTitle.textContent = this._cardInfo.name;
    this._addEventListeners();
    return this._galleryCard;
  };
}