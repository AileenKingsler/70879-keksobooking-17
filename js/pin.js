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
    create: function (advertismentsList) {
      var fragment = document.createDocumentFragment();

      advertismentsList.forEach(function (advertisment) {
        if (advertisment.offer !== undefined) {
          fragment.appendChild(renderPin(advertisment));
        }
      });

      mapPinsContainer.appendChild(fragment);
    },
    delete: function (elements) {
      elements.forEach(function (element) {
        element.parentNode.removeChild(element);
      });
    }
  };

})();
