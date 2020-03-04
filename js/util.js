'use strict';

(function () {
  var KEY_ESC = 'Escape';
  var KEY_ENTER = 'Enter';
  var KEY_LEFT_MOUSE_BUTTON = 0;

  var isEscEvent = function (evt, action) {
    if (evt.key === KEY_ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  var isMouseLeftButtonEvent = function (evt, action) {
    if (evt.button === KEY_LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    isMouseLeftButtonEvent: isMouseLeftButtonEvent,
  };
})();
