'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');

  var typeField = adForm.querySelector('#type');
  var priceField = adForm.querySelector('#price');

  var timeInField = adForm.querySelector('#timein');
  var timeOutField = adForm.querySelector('#timeout');

  var roomNumberField = adForm.querySelector('#room_number');
  var capacityField = adForm.querySelector('#capacity');
  var capacityOptions = capacityField.querySelectorAll('option');

  var typesMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var onTypeFieldChange = function () {
    priceField.min = priceField.placeholder = typesMap[typeField.value];
  };

  var roomsMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var onRoomsFieldChange = function () {
    var isFirstAppropriateOption = true;

    capacityOptions.forEach(function (option) {
      if (roomsMap[roomNumberField.value].indexOf(option.value) !== -1) {
        option.disabled = false;
        if (isFirstAppropriateOption) {
          option.selected = true;
          isFirstAppropriateOption = false;
        }
      } else {
        option.disabled = true;
      }
    });
  };

  typeField.addEventListener('change', onTypeFieldChange);

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

  roomNumberField.addEventListener('change', onRoomsFieldChange);

  adForm.addEventListener('reset', function () {
    window.pageState.reset();
    window.pageState.deactivate();
  });

})();
