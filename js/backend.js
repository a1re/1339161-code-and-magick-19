'use strict';

window.backend = (function () {
  var LOAD_URL = '//js.dump.academy/code-and-magick/data?callback=similarWizards';
  var SAVE_URL = '//js.dump.academy/code-and-magick';
  var SIMILAR_WIZARDS_ERROR = 'Вы уникальный маг, похожих не нашлось';
  var XHR_TIMEOUT_IN_MS = 10;
  var SAVE_FORM_ERROR = 'Ошибка. Перезагрузите страницу';

  var load = function (loadHandler, errorHandler) {
    window.similarWizards = function (data) {
      loadHandler(data);
    };

    var loader = document.createElement('script');
    loader.addEventListener('error', function () {
      errorHandler(SIMILAR_WIZARDS_ERROR);
    });
    loader.src = LOAD_URL;
    document.body.append(loader);
  };

  var save = function (data, loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          loadHandler();
          break;

        default:
          errorHandler('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(SAVE_FORM_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Таймаут ' + xhr.timeout + ' сек. Перезагрузите страницу');
    });

    xhr.timeout = XHR_TIMEOUT_IN_MS * 1000;

    xhr.responseType = 'json';
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  return {
    load: load,
    save: save
  };

})();
