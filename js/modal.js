'use strict';

(function () {
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  var createSuccessPopup = function () {
    var successPopup = successMessageTemplate.cloneNode(true);
    var successMessage = successPopup.querySelector('.success__message');

    var onKeyDownEsc = function (evt) {
      window.util.isEscEvent(evt, function () {
        successPopup.remove();
        window.removeEventListener('keydown', onKeyDownEsc);
      });
    };

    var onClickWindow = function (evt) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        if (evt.target !== successMessage) {
          successPopup.remove();
          window.removeEventListener('click', onClickWindow);
        }
      });
    };

    window.addEventListener('keydown', onKeyDownEsc);
    window.addEventListener('click', onClickWindow);

    return successPopup;
  };

  var createErrorPopup = function () {
    var errorPopup = errorMessageTemplate.cloneNode(true);
    var errorMessage = errorPopup.querySelector('.error__message');
    var errorButton = errorPopup.querySelector('.error__button');

    var onKeyDownEsc = function (evt) {
      window.util.isEscEvent(evt, function () {
        errorPopup.remove();
        window.removeEventListener('keydown', onKeyDownEsc);
      });
    };

    var onClickWindow = function (evt) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        if (evt.target !== errorMessage) {
          errorPopup.remove();
          window.removeEventListener('click', onClickWindow);
        }
      });
    };

    var onClickCloseButton = function (evt) {
      window.util.isMouseLeftButtonEvent(evt, function () {
        errorPopup.remove();
      });
    };

    window.addEventListener('keydown', onKeyDownEsc);
    window.addEventListener('click', onClickWindow);
    errorButton.addEventListener('click', onClickCloseButton);

    return errorPopup;
  };

  window.modal = {
    success: createSuccessPopup,
    error: createErrorPopup,
  };
})();
