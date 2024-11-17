const MAX_ACCOMODATION_PRICE = 100000;
const DEFAULT_MIN_PRICE = 1000;
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
const ROOM_OPTION = {
  ['1']: ['1'],
  ['2']: ['1', '2'],
  ['3']: ['1', '2', '3'],
  ['100']: ['0']
};
const OFFERS_NUMBER = 10;
const ESC_BUTTON = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {
  MAX_ACCOMODATION_PRICE,
  DEFAULT_MIN_PRICE,
  TYPES_ROOM,
  ROOM_OPTION,
  OFFERS_NUMBER,
  ESC_BUTTON
};
