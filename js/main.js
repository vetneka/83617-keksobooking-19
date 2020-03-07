'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  window.addEventListener('load', function () {
    window.pin.main.position.x = mapPinMain.offsetLeft;
    window.pin.main.position.y = mapPinMain.offsetTop;

    window.form.deactivate();

    window.form.onChangeRoomSelect();
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (!window.map.isActive) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        window.map.activate();
        window.form.activate();
        window.map.isActive = true;
      });
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (!window.map.isActive) {
      window.util.isEnterEvent(evt, function () {
        window.map.activate();
        window.form.activate();
        window.map.isActive = true;
      });
    }
  });

  window.moveElement(mapPinMain);
})();
