'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  /**
  * @description
  *  Activate ad map
  *
  * @return {void}
  */
  var activateMap = function () {
    mapContainer.classList.remove('map--faded');

    var adverts = [];

    var onLoadAdvertsSuccess = function (data) {
      adverts = data;

      window.pin.render(adverts, 5);

      var pinsOnMap = mapContainer.querySelectorAll('.map__pin');

      for (var i = 0; i < pinsOnMap.length - 1; i++) {
        var currentPin = pinsOnMap[i + 1];
        var nodeCard = window.card.create(adverts[i]);

        window.pin.addClickLister(currentPin, nodeCard);
      }
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

    mapPinMain.style.top = window.pin.main.position.y + 'px';
    mapPinMain.style.left = window.pin.main.position.x + 'px';
  };

  window.map = {
    activate: activateMap,
    deactivate: deactivateMap,
    isActive: false,
  };
})();
