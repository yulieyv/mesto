//Поиск popup профиля
let popupProfile = document.querySelector('.popup');

//Поиск строки с именем профиля
let profileName = document.querySelector('.profile__name');

//Поиск строки с профессией профиля
let profileJob = document.querySelector('.profile__job');

//Поиск формы popup профиля
let formProfile = popupProfile.querySelector('.popup__container');

//Поиск поля для заполнения имени профиля
let inputName = formProfile.querySelector('.popup__input_name');

//Поиск поля для заполнения профессии профиля
let inputJob = formProfile.querySelector('.popup__input_job'); 

//Поиск кнопки, закрывающей popup профиля
let closeButton = document.querySelectorAll('.popup__close-button');

//Поиск кнопки редактирования профиля
let editButton = document.querySelector('.profile__edit-button'); 

//Функция открытия попапа
let openPopup = (formElement) => {
  formElement.classList.add('popup_opened'); 
};

//Функция закрытия поапа
let closePopup = (formElement) => {
  formElement.classList.remove('popup_opened');
};

//Функция сохранения изменений в полях формы и в профиле с закрытием окна
let handleFormSubmit = (evt) => {
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

//Функция закрытия popup при нажатии на крестик
closeButton.forEach((element) => {
  element.addEventListener('click', (evt) => {
    let formItem = evt.target.closest('.popup');
    closePopup(formItem);
  });
}); 

// Открытие формы с новыми именем и профессией
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
});

