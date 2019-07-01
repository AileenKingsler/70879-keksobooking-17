'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var mapPinsContainer = document.querySelector('.map__pins');

  window.common = {
    advertisementProperties: {
      x: [0, mapPinsContainer.offsetWidth],
      y: [130, 630]
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_CODE) {
        action();
      }
    },
    isFirstDrag: true
  };

})();
