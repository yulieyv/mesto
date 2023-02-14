//Константы
const popupProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.popup__container');
const inputName = formProfile.querySelector('.popup__input_name');
const inputJob = formProfile.querySelector('.popup__input_job'); 
const closeButtons = document.querySelectorAll('.popup__close-button');
const editProfileButton = document.querySelector('.profile__edit-button'); 
const itemListWrapper = document.querySelector('.elements__list');
const template = document.querySelector('#card').content.querySelector('.element');
const popupCard = document.querySelector('.popup_type_add-card');
const editCardButton = document.querySelector('.profile__add-button'); 
const popupImage = document.querySelector('.popup_type_image');
const popupZoomCaption = popupImage.querySelector('.popup__image-caption');
const popupZoomImage = popupImage.querySelector('.popup__image');

//Открытие попапа
const openPopup = (formElement) => {
  formElement.classList.add('popup_opened'); 
};

//Закрытие попапа
const closePopup = (formElement) => {
  formElement.classList.remove('popup_opened');
};

//Сохранение изменений в полях формы и в профиле с закрытием окна
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);
};

formProfile.addEventListener('submit', handleProfileFormSubmit); 

// Открытие формы с новыми именем и профессией
editProfileButton.addEventListener('click', handleProfileFormSubmit => {
  openPopup(popupProfile); 
  inputName.value = profileName.textContent; 
  inputJob.value = profileJob.textContent; 
});

//Закрытие попапа при нажатии на крестик
closeButtons.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const formItem = evt.target.closest('.popup');
    closePopup(formItem);
  });
}); 

//Открытие попапа для создания карточек
editCardButton.addEventListener('click', () => {
  openPopup(popupCard);
});

//Удаление карточки
const handleDelete = (evt) => {
  evt.target.closest('.element').remove(); 
};

//Функция создания оберток под карточки (+поставить лайк)
function createNewCard(element) {
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

  //Функция увеличения изображения карточки
  const handleOpenFullImage = (element) => {
    openPopup(popupImage);
    popupZoomCaption.textContent = element.name;
    popupZoomImage.src = element.link;
    popupZoomImage.alt = element.name;
  };
  
  //Открытие увеличенного изображения карточки
  cardImage.addEventListener('click', () => handleOpenFullImage(element));

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
  evt.target.reset(); 
  closePopup(popupCard); 
};

popupCard.addEventListener('submit', handleSubmitFormNewCard);