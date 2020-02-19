'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65;
var MAP_PIN_MAIN_POINTER_HEIGHT = 20;

var KEY_ESCAPE = 'Escape';
var KEY_ENTER = 'Enter';
var KEY_LEFT_MOUSE_BUTTON = 0;

var MIN_INPUT_TITLE_LENGTH = 30;

var offerTitles = [
  'First Cabin Kyobashi ',
  'Residential stage Higashi Shinjuku 1204',
  'Hotel Resol Ueno',
  'Smart Stay SHIZUKU Ueno Ekimae',
  'Tokyo Joystay Inn',
  'Shinagawa Prince Hotel East Tower',
  'Capsule Hotel Transit Shinjuku',
  'do-c Ebisu',
];

var offerRoomTypes = [
  'palace',
  'flat',
  'house',
  'bungalo',
];

var offercheckinTimes = [
  '12:00',
  '13:00',
  '14:00',
];

var offercheckoutTimes = [
  '12:00',
  '13:00',
  '14:00',
];

var offerFeatures = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

var offerDescriptions = [
  'Situated within 300 m of Edo Taito Traditional Crafts Center and 300 m of Asakusa ROX Shopping Center, nine hours Asakusa features rooms with air conditioning and a shared bathroom in Tokyo.',
  'Nestled in the middle of the Kabukicho area in Shinjuku, Booth Netcafe & Capsule offers accommodation in Tokyo. The property is situated a 5-minute walk from JR Shinjuku Station.',
  'Located a 8-minute walk from JR Shinbashi Station, a 6-minute walk from Shinbashi Station on the Ginza Line, Tokyo Ginza Bay Hotel offers capsule rooms with free WiFi access.',
  'Only a 2-minute walk from JR Shin Okubo Train Station, Hanabi Hotel offers Japanese-style accommodations with a private kitchen.',
  'Shin-Okubo City Hotel is a about 20 minutes by train from the Meiji Jinja Shrine and Yoyogi Park. It just a few steps from shops and restaurants.',
  'Capsule Hotel Hatagoya (Male Only) offers capsule rooms for male guests in Tokyo.',
];

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

var map = document.querySelector('.map');

var mapFilterContainer = map.querySelector('.map__filters-container');

var mapPins = document.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');

var adForm = document.querySelector('.ad-form');

var pinTemplate = document.querySelector('#pin').content;
var mapPin = pinTemplate.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content;
var mapCard = cardTemplate.querySelector('.map__card');

/**
 * @description
 *  Getting random number in range from begin to end
 *
 * @param {number} [begin=0] - min number in selected range
 * @param {number} [end=10] - max number in selected range
 *
 * @return {number} random number
 */
var getRandomNumber = function (begin, end) {
  var startNumber = begin || 0;
  var endNumber = end || 10;

  var result;
  var counter = 1;
  var digit = 10;

  for (var i = 10; i <= endNumber; i *= 10) {
    counter++;
  }

  digit = Math.pow(digit, counter);

  result = Math.round(Math.random() * digit);

  while (result < startNumber || result > endNumber) {
    result = Math.round(Math.random() * digit);
  }

  return result;
};

/**
 * @description
 *  Get array random length
 *
 * @param {array} array - initial array
 * @return {array} - array random length
 */
var getArrayRandomLength = function (array) {
  var randomOfferFeatures = [];

  for (var i = 0; i < getRandomNumber(1, array.length); i++) {
    var currentFeature = array[getRandomNumber(0, array.length - 1)];

    var counter = 0; // repeat counter

    for (var j = 0; j <= randomOfferFeatures.length; j++) {
      if (currentFeature === randomOfferFeatures[j]) {
        counter++;
      }
    }

    if (counter === 0) {
      randomOfferFeatures[i] = currentFeature;
    } else {
      i = i - 1;
    }
  }

  return randomOfferFeatures;
};

/**
 * @description
 *  Get a random value from an array
 *
 * @param {array} array - an array from which to get a random value
 * @return {any}
 */
var getRandomArrayValue = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

/**
 * @description
 *  Create similar ads
 *
 * @param {number} number - number similar ads
 * @return {array} - array similar ads
 */
