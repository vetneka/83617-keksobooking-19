'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  var mapFilters = mapContainer.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var adverts = [];

  /**
  * @description
  *  Activate ad map
  *
  * @return {void}
  */
  var activateMap = function () {
    mapContainer.classList.remove('map--faded');

    var onLoadAdvertsSuccess = function (data) {
      adverts = data;

      window.updateAdverts(adverts);

      /* window.pin.render(adverts);

      var pinsOnMap = mapContainer.querySelectorAll('.map__pin');

      for (var i = 0; i < pinsOnMap.length - 1; i++) {
        var currentPin = pinsOnMap[i + 1];
        var nodeCard = window.card.create(adverts[i]);

        window.pin.addClickLister(currentPin, nodeCard);
      } */
    };

    var onLoadAdvertsError = function (message) {
      throw Error(message);
    };

    window.backend.load(onLoadAdvertsSuccess, onLoadAdvertsError);
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

    mapFilters.reset();

    mapPinMain.style.top = window.pin.main.position.y + 'px';
    mapPinMain.style.left = window.pin.main.position.x + 'px';
  };

  housingType.addEventListener('change', function () {
    var currentValue = housingType.value;

    var housingTypeFiltered = adverts.filter(function (currentElement) {
      return currentElement.offer.type === currentValue;
    });

    if (currentValue === 'any') {
      window.updateAdverts(adverts);
    } else {
      window.updateAdverts(housingTypeFiltered);
    }
  });

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: false,
  };
})();
