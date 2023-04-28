/*export const initialCards = [
  {
    name: 'Лилии',
    link: 'https://images.unsplash.com/photo-1675657149146-a4e4e9621bcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    name: 'Подсолнухи',
    link: 'https://images.unsplash.com/photo-1675442119103-a7be68580df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80',
  },
  {
    name: 'Пальмы',
    link: 'https://images.unsplash.com/photo-1675671623540-ec7bf047d59e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    name: 'Горы',
    link: 'https://images.unsplash.com/photo-1674297509775-8bcb0e286cc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    name: 'Мальчик',
    link: 'https://images.unsplash.com/photo-1675448780659-11fd1e16a236?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    name: 'Зеваем',
    link: 'https://images.unsplash.com/photo-1675011571319-4f0a321b78ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
];*/

export const validationSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');

//инпуты
export const inputName = document
  .querySelector('.popup_type_edit-profile')
  .querySelector('.popup__input_name');
export const inputJob = document
  .querySelector('.popup_type_edit-profile')
  .querySelector('.popup__input_job');

//кнопки
export const buttonEditProfileForm = document.querySelector(
  '.profile__edit-button'
);
export const buttonEditCardForm = document.querySelector(
  '.profile__add-button'
);
export const buttonAddAvatar = document.querySelector(
  '.profile__avatar-button'
);

//формы
export const popupCardForm = document
  .querySelector('.popup_type_add-card')
  .querySelector('.popup__form');
export const popupAvatarForm = document
  .querySelector('.popup_type_avatar')
  .querySelector('.popup__form');
export const popupProfileForm = document
  .querySelector('.popup_type_edit-profile')
  .querySelector('.popup__form');

//селекторы
export const profileNameSelector = '.profile__name';
export const profileJobSelector = '.profile__job';
export const profileAvatarSelector = '.profile__image';
export const popupEditSelector = '#editProfile';
export const popupAddSelector = '#addCard';
export const popupImageSelector = '.popup_type_image';
export const popupConfirmationSelector = '.popup_type_confirm';
export const popupAvatarSelector = '#addAvatar';
export const sectionSelector = '.elements__list';
export const cardTemplateSelector = '#card';
