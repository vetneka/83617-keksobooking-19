'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content;
  var mapCard = cardTemplate.querySelector('.map__card');

  /**
   * @description
   *  Create advertisement card
   *
   * @param {object} object - array of objects (advertisements) for creating card
   *
   * @return {object} - DOM-element for adding to page
   */
  var createAdCard = function (object) {
    var cardNode = mapCard.cloneNode(true);

    // Create card title
    var popupTitle = cardNode.querySelector('.popup__title');

    if (object.offer.title === '') {
      popupTitle.style.display = 'none';
    } else {
      popupTitle.textContent = object.offer.title;
    }

    // Create card address
    var popupTextAddress = cardNode.querySelector('.popup__text--address');

    if (object.offer.address === '') {
      popupTextAddress.style.display = 'none';
    } else {
      popupTextAddress.textContent = object.offer.address;
    }

    // Create card price
    var popupTextPrice = cardNode.querySelector('.popup__text--price');

    if (object.offer.price === '') {
      popupTextPrice.style.display = 'none';
    } else {
      popupTextPrice.textContent = object.offer.price + '₽/ночь';
    }

    // Create card room type
    var popupType = cardNode.querySelector('.popup__type');

    if (object.offer.type === '') {
      popupType.style.display = 'none';
    } else {
      switch (object.offer.type) {
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

    // Create card capacity
    var popupTextCapacity = cardNode.querySelector('.popup__text--capacity');

    if (object.offer.rooms === '' || object.offer.guests === '') {
      popupTextCapacity.style.display = 'none';
    } else {
      popupTextCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';
    }

    // Create card checkin/checkout time
    var popupTextTime = cardNode.querySelector('.popup__text--time');

    if (object.offer.checkin === '' || object.offer.checkout === '') {
      popupTextTime.style.display = 'none';
    } else {
      popupTextTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
    }

    // Create card features
    var featuresFragment = document.createDocumentFragment();

    var popupFeatures = cardNode.querySelector('.popup__features');

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

    var featuresLength = object.offer.features.length;

    if (featuresLength === 0) {
      popupFeatures.style.display = 'none';
    } else {

      for (var j = 0; j < featuresLength; j++) {
        var currentFeature = object.offer.features[j];

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

    // Create card description
    var popupDescription = cardNode.querySelector('.popup__description');

    if (object.offer.description === '') {
      popupDescription.style.display = 'none';
    } else {
      popupDescription.textContent = object.offer.description;
    }

    // Create card photos
    var photoFragment = document.createDocumentFragment();

    var popupPhotos = cardNode.querySelector('.popup__photos');
    var templatePopupPhoto = cardNode.querySelector('.popup__photo');

    for (var m = popupPhotos.children.length - 1; m >= 0; m--) {
      var currentPhotoChild = popupPhotos.children[m];
      popupPhotos.removeChild(currentPhotoChild);
    }

    var popupPhotosLength = object.offer.photos.length;

    if (popupPhotosLength === 0) {
      popupPhotos.style.display = 'none';
    } else {
      for (var k = 0; k < popupPhotosLength; k++) {
        var photo = templatePopupPhoto.cloneNode();
        photo.setAttribute('src', object.offer.photos[k]);

        photoFragment.appendChild(photo);
      }
    }

    popupPhotos.appendChild(photoFragment);

    // Create card avatar
    var popupAvatar = cardNode.querySelector('.popup__avatar');

    if (object.author.avatar === '') {
      popupAvatar.style.display = 'none';
    } else {
      popupAvatar.setAttribute('src', object.author.avatar);
    }

    return cardNode;
  };

  window.card = {
    create: createAdCard,
  };
})();
