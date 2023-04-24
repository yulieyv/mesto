export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
    this._data = data;
    this._userId = userId;
    this._isUserCard = userId === data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._count = data.likes;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element');
    this._cardElement = this._cardTemplate.cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector('.element__image');
    this._cardTitleElement = this._cardElement.querySelector('.element__title');
    this._likeButtonElement = this._cardElement.querySelector(
      '.element__like-button'
    );
    this._cardDeleteButton = this._cardElement.querySelector(
      '.element__delete-button'
    );
    this._likeCount = this._cardElement.querySelector('.element__like-count');
  }

  createNewCard() {
    this._getTemplate();

    if (!this._isUserCard) {
      this._cardDeleteButton.addEventListener.remove();
    }

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `${this._name}`;
    this._likeCount.textContent = this._likes.length;
  
    this._toggleLikes();
    this._setEventListeners();
    return this._cardElement;
  }

  _deleteCardElement = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    if (this._isUserCard) {
      this._cardDeleteButton.addEventListener('click', (evt) => {
        this._handleTrashClick(evt);
      });
    }
    this._likeButtonElement.addEventListener('click', (evt) => this._handleLikeClick(evt));
    this._cardImageElement.addEventListener('click', () => this._handleCardClick());
  }

  toggleLikes() {
    if (this.checkUserLike()) {
      this.setLike();
    } else {
      this.removeLike();
    }
  }

  setLike() {
    this._likeButtonElement.classList.toggle('element__like-button_active');
    this.isLiked = true;
  }

  deleteLike() {
    this._likeButtonElement.classList.remove('element__like-button_active');
    this.isLiked = false;
  }

  updateLikeCount(data) {
    this._likeCount.textContent = data.length;
  }

  checkUserLike() {
    return this._likes.some((item) => item._id === this._userId);
  }

}
