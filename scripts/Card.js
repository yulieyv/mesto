export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._popupZoomCaption = document.querySelector('.popup__image-caption');
    this._popupZoomImage = document.querySelector('.popup__image');
  }

  createNewCard() {
    this._getTemplate();
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `${this._name}`;

    this._setEventListeners();
    return this._cardElement;
  }

  _deleteCardElement = () => {
    this._cardElement.remove();
  };

  _handleLikeButton() {
    this._likeButtonElement.classList.toggle('element__like-button_active');
  }

  _setEventListeners() {
    this._likeButtonElement.addEventListener('click', () =>
      this._handleLikeButton()
    );
    this._cardDeleteButton.addEventListener('click', () =>
      this._deleteCardElement()
    );
    this._cardImageElement.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}
