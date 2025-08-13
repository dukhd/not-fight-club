const chosenCharImg = document.getElementById('choosen__char__img');

if (chosenCharImg) {
  const savedSrc = localStorage.getItem('selectedCharacterSrc');
  const savedAlt = localStorage.getItem('selectedCharacterAlt');

  if (savedSrc) {
    chosenCharImg.src = savedSrc;
    chosenCharImg.alt = savedAlt;
  }
}