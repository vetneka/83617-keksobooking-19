'use strict';

(function () {
  var XHR_LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var XHR_UPLOAD_URL = 'https://js.dump.academy/keksobooking/';
  var XHR_TIMEOUT = 10000;

  var StatusCode = {
    OK: 200,
  };

  var XhrMessage = {
    ERROR: 'Произошла ошибка соединения',
    FORM_ERROR: 'Ошибка отправки формы',
    TIMEOUT: 'Запрос не успел выполниться',
  };

  var ResponseType = {
    TEXT: 'text',
    JSON: 'json',
  };

  var RequestType = {
    GET: 'GET',
    POST: 'POST',
  };

  var handleXhrError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError(XhrMessage.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XhrMessage.TIMEOUT + ' за ' + XHR_TIMEOUT + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
  };

  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = ResponseType.JSON;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });

    handleXhrError(xhr, onError);

    xhr.open(RequestType.GET, XHR_LOAD_URL);
    xhr.send();
  };

  var uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = ResponseType.TEXT;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError(XhrMessage.FORM_ERROR);
      }
    });

    handleXhrError(xhr, onError);

    xhr.open(RequestType.POST, XHR_UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    upload: uploadData,
  };
})();
