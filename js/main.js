'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['Заголовок_1', 'Заголовок_2', 'Заголовок_3', 'Заголовок_4', 'Заголовок_5', 'Заголовок_6', 'Заголовок_7', 'Заголовок_8'];
var PRICES = [5000, 7000, 16000, 43000, 19000, 25000, 17000, 15000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание_1', 'Описание_2', 'Описание_3', 'Описание_4', 'Описание_5', 'Описание_6', 'Описание_7', 'Описание_8'];
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

function createCard(cardId) {
    var x = getRandomInRange(0, 1200);
    var y = getRandomInRange(130, 630);
    var card = {
        author: {
            avatar: AVATARS[cardId]
        },
        offer: {
            title: TITLES[cardId],
            address: x + ', ' + y,
            price: PRICES[cardId],
            type: TYPES[getRandomInRange(0, TYPES.length - 1)],
            rooms: ROOMS[getRandomInRange(0, ROOMS.length - 1)],
            guests: GUESTS[getRandomInRange(0, GUESTS.length - 1)],
            checkin: CHECKINS[getRandomInRange(0, CHECKINS.length - 1)],
            checkout: CHECKOUTS[getRandomInRange(0, CHECKOUTS.length - 1)],
            features: getRandomArr(FEATURES),
            description: DESCRIPTIONS[cardId],
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

map.classList.remove('map--faded');
var cards = createCards(FLAT_NUMBER);
renderPinBlocks(cards);
