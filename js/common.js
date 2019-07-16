'use strict';

(function () {

  var ESC_KEY_CODE = 27;

  window.common = {
    isFirstDrag: true,
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
