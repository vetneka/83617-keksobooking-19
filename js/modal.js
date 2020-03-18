'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  /**
   * @description
   *  Function for creating success or error popup with a custom message
   *
   * @param {string} type - type of popup, can be 'success' or 'error'
   * @param {string} [message] - custom message for popup
   *
   * @return {object} - DOM-element
   */
  var createPopup = function (type, message) {
    var PopupType = {
      SUCCESS: 'success',
      ERROR: 'error',
    };

    var popup;
    var popupMessage;
    var popupButton;

    var customMessage = message || null;

    var removePopupEventListener = function () {
      window.removeEventListener('keydown', onKeyDownEsc);
      window.removeEventListener('click', onClickWindow);
      if (popupButton) {
        popupButton.removeEventListener('click', onClickCloseButton);
      }
    };

    var onKeyDownEsc = function (evt) {
      window.util.isEscEvent(evt, function () {
        popup.remove();
        removePopupEventListener();
      });
    };

    var onClickWindow = function (evt) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        if (evt.target !== popupMessage) {
          popup.remove();
          removePopupEventListener();
        }
      });
    };

    var onClickCloseButton = function (evt) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        evt.stopPropagation();
        popup.remove();
        removePopupEventListener();
      });
    };

    if (type === PopupType.SUCCESS) {
      popup = successMessageTemplate.cloneNode(true);
      popupMessage = popup.querySelector('.success__message');
    }

    if (type === PopupType.ERROR) {
      popup = errorMessageTemplate.cloneNode(true);
      popupMessage = popup.querySelector('.error__message');
      popupButton = popup.querySelector('.error__button');

      popupButton.addEventListener('click', onClickCloseButton);
    }

    if (customMessage) {
      popupMessage.textContent = message;
    }

    window.addEventListener('keydown', onKeyDownEsc);
    window.addEventListener('click', onClickWindow);

    return popup;
  };

  window.modal = {
    createPopup: createPopup,
  };
})();
