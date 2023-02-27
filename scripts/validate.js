//Настройки пдля вызова валидации
const validationSet = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

//Функция вывода сообщения об ошибке с добавлением класса оформления
const showInputError = (popupElement, inputElement, errorMessage) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSet.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSet.errorClass);
};

//Функция удаления сообщения об ошибке
const hideInputError = (popupElement, inputElement) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSet.inputErrorClass);
  errorElement.classList.remove(validationSet.errorClass);
  errorElement.textContent = '';
};

//Функция, проверяющая прошло ли проверку валидации значение, содержащееся в поле ввода inputElement
//Если нет, то выводится сообщение об ошибке
//Если да, то сообщение об ошибке скрыто
const checkInputValidity = (popupElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(popupElement, inputElement);
  }
};

//Фукнция проверки содержимого полей на валидность
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

//Функция заблокированной кнопки Submit
const disableSubmitButton = (buttonElement) => {
  buttonElement.classList.add(validationSet.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
};

//Функция активирующая кнопку Submit
const enableSubmitButton = (buttonElement) => {
  buttonElement.classList.remove(validationSet.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
};

//Анализируем возвращенное функцией hasInvalidInput значение:
//если истина, то есть некорректные поля => блокируем кнопку submit
//если ложь, то все заполнено корректно поля => заблокируем кнопку submit
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement);
  } else {
    enableSubmitButton(buttonElement);
  }
};

//Подключаем функции checkInputValidity и toggleButtonState для каждого поля ввода
const setEventListeners = (popupElement) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(validationSet.inputSelector)
  );
  const buttonElement = popupElement.querySelector(
    validationSet.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(popupElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

//Подключаем обработчик отправки данных для каждой формы
const enableValidation = () => {
  const popupList = Array.from(
    document.querySelectorAll(validationSet.formSelector)
  );
  popupList.forEach((popupElement) => {
    popupElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(popupElement);
  });
};

//Включение валидации вызовом enableValidation
enableValidation(validationSet);

//Очистка полей с сообщениями об ошибке при выходе без сохранения
const resetValidation = () => {
  const popupList = Array.from(
    document.querySelectorAll(validationSet.formSelector)
  );
  popupList.forEach((popupElement) => {
    const inputList = Array.from(
      popupElement.querySelectorAll(validationSet.inputSelector)
    );
    inputList.forEach((inputElement) => {
      hideInputError(popupElement, inputElement);
    });
  });
};
