'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_NUMBER = 4;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

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
document.querySelector('.setup-similar').classList.remove('hidden');

var setupWindow = document.querySelector('.setup');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupCloseIcon = document.querySelector('.setup-close');
var setupUserNameInput = document.querySelector('.setup-user-name');
var coatColorInput = document.querySelector('input[name=coat-color]');
var eyesColorInput = document.querySelector('input[name=eyes-color]');
var fireballColorInput = document.querySelector('input[name=fireball-color]');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

var closeSetupWindowByEscHandler = function (evt) {
  if (evt.key === ESC_KEY) {
    closeSetupWindow();
  }
};

var closeSetupWindowByEnterHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetupWindow();
  }
};

var openSetupWindowByEnterHandler = function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetupWindow();
  }
};

var openSetupWindow = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', closeSetupWindowByEscHandler);
};

var closeSetupWindow = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', closeSetupWindowByEscHandler);
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

setupOpenIcon.addEventListener('click', function () {
  openSetupWindow();
});

setupOpenIcon.addEventListener('keydown', openSetupWindowByEnterHandler);

setupCloseIcon.addEventListener('click', function () {
  closeSetupWindow();
});

setupCloseIcon.addEventListener('keydown', closeSetupWindowByEnterHandler);

setupUserNameInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', closeSetupWindowByEscHandler);
});

setupUserNameInput.addEventListener('blur', function () {
  document.addEventListener('keydown', closeSetupWindowByEscHandler);
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
