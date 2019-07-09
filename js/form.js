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

  var resetPage = function () {
    adForm.reset();
    window.pageState.reset();
    window.pageState.deactivate();
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');

    var closeSuccess = function () {
      success.parentNode.removeChild(success);
      document.removeEventListener('keydown', onSuccessEscPress);
    };

    var onSuccessEscPress = function (evt) {
      window.common.isEscEvent(evt, closeSuccess);
    };

    main.appendChild(success);

    success.addEventListener('click', closeSuccess);

    document.addEventListener('keydown', onSuccessEscPress);

    resetPage();
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, window.backend.error);
  });

  resetBtn.addEventListener('click', resetPage);

})();
