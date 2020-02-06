'use strict';

(function () {
  window.dialog = function (selector, hiddenClassName) {
    var popup = document.querySelector(selector);

    var open = function () {
      popup.classList.remove(hiddenClassName);
      document.addEventListener('keydown', closeByEscHandler);
    };

    var close = function () {
      popup.classList.add(hiddenClassName);
      document.removeEventListener('keydown', closeByEscHandler);
    };

    var closeByEscHandler = function (evt) {
      window.util.isEscEvent(evt, close);
    };

    var setOpenTrigger = function (triggerSelector) {
      var openElement = document.querySelector(triggerSelector);

      openElement.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, open);
      });
      openElement.addEventListener('click', open);
    };

    var setCloseTrigger = function (triggerSelector) {
      var closeElement = document.querySelector(triggerSelector);

      closeElement.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, close);
      });
      closeElement.addEventListener('click', close);
    };

    return {
      setOpenTrigger: setOpenTrigger,
      setCloseTrigger: setCloseTrigger,
      closeByEscHandler: closeByEscHandler
    };
  };
})();
