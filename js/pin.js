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
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');

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

  var addClickPinListener = function (pin, card) {
    var onKeydownEscCard = function (evt) {
      window.util.isEscEvent(evt, function () {
        onCloseCard(card);
      });
    };

    var onCloseCard = function (currentOpenCard) {
      currentOpenCard.remove();
      document.removeEventListener('keydown', onKeydownEscCard);
      pin.classList.remove('map__pin--active');
    };

    pin.addEventListener('click', function () {
      var popupClose = card.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        onCloseCard(card);
      });

      document.addEventListener('keydown', onKeydownEscCard);

      window.card.remove();

      mapFilterContainer.appendChild(card);

      for (var i = 0; i < mapPinsContainer.children.length; i++) {
        var currentChild = mapPinsContainer.children[i];

        if (currentChild.classList.contains('map__pin--active')) {
          currentChild.classList.remove('map__pin--active');
        }
      }

      pin.classList.add('map__pin--active');
    });
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
      var elementMapPin = mapPin.cloneNode(true);
      var elementMapPinImg = elementMapPin.querySelector('img');
      var mapPinOffsetX = data[i].location.x - (MAP_PIN_WIDTH / 2);
      var mapPinOffsetY = data[i].location.y - MAP_PIN_HEIGHT;

      elementMapPin.style.cssText = 'left: ' + mapPinOffsetX + 'px; top: ' + mapPinOffsetY + 'px;';

      elementMapPinImg.setAttribute('src', data[i].author.avatar);
      elementMapPinImg.setAttribute('alt', data[i].offer.title);

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

  var renderPins = function (data, quantity) {
    var mapPinFragement = createMapPins(data, quantity);

    mapPinsContainer.append(mapPinFragement);
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
    create: createMapPins,
    remove: removeMapPins,
    render: renderPins,

    main: {
      size: mainPinSize,
      position: mainPinPosition,
    },

    addClickLister: addClickPinListener,
  };
})();
