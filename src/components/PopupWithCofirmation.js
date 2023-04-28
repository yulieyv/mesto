import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = 'Да';
    }
  }

  setConfirmation(callback) {
    this._handleConfirmationCallback = callback;
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonSubmit.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleConfirmationCallback();
    });
  }
}
