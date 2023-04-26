import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._popup.querySelector('.popup__submit-button');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._submit = submit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
  }

  renderLoading(isLoading) {
    if (isLoading === true) {
      this._buttonSubmit.textContent = 'Сохранение...';
    } else {
      this._buttonSubmit.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

}
