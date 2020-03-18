'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapFilterContainer = mapContainer.querySelector('.map__filters-container');

  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card');

  var createCardTitle = function (node, advertisement) {
    var popupTitle = node.querySelector('.popup__title');

    if (!advertisement.offer.title) {
      popupTitle.style.display = 'none';
    } else {
      popupTitle.textContent = advertisement.offer.title;
    }
  };

  var createCardAddress = function (node, advertisement) {
    var popupTextAddress = node.querySelector('.popup__text--address');

    if (!advertisement.offer.address) {
      popupTextAddress.style.display = 'none';
    } else {
      popupTextAddress.textContent = advertisement.offer.address;
    }
  };

  var createCardPrice = function (node, advertisement) {
    var popupTextPrice = node.querySelector('.popup__text--price');

    if (!advertisement.offer.price) {
      popupTextPrice.style.display = 'none';
    } else {
      popupTextPrice.textContent = advertisement.offer.price + '₽/ночь';
    }
  };

  var createCardRoomType = function (node, advertisement) {
    var popupType = node.querySelector('.popup__type');

    if (!advertisement.offer.type) {
      popupType.style.display = 'none';
    } else {
      switch (advertisement.offer.type) {
        case 'bungalo':
          popupType.textContent = 'Бунгало';
          break;

        case 'palace':
          popupType.textContent = 'Дворец';
          break;

        case 'house':
          popupType.textContent = 'Дом';
          break;

        default: popupType.textContent = 'Квартира';
          break;
      }
    }
  };

  var createCardCapacity = function (node, advertisement) {
    var popupTextCapacity = node.querySelector('.popup__text--capacity');

    if (!advertisement.offer.rooms || !advertisement.offer.guests) {
      popupTextCapacity.style.display = 'none';
    } else {
      popupTextCapacity.textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    }
  };

  var createCardCheckTime = function (node, advertisement) {
    var popupTextTime = node.querySelector('.popup__text--time');

    if (!advertisement.offer.checkin || !advertisement.offer.checkout) {
      popupTextTime.style.display = 'none';
    } else {
      popupTextTime.textContent = 'Заезд после ' + advertisement.offer.checkin + ' выезд до ' + advertisement.offer.checkout;
    }
  };

  var createCardFeatures = function (node, advertisement) {
    var featuresFragment = document.createDocumentFragment();

    var popupFeatures = node.querySelector('.popup__features');

    var featureWiFi = popupFeatures.querySelector('.popup__feature--wifi');
    var featureDishwasher = popupFeatures.querySelector('.popup__feature--dishwasher');
    var featureParking = popupFeatures.querySelector('.popup__feature--parking');
    var featureWasher = popupFeatures.querySelector('.popup__feature--washer');
    var featureElevator = popupFeatures.querySelector('.popup__feature--elevator');
    var featureConditioner = popupFeatures.querySelector('.popup__feature--conditioner');

    for (var i = popupFeatures.children.length - 1; i >= 0; i--) {
      var currentFeatureChild = popupFeatures.children[i];
      popupFeatures.removeChild(currentFeatureChild);
    }

    if (!advertisement.offer.features) {
      popupFeatures.style.display = 'none';
    } else {

      for (var j = 0; j < advertisement.offer.features.length; j++) {
        var currentFeature = advertisement.offer.features[j];

        switch (currentFeature) {
          case 'wifi':
            featureWiFi.textContent = currentFeature;
            featuresFragment.appendChild(featureWiFi);
            break;

          case 'dishwasher':
            featureDishwasher.textContent = 'dishwasher';
            featuresFragment.appendChild(featureDishwasher);
            break;

          case 'parking':
            featureParking.textContent = currentFeature;
            featuresFragment.appendChild(featureParking);
            break;

          case 'washer':
            featureWasher.textContent = currentFeature;
            featuresFragment.appendChild(featureWasher);
            break;

          case 'elevator':
            featureElevator.textContent = currentFeature;
            featuresFragment.appendChild(featureElevator);
            break;

          case 'conditioner':
            featureConditioner.textContent = currentFeature;
            featuresFragment.appendChild(featureConditioner);
            break;

          default:
            break;
        }
      }
    }

    popupFeatures.appendChild(featuresFragment);
  };

  var createCardDescription = function (node, advertisement) {
    var popupDescription = node.querySelector('.popup__description');

    if (!advertisement.offer.description) {
      popupDescription.style.display = 'none';
    } else {
      popupDescription.textContent = advertisement.offer.description;
    }
  };

  var createCardPhotos = function (node, advertisement) {
    var photoFragment = document.createDocumentFragment();

    var popupPhotos = node.querySelector('.popup__photos');
    var templatePopupPhoto = node.querySelector('.popup__photo');

    for (var m = popupPhotos.children.length - 1; m >= 0; m--) {
      var currentPhotoChild = popupPhotos.children[m];
      popupPhotos.removeChild(currentPhotoChild);
    }

    if (!advertisement.offer.photos) {
      popupPhotos.style.display = 'none';
    } else {
      for (var k = 0; k < advertisement.offer.photos.length; k++) {
        var photo = templatePopupPhoto.cloneNode();
        photo.setAttribute('src', advertisement.offer.photos[k]);

        photoFragment.appendChild(photo);
      }
    }

    popupPhotos.appendChild(photoFragment);
  };

  var createCardAvatar = function (node, advertisement) {
    var popupAvatar = node.querySelector('.popup__avatar');

    if (!advertisement.author.avatar) {
      popupAvatar.style.display = 'none';
    } else {
      popupAvatar.setAttribute('src', advertisement.author.avatar);
    }
  };

  /**
   * @description
   *  Create advertisement card
   *
   * @param {object} advertisement - object for creating card
   *
   * @return {object} - DOM-element for adding to page
   */
  var createAdCard = function (advertisement) {
    var cardNode = mapCard.cloneNode(true);

    createCardTitle(cardNode, advertisement);
    createCardAddress(cardNode, advertisement);
    createCardPrice(cardNode, advertisement);
    createCardRoomType(cardNode, advertisement);
    createCardCapacity(cardNode, advertisement);
    createCardCheckTime(cardNode, advertisement);
    createCardFeatures(cardNode, advertisement);
    createCardDescription(cardNode, advertisement);
    createCardPhotos(cardNode, advertisement);
    createCardAvatar(cardNode, advertisement);

    return cardNode;
  };

  /**
   * @description
   *  Remove advertisement card
   *
   * @return {void}
   */
  var removeCard = function () {
    for (var j = 0; j < mapFilterContainer.children.length; j++) {
      var currentChild = mapFilterContainer.children[j];

      if (currentChild.classList.contains('map__card')) {
        currentChild.remove();
      }
    }
  };

  window.card = {
    create: createAdCard,
    remove: removeCard,
  };
})();
