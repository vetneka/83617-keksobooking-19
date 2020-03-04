'use strict';

(function () {
  var XHR_LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_UPLOAD_URL = 'https://js.dump.academy/keksobooking/';
  var XHR_TIMEOUT = 10000;

  var StatusCode = {
    OK: 200,
  };

  var XhrMessages = {
    ERROR: 'Произошла ошибка соединения',
    FORM_ERROR: 'Ошибка отправки формы',
    TIMEOUT: 'Запрос не успел выполниться',
  };

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(XhrMessages.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XhrMessages.TIMEOUT + ' за ' + XHR_TIMEOUT + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open('GET', XHR_LOAD_URL);
    xhr.send();
  };

  var uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError(XhrMessages.FORM_ERROR);
      }
    });

    xhr.addEventListener('error', function () {
      onError(XhrMessages.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XhrMessages.TIMEOUT);
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open('POST', XHR_UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData,
  };
})();
