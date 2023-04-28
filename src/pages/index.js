import './index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithCofirmation';
import UserInfo from '../components/UserInfo.js';

import {
  validationSet,
  buttonEditCardForm,
  buttonEditProfileForm,
  buttonAddAvatar,
  popupProfileForm,
  popupCardForm,
  popupAvatarForm,
  profileNameSelector,
  profileJobSelector,
  profileAvatarSelector,
  popupAddSelector,
  popupImageSelector,
  popupConfirmationSelector,
  popupAvatarSelector,
  sectionSelector,
  cardTemplateSelector,
  popupEditSelector,
} from '../utils/constants.js';

// Подключить API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'e761b675-104a-46b8-8d1b-b0499c848400',
    'Content-Type': 'application/json',
  },
});

//Получить данные c сервера или вывести сообщение об ошибке
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([me, cards]) => {
    userId = me._id;
    userInfo.setUserInfo(me);
    section.renderItems(cards);
  })
  .catch((err) => console.log(err))
  .finally(() => {});

let userId;

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

// Изменение данных профиля
const userInfo = new UserInfo({
  name: profileNameSelector,
  job: profileJobSelector,
  avatar: profileAvatarSelector,
});

// Изменение аватара профиля
const popupAvatar = new PopupWithForm(popupAvatarSelector, (formData) => {
  popupAvatar.renderLoading(true);
  api
    .patchUserAvatar({ avatar: formData.url })
    .then((data) => {
      userInfo.setUserAvatar({ newAvatar: data.avatar });
      popupAvatar.close();
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

// Изменение имени и описания профиля
const popupWithProfileForm = new PopupWithForm(
  popupEditSelector,
  (formData) => {
    popupWithProfileForm.renderLoading(true);
    api
      .patchUserInfo({ name: formData.name, about: formData.job })
      .then((data) => {
        userInfo.changeUserInfo({ name: data.name, about: data.about });
        popupWithProfileForm.close();
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

// Создание новой карточки
const popupWithCardForm = new PopupWithForm(popupAddSelector, (formData) => {
  popupWithCardForm.renderLoading(true);
  api
    .addNewCard({ name: formData.nameCard, link: formData.linkCard })
    .then((data) => {
      section.addItem(data);
      popupWithCardForm.close();
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
const popupWithImage = new PopupWithImage(popupImageSelector);
popupWithImage.setEventListeners();

// popupWithConfirmation
const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
popupConfirmation.setEventListeners();

//Создание карточек при загрузке страницы
function generateCard(data) {
  const card = new Card(
    data,
    userId,
    cardTemplateSelector,
    () => popupWithImage.open(data),
    () => {
      popupConfirmation.open();
      popupConfirmation.setConfirmation(() => {
        popupConfirmation.renderLoading(true);
        api
          .deleteCard(data._id)
          .then(() => {
            card.deleteCard();
            popupConfirmation.close();
          })
          .catch((err) => console.error(err))
          .finally(() => popupConfirmation.renderLoading(false));
      });
    },
    () => {
      if (!card.isLiked) {
        api
          .addLike(data._id)
          .then((data) => {
            card.setLike();
            card.updateLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLike(data._id)
          .then((data) => {
            card.deleteLike();
            card.updateLikeCount(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  );
  return card.createNewCard();
}
