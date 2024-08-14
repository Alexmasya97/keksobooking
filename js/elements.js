import { generateObject } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const OFFERS_COUNT = 10;
const offers = Array.from({ length: OFFERS_COUNT }, generateObject);

offers.forEach((offer) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.offer.title;
  card.querySelector('.popup__text--address').textContent = `lat: ${offer.offer.address.lat} и lng:${offer.offer.address.lng}`;
  card.querySelector('.popup__text--price').textContent = `${offer.offer.price} ₽/ночь`;

  switch (offer.offer.type) {
    case 'flat':
      card.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      card.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      card.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      card.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      card.querySelector('.popup__type').textContent = 'Отель';
      break;
  }

  card.querySelector('.popup__text--capacity').textContent = `${offer.offer.rooms} комнаты для ${offer.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.offer.checkin}, выезд до ${offer.offer.checkout}`;

  // Добавление списка удобств
  const featuresContainer = card.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  offer.offer.features.forEach((feature) => {
    const featureListItem = document.createElement('li');
    featureListItem.classList.add('popup__feature');
    featureListItem.classList.add(`popup__feature--${feature}`);
    featuresContainer.appendChild(featureListItem);
  });

  card.querySelector('.popup__description').textContent = offer.offer.description;

  // Добавление фотографии

  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = '';

  offer.offer.photos.forEach((photo) => {
    const photoItem = document.createElement('img');
    photoItem.src = photo;
    photoItem.classList.add('popup__photo');
    photoItem.width = 45;
    photoItem.height = 40;
    photosList.appendChild(photoItem);
  });

  // Замена аватарки пользователя
  const avatar = card.querySelector('.popup__avatar');
  avatar.src = offer.author.avatar;

  // Проверка наличия описания
  if (offer.offer.description) {
    card.querySelector('.popup__description').textContent = offer.offer.description;
  } else {
    const descriptionBlock = card.querySelector('.popup__description');
    descriptionBlock.style.display = 'none';
  }

  mapCanvas.appendChild(card);
});
