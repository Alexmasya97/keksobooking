import { randomNumber, getRandomFloat, getRandomArrayElement, generateRandomElementsArray } from './util.js'

function createAuthor() {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // генерируем случайное число от 1 до 10
  const formattedNumber = String(randomNumber).padStart(2, '0');
  const avatar = `img/avatars/user${formattedNumber}.png`; // создаем уникальный адрес изображения
  return avatar;
}

function createOffer() {

  let location = {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  }

  return {
    title: getRandomArrayElement([
      'Wonderful house with a view',
      'SleepyCrew Hub',
      'Walkabout Beach Hotel',
      'Sun and Sand Hotel',
      'Dream Desert Hotel',
    ]),
    address: location,
    price: randomNumber(100, 1000),
    type: getRandomArrayElement(['palace', 'flat', 'house', 'bungalow', 'hotel',]),
    rooms: Math.floor(Math.random() * 5) + 1,
    guests: Math.floor(Math.random() * 10) + 1,
    checkin: getRandomArrayElement(['12:00', '13:00', '14:00']),
    checkout: getRandomArrayElement(['12:00', '13:00', '14:00']),
    features: generateRandomElementsArray(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner',]),
    description: getRandomArrayElement([
      'This beautiful house offers breathtaking views of the surrounding nature.',
      'All this in the peaceful surroundings of our beautiful gardens, will make unforgettable holiday.',
      'Welcome to relax and unwind in a quiet and elegant setting.',
      'Holiday with wonderful surroundings of nature and at the same time luxury and coziness.',
      'Welcomes you in a real cosmopolitan, pulsing milieu, at the same time offering peace and intimate retirement, just in the heart of the city centre.'
    ]),
    photos: generateRandomElementsArray([
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
    ]),
  };
}

const SIMILAR_HOTEL_COUNT = 2;
const similarHotels = () => Array.from({ length: SIMILAR_HOTEL_COUNT }, createOffer);
const similarAvatars = () => Array.from({ length: SIMILAR_HOTEL_COUNT }, createAuthor);

export { similarHotels, similarAvatars }
