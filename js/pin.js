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

  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');

  var addClickPinListener = function (pin, card) {
    var onKeydownEscCard = function (evt) {
      window.util.isEscEvent(evt, function () {
        closeCard(card);
      });
    };

    var closeCard = function (currentOpenCard) {
      currentOpenCard.remove();
      document.removeEventListener('keydown', onKeydownEscCard);
    };

    pin.addEventListener('click', function () {
      var popupClose = card.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        card.remove();
      });

      document.addEventListener('keydown', onKeydownEscCard);

      if (mapFilterContainer.children.length > 1) {
        mapFilterContainer.appendChild(card);
        var previousCard = card.previousSibling;

        if (previousCard.matches('.map__card')) {
          previousCard.remove();
        }
      } else {
        mapFilterContainer.appendChild(card);
      }
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

  var fragmentMapPins = createMapPins(window.data.similarAds);

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

    fragment: fragmentMapPins,
    mainSize: mainPinSize,

    addClickLister: addClickPinListener,
  };
})();
