'use strict';

(function () {

  var mapPinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var renderPin = function (advertisment) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advertisment.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advertisment.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = advertisment.author.avatar;
    pin.querySelector('img').alt = advertisment.offer.title;

    return pin;
  };

  window.pin = {
    createPins: function (advertismentsList) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < advertismentsList.length; i++) {
        fragment.appendChild(renderPin(advertismentsList[i]));
      }

      mapPinsContainer.appendChild(fragment);
    }
  };

})();
