const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');

//Pristine

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
}, false);

//Валидация заголовка

function validateTitle(value) {
  return value.length >= 30 && value.length <= 100;
}

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'От 30 до 100 символов');

// Валидация цены за ночь

function validatePrice(value) {
  return value <= 100000;
}

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Максимальное значение — 100 000'
);

//Количество комнат и гостей

const roomAmount = adForm.querySelector('#room_number');
const capacityAmount = adForm.querySelector('#capacity');
const roomOption = {
  ['1']: ['1'],
  ['2']: ['1', '2'],
  ['3']: ['1', '2', '3'],
  ['100']: ['не для гостей']
};

function roomCapacityRule() {
  return roomOption[roomAmount.value].includes(capacityAmount.value);
}

function getRuleErrorMessage() {
  if (!roomCapacityRule()) {
    const text = 'Выберите больше комнат';
    return text;
  }
}

pristine.addValidator(roomAmount, roomCapacityRule, getRuleErrorMessage);
pristine.addValidator(capacityAmount, roomCapacityRule);

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
