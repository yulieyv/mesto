import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithCofirm';
import UserInfo from '../components/UserInfo.js';

import {
  //initialCards,
  validationSet,
  buttonEditCardForm,
  buttonEditProfileForm,
  popupProfileForm,
  popupCardForm,
  popupAvatarForm,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  buttonAddAvatar,
  sectionSelector,
  popupAddSelector,
  popupImageSelector,
  popupConfirmSelector,
  popupAvatarSelector,
  cardTemplateSelector,
  popupEditSelector
} from '../utils/constants.js';

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e761b675-104a-46b8-8d1b-b0499c848400',
    'Content-Type': 'application/json',
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    newUser.setUserInfo(userData);
    section.renderItems(initialCards);
  })
  .catch(console.log);

// Валидация форм
const validatorProfileForm = new FormValidator(validationSet, popupProfileForm);
validatorProfileForm.enableValidation();

const validatorCardForm = new FormValidator(validationSet, popupCardForm);
validatorCardForm.enableValidation();

const validatorAvatarForm = new FormValidator(validationSet, popupAvatarForm);
validatorAvatarForm.enableValidation();

const section = new Section(
  (cardItem) => generateCard(cardItem),
  sectionSelector
);

// profile
const userInfo = new UserInfo({
  name: profileNameSelector,
  job: profileJobSelector,
  avatar: profileAvatarSelector,
});

// popup Avatar
const popupAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  popupAvatar.renderLoading(true);
  api
    .patchUserAvatar(formData)
    .then((data) => {
      userInfo.setUserInfo(data);
    })
    .catch((err) => console.log(err))
    .finally(() => popupAvatar.renderLoading(false));
});
popupAvatar.setEventListeners();
buttonAddAvatar.addEventListener('click', () => {
  validatorAvatarForm.resetValidation();
  validatorAvatarForm.disableSubmitButton();
  popupAvatar.open();
});

// popup Edit
const popupWithProfileForm = new PopupWithForm(
  popupEditSelector,
  (formData) => {
    popupWithProfileForm.renderLoading(true);
    api
      .patchUserInfo(formData)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => console.log(err))
      .finally(() => popupWithProfileForm.renderLoading(false));
  }
);
popupWithProfileForm.setEventListeners();

buttonEditProfileForm.addEventListener('click', () => {
  validatorProfileForm.enableSubmitButton();
  validatorProfileForm.resetValidation();
  popupWithProfileForm.setInputValues(userInfo.getUserInfo());
  popupWithProfileForm.open();
});

// popup Card

const popupWithCardForm = new PopupWithForm(popupAddSelector, (formData) => {
  popupWithCardForm.renderLoading(true);
  api
    .addNewCard(formData)
    .then((data) => {
      section.addItem(data);
    })
    .catch((err) => console.log(err))
    .finally(() => popupWithCardForm.renderLoading(false));
});

popupWithCardForm.setEventListeners();

buttonEditCardForm.addEventListener('click', () => {
  validatorCardForm.resetValidation();
  validatorCardForm.disableSubmitButton();
  popupWithCardForm.open();
});

// popupWithImage
const newPopupWithImage = new PopupWithImage(popupImageSelector);
newPopupWithImage.setEventListeners();

// popupWithConfirmation
const newPopupConfirm = new PopupWithConfirm(popupConfirmSelector);
//newPopupConfirm.setEventListener();

//создание карточек
function generateCard(data) {
  const card = new Card({
    data,
    userId,
    cardTemplateSelector,
    handleCardClick: () => {
      newPopupWithImage.open(data);
    },
    handleRTrashClick: () => {
      newPopupConfirm.setConfirm(() => {
        newPopupConfirm.renderLoading(true);
        api
          .deleteCard(cardId)
          .then(() => {
            card.remove();
            newPopupConfirm.close();
          })
          .catch((err) => console.error(err))
          .finally(() => newPopupConfirm.renderLoading(false));
      });
      newPopupConfirm.open();
    },
    handleLikeClick: () => {
      if (card.checkUserLike()) {
        api
          .addLike(data._id)
          .then((data) => {
            card.updateLikeCount(data);
            card.toggleLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(data._id)
          .then((data) => {
            card.updateLikeCount(data);
            card.toggleLikes();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  return card.createNewCard();
}
