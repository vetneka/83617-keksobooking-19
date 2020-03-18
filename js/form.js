'use strict';

(function () {
  var MIN_INPUT_TITLE_LENGTH = 30;

  var mainContainer = document.querySelector('main');

  var adForm = document.querySelector('.ad-form');
  var adFormInputAddress = adForm.querySelector('#address');

  var adFormReset = adForm.querySelector('.ad-form__reset');

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.options;

  var ValidityMessage = {
    REQUIRED_FIELD: 'Это обязательное поле',
    MIN_VALUE: 'Значение должно быть больше ',
    MAX_VALUE: 'Значение должно быть меньше ',
    INPUT_FILE_ERROR: 'Можно использовать изображения только в форматах jpg, png.',
  };

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

    adForm.classList.add('ad-form--disabled');
    adForm.reset();

    window.form.inputAddress.value =
      Math.ceil(window.pin.main.position.x + (window.pin.main.size.inactive.width / 2)) + ', ' +
      Math.ceil(window.pin.main.position.y + (window.pin.main.size.inactive.height / 2));
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

    adForm.classList.remove('ad-form--disabled');

    onChangeRoomSelect();
  };

  window.addEventListener('load', deactivateForms);

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

  var inputTitle = adForm.querySelector('#title');

  var selectRoomType = adForm.querySelector('#type');
  var inputRoomPrice = adForm.querySelector('#price');

  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

  inputTitle.addEventListener('invalid', function (evt) {
    inputTitle.classList.add('invalid');

    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity(ValidityMessage.REQUIRED_FIELD);
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
      inputRoomPrice.setCustomValidity(ValidityMessage.REQUIRED_FIELD);
    } else if (inputRoomPrice.validity.rangeUnderflow) {
      inputRoomPrice.setCustomValidity(ValidityMessage.MIN_VALUE + inputRoomPrice.min);
    } else if (inputRoomPrice.validity.rangeOverflow) {
      inputRoomPrice.setCustomValidity(ValidityMessage.MAX_VALUE + inputRoomPrice.max);
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

  var onSubmitSuccess = function () {
    var successNode = window.modal.createPopup('success');
    mainContainer.appendChild(successNode);
  };

  var onSubmitError = function () {
    var errorNode = window.modal.createPopup('error');
    mainContainer.appendChild(errorNode);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var formData = new FormData(adForm);
    window.backend.upload(formData, onSubmitSuccess, onSubmitError);

    window.form.deactivate();
    window.map.deactivate();
  });

  adFormReset.addEventListener('click', function () {
    window.form.deactivate();
    window.map.deactivate();
  });

  window.form = {
    activate: activateForms,
    deactivate: deactivateForms,

    inputAddress: adFormInputAddress,

    validityMessage: ValidityMessage,
  };
})();
