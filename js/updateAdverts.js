'use strict';

(function () {
  var updateAdverts = function (adverts) {
    var mapContainer = document.querySelector('.map');

    window.pin.remove();
    window.card.remove();

    window.pin.render(adverts);

    var pinsOnMap = mapContainer.querySelectorAll('.map__pin');

    for (var i = 0; i < pinsOnMap.length - 1; i++) {
      var currentPin = pinsOnMap[i + 1];
      var nodeCard = window.card.create(adverts[i]);

      window.pin.addClickLister(currentPin, nodeCard);
    }
  };

  window.updateAdverts = updateAdverts;
})();
