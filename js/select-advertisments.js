'use strict';

(function () {

  var PINS_MAX_QUANTITY = 5;
  var typeSelect = document.querySelector('#housing-type');

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

  var data = [];

  var isDisabled = function (it) {
    return it.disabled;
  };

  var typeFilter = function (advertisement) {
    if (typeSelect.value === 'any') {
      return true;
    }
    return advertisement.offer.type === typeSelect.value;
  };

  typeSelect.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.delete(pins);

    window.selectAdvertisments(data);
  });

  window.selectAdvertisments = function (advertisements) {
    data = advertisements;

    window.pin.create(advertisements
      .filter(typeFilter)
      .slice(0, PINS_MAX_QUANTITY));

    window.card.create(advertisements.slice(0, 1));

    if (Array.from(mapFiltersElements).every(isDisabled)) {
      window.common.disableElement(mapFiltersElements, false);
    }
  };

})();
