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

export {
  randomNumber,
  getRandomFloat,
  getRandomArrayElement,
  generateRandomElementsArray
};
