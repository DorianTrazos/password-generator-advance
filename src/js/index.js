import '../scss/styles.scss';

const passwordElement = document.getElementById('password');
const lengthTextElement = document.getElementById('length-text');
const rangeElement = document.getElementById('range');
const buttonGenerateElement = document.getElementById('generate-password');

const uppercaseInputElement = document.getElementById('uppercase');
const lowercaseInputElement = document.getElementById('lowercase');
const numbersInputElement = document.getElementById('numbers');
const symbolsInputElement = document.getElementById('symbols');

const passwordOptions = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-={}[]:;<>,.?/'
};

let passwordLength = rangeElement.value;

const setPasswordLength = event => {
  passwordLength = event.target.value;
  lengthTextElement.textContent = passwordLength;
};

const getSelectedGroups = () => {
  const selected = [];

  if (uppercaseInputElement.checked) selected.push('uppercase');
  if (lowercaseInputElement.checked) selected.push('lowercase');
  if (numbersInputElement.checked) selected.push('numbers');
  if (symbolsInputElement.checked) selected.push('symbols');

  return selected;
};

const getRandomChar = string => {
  const index = Math.floor(Math.random() * string.length);
  return string[index];
};

const shuffleString = str => {
  return str
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

const generatePassword = () => {
  const selectedGroups = getSelectedGroups();

  if (selectedGroups.length === 0) {
    alert('Selecciona al menos una opción');
    return '';
  }

  if (passwordLength < selectedGroups.length) {
    alert('La longitud debe ser al menos igual al número de opciones seleccionadas');
    return '';
  }

  let password = '';

  // Al menos un carácter de cada grupo
  selectedGroups.forEach(group => {
    password += getRandomChar(passwordOptions[group]);
  });

  // El resto de caracteres
  const allChars = selectedGroups.map(g => passwordOptions[g]).join('');
  const remaining = passwordLength - password.length;

  for (let i = 0; i < remaining; i++) {
    password += getRandomChar(allChars);
  }

  return shuffleString(password);
};

const printPassword = () => {
  passwordElement.value = generatePassword();
};

const updateButtonState = () => {
  const hasSelection =
    uppercaseInputElement.checked || lowercaseInputElement.checked || numbersInputElement.checked || symbolsInputElement.checked;

  buttonGenerateElement.disabled = !hasSelection;
};

// Eventos
rangeElement.addEventListener('input', setPasswordLength);
buttonGenerateElement.addEventListener('click', printPassword);

uppercaseInputElement.addEventListener('change', updateButtonState);
lowercaseInputElement.addEventListener('change', updateButtonState);
numbersInputElement.addEventListener('change', updateButtonState);
symbolsInputElement.addEventListener('change', updateButtonState);
