'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var error = errorTemplate.cloneNode(true);
  var main = document.querySelector('main');

  var closeError = function () {
    error.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    window.common.isEscEvent(evt, closeError);
  };

  window.loadingError = function (message) {
    main.appendChild(error);

    error.addEventListener('click', closeError);

    document.addEventListener('keydown', onPopupEscPress);

    throw new Error(message);
  };

})();
