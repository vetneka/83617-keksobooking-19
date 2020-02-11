'use strict';

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65;
var MAP_PIN_MAIN_POINTER_HEIGHT = 20;

var KEY_ENTER = 'Enter';
var KEY_LEFT_MOUSE_BUTTON = 0;

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
var createAdCard = function (array) {
  var currentAd = array[0];

  var cardNode = mapCard.cloneNode(true);

  // Create card title
  var popupTitle = cardNode.querySelector('.popup__title');
  popupTitle.textContent = currentAd.offer.title;

  // Create card address
  var popupTextAddress = cardNode.querySelector('.popup__text--address');
  popupTextAddress.textContent = currentAd.offer.address;

  // Create card price
  var popupTextPrice = cardNode.querySelector('.popup__text--price');
  popupTextPrice.textContent = currentAd.offer.price + '₽/ночь';

  // Create card room type
  var popupType = cardNode.querySelector('.popup__type');

  switch (currentAd.offer.type) {
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
  popupTextCapacity.textContent = currentAd.offer.rooms + ' комнаты для ' + currentAd.offer.guests + ' гостей';

  // Create card checkin/checkout time
  var popupTextTime = cardNode.querySelector('.popup__text--time');
  popupTextTime.textContent = 'Заезд после ' + currentAd.offer.checkin + ' выезд до ' + currentAd.offer.checkout;

  // Create card features
  var popupFeatures = cardNode.querySelector('.popup__features');
  var resultStringFeatures = '';
  var featuresLength = currentAd.offer.features.length;

  if (featuresLength === 0) {
    popupFeatures.style.display = 'none';
  } else {
    for (var i = 0; i < featuresLength; i++) {
      var currentFeature = currentAd.offer.features[i];

      if (i < featuresLength - 1) {
        resultStringFeatures += currentFeature + ', ';
      } else {
        resultStringFeatures += currentFeature;
      }
    }
  }

  popupFeatures.textContent = resultStringFeatures;

  // Create card description
  var popupDescription = cardNode.querySelector('.popup__description');
  popupDescription.textContent = currentAd.offer.description;

  // Create card photos
  var popupPhotos = cardNode.querySelector('.popup__photos');
  var popupPhoto = cardNode.querySelector('.popup__photo');
  var popupPhotosLength = currentAd.offer.photos.length;

  var fragment = document.createDocumentFragment();

  if (popupPhotosLength === 0) {
    popupPhotos.style.display = 'none';
  } else {
    for (var j = 0; j < popupPhotosLength; j++) {
      var photo = popupPhoto.cloneNode(true);
      photo.setAttribute('src', currentAd.offer.photos[j]);

      fragment.appendChild(photo);
    }
  }

  var popupPhotosFirstChild = popupPhotos.firstElementChild;
  popupPhotosFirstChild.remove();

  popupPhotos.appendChild(fragment);

  // Create card avatar
  var popupAvatar = cardNode.querySelector('.popup__avatar');
  popupAvatar.setAttribute('src', currentAd.author.avatar);

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

var adCard = createAdCard(arraySimilarAds);

mapFilterContainer.appendChild(adCard);

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

var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var capacityOptions = capacity.options;

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

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === KEY_LEFT_MOUSE_BUTTON) {
    activateMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    activateMap();
  }
});