var createSimilarAds = function (number) {
  var numberSimilarAds = number || 8;

  var similarAds = [];

  for (var i = 0; i < numberSimilarAds; i++) {
    var ad = {};
    ad.author = {};
    ad.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    ad.location = {};
    ad.location.x = getRandomNumber(0, 1200);
    ad.location.y = getRandomNumber(130, 630);

    ad.offer = {};
    ad.offer.title = getRandomArrayValue(offerTitles);
    ad.offer.address = ad.location.x + ', ' + ad.location.y;
    ad.offer.price = getRandomNumber(10000, 80000);
    ad.offer.type = getRandomArrayValue(offerRoomTypes);
    ad.offer.rooms = getRandomNumber(1, 10);
    ad.offer.guests = getRandomNumber(1, 10);
    ad.offer.checkin = getRandomArrayValue(offercheckinTimes);
    ad.offer.checkout = getRandomArrayValue(offercheckoutTimes);
    ad.offer.features = getArrayRandomLength(offerFeatures);
    ad.offer.description = getRandomArrayValue(offerDescriptions);
    ad.offer.photos = getArrayRandomLength(offerPhotos);

    similarAds[i] = ad;
  }

  return similarAds;
};

/**
 * @description
 *  Create advertisement card
 *
 * @param {array} array - array of objects (advertisements) for creating card
 *
 * @return {object} - DOM-element for adding to page
 */
