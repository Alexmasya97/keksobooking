const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');

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
const minPrice = adForm.querySelector('#price');
minPrice.setAttribute('max', '100000');
const type = adForm.querySelector('[name="type"]');

function validatePrice(value) {

  const selectedType = type.value;

  switch (selectedType) {
    case 'bungalow':
      minPrice.setAttribute('min', '0');
      minPrice.setAttribute('placeholder', '0');
      break;
    case 'flat':
      minPrice.setAttribute('min', '1000');
      minPrice.setAttribute('placeholder', '1000');
      break;
    case 'hotel':
      minPrice.setAttribute('min', '3000');
      minPrice.setAttribute('placeholder', '3000');
      break;
    case 'house':
      minPrice.setAttribute('min', '5000');
      minPrice.setAttribute('placeholder', '5000');
      break;
    case 'palace':
      minPrice.setAttribute('min', '10000');
      minPrice.setAttribute('placeholder', '10000');
      break;
  }
  return Number(value) >= Number(minPrice.getAttribute('min')) && Number(value) < 100000;
}

function priceErrorMessage(value) {
  let text;

  if (value > 100000) {
    text = 'Максимальная цена за ночь 100 000';
  } else if (value < minPrice.getAttribute('min')) {
    text = `Минимальная цена за ночь ${minPrice.getAttribute('min')}`;
  }
  return text;
}

pristine.addValidator(
  minPrice,
  validatePrice,
  priceErrorMessage
);

pristine.addValidator(
  type,
  validatePrice,
  priceErrorMessage
);

//Количество комнат и гостей

const roomAmount = adForm.querySelector('#room_number');
const capacityAmount = adForm.querySelector('#capacity');
const roomOption = {
  ['1']: ['1'],
  ['2']: ['1', '2'],
  ['3']: ['1', '2', '3'],
  ['100']: ['0']
};

function roomCapacityRule() {
  return roomOption[roomAmount.value].includes(capacityAmount.value);
}

function getRuleErrorMessage() {
  if (!roomCapacityRule()) {
    return roomAmount.value === '100' ? 'выберите "не для гостей"' : 'выберите больше комнат';
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

export {
  diactivateForm,
  activateForm
};
