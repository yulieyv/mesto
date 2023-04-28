export default class Card {
  constructor(
    data,
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._id = data.id;
    this._userId = userId;
    this._userOwnerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikeCount(data) {
    this._likeCount.textContent = data.likes.length;
  }

  deleteLike() {
    this._likeButtonElement.classList.remove('element__like-button_active');
    this.isLiked = false;
  }

  setLike() {
    this._likeButtonElement.classList.add('element__like-button_active');
    this.isLiked = true;
  }

  _toggleLikes() {
    if (this._checkUserLike()) {
      this.setLike();
    } else {
      this.deleteLike();
    }
  }

  _checkUserLike() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () =>
      this._handleCardClick(this._data)
    );
    this._cardDeleteButton.addEventListener('click', () =>
      this._handleDeleteClick()
    );
    this._likeButtonElement.addEventListener('click', () =>
      this._handleLikeClick()
    );
  }

  createNewCard() {
    this._getTemplate();
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `${this._name}`;
    this._likeCount.textContent = this._likes.length;

    if (this._userOwnerId !== this._userId) {
      this._cardDeleteButton.classList.toggle('element__delete-button_hidden');
    }

    this._setEventListeners();
    this._toggleLikes();
    return this._cardElement;
  }
}
