'use strict';

(function () {

  var PINS_MAX_QUANTITY = 5;

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = mapFilters.querySelectorAll('fieldset, select');

  var typeFilter = mapFilters.querySelector('#housing-type');
  var priceFilter = mapFilters.querySelector('#housing-price');
  var roomsFilter = mapFilters.querySelector('#housing-rooms');
  var guestsFilter = mapFilters.querySelector('#housing-guests');

  var wifiFilter = mapFilters.querySelector('#filter-wifi');
  var dishwasherFilter = mapFilters.querySelector('#filter-dishwasher');
  var parkingFilter = mapFilters.querySelector('#filter-parking');
  var washerFilter = mapFilters.querySelector('#filter-washer');
  var elevatorFilter = mapFilters.querySelector('#filter-elevator');
  var conditionerFilter = mapFilters.querySelector('#filter-conditioner');

  var data = [];

  var pricesMap = {
    'low': [0, 10000],
    'middle': [10000, 50000],
    'high': [50000, Infinity],
  };

  var getDisabledElements = function (element) {
    return element.disabled;
  };

  var selectByType = function (advertisement) {
    return typeFilter.value === 'any' || advertisement.offer.type === typeFilter.value;
  };

  var selectByPrice = function (advertisement) {
    return priceFilter.value === 'any' || advertisement.offer.price >= pricesMap[priceFilter.value][0] && advertisement.offer.price <= pricesMap[priceFilter.value][1];
  };

  var selectByRoomsQuantity = function (advertisement) {
    return roomsFilter.value === 'any' || advertisement.offer.rooms === parseInt(roomsFilter.value, 10);
  };

  var selectByGuestsQuantity = function (advertisement) {
    return guestsFilter.value === 'any' || advertisement.offer.guests === parseInt(guestsFilter.value, 10);
  };

  var selectByFeature = function (advertisement, element) {
    return !element.checked || advertisement.offer.features.indexOf(element.value) + 1;
  };

  var selectAdvertisments = function (item) {
    return selectByType(item)
    && selectByPrice(item)
    && selectByRoomsQuantity(item)
    && selectByGuestsQuantity(item)
    && selectByFeature(item, wifiFilter)
    && selectByFeature(item, dishwasherFilter)
    && selectByFeature(item, parkingFilter)
    && selectByFeature(item, washerFilter)
    && selectByFeature(item, elevatorFilter)
    && selectByFeature(item, conditionerFilter);
  };

  var showAdvertisments = function () {
    window.advertisments.show(data);
  };

  var onFilterChange = function () {
    window.card.delete();

    window.pin.deleteActiveClass();

    window.debounce(showAdvertisments);
  };

  typeFilter.addEventListener('change', onFilterChange);
  priceFilter.addEventListener('change', onFilterChange);
  roomsFilter.addEventListener('change', onFilterChange);
  guestsFilter.addEventListener('change', onFilterChange);
  wifiFilter.addEventListener('change', onFilterChange);
  dishwasherFilter.addEventListener('change', onFilterChange);
  parkingFilter.addEventListener('change', onFilterChange);
  washerFilter.addEventListener('change', onFilterChange);
  elevatorFilter.addEventListener('change', onFilterChange);
  conditionerFilter.addEventListener('change', onFilterChange);

  window.advertisments = {
    show: function (advertisements) {
      data = advertisements;

      window.pin.delete();

      window.pin.create(advertisements
        .filter(selectAdvertisments)
        .slice(0, PINS_MAX_QUANTITY));

      if (Array.from(mapFiltersElements).every(getDisabledElements)) {
        window.common.disableElement(mapFiltersElements, false);
      }
    }
  };

})();
