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
      option.disabled = roomsMap[roomNumberField.value].indexOf(option.value) === -1;

      if (option.disabled && option.selected) {
        capacityField.setCustomValidity('Please, choose appropriate capacity');
      }
    });
  };

  var onCapacityFieldChange = function () {
    capacityOptions.forEach(function (option) {
      if (!(option.disabled && option.selected)) {
        capacityField.setCustomValidity('');
      }
    });
  };

  var onResetBtnClick = function () {
    adForm.reset();
    onTypeFieldChange();
    onRoomsFieldChange();
    window.files.resetAvatar();
    window.files.resetPhoto();
    window.pageState.reset();
    window.pageState.deactivate();
  };

  var onSuccess = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');

    var onSuccessWindowClick = function () {
      success.parentNode.removeChild(success);
      document.removeEventListener('keydown', onSuccessWindowEscPress);
    };

    var onSuccessWindowEscPress = function (evt) {
      window.common.isEscEvent(evt, onSuccessWindowClick);
    };

    main.appendChild(success);

    success.addEventListener('click', onSuccessWindowClick);
    document.addEventListener('keydown', onSuccessWindowEscPress);

    onResetBtnClick();
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
    window.backend.save(new FormData(adForm), onSuccess, window.backend.showError);
  });

  resetBtn.addEventListener('click', onResetBtnClick);

})();
