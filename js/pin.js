'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 65;
  var MAP_PIN_MAIN_POINTER_HEIGHT = 17;

  var pinTemplate = document.querySelector('#pin').content;
  var mapPin = pinTemplate.querySelector('.map__pin');

  var mapContainer = document.querySelector('.map');

  var mapPinsContainer = mapContainer.querySelector('.map__pins');
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');

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
  * @param {array} array - array similar ads
  * @return {object} - fragment containing map pins
  */
  var createMapPins = function (array) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < array.length; i++) {
      var elementMapPin = mapPin.cloneNode(true);
      var elementMapPinImg = elementMapPin.querySelector('img');
      var mapPinOffsetX = array[i].location.x - (MAP_PIN_WIDTH / 2);
      var mapPinOffsetY = array[i].location.y - MAP_PIN_HEIGHT;

      elementMapPin.style.cssText = 'left: ' + mapPinOffsetX + 'px; top: ' + mapPinOffsetY + 'px;';

      elementMapPinImg.setAttribute('src', array[i].author.avatar);
      elementMapPinImg.setAttribute('alt', array[i].offer.title);

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

  var mainPinPosition = {
    x: 0,
    y: 0,
  };

  window.pin = {
    create: createMapPins,
    remove: removeMapPins,

    main: {
      size: mainPinSize,
      position: mainPinPosition,
    },

    addClickLister: addClickPinListener,
  };
})();
