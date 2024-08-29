import {
  adForm,
  adFormElements,
  mapFiltersForm,
  mapFiltersFormElements,
  mapFiltersFormFeatures,
  type,
  MAX_ACCOMODATION_PRICE,
  TYPES_ROOM,
  minPrice,
  roomAmount,
  capacityAmount,
  roomOption,
  checkIn,
  checkOut
} from './constant.js';

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

type.addEventListener('change', ({ target }) => {
  minPrice.setAttribute('min', TYPES_ROOM[target.value].minPrice);
  minPrice.setAttribute('placeholder', TYPES_ROOM[target.value].minPrice);
});

function validatePrice(value) {
  minPrice.setAttribute('max', MAX_ACCOMODATION_PRICE);
  return value >= Number(minPrice.getAttribute('min')) && value <= Number(minPrice.getAttribute('max'));
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

function roomCapacityRule() {
  return roomOption[roomAmount.value].includes(capacityAmount.value);
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

export {
  diactivateForm,
  activateForm
};
