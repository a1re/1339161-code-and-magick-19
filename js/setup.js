'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_NUMBER = 4;

var createWizard = function () {
  var firstName = NAMES[Math.round((NAMES.length - 1) * Math.random())];
  var secondName = SURNAMES[Math.round((SURNAMES.length - 1) * Math.random())];
  return {
    name: firstName + ' ' + secondName,
    coatColor: COAT_COLORS[Math.round((COAT_COLORS.length - 1) * Math.random())],
    eyesColor: EYES_COLORS[Math.round((EYES_COLORS.length - 1) * Math.random())],
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
  for (var j = 0; j < wizardsList.length; j++) {
    blockForWizards.appendChild(createWizardElement(wizardsList[j]));
  }
  document.querySelector('.setup-similar-list').appendChild(blockForWizards);
};

var wizards = [];
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards.push(createWizard());
}

fillWizardList(wizards);

document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
