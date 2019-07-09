'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinHalfWidth = Math.round(mainPin.offsetWidth / 2);
  var MAIN_PIN_ACTIVE_HEIGHT = 84;

  var addressField = document.querySelector('#address');

  var startCoords = {};

  var onMouseMove = function (evt) {
    evt.preventDefault();

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
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

  var onMouseUp = function (evt) {
    evt.preventDefault();

    if (window.common.isFirstDrag) {
      window.pageState.activate();
    }

    window.common.isFirstDrag = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onClick = function (evt) {
    evt.preventDefault();

    if (window.common.isFirstDrag) {
      window.pageState.activate();
    }

    window.common.isFirstDrag = false;

    var mainPinPointerX = mainPin.offsetLeft + mainPinHalfWidth;
    var mainPinPointerY = mainPin.offsetTop + MAIN_PIN_ACTIVE_HEIGHT;

    addressField.value = mainPinPointerX + ', ' + mainPinPointerY;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  mainPin.addEventListener('click', onClick);

  window.pageState.deactivate();

})();
