'use strict';

(function () {
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

  window.random = {
    getNumber: getRandomNumber,
    getArrayValue: getRandomArrayValue,
    getArrayLength: getArrayRandomLength,
  };
})();
