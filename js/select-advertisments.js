'use strict';

(function () {

  var PINS_MAX_QUANTITY = 5;
  var typeSelect = document.querySelector('#housing-type');

  var typeFilter = function (advertisement) {
    if (typeSelect.value === 'any') {
      return true;
    }
    return advertisement.offer.type === typeSelect.value;
  };

  typeSelect.addEventListener('change', function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.delete(pins);

    window.backend.load(window.selectAdvertisments, window.loadingError); // не понимаю, как сделать, чтобы не загружать данные с сервера каждый раз
  });

  window.selectAdvertisments = function (advertisements) {
    window.pin.create(advertisements
      .filter(typeFilter)
      .slice(0, PINS_MAX_QUANTITY));
  };

})();
