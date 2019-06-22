'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  typeField.addEventListener('change', function () {
    if (typeField.value === 'bungalo') {
      priceField.min = priceField.placeholder = 0;
    }
    if (typeField.value === 'flat') {
      priceField.min = priceField.placeholder = 1000;
    }
    if (typeField.value === 'house') {
      priceField.min = priceField.placeholder = 5000;
    }
    if (typeField.value === 'palace') {
      priceField.min = priceField.placeholder = 10000;
    }
  });

  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');

  timeInField.addEventListener('change', function () {
    if (timeInField.value !== timeOutField.value) {
      timeOutField.value = timeInField.value;
    }
  });

  timeOutField.addEventListener('change', function () {
    if (timeInField.value !== timeOutField.value) {
      timeInField.value = timeOutField.value;
    }
  });

})();
