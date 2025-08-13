const changeCharImgBtn = document.querySelector('.change__char__img__btn');
const changeCharWindow = document.querySelector('.char__image__changing__window');
const changeCharCloseBtn = document.querySelector('.char__img__close__btn');
const changeCharOverlay = document.querySelector('.overlay');
const charForm = document.querySelector('.char__img__form');
const chosenCharImg = document.getElementById('choosen__char__img');


window.addEventListener('DOMContentLoaded', () => {
  const savedValue = localStorage.getItem('selectedCharacterValue');
  const savedSrc = localStorage.getItem('selectedCharacterSrc');
  const savedAlt = localStorage.getItem('selectedCharacterAlt');

  if (savedValue && chosenCharImg) {
    const selectedRadio = charForm.querySelector(`input[name="Character"][value="${savedValue}"]`);
    if (selectedRadio) {
      selectedRadio.checked = true;
      const selectedImg = selectedRadio.parentElement.querySelector('img');
      chosenCharImg.src = selectedImg.src;
      chosenCharImg.alt = selectedImg.alt;
    }
  }
});


changeCharImgBtn.addEventListener('click', () => {
  changeCharWindow.classList.add('active');
  changeCharOverlay.classList.add('active');
});

const closeCharImgWindow = () => {
  changeCharWindow.classList.remove('active');
  changeCharOverlay.classList.remove('active');
}
changeCharCloseBtn.addEventListener('click', () => {
  closeCharImgWindow();
});

changeCharOverlay.addEventListener('click', () => {
  closeCharImgWindow();
});

charForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedCharacter = charForm.querySelector('input[name="Character"]:checked');

  if (selectedCharacter) {
    const selectedImg = selectedCharacter.parentElement.querySelector('img');
    chosenCharImg.src = selectedImg.src;
    chosenCharImg.alt = selectedImg.alt;

    localStorage.setItem('selectedCharacterSrc', selectedImg.src);
    localStorage.setItem('selectedCharacterAlt', selectedImg.alt);
    localStorage.setItem('selectedCharacterValue', selectedCharacter.value);

    closeCharImgWindow();
  }
});
