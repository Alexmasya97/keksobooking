import { createCustomPopup } from './util.js';
import './data.js';
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
      draggable: false,
      icon: pinIcon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(createCustomPopup(offer));
});

