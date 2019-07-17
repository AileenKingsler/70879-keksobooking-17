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
  var mainPinCenterX = mainPinStartX + Math.round(mainPin.offsetWidth / 2);
  var mainPinCenterY = mainPinStartY + Math.round(mainPin.offsetHeight / 2);

  var addressField = adForm.querySelector('#address');

  window.pageState = {
    activate: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      window.common.disableElement(adFormElements, false);

      window.backend.load(window.advertisments.show, window.backend.showError);
    },
    deactivate: function () {
      window.common.disableElement(adFormElements, true);
      window.common.disableElement(mapFiltersElements, true);

      addressField.value = mainPinCenterX + ', ' + mainPinCenterY;
    },
    reset: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');

      window.pin.delete();
      window.card.delete();

      mainPin.style.left = mainPinStartX + 'px';
      mainPin.style.top = mainPinStartY + 'px';

      window.common.isFirstDrag = true;
    }
  };

})();
