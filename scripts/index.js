import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const initialCards = [
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

const validationSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//Константы
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = popupProfile.querySelector('.popup__input_name');
const inputJob = popupProfile.querySelector('.popup__input_job');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonEditProfileForm = document.querySelector('.profile__edit-button');
const popupCard = document.querySelector('.popup_type_add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const popupProfileForm = popupProfile.querySelector('.popup__form');
const buttonEditCardForm = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupCardInputName = document.querySelector('.popup__input_image_name');
const popupCardInputLink = document.querySelector('.popup__input_image_link');

//валидация формы профиля
const validatorProfileForm = new FormValidator(validationSet, popupProfileForm);
validatorProfileForm.enableValidation();

//валидация формы с карточками
const validatorCardForm = new FormValidator(validationSet, popupCardForm);
validatorCardForm.enableValidation();

//Закрытие попапа через ESC
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};

//Открытие попапа
const openPopup = (formElement) => {
  formElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

//Закрытие попапа
const closePopup = (formElement) => {
  formElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

//Закрытие попапа на оверлей
const closePopupByClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
};

//Сохранение изменений в полях формы и в профиле с закрытием окна
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

popupProfile.addEventListener('submit', handleProfileFormSubmit);

// Открытие формы с новыми именем и профессией
const handlerOpenPopupProfile = () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  validatorProfileForm.enableSubmitButton();
  validatorProfileForm.resetValidation();
  openPopup(popupProfile);
};

buttonEditProfileForm.addEventListener('click', handlerOpenPopupProfile);

//Закрытие попапа при нажатии на крестик
buttonsClose.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const formItem = evt.target.closest('.popup');
    closePopup(formItem);
  });
});

//Открытие попапа для создания карточек
buttonEditCardForm.addEventListener('click', () => {
  popupCardForm.reset();
  validatorCardForm.resetValidation();
  openPopup(popupCard);
});

//Вывод карточек на экран из массива
initialCards.forEach((item) => {
  const cards = new Card(item.name, item.link, '.card');
  cards.renderCard();
});

//Добавление новой карточки из попапа
const handleSubmitFormNewCard = (evt) => {
  evt.preventDefault();
  const newCard = new Card(
    popupCardInputName.value,
    popupCardInputLink.value,
    '.card'
  );
  newCard.renderCard();
  closePopup(popupCard);
  evt.target.reset();
};

popupCard.addEventListener('submit', handleSubmitFormNewCard);

//Cлушатель на кнопку закрытия модального окна
popup.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', closePopupByClick);
});

export { openPopup, popupImage };
