'use strict';

var map = document.querySelector('.map');
var mapPinsContainer = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var advertisementProperties = {
  types: ['palace', 'flat', 'house', 'bungalo'],
  x: [0, mapPinsContainer.offsetWidth],
  y: [130, 630]
};

var getRandomInt = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomProperties = function (properties) {
  return properties[getRandomInt(0, properties.length - 1)];
};

var createAdvertisements = function (properties, quantity) {
  var items = [];

  for (var i = 0; i < quantity; i++) {
    var item = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: 'заголовок объявления',
        type: getRandomProperties(properties.types)
      },
      location: {
        x: getRandomInt(properties.x[0], properties.x[1]),
        y: getRandomInt(properties.y[0], properties.y[1])
      }
    };
    items.push(item);
  }

  return items;
};

var renderPin = function (advertisment) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = advertisment.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = advertisment.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = advertisment.author.avatar;
  pin.querySelector('img').alt = advertisment.offer.title;

  return pin;
};

var createPins = function (advertismentsList) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < advertismentsList.length; i++) {
    fragment.appendChild(renderPin(advertismentsList[i]));
  }

  mapPinsContainer.appendChild(fragment);
};

map.classList.remove('map--faded');

createPins(createAdvertisements(advertisementProperties, 8));