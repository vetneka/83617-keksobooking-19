'use strict';

(function () {
  var MOVE_AREA_WIDTH = 1200;
  var MOVE_AREA_TOP = 130;
  var MOVE_AREA_BOTTOM = 630;

  window.moveElement = function (element) {
    var elementSize = element.getBoundingClientRect();

    var elementWidth = window.pin.mainSize.inactive.width || elementSize.width;
    var elementHeight = window.pin.mainSize.inactive.height || elementSize.height;
    var elementHeightActive = window.pin.mainSize.active.height || 0;

    var elementHalfWidth = elementWidth / 2;
    var elementHalfHeight = elementHeight / 2;

    var elementCurrentPosition =
      (Math.ceil(element.offsetLeft + elementHalfWidth)) + ', ' +
      (Math.ceil(element.offsetTop + elementHalfHeight));

    window.form.inputAddress.value = elementCurrentPosition;

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        if (element.offsetLeft < -elementHalfWidth) {
          element.style.left = (-elementHalfWidth) + 'px';
        }

        if (element.offsetLeft > MOVE_AREA_WIDTH - elementHalfWidth) {
          element.style.left = (MOVE_AREA_WIDTH - elementHalfWidth) + 'px';
        }

        if (element.offsetTop < MOVE_AREA_TOP) {
          element.style.top = MOVE_AREA_TOP + 'px';
        }

        if (element.offsetTop > MOVE_AREA_BOTTOM - elementHeight) {
          element.style.top = (MOVE_AREA_BOTTOM - elementHeight) + 'px';
        }

        element.style.top = (element.offsetTop - shift.y) + 'px';
        element.style.left = (element.offsetLeft - shift.x) + 'px';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        elementCurrentPosition =
          (Math.ceil(element.offsetLeft + elementHalfWidth)) + ', ' +
          (Math.ceil(element.offsetTop + elementHeightActive));

        window.form.inputAddress.value = elementCurrentPosition;

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };
})();
