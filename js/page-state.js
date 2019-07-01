'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('fieldset');

  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

  var mainPin = map.querySelector('.map__pin--main');
  var mainPinStartX = mainPin.offsetLeft;
  var mainPinStartY = mainPin.offsetTop;
  var mainPinHalfWidth = Math.round(mainPin.offsetWidth / 2);
  var mainPinHalfHeight = Math.round(mainPin.offsetHeight / 2);
  var mainPinCenterX = mainPinStartX + mainPinHalfWidth;
  var mainPinCenterY = mainPinStartY + mainPinHalfHeight;

  var addressField = adForm.querySelector('#address');

  var disableElement = function (elements, setDisabled) {
    elements.forEach(function (element) {
      element.disabled = setDisabled;
    });
  };

  window.pageState = {
    activate: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      disableElement(adFormElements, false);
      disableElement(mapFiltersElements, false);

      window.backend.load(window.selectAdvertisments, window.loadingError);
    },
    deactivate: function () {
      disableElement(adFormElements, true);
      disableElement(mapFiltersElements, true);

      addressField.value = mainPinCenterX + ', ' + mainPinCenterY; // не работает при сбросе формы в form.js
    },
    reset: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      window.pin.delete(pins);

      mainPin.style.left = mainPinStartX + 'px';
      mainPin.style.top = mainPinStartY + 'px';

      window.common.isFirstDrag = true;
    }
  };

})();