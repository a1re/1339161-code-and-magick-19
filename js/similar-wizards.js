'use strict';

window.similarWizards = (function () {
  var SIMILAR_WIZARDS_NUMBER = 4;
  var ANONYMOUS_WIZARD_NAME = '';
  var ANONYMOUS_WIZARD_COAT_COLOR = 'black';
  var ANONYMOUS_WIZARD_EYES_COLOR = 'black';

  var createWizardElement = function (wizardDetails) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                        .content
                                        .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardDetails.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardDetails.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardDetails.colorEyes;
    return wizardElement;
  };

  var createAnonymousWizard = function () {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                        .content
                                        .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.style.filter = 'grayscale(1)';
    wizardElement.style.opacity = '.5';
    wizardElement.querySelector('.setup-similar-label').textContent = ANONYMOUS_WIZARD_NAME;
    wizardElement.querySelector('.wizard-coat').style.fill = ANONYMOUS_WIZARD_COAT_COLOR;
    wizardElement.querySelector('.wizard-eyes').style.fill = ANONYMOUS_WIZARD_EYES_COLOR;
    return wizardElement;
  };

  var show = function (wizardsList) {
    var blockForWizards = document.createDocumentFragment();
    var randomWizards = window.util.tossArray(SIMILAR_WIZARDS_NUMBER, wizardsList);
    for (var j = 0; j < randomWizards.length; j++) {
      blockForWizards.appendChild(createWizardElement(randomWizards[j]));
    }
    document.querySelector('.setup-similar-list').appendChild(blockForWizards);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };

  var showAnonymous = function (message) {
    var blockForWizards = document.createDocumentFragment();
    for (var j = 0; j < SIMILAR_WIZARDS_NUMBER; j++) {
      blockForWizards.appendChild(createAnonymousWizard());
    }
    document.querySelector('.setup-similar-list').appendChild(blockForWizards);
    document.querySelector('.setup-similar').classList.remove('hidden');
    document.querySelector('.setup-similar-title').textContent = message;
  };

  return {
    show: show,
    showAnonymous: showAnonymous
  };
})();
