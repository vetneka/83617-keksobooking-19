'use strict';

(function () {
  var KEY_ESC = 'Escape';
  var KEY_ENTER = 'Enter';
  var KEY_LEFT_MOUSE_BUTTON = 0;

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

    do {
      result = Math.round(Math.random() * digit);
    } while (result < startNumber || result > endNumber);

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
    var randomArray = [];
    var randomArrayLength = getRandomNumber(1, array.length);
    var arrRandomValue;

    for (var i = 0; i < randomArrayLength; i++) {
      arrRandomValue = array[getRandomNumber(0, array.length - 1)];

      if (!randomArray.includes(arrRandomValue)) {
        randomArray.push(arrRandomValue);
      }
    }

    return randomArray;
  };

  /**
   * @description
   *  Esc key handler
   *
   * @param {object} evt - event object
   * @param {function} action - callback
   *
   * @return {void}
   */
  var isEscEvent = function (evt, action) {
    if (evt.key === KEY_ESC) {
      action();
    }
  };

  /**
   * @description
   *  Enter key handler
   *
   * @param {object} evt - event object
   * @param {function} action - callback
   *
   * @return {void}
   */
  var isEnterEvent = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  /**
   * @description
   *  Mouse left button handler
   *
   * @param {object} evt - event object
   * @param {function} action - callback
   *
   * @return {void}
   */
  var isMouseLeftButtonEvent = function (evt, action) {
    if (evt.button === KEY_LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,

    getRandomNumber: getRandomNumber,
    getRandomArrayValue: getRandomArrayValue,
    getArrayRandomLength: getArrayRandomLength,
  };
})();
