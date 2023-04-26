export default class Card {
  constructor(data, userId, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
    this._data = data;
    this._id = data.id;
    this._userId = userId 
    this._userOwnerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    this._cardTemplate = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element');
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
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `${this._name}`;
    this._likeCount.textContent = this._likes.length;

    if (this._userOwnerId !== this._userId) {
      this._cardDeleteButton.classList.add('element__delete-button_hidden');
    }

    if(this.checkUserLike()) {
      this._likeButtonElement.classList.toggle('element__like-button_active');
    }

    this._setEventListeners();
    return this._cardElement;
  }

  deleteCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._cardDeleteButton.addEventListener('click', () =>  this._handleTrashClick());
    this._likeButtonElement.addEventListener('click', () => this._handleLikeClick());
    this._cardImageElement.addEventListener('click', () => this._handleCardClick(this._data));
  }

  toggleLikes() {
    this._likeCount.textContent = this._likes.length;
    if (this.checkUserLike()) {
      this._setLike();
    } else {
      this._deleteLike();
    }
  }

  _setLike() {
    this._likeButtonElement.classList.toggle('element__like-button_active');
    this.isLiked = true;
  }

  _deleteLike() {
    this._likeButtonElement.classList.remove('element__like-button_active');
    this.isLiked = false;
  }

  updateLikeCount(newData) {
    this._likeCount.textContent = newData.likes;;
  }

  checkUserLike() {
    return this._likes.some((item) => item._id === this._userId);
  }
}