var createAdCard = function (object) {
  var cardNode = mapCard.cloneNode(true);

  // Create card title
  var popupTitle = cardNode.querySelector('.popup__title');
  popupTitle.textContent = object.offer.title;

  // Create card address
  var popupTextAddress = cardNode.querySelector('.popup__text--address');
  popupTextAddress.textContent = object.offer.address;

  // Create card price
  var popupTextPrice = cardNode.querySelector('.popup__text--price');
  popupTextPrice.textContent = object.offer.price + '₽/ночь';

  // Create card room type
  var popupType = cardNode.querySelector('.popup__type');

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

  // Create card capacity
  var popupTextCapacity = cardNode.querySelector('.popup__text--capacity');
  popupTextCapacity.textContent = object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';

  // Create card checkin/checkout time
  var popupTextTime = cardNode.querySelector('.popup__text--time');
  popupTextTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;

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
  popupDescription.textContent = object.offer.description;

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
  popupAvatar.setAttribute('src', object.author.avatar);

  return cardNode;
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

var arraySimilarAds = createSimilarAds();

/* var addClickPinListener = function (array) {
  mapPins.addEventListener('click', function (evt) {
    if (evt.target &&
        (evt.target.matches('.map__pin') || evt.target.matches('.map__pin img')) &&
        !(evt.target.matches('.map__pin--main') || evt.target.matches('.map__pin--main img'))) {

      var pinStyleLeft;
      var pinStyleTop;

      if (evt.target.tagName === 'img'.toUpperCase()) {
        pinStyleLeft = evt.target.parentNode.style.left;
        pinStyleTop = evt.target.parentNode.style.top;
      } else {
        pinStyleLeft = evt.target.style.left;
        pinStyleTop = evt.target.style.top;
      }

      var pinLocationX = +pinStyleLeft.slice(0, pinStyleLeft.length - 2) + MAP_PIN_WIDTH / 2;
      var pinLocationY = +pinStyleTop.slice(0, pinStyleTop.length - 2) + MAP_PIN_HEIGHT;

      for (var i = 0; i < array.length; i++) {
        var object = array[i];

        if (pinLocationX === object.location.x && pinLocationY === object.location.y) {
          var cardNode = createAdCard(object);

          if (mapFilterContainer.children.length > 1) {
            mapFilterContainer.appendChild(cardNode);
            var previousCard = cardNode.previousSibling;

            if (previousCard.matches('.map__card')) {
              previousCard.remove();
            }
          } else {
            mapFilterContainer.appendChild(cardNode);
          }
        }
      }

      var popupClose = cardNode.querySelector('.popup__close');

      popupClose.addEventListener('click', function () {
        cardNode.remove();
      });

      var onKeydownEscCard = function (keyEvt) {
        if (keyEvt.key === KEY_ESCAPE) {
          closeCard(cardNode);
        }
      };

      var closeCard = function (currentOpenCard) {
        currentOpenCard.remove();
        document.removeEventListener('keydown', onKeydownEscCard);
      };

      document.addEventListener('keydown', onKeydownEscCard);
    }
  });
}; */

var addClickPinListener = function (pin, card) {
  var onKeydownEscCard = function (evt) {
    if (evt.key === KEY_ESCAPE) {
      closeCard(card);
    }
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

var fragmentMapPins = createMapPins(arraySimilarAds);

/**
 * @description
 *  Deactivate all form on page
 *
 * @return {void}
 */
var deactivateForms = function () {
  var pageForms = document.forms;

  for (var i = 0; i < pageForms.length; i++) {
    var currentForm = pageForms[i].children;

    for (var j = 0; j < currentForm.length; j++) {
      var currentFormChildren = currentForm[j];
      currentFormChildren.setAttribute('disabled', '');
    }
  }
};

/**
 * @description
 *  Activate all form on page
 *
 * @return {void}
 */
var activateForms = function () {
  var pageForms = document.forms;

  for (var i = 0; i < pageForms.length; i++) {
    var currentForm = pageForms[i].children;

    for (var j = 0; j < currentForm.length; j++) {
      var currentFormChildren = currentForm[j];
      currentFormChildren.removeAttribute('disabled', '');
    }
  }
};

/**
 * @description
 *  Activate ad map
 *
 * @return {void}
 */
var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  mapPins.appendChild(fragmentMapPins);

  activateForms();
  adFormInputAddress.setAttribute('value', getCoordinateMapPinMain(true));

  /* addClickPinListener(arraySimilarAds); */

  var pinsOnMap = map.querySelectorAll('.map__pin');

  for (var i = 0; i < pinsOnMap.length - 1; i++) {
    var currentPin = pinsOnMap[i + 1];
    var nodeCard = createAdCard(arraySimilarAds[i]);

    addClickPinListener(currentPin, nodeCard);
  }
};

var adFormInputAddress = adForm.querySelector('#address');

/**
 * @description
 *  Get coordinates map__pin--main in active/inactive state
 *
 * @param {boolean} [state=false] - state map pin: active (true), inactive (false)
 * @return {string} - x, y coordinate
 */
var getCoordinateMapPinMain = function (state) {
  var active = state || false;

  var currentMapPinMain = mapPinMain.getBoundingClientRect();

  var currentMapPinMainX;
  var currentMapPinMainY;
  var result;

  if (active) {
    var currentMapPinMainHeight = MAP_PIN_MAIN_HEIGHT + MAP_PIN_MAIN_POINTER_HEIGHT;

    currentMapPinMainX = currentMapPinMain.left + (MAP_PIN_MAIN_WIDTH / 2);
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + currentMapPinMainHeight;
  } else {
    currentMapPinMainX = currentMapPinMain.left + (MAP_PIN_MAIN_WIDTH / 2);
    currentMapPinMainY = (currentMapPinMain.top + window.scrollY) + (MAP_PIN_MAIN_HEIGHT / 2);
  }

  result = currentMapPinMainX + ', ' + currentMapPinMainY;

  return result;
};

var inputTitle = adForm.querySelector('#title');

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var capacityOptions = capacity.options;

var selectRoomType = adForm.querySelector('#type');
var inputRoomPrice = adForm.querySelector('#price');

var selectTimeIn = adForm.querySelector('#timein');
var selectTimeOut = adForm.querySelector('#timeout');

var inputFileAvatar = adForm.querySelector('#avatar');
var inputFileImages = adForm.querySelector('#images');

inputTitle.addEventListener('invalid', function (evt) {
  inputTitle.classList.add('invalid');

  if (inputTitle.validity.valueMissing) {
    inputTitle.setCustomValidity('Это обязательное поле');
  } else if (inputTitle.validity.tooShort) {
    inputTitle.setCustomValidity('Длина заголовка должна быть больше ' + MIN_INPUT_TITLE_LENGTH + ' символов, а сейчас ' + evt.target.selectionStart + '/' + MIN_INPUT_TITLE_LENGTH);
  } else {
    inputTitle.setCustomValidity('');
    inputTitle.classList.remove('invalid');
  }
});

inputTitle.addEventListener('input', function () {
  if (inputTitle.checkValidity()) {
    inputTitle.classList.remove('invalid');
  }
});

inputRoomPrice.addEventListener('invalid', function () {
  inputRoomPrice.classList.add('invalid');

  if (inputRoomPrice.validity.valueMissing) {
    inputRoomPrice.setCustomValidity('Это обязательное поле');
  } else if (inputRoomPrice.validity.rangeUnderflow) {
    inputRoomPrice.setCustomValidity('Значение должно быть больше ' + inputRoomPrice.min);
  } else if (inputRoomPrice.validity.rangeOverflow) {
    inputRoomPrice.setCustomValidity('Значение должно быть меньше ' + inputRoomPrice.max);
  } else {
    inputRoomPrice.setCustomValidity('');
    inputRoomPrice.classList.remove('invalid');
  }
});

inputRoomPrice.addEventListener('input', function () {
  if (inputRoomPrice.checkValidity()) {
    inputRoomPrice.classList.remove('invalid');
  }
});

selectRoomType.addEventListener('change', function (evt) {
  var selectedRoomType = evt.target.value;

  switch (selectedRoomType) {
    case 'house':
      inputRoomPrice.setAttribute('min', '5000');
      inputRoomPrice.setAttribute('placeholder', '5000');
      break;

    case 'palace':
      inputRoomPrice.setAttribute('min', '10000');
      inputRoomPrice.setAttribute('placeholder', '10000');
      break;

    case 'flat':
      inputRoomPrice.setAttribute('min', '1000');
      inputRoomPrice.setAttribute('placeholder', '1000');
      break;

    default:
      inputRoomPrice.setAttribute('min', '0');
      inputRoomPrice.setAttribute('placeholder', '0');
      break;
  }
});

selectTimeIn.addEventListener('change', function (evt) {
  var selectedTimeIn = evt.target.value;

  selectTimeOut.value = selectedTimeIn;
});

selectTimeOut.addEventListener('change', function (evt) {
  var selectedTimeOut = evt.target.value;

  selectTimeIn.value = selectedTimeOut;
});

var adFormHeaderUpload = adForm.querySelector('.ad-form-header__upload');
var adFormPhotoContainer = adForm.querySelector('.ad-form__photo-container');

var isValidInputFile = function (input) {
  var validImageType = input.accept;
  var validImageTypes = validImageType.split(', ');

  var selectedIFiles = input.files;

  if (selectedIFiles.length > 0) {

    for (var i = 0; i < selectedIFiles.length; i++) {
      var currentImageType = selectedIFiles[i].type;

      if (!validImageTypes.includes(currentImageType)) {
        return true;
      }
    }
  }

  return false;
};

var errorInputFileMessage = document.createElement('p');
errorInputFileMessage.style.color = 'rgb(255, 0, 0)';
errorInputFileMessage.textContent = 'Можно использовать изображения только в форматах jpg, png.';

inputFileAvatar.addEventListener('change', function () {
  if (isValidInputFile(inputFileAvatar)) {
    adFormHeaderUpload.appendChild(errorInputFileMessage);
  } else {
    if (adFormHeaderUpload.contains(errorInputFileMessage)) {
      adFormHeaderUpload.removeChild(errorInputFileMessage);
    }
  }
});

inputFileImages.addEventListener('change', function () {
  if (isValidInputFile(inputFileImages)) {
    adFormPhotoContainer.appendChild(errorInputFileMessage);
  } else {
    if (adFormPhotoContainer.contains(errorInputFileMessage)) {
      adFormPhotoContainer.removeChild(errorInputFileMessage);
    }
  }
});

adForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
});

