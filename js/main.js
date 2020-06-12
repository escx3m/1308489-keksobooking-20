'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Квартира со скидкой', 'Любите захватывающий вид?', 'Супердом', 'Фантастично', 'Ищешь квартиру? Тебе к нам', 'Заселим быстро', 'С нами удобнее и надежнее', 'Как у вас дома'];
var PRICES = [5000, 7000, 16000, 43000, 19000, 25000, 17000, 15000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPESRUS = {palace: 'Дворец', flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Комфортная квартира для отдыха', 'В квартире есть все что нужно для комфортного отдыха', 'Хотите комфорт? Вам сюда', 'Встретим гостей нашего города у нас', 'В квартире есть все для проживания', 'Уютная, чистая, светлая квартира для вас и вашей семьи', 'С видом на море', 'Тихий район, развита инфраструктура, все под боком'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FLAT_NUMBER = 8;

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArr(arr) {
  var newArr = [];
  var newArrLength = getRandomInRange(1, arr.length);

  for (var i = 0; i < newArrLength; i++) {
    var newArrItem = arr[getRandomInRange(0, arr.length - 1)];
    if (newArr.includes(newArrItem)) {
      i--;
    } else {
      newArr.push(newArrItem);
    }
  }
  return newArr;
}

function createCard() {
  var x = getRandomInRange(0, 1200);
  var y = getRandomInRange(130, 630);
  var card = {
    author: {
      avatar: AVATARS[getRandomInRange(0, AVATARS.length - 1)],
    },
    offer: {
      title: TITLES[getRandomInRange(0, TITLES.length - 1)],
      address: x + ', ' + y,
      price: PRICES[getRandomInRange(0, PRICES.length - 1)],
      type: TYPES[getRandomInRange(0, TYPES.length - 1)],
      rooms: ROOMS[getRandomInRange(0, ROOMS.length - 1)],
      guests: GUESTS[getRandomInRange(0, GUESTS.length - 1)],
      checkin: CHECKINS[getRandomInRange(0, CHECKINS.length - 1)],
      checkout: CHECKOUTS[getRandomInRange(0, CHECKOUTS.length - 1)],
      features: getRandomArr(FEATURES),
      description: DESCRIPTIONS[getRandomInRange(0, DESCRIPTIONS.length - 1)],
      photos: getRandomArr(PHOTOS),
    },
    location: {
      x: x,
      y: y
    }
  };
  return card;
}

function createCards(cardsCount) {
  var cards = [];
  for (var i = 0; i < cardsCount; i++) {
    cards.push(createCard(i));
  }
  return cards;
}

function createPinBlock(card) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = pinTemplate.cloneNode(true);
  var moveX = 50 / 2;
  var moveY = 70;

  pinElement.querySelector('img').src = card.author.avatar;
  pinElement.querySelector('img').alt = card.offer.title;
  pinElement.style.left = (card.location.x - moveX) + 'px';
  pinElement.style.top = (card.location.y - moveY) + 'px';

  return pinElement;
}

function renderPinBlocks(cards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createPinBlock(cards[i]));
  }
  mapPins.appendChild(fragment);
}

function chooseSingularPlural(count, singular, plural) {
  return count > 1 ? plural : singular;
}

function createFeatures(featuresContainer, features) {
  featuresContainer.innerHTML = '';
  for (var i = 0; i < features.length; i++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature');
    newElement.classList.add('popup__feature--' + features[i]);
    featuresContainer.appendChild(newElement);
  }
}

function createPhotoBlock(photosBlock, photoBlock, cardPhotos) {
  for (var i = 0; i < cardPhotos.length; i++) {
    if (i === 0) {
      photoBlock.src = cardPhotos[i];
    } else {
      var photoBlockClone = photoBlock.cloneNode(true);
      photoBlockClone.src = cardPhotos[i];
      photosBlock.appendChild(photoBlockClone);
    }
  }
}

function createCardBlock(card) {

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var author = card.author;
  var offer = card.offer;

  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPESRUS[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + chooseSingularPlural(offer.rooms, ' комната для ', ' комнаты для ') + offer.guests + chooseSingularPlural(offer.guests, ' гостя', ' гостей');
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offer.description;

  var featuresContainer = cardElement.querySelector('.popup__features');
  createFeatures(featuresContainer, offer.features);

  var photos = cardElement.querySelector('.popup__photos');
  var photo = photos.querySelector('.popup__photo');
  createPhotoBlock(photos, photo, offer.photos);

  return cardElement;
}

function renderCardBlock(cardsItem) {

  var cardBlock = createCardBlock(cardsItem);
  var fragment = document.createDocumentFragment().appendChild(cardBlock);

  var mapFilters = map.querySelector('.map__filters-container');
  mapFilters.before(fragment);
}

map.classList.remove('map--faded');
var cards = createCards(FLAT_NUMBER);
renderPinBlocks(cards);
renderCardBlock(cards[0]);
