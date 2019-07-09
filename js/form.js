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

  var resetBtn = adForm.querySelector('.ad-form__reset');

  var typesMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomsMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var onTypeFieldChange = function () {
    priceField.min = priceField.placeholder = typesMap[typeField.value];
  };

  var onRoomsFieldChange = function () {
    capacityOptions.forEach(function (option) {
      if (roomsMap[roomNumberField.value].indexOf(option.value) === -1) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }

      if (option.disabled === true && option.selected === true) {
        capacityField.setCustomValidity('Please, choose appropriate capacity');
      }
    });
  };

  var onCapacityFieldChange = function () {
    capacityOptions.forEach(function (option) {
      if (!(option.disabled === true && option.selected === true)) {
        capacityField.setCustomValidity('');
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

  capacityField.addEventListener('change', onCapacityFieldChange);

  resetBtn.addEventListener('click', function () {
    adForm.reset();
    window.pageState.reset();
    window.pageState.deactivate();
  });

})();
