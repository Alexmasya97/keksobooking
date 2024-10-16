import './util.js';
import './data.js';
import './elements.js';
import './constant.js';
import { diactivateForm, activateForm } from './form.js';
import { createOffer } from './data.js';

diactivateForm();

const map = L.map('map-canvas')
  .on('load', () => { activateForm() })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/avatars/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});

////////dont touch


offers.forEach(({ createOffer }) => {
  const { lat, lng } = createOffer.address;
  const marker = L.marker({
    lat,
    lng,
  });

  marker.addTo(map);
});

