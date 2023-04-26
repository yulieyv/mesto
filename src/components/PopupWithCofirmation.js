import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._buttonSubmit.textContent = 'Удаление...';
    } else {
      this._buttonSubmit.textContent = 'Да';
    }
  }

  setConfirmation(callback) {
    this._submit = callback;
  } 

  setEventListener() {
    this._buttonSubmit.addEventListener('click', () => this._submit());
    super.setEventListener();
  }
}