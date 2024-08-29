const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');
const type = adForm.querySelector('[name="type"]');
const MAX_ACCOMODATION_PRICE = 100000;
const minPrice = adForm.querySelector('#price');
const TYPES_ROOM = {
  bungalow: {
    minPrice: 0,
  },
  flat: {
    minPrice: 1000,
  },
  hotel: {
    minPrice: 3000,
  },
  house: {
    minPrice: 5000,
  },
  palace: {
    minPrice: 10000,
  },
};
const roomAmount = adForm.querySelector('#room_number');
const capacityAmount = adForm.querySelector('#capacity');
const roomOption = {
  ['1']: ['1'],
  ['2']: ['1', '2'],
  ['3']: ['1', '2', '3'],
  ['100']: ['0']
};

const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');


export {
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
};
