//Константы
const popup = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const saveProfileButton = popupProfile.querySelector('.popup__submit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = popupProfile.querySelector('.popup__input_name');
const inputJob = popupProfile.querySelector('.popup__input_job'); 
const closeButtons = document.querySelectorAll('.popup__close-button');
const editProfileButton = document.querySelector('.profile__edit-button'); 
const itemListWrapper = document.querySelector('.elements__list');
const template = document.querySelector('#card').content.querySelector('.element');
const popupCard = document.querySelector('.popup_type_add-card');
const popupCardForm = popupCard.querySelector('.popup__form');
const saveCardButton = popupCard.querySelector('.popup__submit-button');
const editCardButton = document.querySelector('.profile__add-button'); 
const popupImage = document.querySelector('.popup_type_image');
const popupZoomCaption = popupImage.querySelector('.popup__image-caption');
const popupZoomImage = popupImage.querySelector('.popup__image');


//Закрытие попапа через ESC
const closeByEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  };
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
  };
};

//Сохранение изменений в полях формы и в профиле с закрытием окна
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
  closePopupByKey(popupProfile);
};

popupProfile.addEventListener('submit', handleProfileFormSubmit); 

// Открытие формы с новыми именем и профессией
const handlerOpenPopupProfile = () => {
  resetValidation();
  openPopup(popupProfile); 
  inputName.value = profileName.textContent; 
  inputJob.value = profileJob.textContent; 
  enableValidation(saveProfileButton);
}

editProfileButton.addEventListener('click', handlerOpenPopupProfile);

popupProfile.addEventListener('mousedown', closePopupByClick);

//Закрытие попапа при нажатии на крестик
closeButtons.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const formItem = evt.target.closest('.popup');
    closePopup(formItem); 
  });
}); 

//Открытие попапа для создания карточек
editCardButton.addEventListener('click', () => {
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
  
  newCard.querySelector('.element__like-button').addEventListener('click', function (e) {
    e.target.classList.toggle('element__like-button_active');
   });

  cardButton.addEventListener('click', handleDelete);

  //Увеличение изображения карточки
  const handleOpenFullImage = (element) => {
    openPopup(popupImage);
    popupZoomCaption.textContent = element.name;
    popupZoomImage.src = element.link;
    popupZoomImage.alt = element.name;
  };
  
  //Открытие увеличенного изображения карточки
  cardImage.addEventListener('click', () => handleOpenFullImage(element));
  popupImage.addEventListener('mousedown', closePopupByClick);

  return newCard;
};

//Функция заполнения обертки карточки
const renderCard = (wrap,title) => {
  wrap.prepend(createNewCard(title));
};

//Вывод карточек на экран
initialCards.forEach((title) => {
  renderCard(itemListWrapper,title);
});

//Добавление новой карточки из данных попапа
const handleSubmitFormNewCard = (evt) => {
  evt.preventDefault(); 
    const title = { 
    name: nameCard.value,
    link: linkCard.value, 
  }; 
  renderCard(itemListWrapper, title); 
  disableSubmitButton(saveCardButton);
  closePopup(popupCard); 
  evt.target.reset(); 
};

popupCard.addEventListener('submit', handleSubmitFormNewCard);

popupCard.addEventListener('mousedown', closePopupByClick);