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
    if (typeFilter.value === 'any') {
      return true;
    }
    return advertisement.offer.type === typeFilter.value;
  };

  var selectByPrice = function (advertisement) {
    if (priceFilter.value === 'any') {
      return true;
    }
    return advertisement.offer.price >= pricesMap[priceFilter.value][0] && advertisement.offer.price <= pricesMap[priceFilter.value][1];
  };

  var selectByRoomsQuantity = function (advertisement) {
    if (roomsFilter.value === 'any') {
      return true;
    }
    return advertisement.offer.rooms === parseInt(roomsFilter.value, 10);
  };

  var selectByGuestsQuantity = function (advertisement) {
    if (guestsFilter.value === 'any') {
      return true;
    }
    return advertisement.offer.guests === parseInt(guestsFilter.value, 10);
  };

  var selectByFeature = function (advertisement, element, feature) {
    if (!element.checked) {
      return true;
    }
    return advertisement.offer.features.indexOf(feature) + 1;
  };

  var selectByWifi = function (advertisement) {
    return selectByFeature(advertisement, wifiFilter, 'wifi');
  };

  var selectByDishwasher = function (advertisement) {
    return selectByFeature(advertisement, dishwasherFilter, 'dishwasher');
  };

  var selectByParking = function (advertisement) {
    return selectByFeature(advertisement, parkingFilter, 'parking');
  };

  var selectByWasher = function (advertisement) {
    return selectByFeature(advertisement, washerFilter, 'washer');
  };

  var selectByElevator = function (advertisement) {
    return selectByFeature(advertisement, elevatorFilter, 'elevator');
  };

  var selectByConditioner = function (advertisement) {
    return selectByFeature(advertisement, conditionerFilter, 'conditioner');
  };

  var showAdvertisments = function () {
    window.advertisments.show(data);
  };

  var onFilterChange = function () {
    window.card.delete();

    window.pin.deleteActiveClass();

    window.debounce(showAdvertisments);
  };

  var selectAdvertisments = function (item) {
    return selectByType(item) && selectByPrice(item) && selectByRoomsQuantity(item) && selectByGuestsQuantity(item) && selectByWifi(item) && selectByDishwasher(item) && selectByParking(item) && selectByWasher(item) && selectByElevator(item) && selectByConditioner(item);
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
