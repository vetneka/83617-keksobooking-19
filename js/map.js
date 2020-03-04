'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');

  var activateMap = function () {
    mapContainer.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    window.form.activate();

    var adverts = [];

    var onLoadAdvertsSuccess = function (data) {
      adverts = data;

      var advertsFragment = window.pin.create(adverts);
      mapPins.appendChild(advertsFragment);

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

  window.map = {
    activate: activateMap,
  };
})();
