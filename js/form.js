'use strict';

(function () {
  var MIN_INPUT_TITLE_LENGTH = 30;

  var adForm = document.querySelector('.ad-form');
  var adFormInputAddress = adForm.querySelector('#address');

  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityOptions = capacity.options;

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

  adFormInputAddress.setAttribute('value', window.pin.coordinateMainPin());

  var inputTitle = adForm.querySelector('#title');

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

  window.form = {
    activate: activateForms,
    deactivate: deactivateForms,
    onChangeRoomSelect: onChangeRoomSelect,
  };
})();
