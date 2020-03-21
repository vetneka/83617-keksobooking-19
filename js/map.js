'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  var mapFilters = mapContainer.querySelector('.map__filters');

  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');

  var adverts = [];

  /**
  * @description
  *  Activate ad map
  *
  * @return {void}
  */
  var activateMap = function () {
    mapContainer.classList.remove('map--faded');
    mapFilters.style.visibility = 'visible';

    var onLoadAdvertsSuccess = function (data) {
      adverts = data;

      window.pin.render(adverts);
    };

    var onLoadAdvertsError = function (message) {
      resetMapFilters();

      throw Error(message);
    };

    window.backend.loadData(onLoadAdvertsSuccess, onLoadAdvertsError);
  };

  /**
  * @description
  *  Dectivate ad map
  *
  * @return {void}
  */
  var deactivateMap = function () {
    mapContainer.classList.add('map--faded');

    window.pin.remove();
    window.card.remove();

    window.map.isActive = false;

    resetMapFilters();

    mapPinMain.style.top = window.pin.main.position.y + 'px';
    mapPinMain.style.left = window.pin.main.position.x + 'px';
  };

  var resetMapFilters = function () {
    mapFilters.reset();
    mapFilters.style.visibility = 'hidden';
  };

  var onChangeHousingType = function (currentElement) {
    if (housingType.value === 'any') {
      return currentElement;
    }

    return currentElement.offer.type === housingType.value;
  };

  var onChangeHousingPrice = function (currentElement) {
    var lowPrice = 10000;
    var highPrice = 50000;

    switch (housingPrice.value) {
      case 'low':
        return currentElement.offer.price < lowPrice;

      case 'middle':
        return currentElement.offer.price >= lowPrice && currentElement.offer.price <= highPrice;

      case 'high':
        return currentElement.offer.price > highPrice;

      default:
        return currentElement;
    }
  };

  var onChangeHousingRooms = function (currentElement) {
    var currentValue = +housingRooms.value;

    switch (currentValue) {
      case 1:
      case 2:
      case 3:
        return currentValue === currentElement.offer.rooms;

      default:
        return currentElement;
    }
  };

  var onChangeHousingGuests = function (currentElement) {
    var currentValue = +housingGuests.value;

    switch (currentValue) {
      case 0:
      case 1:
      case 2:
        return currentValue === currentElement.offer.guests;

      default:
        return currentElement;
    }
  };

  var onChangeHousingFeatures = function (currentElement) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (currentCheckedFeature) {
      return currentElement.offer.features.includes(currentCheckedFeature.value);
    });
  };

  var resultFilteredArray = [];

  var onChangeMapFilters = window.debounce(function () {
    resultFilteredArray = adverts.filter(function (element) {
      return onChangeHousingType(element) &&
             onChangeHousingPrice(element) &&
             onChangeHousingRooms(element) &&
             onChangeHousingGuests(element) &&
             onChangeHousingFeatures(element);
    });

    window.pin.render(resultFilteredArray);
  });

  mapFilters.addEventListener('change', onChangeMapFilters);

  window.moveElement(mapPinMain);

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: false,
  };
})();
