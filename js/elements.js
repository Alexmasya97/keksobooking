const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const card = cardTemplate.cloneNode(true);

card.querySelector('.popup__title').textContent = offer.title;
card.querySelector('.popup__text--address').textContent = offer.address;
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
const featureList = card.querySelector('.popup__feature');

featureList.forEach((featureListItem) => {
  const isNecessary = features.includes(featureListItem.classList[1].replace('popup__feature--', ''));
  if(!isNecessary) {
    featureListItem.remove();
  }
});
//моя переборка. на всякий
// featureList.forEach((featureListItem) => {
//   const isNecessary = featureList.some(
//     (features) => featureListItem.classList.contains('popup__feature'+features)
//   );
//   if(!isNecessary){
//     featureListItem.remove()
//   }
// });


card.querySelector('.popup__description').textContent = offer.description;

// В блок .popup__photos выведите все фотографии из списка offer.photos.
// Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.

card.querySelector('.popup__photos').textContent = offer.description;

// Добавление фотографий
const photosList = card.querySelector('.popup__photos');
offer.photos.forEach((photo) => {
  const photoItem = document.createElement('img');
  photoItem.src = photo;
  photoItem.classList.add('popup__photo');
  photoItem.width = 45;
  photoItem.height = 40;
  photosList.appendChild(photoItem);
})
// Замена аватарки пользователя
const avatar = card.querySelector('.popup__avatar');
avatar.src = author

