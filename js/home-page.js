document.addEventListener('DOMContentLoaded', () => {
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