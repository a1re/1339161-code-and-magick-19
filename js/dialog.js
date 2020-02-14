'use strict';

(function () {
  window.dialog = function (selector, hiddenClassName) {
    var popup = document.querySelector(selector);
    var defaultCoords = {
      x: -1,
      y: -1
    };

    var open = function () {
      popup.classList.remove(hiddenClassName);
      document.addEventListener('keydown', closeByEscHandler);

      if (defaultCoords.x >= 0) {
        popup.style.left = defaultCoords.x + 'px';
      } else {
        defaultCoords.x = popup.offsetLeft;
      }

      if (defaultCoords.y >= 0) {
        popup.style.top = defaultCoords.y + 'px';
      } else {
        defaultCoords.y = popup.offsetTop;
      }
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

    var makeDraggable = function (handleSelector) {
      var handle = document.querySelector(handleSelector);

      handle.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var isDragged = false;

        var mouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();
          isDragged = true;

          var delta = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY,
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          popup.style.left = (popup.offsetLeft - delta.x) + 'px';
          popup.style.top = (popup.offsetTop - delta.y) + 'px';
        };

        var mouseUpHandler = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);

          if (isDragged) {
            var handleClickHandler = function (clickEvt) {
              clickEvt.preventDefault();

              handle.removeEventListener('click', handleClickHandler);
            };

            handle.addEventListener('click', handleClickHandler);
          }
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });
    };

    return {
      setOpenTrigger: setOpenTrigger,
      setCloseTrigger: setCloseTrigger,
      makeDraggable: makeDraggable,
      closeByEscHandler: closeByEscHandler,
      close: close
    };
  };
})();
