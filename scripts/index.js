//Константы
const popupElement = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formProfile = popupProfile.querySelector('.popup__container');
const inputName = formProfile.querySelector('.popup__input_name');
const inputJob = formProfile.querySelector('.popup__input_job'); 
const closeButton = document.querySelectorAll('.popup__close-button');
const editButton = document.querySelector('.profile__edit-button'); 
const itemListWrapper = document.querySelector('.elements__list');
const template = document.getElementById('card');
const popupCard = document.querySelector('.popup_type_add-card');
const editCardButton = document.querySelector('.profile__add-button'); 

const initialCards = [
  {
    name: 'Лилии',
    link: 'https://images.unsplash.com/photo-1675657149146-a4e4e9621bcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'},
  {
    name: 'Подсолнухи',
    link: 'https://images.unsplash.com/photo-1675442119103-a7be68580df9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
  },
  {
    name: 'Пальмы',
    link: 'https://images.unsplash.com/photo-1675671623540-ec7bf047d59e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Горы',
    link: 'https://images.unsplash.com/photo-1674297509775-8bcb0e286cc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Мальчик',
    link: 'https://images.unsplash.com/photo-1675448780659-11fd1e16a236?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Зеваем',
    link: 'https://images.unsplash.com/photo-1675011571319-4f0a321b78ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  }
];

//Открытие попапа
const openPopup = (formElement) => {
  formElement.classList.add('popup_opened'); 
};

//Закрытие попапа
const closePopup = (formElement) => {
  formElement.classList.remove('popup_opened');
};

//Сохранение изменений в полях формы и в профиле с закрытием окна
const handleFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupProfile);

  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  closePopup(popupProfile);
};

formProfile.addEventListener('submit', handleFormSubmit); 

//Закрытие попапа при нажатии на крестик
closeButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    const formItem = evt.target.closest('.popup');
    closePopup(formItem);
  });
}); 

// Открытие формы с новыми именем и профессией
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
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
  const newCard = template.content.cloneNode(true);
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

  const popupImage = document.querySelector('.popup_type_image');
  const popupZoomCaption = popupImage.querySelector('.popup__image-caption');
  const popupZoomImage = popupImage.querySelector('.popup__image');

  //Открытие увеличенного изображения карточки
  cardImage.addEventListener('click', (popupElement) => {
    openPopup(popupImage);
    popupZoomCaption.textContent = element.name;
    popupZoomImage.src = element.link;
    popupZoomImage.alt = element.name;
  });
   return newCard;
};

//Функция заполнения обертки карточки
const renderCard = (wrap,title) => {
  wrap.append(createNewCard(title));
};

//Вывод карточек на экран
initialCards.forEach((title) => {
  renderCard(itemListWrapper,title);
});

//Добавление новой карточки из данных попапа
popupCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const title = {
    name: evt.target.nameCard.value,
    link: evt.target.linkCard.value,
  };
  itemListWrapper.prepend(createNewCard(title));
  evt.target.nameCard.value = '';
  evt.target.linkCard.value = '';
  closePopup(popupCard);
})
