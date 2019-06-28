'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var addressField = adForm.querySelector('#address');

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

  var mainPin = map.querySelector('.map__pin--main');
  var mainPinHalfWidth = Math.round(mainPin.offsetWidth / 2);
  var mainPinHalfHeight = Math.round(mainPin.offsetHeight / 2);
  var mainPinCenterX = mainPin.offsetLeft + mainPinHalfWidth;
  var mainPinCenterY = mainPin.offsetTop + mainPinHalfHeight;
  var MAIN_PIN_ACTIVE_HEIGHT = 84;

  var isFirstDrag = true;
  var startCoords = {};

  var toggleDisableAttr = function (elements, isDisabled) {
    for (var i = 0; i < elements.length; i++) {
      if (isDisabled) {
        elements[i].setAttribute('disabled', 'disabled');
      } else {
        elements[i].removeAttribute('disabled');
      }
    }
  };

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

    if (mainPinPointerX < window.common.advertisementProperties.x[0]) {
      mainPin.style.left = window.common.advertisementProperties.x[0] - mainPinHalfWidth + 'px';
      mainPinPointerX = window.common.advertisementProperties.x[0];
    } else if (mainPinPointerX > window.common.advertisementProperties.x[1]) {
      mainPin.style.left = window.common.advertisementProperties.x[1] - mainPinHalfWidth + 'px';
      mainPinPointerX = window.common.advertisementProperties.x[1];
    } else {
      mainPin.style.left = mainPinStartX + 'px';
    }

    if (mainPinPointerY < window.common.advertisementProperties.y[0]) {
      mainPin.style.top = window.common.advertisementProperties.y[0] - MAIN_PIN_ACTIVE_HEIGHT + 'px';
      mainPinPointerY = window.common.advertisementProperties.y[0];
    } else if (mainPinPointerY > window.common.advertisementProperties.y[1]) {
      mainPin.style.top = window.common.advertisementProperties.y[1] - MAIN_PIN_ACTIVE_HEIGHT + 'px';
      mainPinPointerY = window.common.advertisementProperties.y[1];
    } else {
      mainPin.style.top = mainPinStartY + 'px';
    }

    addressField.value = mainPinPointerX + ', ' + mainPinPointerY;
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (isFirstDrag) {
      var loadAdvertisments = function (data) {
        window.pin.createPins(data);
      };

      window.backend.load(loadAdvertisments, window.loadingError);

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

  toggleDisableAttr(adFormElements, true);
  toggleDisableAttr(mapFiltersElements, true);
  addressField.value = mainPinCenterX + ', ' + mainPinCenterY;

})();
