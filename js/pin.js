'use strict';

(function () {
  var PINS_QUANTITY = 5;
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_POINTER_HEIGHT = 17;

  var pinTemplate = document.querySelector('#pin').content;
  var mapPin = pinTemplate.querySelector('.map__pin');

  var mapContainer = document.querySelector('.map');
  var mapPinMain = mapContainer.querySelector('.map__pin--main');

  var mapPinsContainer = mapContainer.querySelector('.map__pins');

  var mainPinPosition = {
    x: mapPinMain.offsetLeft,
    y: mapPinMain.offsetTop,
  };

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

  var removeMapPinActiveClass = function () {
    var mapPins = mapPinsContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapPins.forEach(function (pin) {
      if (pin.classList.contains('map__pin--active')) {
        pin.classList.remove('map__pin--active');
      }
    });
  };

  var createMapPin = function (data) {
    var elementMapPin = mapPin.cloneNode(true);
    var elementMapPinImg = elementMapPin.querySelector('img');
    var mapPinOffsetX = data.location.x - (MAP_PIN_WIDTH / 2);
    var mapPinOffsetY = data.location.y - MAP_PIN_HEIGHT;

    var onClickMapPin = function () {
      window.card.remove();
      window.card.render(data);

      removeMapPinActiveClass();

      elementMapPin.classList.add('map__pin--active');
    };

    elementMapPin.addEventListener('click', onClickMapPin);

    elementMapPin.style.cssText = 'left: ' + mapPinOffsetX + 'px; top: ' + mapPinOffsetY + 'px;';

    elementMapPinImg.setAttribute('src', data.author.avatar);
    elementMapPinImg.setAttribute('alt', data.offer.title);

    return elementMapPin;
  };

  /**
  * @description
  *  Create fragment containing HTML-markup for n-th map pins
  *
  * @param {array} data - array similar ads
  *
  * @return {object} - fragment containing map pins
  */
  var createMapPins = function (data) {
    var quantityPins = data.length > PINS_QUANTITY ? PINS_QUANTITY : data.length;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < quantityPins; i++) {
      var elementMapPin = createMapPin(data[i]);

      fragment.appendChild(elementMapPin);
    }

    return fragment;
  };

  /**
  * @description
  *  Remove map pins
  *
  * @return {void}
  */
  var removeMapPins = function () {
    var mapPinsContainerChildren = mapPinsContainer.children;

    for (var i = mapPinsContainerChildren.length - 1; i > 1; i--) {
      mapPinsContainerChildren[i].remove();
    }
  };

  var renderPins = function (data) {
    var mapPinFragment = createMapPins(data);

    mapPinsContainer.append(mapPinFragment);
  };

  var mainPinSize = {
    active: {
      width: MAP_PIN_MAIN_WIDTH,
      height: MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_POINTER_HEIGHT,
    },

    inactive: {
      width: MAP_PIN_MAIN_WIDTH,
      height: MAP_PIN_MAIN_HEIGHT,
    },
  };

  window.pin = {
    remove: removeMapPins,
    render: renderPins,
    removeActiveClass: removeMapPinActiveClass,

    main: {
      size: mainPinSize,
      position: mainPinPosition,
    },
  };
})();
