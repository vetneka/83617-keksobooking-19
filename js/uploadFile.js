'use strict';

(function () {
  var FILE_TYPES = ['png', 'jpeg', 'jpg'];

  var avatar = document.querySelector('#avatar');
  var images = document.querySelector('#images');

  var adFormHeaderUpload = document.querySelector('.ad-form-header__upload');

  var adFormHeaderPreview = document.querySelector('.ad-form-header__preview img');
  var adFormHeaderPreviewInitialSrc = adFormHeaderPreview.getAttribute('src');

  var adFormPhotoContainer = document.querySelector('.ad-form__photo-container');

  var adFormPhotoTemplate = document.querySelector('.ad-form__photo');

  var isValidFileType = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (currentType) {
      return fileName.endsWith(currentType);
    });

    return matches;
  };

  var onUploadAvatar = function () {
    var file = avatar.files[0];

    if (!isValidFileType(file)) {
      var errorInputFileMessage = window.modal.createPopup('error', window.form.validityMessage.INPUT_FILE_ERROR);
      adFormHeaderUpload.append(errorInputFileMessage);
    } else {
      if (adFormHeaderUpload.contains(errorInputFileMessage)) {
        adFormHeaderUpload.removeChild(errorInputFileMessage);
      }

      var fileReader = new FileReader();

      fileReader.addEventListener('load', function () {
        adFormHeaderPreview.src = fileReader.result;
      });

      fileReader.readAsDataURL(file);
    }
  };

  var resetMultipleFiles = function () {
    for (var j = adFormPhotoContainer.children.length - 1; j >= 0; j--) {
      var currentChild = adFormPhotoContainer.children[j];

      if (currentChild.classList.contains('ad-form__photo')) {
        currentChild.remove();
      }
    }
  };

  var resetAvatar = function () {
    adFormHeaderPreview.setAttribute('src', adFormHeaderPreviewInitialSrc);
  };

  var onUploadMultipleFiles = function () {
    var fileList = images.files;

    for (var i = 0; i < fileList.length; i++) {
      (function () {
        var file = fileList[i];

        if (!isValidFileType(file)) {
          var errorInputFileMessage = window.modal.createErrorPopup(window.form.validityMessage.INPUT_FILE_ERROR);
          adFormPhotoContainer.append(errorInputFileMessage);
        } else {
          resetMultipleFiles();

          var fileReader = new FileReader();

          fileReader.addEventListener('load', function () {
            var adFormPhoto = adFormPhotoTemplate.cloneNode();
            adFormPhoto.style.backgroundImage = 'url("' + fileReader.result + '")';
            adFormPhoto.style.backgroundSize = 'cover';

            adFormPhotoContainer.appendChild(adFormPhoto);
          });

          fileReader.readAsDataURL(file);
        }
      })();
    }
  };

  var resetUploadFiles = function () {
    resetMultipleFiles();
    resetAvatar();
  };

  avatar.addEventListener('change', onUploadAvatar);
  images.addEventListener('change', onUploadMultipleFiles);

  window.uploadFile = {
    reset: resetUploadFiles,
  };
})();
