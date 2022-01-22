export class Card {
  constructor(
    template,
    cardInfo,
    handleCardClick,
    handleDeleteClick,
    userId,
    handleLikeCounter
  ) {
    this._template = template;
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._userId = userId;
    this._createUserId = this._cardInfo.owner._id;
    this._cardId = this._cardInfo._id;
    this._handleLikeCounter = handleLikeCounter;
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
    this._likeCounter = this._galleryCard.querySelector(
      ".gallery__like-counter"
    );
  }

  _deleteCard = () => {
    this._galleryCard.remove();
    this._galleryCard = null;
  };

  _deleteBtnRenderer(state) {
    if (state) {
      this._deleteCardBtn.style.display = "inline";
    } else {
      this._deleteCardBtn.style.display = "none";
    }
  }

  _toggleLike = () => {
    if (this._like.classList.contains("gallery__like_active")) {
      this._handleLikeCounter(
        this._cardId,
        this._likeCounter,
        this._like,
        true
      );
    } else {
      this._handleLikeCounter(
        this._cardId,
        this._likeCounter,
        this._like,
        false
      );
    }
  };

  _setEventListeners = () => {
    this._deleteCardBtn.addEventListener("click", () => {
      this._handleDeleteClick(this._cardId, this._deleteCard);
    });
    this._like.addEventListener("click", this._toggleLike);
    this._galleryPhoto.addEventListener("click", () => {
      this._handleCardClick({
        name: this._cardInfo.name,
        link: this._cardInfo.link,
      });
    });
  };

  _likeState() {
    this._cardInfo.likes.forEach((user) => {
      if (user._id == this._userId) {
        this._like.classList.add("gallery__like_active");
      }
    });
  }

  createCard = () => {
    this._galleryPhoto.src = this._cardInfo.link;
    this._galleryPhoto.alt = this._cardInfo.name;
    this._galleryPhotoTitle.textContent = this._cardInfo.name;
    if (this._cardInfo.likes == undefined) {
      this._likeCounter.textContent = "0";
    } else {
      this._likeCounter.textContent = this._cardInfo.likes.length;
    }
    this._userId == this._createUserId
      ? this._deleteBtnRenderer(true)
      : this._deleteBtnRenderer(false);
    this._likeState();
    this._setEventListeners();
    return this._galleryCard;
  };
}
