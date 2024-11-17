const DEFAULT_VALUE = 'any';

const getComparePrice = (price, filterPrice) => {
  let range = 'middle';

  if (price < 10000) {
    range = 'low';
  }

  if (price > 50000) {
    range = 'high';
  }

  return filterPrice.value === DEFAULT_VALUE || range === filterPrice.value;
};

const getCompareType = (type, filterType) => type === filterType.value || filterType.value === DEFAULT_VALUE;

const getCompareRooms = (rooms, filterRooms) => rooms >= Number(filterRooms.value) || filterRooms.value === DEFAULT_VALUE;

const getCompareGuests = (guests, filterGuests) => filterGuests.value === DEFAULT_VALUE || guests >= Number(filterGuests.value);

const getCompareFeauters = (feature, filterFeauters) => {
  let count = 0;

  filterFeauters.forEach((element) => {
    if (feature) {
      if (feature.includes(element.value)) {
        count++;
      }
    }
  });

  return count === filterFeauters.length;
};

const compareAd = (ads) => {
  const housingTypeFilter = document.querySelector('#housing-type');
  const housingPriceFilter = document.querySelector('#housing-price');
  const housingRoomsFilter = document.querySelector('#housing-rooms');
  const housingGuestsFilter = document.querySelector('#housing-guests');
  const housingFeaturesFilter = document.querySelectorAll('.map__checkbox:checked');

  const filterAd = ads.filter((ad) => (
    getCompareType(ad.offer.type, housingTypeFilter) &&
    getCompareRooms(ad.offer.rooms, housingRoomsFilter) &&
    getComparePrice(ad.offer.price, housingPriceFilter) &&
    getCompareGuests(ad.offer.guests, housingGuestsFilter) &&
    getCompareFeauters(ad.offer.features, housingFeaturesFilter)));
  return filterAd;
};
const resetFilters = () => {
  // Сброс фильтров
  document.querySelector('#housing-type').value = DEFAULT_VALUE;
  document.querySelector('#housing-price').value = DEFAULT_VALUE;
  document.querySelector('#housing-rooms').value = DEFAULT_VALUE;
  document.querySelector('#housing-guests').value = DEFAULT_VALUE;

  document.querySelectorAll('.map__checkbox').forEach((checkbox) => {
    checkbox.checked = false;
  });
};
export { compareAd, resetFilters };
