import { similarHotels, similarAvatars } from './data.js';

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const similarOffers = similarHotels();
const avatars = similarAvatars();

similarOffers.forEach((offer) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = `lat: ${offer.address.lat} и lng:${offer.address.lng}`;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;

  switch (offer.type) {
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

  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  // Добавление списка удобств
  const featuresContainer = card.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  offer.features.forEach((feature) => {
    const featureListItem = document.createElement('li');
    featureListItem.classList.add('popup__feature');
    featureListItem.classList.add(`popup__feature--${  feature}`);
    featuresContainer.appendChild(featureListItem);
  });

  card.querySelector('.popup__description').textContent = offer.description;

  // Добавление фотографии

  const photosList = card.querySelector('.popup__photos');
  photosList.innerHTML = '';

  offer.photos.forEach((photo) => {
    const photoItem = document.createElement('img');
    photoItem.src = photo;
    photoItem.classList.add('popup__photo');
    photoItem.width = 45;
    photoItem.height = 40;
    photosList.appendChild(photoItem);
  });

  // Замена аватарки пользователя
  const avatar = card.querySelector('.popup__avatar');
  avatar.src = avatars;

  // Проверка наличия описания
  if (offer.description) {
    card.querySelector('.popup__description').textContent = offer.description;
  } else {
    const descriptionBlock = card.querySelector('.popup__description');
    descriptionBlock.style.display = 'none';
  }

  mapCanvas.appendChild(card);
});
