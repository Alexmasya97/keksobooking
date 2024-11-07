
import {
  MAX_ACCOMODATION_PRICE,
  TYPES_ROOM,
  ROOM_OPTION,
  ESC_BUTTON,
  DEFAULT_MIN_PRICE
} from './constant.js';
import { sendData } from './api.js';
import { sliderElement } from './price-slider.js';


const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');
const addressInput = adForm.querySelector('#address');

//Pristine

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
});

//Валидация заголовка

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов');

//Тип жилья

const type = adForm.querySelector('[name="type"]');
const minPrice = adForm.querySelector('#price');
minPrice.setAttribute('max', MAX_ACCOMODATION_PRICE);
minPrice.setAttribute('min', '1000');

type.addEventListener('change', ({ target }) => {
  minPrice.setAttribute('min', TYPES_ROOM[target.value].minPrice);
  minPrice.setAttribute('placeholder', TYPES_ROOM[target.value].minPrice);
});

function validatePrice(value) {
  return value >= Number(minPrice.getAttribute('min')) && value <= MAX_ACCOMODATION_PRICE;
}

function priceErrorMessage(value) {
  if (value > 100000) {
    return `Максимальная цена за ночь ${MAX_ACCOMODATION_PRICE}`;
  } else if (value < minPrice.getAttribute('min')) {
    return `Минимальная цена за ночь ${minPrice.getAttribute('min')}`;
  }
}

pristine.addValidator(
  minPrice,
  validatePrice,
  priceErrorMessage
);

//Количество комнат и гостей

const roomAmount = adForm.querySelector('#room_number');
const capacityAmount = adForm.querySelector('#capacity');

function roomCapacityRule() {
  return ROOM_OPTION[roomAmount.value].includes(capacityAmount.value);
}

function getRuleErrorMessage() {
  if (!roomCapacityRule()) {
    if (roomAmount.value === '100') {
      return 'выберите "не для гостей"';
    } else {
      return 'выберите больше комнат';
    }
  }
}

pristine.addValidator(roomAmount, roomCapacityRule, getRuleErrorMessage);
pristine.addValidator(capacityAmount, roomCapacityRule,);

// Поля check-in n check-out

const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});

checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});

adForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const diactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormFeatures.setAttribute('disabled', '');
  const inactiveState = (elements) => {
    elements.forEach((item) => item.setAttribute('disabled', ''));
  };

  inactiveState(adFormElements);
  inactiveState(mapFiltersFormElements);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormFeatures.removeAttribute('disabled');

  const activeState = (elements) => {
    elements.forEach((item) => item.removeAttribute('disabled'));
  };

  activeState(adFormElements);
  activeState(mapFiltersFormElements);
};

const onMessageEscKeyDown = (element, evt) => {
  if (ESC_BUTTON(evt)) {
    evt.preventDefault();
    element.remove();
  }
};

const closeMessage = (element) => {
  document.removeEventListener('keydown', onMessageEscKeyDown.bind(null, element));
};

const openMessage = (element) => {
  document.addEventListener('keydown', onMessageEscKeyDown.bind(null, element));
};

const createMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  const element = messageTemplate.cloneNode(true);
  document.body.appendChild(element);

  openMessage(element);

  element.addEventListener('click', () => {
    element.remove();
    closeMessage(element);
  });
};

const userFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    sendData(
      () => {
        createMessage('success');
        adForm.reset();
      },
      () => createMessage('error'),
      new FormData(evt.target),
    );
  }
};

adForm.addEventListener('reset', () => {
  adForm.reset();
  sliderElement.noUiSlider.set(DEFAULT_MIN_PRICE);
});

adForm.addEventListener('submit', userFormSubmit);

export {
  diactivateForm,
  activateForm,
  addressInput,
  userFormSubmit
};
