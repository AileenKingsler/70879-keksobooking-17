'use strict';

(function () {

  var ESC_KEY_CODE = 27;
  var mapPins = document.querySelector('.map__pins');

  window.common = {
    isFirstDrag: true,
    advertisementProperties: {
      x: [0, mapPins.offsetWidth],
      y: [130, 630]
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY_CODE) {
        action();
      }
    },
    disableElement: function (elements, setDisabled) {
      elements.forEach(function (element) {
        element.disabled = setDisabled;
      });
    }
  };

})();
