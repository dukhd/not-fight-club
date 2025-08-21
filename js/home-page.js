const charNameFormFirst = document.querySelector('.char__name__form');
const inputCharName = document.querySelector('.char__name');
const invalidMessage = document.querySelector('.invalid__message');
const createCharacterBtn = document.querySelector('.create__char__btn');
const headerHomePage = document.querySelector('.header');
const mainHomePage = document.querySelector('.main');
const mainRegisterPage = document.querySelector('.main_register');

function checkAccount() {
  const characterName = localStorage.getItem('characterName');
  if (characterName) {
    headerHomePage.classList.remove('hiden');
    mainHomePage.classList.remove('hiden');
    mainRegisterPage.classList.add('hiden');
  } else {
    headerHomePage.classList.add('hiden');
    mainHomePage.classList.add('hiden');
    mainRegisterPage.classList.remove('hiden');
  }
}

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

// registration page end ------------------

document.addEventListener('DOMContentLoaded', () => {
  checkAccount();
  const charNameOutput = document.getElementById('character__name__output');
  const characterName = localStorage.getItem('characterName');
  if (characterName) {
    charNameOutput.textContent = characterName;
  }

  const startFightBtn = document.querySelector('.start__fight__btn');
  const homePageFooter = document.querySelector('.footer');

  startFightBtn.addEventListener('mouseenter', () => homePageFooter.classList.add('active__fight__btn'));
  startFightBtn.addEventListener('mouseleave', () => homePageFooter.classList.remove('active__fight__btn'));
});


