import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupZoomCaption = this._popup.querySelector('.popup__image-caption');
    this._popupZoomImage = this._popup.querySelector('.popup__image');
  }

  open({name, link}) {
    super.open();
    this._popupZoomCaption.textContent = name;
    this._popupZoomImage.src = link;
    this._popupZoomImage.alt = name;
  }
}
