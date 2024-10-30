function randomNumber(numA, numB) {
  if (numA === numB) {
    throw Error('Ошибка: не задан диапазон');
  }
  const min = Math.min(numA, numB);
  const max = Math.max(numA, numB);

  if (min < 0) {
    throw Error('Ошибка: значения должны быть положительными');
  }
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomFloat(numA, numB, decimals) {
  if (numA === numB) {
    throw Error('Ошибка: не задан диапазон');
  }

  const min = Math.min(numA, numB);
  const max = Math.max(numA, numB);

  if (min < 0) {
    throw Error('Ошибка: значения должны быть положительными');
  }

  return (Math.random() * (max - min) + min).toFixed(decimals);
}

function getRandomArrayElement(elements) {
  return elements[randomNumber(0, elements.length - 1)];
}

function generateRandomElementsArray(possibleValues) {
  const length = Math.floor(Math.random() * possibleValues.length) + 1;
  const chosenElements = new Set();

  while (chosenElements.size < length) {
    const randomElement = getRandomArrayElement(possibleValues);
    chosenElements.add(randomElement);
  }

  return Array.from(chosenElements);
}

const createCustomPopup = ({ offer, author }) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  popupElement.querySelector('.popup__title').textContent = offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `lat: ${offer.address.lat} и lng:${offer.address.lng}`;
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

export {
  randomNumber,
  getRandomFloat,
  getRandomArrayElement,
  generateRandomElementsArray,
  createCustomPopup,
};
