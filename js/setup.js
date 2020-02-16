'use strict';

(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var SAVE_BUTTON_LOADING = 'Сохранение...';
  var SAVE_BUTTON_DEFAULT = 'Сохранить';

  var userNameInput = document.querySelector('.setup-user-name');
  var coatColorInput = document.querySelector('input[name=coat-color]');
  var eyesColorInput = document.querySelector('input[name=eyes-color]');
  var fireballColorInput = document.querySelector('input[name=fireball-color]');
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var setupForm = document.querySelector('.setup-wizard-form');
  var submitButton = document.querySelector('.setup-submit');

  var tossColorElement = function (colorElement, colorArray, colorInput) {
    var newColor = colorArray[Math.round((colorArray.length - 1) * Math.random())];
    if (colorElement instanceof SVGElement) {
      colorElement.style.fill = newColor;
    } else {
      colorElement.style.backgroundColor = newColor;
    }
    colorInput.value = newColor;
  };

  var updateSimilarWizards = window.util.debounce(function () {
    window.similarWizards.show(coatColorInput.value, eyesColorInput.value);
  });

  var setupSubmitHandler = function (evt) {
    evt.preventDefault();
    var data = new FormData(document.querySelector('.setup-wizard-form'));
    submitButton.textContent = SAVE_BUTTON_LOADING;
    submitButton.classList.add('loading');
    window.backend.save(data, setupLoadHander, setupErrorHandler);
  };

  var setupLoadHander = function () {
    submitButton.classList.remove('loading');
    submitButton.textContent = SAVE_BUTTON_DEFAULT;
    setupWindow.close();
  };

  var setupErrorHandler = function (message) {
    submitButton.classList.add('error');
    submitButton.textContent = message;
  };

  var setupWindow = window.dialog('.setup', 'hidden');
  setupWindow.setOpenTrigger('.setup-open-icon');
  setupWindow.setCloseTrigger('.setup-close');
  setupWindow.makeDraggable('.upload');
  //  window.backend.load(window.similarWizards.show, window.similarWizards.showAnonymous);

  userNameInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', setupWindow.closeByEscHandler);
  });

  userNameInput.addEventListener('blur', function () {
    document.addEventListener('keydown', setupWindow.closeByEscHandler);
  });

  wizardCoat.addEventListener('click', function () {
    tossColorElement(wizardCoat, COAT_COLORS, coatColorInput);
    updateSimilarWizards();
  });

  wizardEyes.addEventListener('click', function () {
    tossColorElement(wizardEyes, EYES_COLORS, eyesColorInput);
    updateSimilarWizards();
  });

  fireball.addEventListener('click', function () {
    tossColorElement(fireball, FIREBALL_COLORS, fireballColorInput);
  });

  setupForm.addEventListener('submit', setupSubmitHandler);

  updateSimilarWizards();

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS
  };
})();
