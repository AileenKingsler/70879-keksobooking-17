'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinActiveClass = 'map__pin--active';
  var mapPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (advertisment) {
    var pin = pinTemplate.cloneNode(true);

    pin.style.left = advertisment.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = advertisment.location.y - PIN_HEIGHT + 'px';
    pin.querySelector('img').src = advertisment.author.avatar;
    pin.querySelector('img').alt = advertisment.offer.title;

    return pin;
  };

  var setActiveClass = function (evt) {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (element) {
      element.classList.remove(pinActiveClass);
    });

    evt.currentTarget.classList.add(pinActiveClass);
  };

  window.pin = {
    create: function (advertismentsList) {
      var fragment = document.createDocumentFragment();

      advertismentsList.forEach(function (advertisment) {
        if (advertisment.offer !== undefined) {
          var pin = renderPin(advertisment);

          var onPinClick = function (evt) {
            if (!evt.currentTarget.classList.contains(pinActiveClass)) {
              setActiveClass(evt);

              window.card.delete();

              window.card.create(advertisment);
            }
          };

          fragment.appendChild(pin);

          pin.addEventListener('click', onPinClick);
        }
      });

      mapPins.appendChild(fragment);
    },
    delete: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

      pins.forEach(function (element) {
        element.parentNode.removeChild(element);
      });
    },
    deleteActiveClass: function () {
      var pin = document.querySelector('.' + pinActiveClass);

      if (pin) {
        pin.classList.remove(pinActiveClass);
      }
    }
  };

})();
