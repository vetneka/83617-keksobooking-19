'use strict';

var mapContainer = document.querySelector('.map');
var mapPinMain = mapContainer.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');
var adFormInputAddress = adForm.querySelector('#address');

var isMapActive = false;

window.addEventListener('load', function () {
  window.form.deactivate();

  adFormInputAddress.setAttribute('value', window.pin.coordinateMainPin());

  window.form.onChangeRoomSelect();
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (!isMapActive) {
    window.util.isMouseLeftButtonEvent(evt, function () {
      window.map.activate();
      isMapActive = true;
    });
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  window.util.isEnterEvent(evt, function () {
    window.map.activate();
  });
});
