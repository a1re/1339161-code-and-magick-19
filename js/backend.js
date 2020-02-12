'use strict';

window.backend = (function () {
  var LOAD_URL = '//js.dump.academy/code-and-magick/data?callback=similarWizards';
  var SIMILAR_WIZARDS_ERROR = 'Вы уникальный маг, похожих не нашлось';

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

  return {
    load: load
  };

})();
