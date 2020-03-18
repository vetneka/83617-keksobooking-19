'use strict';

(function () {
  var XHR_TIMEOUT = 10000;

  var StatusCode = {
    OK: 200,
  };

  var XhrMessage = {
    ERROR: 'Произошла ошибка соединения',
    FORM_ERROR: 'Ошибка отправки формы',
    TIMEOUT: 'Запрос не успел выполниться',
    STATUS: 'Статус ответа ',
  };

  var XhrUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking/',
  };

  var RequestType = {
    GET: 'GET',
    POST: 'POST',
  };

  var ResponseType = {
    TEXT: 'text',
    JSON: 'json',
  };

  /**
   * @description
   *  Create XMLHttpRequest
   *
   * @param {string} url - url for request
   * @param {string} method - request method
   * @param {string} responseType - response type
   * @param {function} onSuccess - callback for success request
   * @param {function} onError - callback for error request
   * @param {object} data - data for upload on server
   *
   * @return {void}
   */
  var sendRequest = function (url, method, responseType, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    data = data || null;

    xhr.responseType = responseType;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(XhrMessage.STATUS + xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(XhrMessage.ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(XhrMessage.TIMEOUT + ' за ' + XHR_TIMEOUT + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);

    xhr.send(data);
  };

  window.backend = {
    loadData: function (onSuccess, onError) {
      sendRequest(XhrUrl.LOAD, RequestType.GET, ResponseType.JSON, onSuccess, onError);
    },

    uploadData: function (onSuccess, onError, data) {
      sendRequest(XhrUrl.UPLOAD, RequestType.POST, ResponseType.TEXT, onSuccess, onError, data);
    },
  };
})();