/**
 * @description
 *  Setting a match between fields: roomNumber & capacity
 *
 * @return {void}
 */
var onChangeRoomSelect = function () {
  for (var i = 0; i < capacityOptions.length; i++) {
    var currentCapatityOption = capacityOptions[i];
    if (currentCapatityOption.selected === false) {
      currentCapatityOption.setAttribute('disabled', '');
    }
  }

  roomNumber.addEventListener('change', function (evt) {
    for (var j = 0; j < capacityOptions.length; j++) {
      var currentCapacityOption = capacityOptions[j];
      currentCapacityOption.removeAttribute('disabled', '');
    }

    var currentRoom = +evt.target.value;

    for (var k = 0; k < capacityOptions.length; k++) {
      var currentCapacityOptionValue = +capacityOptions[k].value;
      currentCapacityOption = capacityOptions[k];

      if (currentRoom === 100) {
        currentCapacityOption.setAttribute('disabled', '');

        if (currentCapacityOptionValue === 0) {
          currentCapacityOption.removeAttribute('disabled', '');
        }
      } else if (currentRoom < currentCapacityOptionValue || currentCapacityOptionValue === 0) {
        currentCapacityOption.setAttribute('disabled', '');
      }

      if (currentCapacityOption.disabled === false) {
        capacity.value = currentCapacityOption.value;
      }
    }
  });
};

window.addEventListener('load', function () {
  deactivateForms();

  adFormInputAddress.setAttribute('value', getCoordinateMapPinMain());

  onChangeRoomSelect();
});

var isMapActive = false;

mapPinMain.addEventListener('mousedown', function (evt) {
  if (!isMapActive) {
    if (evt.button === KEY_LEFT_MOUSE_BUTTON) {
      activateMap();
      isMapActive = true;
    }
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    activateMap();
  }
});
