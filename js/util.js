const createCustomPopup = ({ offer, author, location }) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `lat: ${location.lat.toFixed(5)} и lng:${location.lng.toFixed(5)}`;
  popupElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  popupElement.querySelector('.popup__avatar').src = author.avatar;

  const photoContainer = popupElement.querySelector('.popup__photos');
  photoContainer.innerHTML = '';

  // Создание элементов <img> для каждого изображения в массиве offer.photos
  offer.photos.forEach((photoUrl) => {
    const imageElement = document.createElement('img');
    imageElement.src = photoUrl;
    imageElement.alt = 'Фотография жилья';
    imageElement.style.width = '45px';
    imageElement.style.width = '40px';
    imageElement.style.marginRight = '5px';
    photoContainer.appendChild(imageElement);
  });

  return popupElement;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  createCustomPopup,
  debounce
};
