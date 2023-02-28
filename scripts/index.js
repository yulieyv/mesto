//Константы
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = popupProfile.querySelector('.popup__input_name');
const inputJob = popupProfile.querySelector('.popup__input_job');
const buttonsClose = document.querySelectorAll('.popup__close-button');
const buttonSaveProfileForm = popupProfile.querySelector('.popup__submit-button');
const buttonEditProfileForm = document.querySelector('.profile__edit-button');
const itemListWrapper = document.querySelector('.elements__list');
const template = document
  .querySelector('#card')
  .content.querySelector('.element');
const popupCard = document.querySelector('.popup_type_add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const buttonSaveCardForm = popupCard.querySelector('.popup__submit-button');
const buttonEditCardForm = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_type_image');
const popupZoomCaption = popupImage.querySelector('.popup__image-caption');
const popupZoomImage = popupImage.querySelector('.popup__image');

//Закрытие попапа через ESC
const closeByEsc = (evt) => {
  if (evt.key ==='Escape') {
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
  resetValidation();
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  enableSubmitButton(buttonSaveProfileForm);
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
  resetValidation();
  openPopup(popupCard);
});

//Удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove();
};

//Функция создания оберток под карточки (+поставить лайк)
const createNewCard = (element) => {
  const newCard = template.cloneNode(true);
  const cardImage = newCard.querySelector('.element__image');
  const cardName = newCard.querySelector('.element__title');
  const cardButton = newCard.querySelector('.element__delete-button');
  cardImage.src = element.link;
  cardImage.alt = `${element.name}`;
  cardName.textContent = element.name;

  newCard
    .querySelector('.element__like-button')
    .addEventListener('click', function (e) {
      e.target.classList.toggle('element__like-button_active');
    });

  cardButton.addEventListener('click', handleDelete);

  return newCard;
};

//Увеличение изображения карточки
const handleOpenFullImage = (title) => {
  popupZoomCaption.textContent = title.name;
  popupZoomImage.src = title.link;
  popupZoomImage.alt = title.name;
  openPopup(popupImage);
};

//Функция заполнения обертки карточки
const renderCard = (wrap, title) => {
  wrap.prepend(createNewCard(title));
  wrap.querySelector('.element__image').addEventListener('click', () => handleOpenFullImage(title)); //Открытие увеличенного изображения карточки
};

//Вывод карточек на экран
initialCards.forEach((title) => {
  renderCard(itemListWrapper, title);
});

//Добавление новой карточки из данных попапа
const handleSubmitFormNewCard = (evt) => {
  evt.preventDefault();
  const title = {
    name: nameCard.value,
    link: linkCard.value,
  };
  renderCard(itemListWrapper, title);
  disableSubmitButton(buttonSaveCardForm);
  closePopup(popupCard);
  evt.target.reset();
};

popupCard.addEventListener('submit', handleSubmitFormNewCard);

//Cлушатель на кнопку закрытия модального окна
popup.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', closePopupByClick);
});
