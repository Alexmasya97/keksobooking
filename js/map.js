import { createCustomPopup } from './util.js';
import { addressInput } from './form-validation.js';
import { OFFERS_NUMBER } from './constant.js';

const map = L.map('map-canvas')
  .on('load', () => { })
  .setView({
    lat: 35.6770,
    lng: 139.75024,
  }, 13);

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
const markerGroup = L.layerGroup().addTo(map);

const createMarkers = (offers) => {
  offers.slice(0, OFFERS_NUMBER).forEach(({ offer, author, location }) => {
    const { lat, lng } = location;
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
      .addTo(markerGroup)
      .bindPopup(createCustomPopup({ offer, author, location }));
  },
  {
    keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
  },
  );
};

const resetMap = () => {
  markerGroup.clearLayers();
  map.setView({
    lat: 35.6770,
    lng: 139.75024,
  }, 13);
  mainPinMarker.setLatLng({
    lat: 35.6761,
    lng: 139.75024,
  });
};

export { resetMap, createMarkers, markerGroup };
