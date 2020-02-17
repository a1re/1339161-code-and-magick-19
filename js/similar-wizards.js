'use strict';

window.similarWizards = (function () {
  var SIMILAR_WIZARDS_NUMBER = 4;
  var ANONYMOUS_WIZARD_NAME = '';
  var ANONYMOUS_WIZARD_COAT_COLOR = 'black';
  var ANONYMOUS_WIZARD_EYES_COLOR = 'black';
  var COAT_SIMILARITY_POINTS = 2;
  var EYES_SIMILARITY_POINTS = 1;

  var allWizards = [];

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

  //   var show = function (wizardsList) {
  //     var blockForWizards = document.createDocumentFragment();
  //     var randomWizards = window.util.tossArray(SIMILAR_WIZARDS_NUMBER, wizardsList);
  //     for (var j = 0; j < randomWizards.length; j++) {
  //       blockForWizards.appendChild(createWizardElement(randomWizards[j]));
  //     }
  //     document.querySelector('.setup-similar-list').appendChild(blockForWizards);
  //     document.querySelector('.setup-similar').classList.remove('hidden');
  //   };

  var load = function () {
    window.backend.load(function (wizardsList) {
      allWizards = wizardsList;
      document.querySelector('.setup-similar').classList.remove('hidden');
    }, showAnonymous);
  };

  var rateSimilarity = function (comparedCoat, comparedEyes) {
    var ratedWizards = allWizards.map(function (wizard) {
      wizard.rate = 0;
      if (wizard.colorCoat === comparedCoat) {
        wizard.rate += COAT_SIMILARITY_POINTS;
      }
      if (wizard.colorEyes === comparedEyes) {
        wizard.rate += EYES_SIMILARITY_POINTS;
      }
      return wizard;
    });

    ratedWizards.sort(function (first, second) {
      if (first.rate < second.rate) {
        return 1;
      } else if (first.rate > second.rate) {
        return -1;
      } else {
        return 0;
      }
    });

    return ratedWizards;
  };

  var show = function (coatColor, eyesColor) {
    var wizards = rateSimilarity(coatColor, eyesColor).slice(0, SIMILAR_WIZARDS_NUMBER);
    var oldWizards = document.querySelector('.setup-similar-list');
    while (oldWizards.firstChild) {
      oldWizards.removeChild(oldWizards.firstChild);
    }
    var blockForWizards = document.createDocumentFragment();
    wizards.forEach(function (wizard) {
      blockForWizards.appendChild(createWizardElement(wizard));
    });
    document.querySelector('.setup-similar-list').appendChild(blockForWizards);
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

  load();

  return {
    show: show
  };
})();
