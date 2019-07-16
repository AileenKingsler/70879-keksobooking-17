'use strict';

(function () {

  var MAIN_PIN_ACTIVE_HEIGHT = 84;

  var ExtremeCoordinates = {
    MIN_LEFT: 0,
    MAX_LEFT: 1200,
    MIN_TOP: 130,
    MAX_TOP: 630
  };

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinHalfWidth = Math.round(mainPin.offsetWidth / 2);

  var addressField = document.querySelector('#address');

  var startCoords;

  var Coordinates = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coordinates.prototype.setAddress = function () {
    addressField.value = this.x + ', ' + this.y;
  };

  var moveMainPin = function (pinPointer, pinLeftTopCorner) {
    if (pinPointer.x < ExtremeCoordinates.MIN_LEFT) {
      mainPin.style.left = ExtremeCoordinates.MIN_LEFT - mainPinHalfWidth + 'px';
      pinPointer.x = ExtremeCoordinates.MIN_LEFT;
    } else if (pinPointer.x > ExtremeCoordinates.MAX_LEFT) {
      mainPin.style.left = ExtremeCoordinates.MAX_LEFT - mainPinHalfWidth + 'px';
      pinPointer.x = ExtremeCoordinates.MAX_LEFT;
    } else {
      mainPin.style.left = pinLeftTopCorner.x + 'px';
    }

    if (pinPointer.y < ExtremeCoordinates.MIN_TOP) {
      mainPin.style.top = ExtremeCoordinates.MIN_TOP - MAIN_PIN_ACTIVE_HEIGHT + 'px';
      pinPointer.y = ExtremeCoordinates.MIN_TOP;
    } else if (pinPointer.y > ExtremeCoordinates.MAX_TOP) {
      mainPin.style.top = ExtremeCoordinates.MAX_TOP - MAIN_PIN_ACTIVE_HEIGHT + 'px';
      pinPointer.y = ExtremeCoordinates.MAX_TOP;
    } else {
      mainPin.style.top = pinLeftTopCorner.y + 'px';
    }
  };


  var onMouseDown = function (evt) {
    evt.preventDefault();

    startCoords = new Coordinates(evt.clientX, evt.clientY);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onMouseMove = function (evt) {
    evt.preventDefault();

    var shift = new Coordinates(startCoords.x - evt.clientX, startCoords.y - evt.clientY);

    startCoords = new Coordinates(evt.clientX, evt.clientY);

    var mainPinStart = new Coordinates(mainPin.offsetLeft - shift.x, mainPin.offsetTop - shift.y);
    var mainPinPointer = new Coordinates(mainPinStart.x + mainPinHalfWidth, mainPinStart.y + MAIN_PIN_ACTIVE_HEIGHT);

    moveMainPin(mainPinPointer, mainPinStart);

    mainPinPointer.setAddress();
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

  var onMainPinClick = function (evt) {
    evt.preventDefault();

    if (window.common.isFirstDrag) {
      window.pageState.activate();
    }

    window.common.isFirstDrag = false;

    var mainPinPointer = new Coordinates(mainPin.offsetLeft + mainPinHalfWidth, mainPin.offsetTop + MAIN_PIN_ACTIVE_HEIGHT);

    mainPinPointer.setAddress();
  };

  mainPin.addEventListener('mousedown', onMouseDown);

  mainPin.addEventListener('click', onMainPinClick);

  window.pageState.deactivate();

})();
