export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  close() {
    this._popup.removeEventListener('keydown', this._handleEscClose);
    this._popup.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', () => this.close());
    this._popup.childNodes[1].addEventListener('click', (evt) =>
      evt.stopPropagation()
    );
  }
}
