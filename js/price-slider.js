import { TYPES_ROOM, DEFAULT_MIN_PRICE } from './constant.js';

const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.getElementById('price');
const typeValue = document.getElementById('type');

function getMinPriceForType(type) {
  return TYPES_ROOM[type].minPrice;
}

typeValue.addEventListener('change', () => {
  const minPriceForType = getMinPriceForType(typeValue.value);
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPriceForType,
      max: 100000,
    },
    start: minPriceForType,
  });
});

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_MIN_PRICE,
    max: 100000,
  },
  start: 1000,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});


