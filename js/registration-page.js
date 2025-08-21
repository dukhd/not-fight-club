const charNameFormFirst = document.querySelector('.char__name__form');
const inputCharName = document.querySelector('.char__name');
const invalidMessage = document.querySelector('.invalid__message');
const createCharacterBtn = document.querySelector('.create__char__btn');
const headerHomePage = document.querySelector('.header');
const mainHomePage = document.querySelector('.main');
const mainRegisterPage = document.querySelector('.main_register');

createCharacterBtn.disabled = true;

function validCharName() {
  if (!inputCharName.checkValidity()) {
    createCharacterBtn.disabled = true;
    inputCharName.classList.add('invalid');
    invalidMessage.innerHTML = inputCharName.title;
  } else {
    createCharacterBtn.disabled = false;
    inputCharName.classList.remove('invalid');
    invalidMessage.innerHTML = '';
  }
};

inputCharName.addEventListener('input', validCharName);

charNameFormFirst.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputCharName.checkValidity()) {
    localStorage.setItem('characterName', inputCharName.value);
    headerHomePage.classList.remove('hiden');
    mainHomePage.classList.remove('hiden');
    mainRegisterPage.classList.add('hiden');
  }
});