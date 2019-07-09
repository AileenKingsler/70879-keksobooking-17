'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var mapPinsContainer = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinActiveClass = 'map__pin--active';

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
          var pin = renderPin(advertisment);
          fragment.appendChild(pin);

          var onPinClick = function (evt) {
            var card = document.querySelector('.map__card');
            window.card.delete(card);

            var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
            pins.forEach(function (it) {
              it.classList.remove(pinActiveClass);
            });
            evt.currentTarget.classList.add(pinActiveClass);

            window.card.create(advertisment);
          };

          pin.addEventListener('click', onPinClick);
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
