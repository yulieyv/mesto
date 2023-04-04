import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  initialCards,
  validationSet,
  buttonEditCardForm,
  buttonEditProfileForm,
  popupProfileForm,
  popupCardForm,
  inputName,
  inputJob,
} from '../utils/constants.js';

const validatorProfileForm = new FormValidator(validationSet, popupProfileForm);
validatorProfileForm.enableValidation();

const validatorCardForm = new FormValidator(validationSet, popupCardForm);
validatorCardForm.enableValidation();

const newPopupWithImage = new PopupWithImage('.popup_type_image');
newPopupWithImage.setEventListeners();

const handleCardClick = (title, url) => {
  newPopupWithImage.open(title, url);
};

const generateCard = (title, url, template, zoomPopup) => {
  const card = new Card(title, url, template, zoomPopup);
  return card.createNewCard();
};

const newSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = generateCard(item.name, item.link, '.card', handleCardClick);
      newSection.addItem(card);
    },
  },
  '.elements__list'
);
newSection.renderItems();

function saveAddForm(evt, item) {
  evt.preventDefault();
  const card = generateCard(
    item.nameCard,
    item.linkCard,
    '.card',
    handleCardClick
  );
  newSection.addItem(card);
};

function saveEditForm(evt, item) {
  evt.preventDefault();
  newUser.setUserInfo(item.name, item.job);
};

const popupWithCardForm = new PopupWithForm('#addCard', saveAddForm);
popupWithCardForm.setEventListeners();

buttonEditCardForm.addEventListener('click', () => {
  validatorCardForm.resetValidation();
  validatorCardForm.disableSubmitButton();
  popupWithCardForm.open();
});

const newUser = new UserInfo({ name: '.profile__name', job: '.profile__job' });

const popupWithProfileForm = new PopupWithForm(
  '.popup_type_edit-profile',
  saveEditForm
);
popupWithProfileForm.setEventListeners();

const handlerOpenPopupProfile = () => {
  inputName.value = newUser.getUserInfo().name;
  inputJob.value = newUser.getUserInfo().job;
  validatorProfileForm.enableSubmitButton();
  validatorProfileForm.resetValidation();
  popupWithProfileForm.open();
};

buttonEditProfileForm.addEventListener('click', handlerOpenPopupProfile);
