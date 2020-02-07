'use strict';

window.similarWizars = (function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARDS_NUMBER = 4;

  var createWizard = function () {
    var firstName = NAMES[Math.round((NAMES.length - 1) * Math.random())];
    var secondName = SURNAMES[Math.round((SURNAMES.length - 1) * Math.random())];
    return {
      name: firstName + ' ' + secondName,
      coatColor: window.setup.COAT_COLORS[Math.round((window.setup.COAT_COLORS.length - 1) * Math.random())],
      eyesColor: window.setup.EYES_COLORS[Math.round((window.setup.EYES_COLORS.length - 1) * Math.random())],
    };
  };

  var createWizardElement = function (wizardDetails) {
    var similarWizardTemplate = document.querySelector('#similar-wizard-template')
                                        .content
                                        .querySelector('.setup-similar-item');
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizardDetails.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardDetails.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardDetails.eyesColor;
    return wizardElement;
  };

  var fillWizardList = function (wizardsList) {
    var blockForWizards = document.createDocumentFragment();
    for (var i = 0; i < wizardsList.length; i++) {
      blockForWizards.appendChild(createWizardElement(wizardsList[i]));
    }
    document.querySelector('.setup-similar-list').appendChild(blockForWizards);
  };

  var wizards = [];
  for (var j = 0; j < WIZARDS_NUMBER; j++) {
    wizards.push(createWizard());
  }

  fillWizardList(wizards);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
