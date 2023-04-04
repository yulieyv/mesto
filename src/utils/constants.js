export const initialCards = [
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
];

export const validationSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};


//const popups = document.querySelectorAll('.popup');
export const popupProfile = document.querySelector('.popup_type_edit-profile');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job');
export const inputName = popupProfile.querySelector('.popup__input_name');
export const inputJob = popupProfile.querySelector('.popup__input_job');
//const buttonsClose = document.querySelectorAll('.popup__close-button');
export const buttonEditProfileForm = document.querySelector('.profile__edit-button');
export const popupCard = document.querySelector('.popup_type_add-card');
export const popupCardForm = popupCard.querySelector('.popup__form');
export const popupProfileForm = popupProfile.querySelector('.popup__form');
export const buttonEditCardForm = document.querySelector('.profile__add-button');
//const itemListWrapper = document.querySelector('.elements__list');
//const popupImage = document.querySelector('.popup_type_image');
//const popupZoomCaption = popupImage.querySelector('.popup__image-caption');
//const popupZoomImage = popupImage.querySelector('.popup__image');
//const popupCardInputName = document.querySelector('.popup__input_image_name');
//const popupCardInputLink = document.querySelector('.popup__input_image_link');