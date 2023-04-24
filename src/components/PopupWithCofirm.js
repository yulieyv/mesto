import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
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

  setEventListener() {
    this._popupForm.addEventListener('submit', (evt) => this._handlerSubmitForm(evt));
    super.setEventListener();
  }

  setConfirm(callback) {
    this._handlerSubmitForm = callback;
  }
}