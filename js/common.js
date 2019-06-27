'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var mapPinsContainer = document.querySelector('.map__pins');

  window.common = {
    advertisementProperties: {
      types: ['palace', 'flat', 'house', 'bungalo'],
      x: [0, mapPinsContainer.offsetWidth],
      y: [130, 630]
    },
    getRandomInt: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    getRandomValue: function (properties) {
      return properties[window.common.getRandomInt(0, properties.length - 1)];
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_CODE) {
        action();
      }
    }
  };

})();
