
import {
  MAX_ACCOMODATION_PRICE,
  TYPES_ROOM,
  ROOM_OPTION,
  ESC_BUTTON,
  DEFAULT_MIN_PRICE
} from './constant.js';
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

const diactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersFormElements.forEach((item) => item.setAttribute('disabled', 'disabled'));
  mapFiltersFormFeatures.setAttribute('disabled', 'disabled');
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersFormElements.forEach((item) => item.removeAttribute('disabled', null));
  mapFiltersFormFeatures.removeAttribute('disabled');
};

const mapFilterChange = (cb) => {
  mapFiltersForm.addEventListener('change', () => {
    cb();
  });
};

const createMessage = (message) => {
  const messageTemplate = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  const element = messageTemplate.cloneNode(true);
  document.body.appendChild(element);

  const onMessageEscKeyDown = (evt) => {
    if (ESC_BUTTON(evt)) {
      evt.preventDefault();
      element.remove();
    }
  };
  const closeMessage = () => {
    document.removeEventListener('keydown', onMessageEscKeyDown);
  };

  const openMessage = () => {
    document.addEventListener('keydown', onMessageEscKeyDown);
  };
  openMessage(element);

  element.addEventListener('click', () => {
    element.remove();
    closeMessage(element);
  });
};

const resetForm = () => {
  adForm.reset();
  sliderElement.noUiSlider.set(DEFAULT_MIN_PRICE);
};

export {
  diactivateForm,
  activateForm,
  addressInput,
  mapFilterChange,
  resetForm,
  adForm,
  pristine,
  createMessage

};
