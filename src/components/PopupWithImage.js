import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupZoomCaption = this._popup.querySelector('.popup__image-caption');
    this._popupZoomImage = this._popup.querySelector('.popup__image');
  }

  open(title, url) {
    super.open();
    this._popupZoomCaption.textContent = title;
    this._popupZoomImage.src = url;
    this._popupZoomImage.alt = title;
  }
}
