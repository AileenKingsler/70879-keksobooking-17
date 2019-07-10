'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var typesMap = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var deleteCardAndPinActiveClass = function () {
    window.card.delete();

    window.pin.deleteActiveClass();
  };

  var onCardEscPress = function (evt) {
    window.common.isEscEvent(evt, deleteCardAndPinActiveClass);
  };

  var getRoomsEnding = function (quantity) {
    var modulo100 = Math.abs(quantity) % 100;
    var modulo10 = modulo100 % 10;

    if (modulo100 > 10 && modulo100 < 20) {
      return 'комнат';
    }
    if (modulo10 > 1 && modulo10 < 5) {
      return 'комнаты';
    }
    if (modulo10 === 1) {
      return 'комната';
    }

    return 'комнат';
  };

  var getGuestsEnding = function (quantity) {
    if (quantity % 10 === 1) {
      return 'гостя';
    }

    return 'гостей';
  };

  var renderCard = function (advertisment) {
    var card = cardTemplate.cloneNode(true);

    card.querySelector('.popup__avatar').src = advertisment.author.avatar;
    card.querySelector('.popup__title').textContent = advertisment.offer.title;
    card.querySelector('.popup__text--address').textContent = advertisment.offer.address;
    card.querySelector('.popup__text--price').textContent = advertisment.offer.price + '₽/ночь';
    card.querySelector('.popup__type').textContent = typesMap[advertisment.offer.type];
    card.querySelector('.popup__text--capacity').textContent = advertisment.offer.rooms + ' ' + getRoomsEnding(advertisment.offer.rooms) + ' для ' + advertisment.offer.guests + ' ' + getGuestsEnding(advertisment.offer.guests);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisment.offer.checkin + ', выезд до ' + advertisment.offer.checkout;
    card.querySelector('.popup__description').textContent = advertisment.offer.description;

    if (advertisment.offer.features.length) {
      card.querySelectorAll('.popup__feature').forEach(function (element) {
        var isAvailable = false;

        advertisment.offer.features.forEach(function (feature) {
          if (element.classList.contains('popup__feature--' + feature)) {
            isAvailable = true;
          }
        });

        if (!isAvailable) {
          element.parentNode.removeChild(element);
        }
      });
    } else {
      card.querySelector('.popup__features').remove();
    }

    if (advertisment.offer.photos.length) {
      advertisment.offer.photos.forEach(function (photoSrc, index) {
        if (index === 0) {
          card.querySelector('.popup__photo').src = photoSrc;
        } else {
          var photoTemplate = card.querySelector('.popup__photo').cloneNode(true);
          photoTemplate.src = photoSrc;
          card.querySelector('.popup__photos').appendChild(photoTemplate);
        }
      });
    } else {
      card.querySelector('.popup__photos').remove();
    }

    return card;
  };

  window.card = {
    create: function (advertisment) {
      var card = renderCard(advertisment);
      var cardCloseBtn = card.querySelector('.popup__close');

      cardCloseBtn.addEventListener('click', deleteCardAndPinActiveClass);
      document.addEventListener('keydown', onCardEscPress);

      map.insertBefore(card, mapFiltersContainer);
    },
    delete: function () {
      var card = document.querySelector('.map__card');
      if (card) {
        card.parentNode.removeChild(card);
      }

      document.removeEventListener('keydown', onCardEscPress);
    }
  };

})();
