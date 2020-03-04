'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');

  /**
  * @description
  *  Activate ad map
  *
  * @return {void}
  */
  var activateMap = function () {
    mapContainer.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    mapPins.appendChild(window.pin.fragment);

    window.form.activate();

    var pinsOnMap = mapContainer.querySelectorAll('.map__pin');

    for (var i = 0; i < pinsOnMap.length - 1; i++) {
      var currentPin = pinsOnMap[i + 1];
      var nodeCard = window.card.create(window.data.similarAds[i]);

      window.pin.addClickLister(currentPin, nodeCard);
    }
  };

  window.map = {
    activate: activateMap,
  };
})();
