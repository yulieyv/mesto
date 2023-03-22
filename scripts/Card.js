import { openPopup, popupImage } from './index.js';

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
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
  }

  _createNewCard() {
    this._getTemplate();
    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = `${this._name}`;

    this._setEventListeners();
    return this._cardElement;
  }

  renderCard() {
    this._container = document.querySelector('.elements__list');
    this._container.prepend(this._createNewCard());
  }
  _deleteCardElement = () => {
    this._cardElement.remove();
  };

  _handleLikeButton() {
    this._likeButtonElement.classList.toggle('element__like-button_active');
  }

  _handleOpenFullImage() {
    this._popupZoomCaption = document.querySelector('.popup__image-caption');
    this._popupZoomImage = document.querySelector('.popup__image');

    this._popupZoomCaption.textContent = this._name;
    this._popupZoomImage.src = this._link;
    this._popupZoomImage.alt = this._name;
    openPopup(popupImage);
  }

  //слушатели событий в сгенерированной карточке
  _setEventListeners() {
    this._cardImageElement.addEventListener('click', () =>
      this._handleOpenFullImage()
    );
    this._likeButtonElement.addEventListener('click', () =>
      this._handleLikeButton()
    );
    this._cardDeleteButton.addEventListener('click', () =>
      this._deleteCardElement()
    );
  }
}

export { Card };
