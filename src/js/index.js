// El styles lo importamos aquí, ya se carga después al compilar todo
import '../scss/styles.scss';

const passwordElement = document.getElementById('password');
const lengthTextElement = document.getElementById('length-text');
const rangeElement = document.getElementById('range');
const buttonGenerateElement = document.getElementById('generate-password');

const uppercaseInputElement = document.getElementById('uppercase');
const lowercaseInputElement = document.getElementById('lowercase');
const numbersInputElement = document.getElementById('numbers');
const symbolsInputElement = document.getElementById('symbols');

let allowedCharacters = '';

const passwordOptions = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-={}[]:;<>,.?/',
};

let passwordLength = rangeElement.value;

const setAllowedCharacters = event => {
  const allCheckbox = document.querySelectorAll('input:checked');

  allowedCharacters = '';

  allCheckbox.forEach(input => {
    const id = input.id;
    allowedCharacters += passwordOptions[id];
  });
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * allowedCharacters.length);
};

const generatePassword = () => {
  let newPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = generateRandomNumber();
    newPassword += allowedCharacters[randomNumber];
  }
  return newPassword;
};

const printPassword = () => {
  passwordElement.value = generatePassword();
};

const setPasswordLength = event => {
  passwordLength = event.target.value;
  lengthTextElement.textContent = passwordLength;
};

rangeElement.addEventListener('input', setPasswordLength);

uppercaseInputElement.addEventListener('change', setAllowedCharacters);
lowercaseInputElement.addEventListener('change', setAllowedCharacters);
numbersInputElement.addEventListener('change', setAllowedCharacters);
symbolsInputElement.addEventListener('change', setAllowedCharacters);
asterisksInputElement.addEventListener('change', setAllowedCharacters);

buttonGenerateElement.addEventListener('click', printPassword);
