import './constant.js';
import './price-slider.js';
import { createMarkers, markerGroup, resetMap } from './map.js';
import { getData, sendData } from './api.js';
import { mapFilterChange, pristine, resetForm, adForm, createMessage, diactivateForm, activateForm } from './form-validation.js';
import { compareAd, resetFilters } from './filter.js';
import { debounce } from './util.js';
import './preview-photo.js';

//Функция для сброса формы, фильтров и карты
function resetState(ads) {
  resetForm();
  resetFilters();
  resetMap();
  createMarkers(ads);
}

const resetButton = document.querySelector('.ad-form__reset');

diactivateForm();

getData((ads) => {

  createMarkers(ads);
  activateForm();
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetState(ads);
  });

  mapFilterChange(debounce(() => {
    markerGroup.clearLayers();
    const filteredAds = compareAd(ads);
    createMarkers(filteredAds);
  }));

  adForm.addEventListener('submit', (submitEvent) => {
    submitEvent.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    sendData(
      () => {
        createMessage('success');
        resetState(ads);
      },
      () => {
        createMessage('error');
      },
      new FormData(submitEvent.target)
    );
  });
});


