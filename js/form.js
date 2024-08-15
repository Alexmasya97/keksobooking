const adForm = document.querySelector('.ad-form');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormElements = mapFiltersForm.querySelectorAll('.map__filter');
const mapFiltersFormFeatures = mapFiltersForm.querySelector('.map__features');

const diactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('ad-form--disabled');
  mapFiltersFormFeatures.setAttribute('disabled', 'disabled');
  const inactiveState = (elements) => {
    elements.forEach((item) => item.setAttribute('disabled', 'disabled'));
  };

  inactiveState(adFormElements);
  inactiveState(mapFiltersFormElements);
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('ad-form--disabled');
  mapFiltersFormFeatures.removeAttribute('disabled', null);

  const activeState = (elements) => {
    elements.forEach((item) => item.removeAttribute('disabled', 'disabled'));
  };

  activeState(adFormElements);
  activeState(mapFiltersFormElements);
};

export {
  diactivateForm,
  activateForm
};
