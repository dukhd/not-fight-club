const startFightBtn = document.querySelector('.start__fight__btn');
const homePageFooter = document.querySelector('.footer');

startFightBtn.addEventListener('mouseenter', () => homePageFooter.classList.add('active__fight__btn'));
startFightBtn.addEventListener('mouseleave', () => homePageFooter.classList.remove('active__fight__btn'));
