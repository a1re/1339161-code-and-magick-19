'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var setupWindow = document.querySelector('.setup');
  var openIcon = document.querySelector('.setup-open-icon');
  var closeIcon = document.querySelector('.setup-close');
  var userNameInput = document.querySelector('.setup-user-name');
  var coatColorInput = document.querySelector('input[name=coat-color]');
  var eyesColorInput = document.querySelector('input[name=eyes-color]');
  var fireballColorInput = document.querySelector('input[name=fireball-color]');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var closeWindowByEscHandler = function (evt) {
    if (evt.key === ESC_KEY) {
      closeSetupWindow();
    }
  };

  var closeWindowByEnterHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      closeSetupWindow();
    }
  };

  var openWindowByEnterHandler = function (evt) {
    if (evt.key === ENTER_KEY) {
      openWindow();
    }
  };

  var openWindow = function () {
    setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', closeWindowByEscHandler);
  };

  var closeSetupWindow = function () {
    setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', closeWindowByEscHandler);
  };

  var tossColorElement = function (colorElement, colorArray, colorInput) {
    var newColor = colorArray[Math.round((colorArray.length - 1) * Math.random())];
    if (colorElement instanceof SVGElement) {
      colorElement.style.fill = newColor;
    } else {
      colorElement.style.backgroundColor = newColor;
    }
    colorInput.value = newColor;
  };

  openIcon.addEventListener('click', function () {
    openWindow();
  });

  openIcon.addEventListener('keydown', openWindowByEnterHandler);

  closeIcon.addEventListener('click', function () {
    closeSetupWindow();
  });

  closeIcon.addEventListener('keydown', closeWindowByEnterHandler);

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', closeWindowByEscHandler);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', closeWindowByEscHandler);
  });

  wizardCoat.addEventListener('click', function () {
    tossColorElement(wizardCoat, COAT_COLORS, coatColorInput);
  });

  wizardEyes.addEventListener('click', function () {
    tossColorElement(wizardEyes, EYES_COLORS, eyesColorInput);
  });

  fireball.addEventListener('click', function () {
    tossColorElement(fireball, FIREBALL_COLORS, fireballColorInput);
  });

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };
})();
