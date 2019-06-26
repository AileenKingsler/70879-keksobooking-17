'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');

  typeField.addEventListener('change', function () {
    switch (typeField.value) {
      case 'bungalo':
        priceField.min = priceField.placeholder = 0;
        break;
      case 'flat':
        priceField.min = priceField.placeholder = 1000;
        break;
      case 'house':
        priceField.min = priceField.placeholder = 5000;
        break;
      case 'palace':
        priceField.min = priceField.placeholder = 10000;
    }
  });

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
