'use strict';

(function () {

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


  // Активное/неактивное состояние страницы

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

  var mainPin = mapPinsContainer.querySelector('.map__pin--main');
  var mainPinWidth = mainPin.offsetWidth;
  var mainPinHeight = mainPin.offsetHeight;
  var mainPinCenterX = mainPin.offsetLeft + mainPinWidth / 2;
  var mainPinCenterY = mainPin.offsetTop + mainPinHeight / 2;

  addressField.value = mainPinCenterX + ', ' + mainPinCenterY;

  var toggleDisableAttr = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      if (isDisabled) {
        elements[i].setAttribute('disabled', 'disabled');
      } else {
        elements[i].removeAttribute('disabled');
      }
    }
  };

  toggleDisableAttr(adFormElements, true);
  toggleDisableAttr(mapFiltersElements, true);

  mainPin.addEventListener('click', function () {
    createPins(createAdvertisements(advertisementProperties, 8));

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    toggleDisableAttr(adFormElements, false);
    toggleDisableAttr(mapFiltersElements, false);
  });


  // Валидация формы

  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  typeField.addEventListener('change', function () {
    if (typeField.value === 'bungalo') {
      priceField.min = priceField.placeholder = 0;
    }
    if (typeField.value === 'flat') {
      priceField.min = priceField.placeholder = 1000;
    }
    if (typeField.value === 'house') {
      priceField.min = priceField.placeholder = 5000;
    }
    if (typeField.value === 'palace') {
      priceField.min = priceField.placeholder = 10000;
    }
  });

  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');

  timeInField.addEventListener('change', function () {
    if (timeInField.value !== timeOutField.value) {
      timeOutField.value = timeInField.value;
    }
  });

  timeOutField.addEventListener('change', function () {
    if (timeInField.value !== timeOutField.value) {
      timeInField.value = timeOutField.value;
    }
  });

}());
