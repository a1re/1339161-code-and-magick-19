'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var getNaturalRandom = function (min, max) {
    var randomInt = min + Math.random() * (max + 1 - min);
    return Math.floor(randomInt);
  };

  var getRandomValueFromArray = function (array) {
    var i = getNaturalRandom(0, array.length - 1);
    return array[i];
  };

  var tossArray = function (arraySize, values) {
    if (arraySize >= values.length) {
      return values;
    }

    var tossedArray = [];
    for (var i = 0; i < arraySize; i++) {
      var pick = getRandomValueFromArray(values);
      if (tossedArray.indexOf(pick) >= 0) {
        i--;
      } else {
        tossedArray.push(pick);
      }
    }
    return tossedArray;
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    getNaturalRandom: getNaturalRandom,
    getRandomValueFromArray: getRandomValueFromArray,
    tossArray: tossArray
  };
})();
