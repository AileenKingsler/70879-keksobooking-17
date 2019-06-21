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
  var mainPinHalfWidth = Math.round(mainPin.offsetWidth / 2);
  var mainPinHalfHeight = Math.round(mainPin.offsetHeight / 2);
  var mainPinCenterX = mainPin.offsetLeft + mainPinHalfWidth;
  var mainPinCenterY = mainPin.offsetTop + mainPinHalfHeight;
  var MAIN_PIN_ACTIVE_HEIGHT = 84;

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


  var isFirstDrag = true;

  var startCoords = {};

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var mainPinStartX = mainPin.offsetLeft - shift.x;
    var mainPinStartY = mainPin.offsetTop - shift.y;

    var mainPinPointerX = mainPinStartX + mainPinHalfWidth;
    var mainPinPointerY = mainPinStartY + MAIN_PIN_ACTIVE_HEIGHT;

    if (mainPinPointerX < advertisementProperties.x[0]) {
      mainPin.style.left = advertisementProperties.x[0] - mainPinHalfWidth + 'px';
    } else if (mainPinPointerX > advertisementProperties.x[1]) {
      mainPin.style.left = advertisementProperties.x[1] - mainPinHalfWidth + 'px';
    } else {
      mainPin.style.left = mainPinStartX + 'px';
    }

    if (mainPinPointerY < advertisementProperties.y[0]) {
      mainPin.style.top = advertisementProperties.y[0] - MAIN_PIN_ACTIVE_HEIGHT + 'px';
    } else if (mainPinPointerY > advertisementProperties.y[1]) {
      mainPin.style.top = advertisementProperties.y[1] - MAIN_PIN_ACTIVE_HEIGHT + 'px';
    } else {
      mainPin.style.top = mainPinStartY + 'px';
    }

    addressField.value = mainPinPointerX + ', ' + mainPinPointerY;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (isFirstDrag) {
      createPins(createAdvertisements(advertisementProperties, 8));

      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      toggleDisableAttr(adFormElements, false);
      toggleDisableAttr(mapFiltersElements, false);
    }

    isFirstDrag = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', function (downEvt) {
    downEvt.preventDefault();

    startCoords = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
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
