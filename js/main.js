import './util.js';
import { createOffer, getAvatarLink } from './data.js';
import { offers } from './elements.js';
import './constant.js';
import { diactivateForm, activateForm, addressInput } from './form.js';
import './price-slider.js';


diactivateForm();
const map = L.map('map-canvas')
  .on('load', () => { activateForm(); })
  .setView({
    lat: 35.6770,
    lng: 139.75024,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/avatars/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6761,
    lng: 139.75024,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  const latValue = lat.toFixed(5);
  const lngValue = lng.toFixed(5);
  addressInput.value = `${latValue}, ${lngValue}`;
});

const createCustomPopup = () => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const offer = createOffer();
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `lat: ${offer.address.lat} и lng:${offer.address.lng}`;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  const avatar = getAvatarLink();
  popupElement.querySelector('.popup__avatar').src = avatar;
  return popupElement;
};


offers.forEach(({ offer }) => {
  const { lat, lng } = offer.address;
  const pinIcon = L.icon({
    iconUrl: '../img/avatars/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  },
  {
    draggable: true,
    icon: pinIcon,
  },
  );

  marker
    .addTo(map)
    .bindPopup(createCustomPopup(createOffer));
});

