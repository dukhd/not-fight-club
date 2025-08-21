const chosenCharImg = document.getElementById('choosen__char__img');

if (chosenCharImg) {
  const savedSrc = localStorage.getItem('selectedCharacterSrc');
  const savedAlt = localStorage.getItem('selectedCharacterAlt');

  if (savedSrc) {
    chosenCharImg.src = savedSrc;
    chosenCharImg.alt = savedAlt;
  }
}

const charNameOutput = document.querySelector('.char__name__output');
const characterName = localStorage.getItem('characterName');
if (characterName) {
  charNameOutput.textContent = characterName;
}


// enemy box
const enemies = [
  { name: "Enemy1", src: "assets/png/enemies/1.png" },
  { name: "Enemy2", src: "assets/png/enemies/2.png" },
  { name: "Enemy3", src: "assets/png/enemies/3.png" },
  { name: "Enemy4", src: "assets/png/enemies/4.png" }
];

const bodyParts = ["Head", "Neck", "Body", "Belly", "Legs"];

function getRandomItem(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

function getRandomItems(array, count) {
  const copy = [...array];
  const result = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy[index]);
    copy.splice(index, 1);
  }

  return result;
};

const enemyName = getRandomItem(enemies);
const enemyNameOutput = document.querySelector('.enemy__name');
const chosenEnemyImg = document.getElementById('random__enemy__img');
let enemyAttackZone = getRandomItem(bodyParts);
let enemyDefenceZones = getRandomItems(bodyParts, 2);

if (enemyName) {
  enemyNameOutput.innerHTML = enemyName.name;
  chosenEnemyImg.src = enemyName.src;
}

function generateEnemyMove() {
  enemyAttackZone = getRandomItem(bodyParts);
  enemyDefenceZones = getRandomItems(bodyParts, 2);
}
// enemy box end

const attackRadios = document.querySelectorAll('input[name="attack"]');
const defenceCheckboxes = document.querySelectorAll('input[name="defence"]');
const attackBtn = document.querySelector('.attack__btn');
const charHealthEl = document.querySelector(".char__health");
const enemyHealthEl = document.querySelector(".enemy__health");
const charHealthImg = document.querySelector('.char__health__img');
const enemyHealthImg = document.querySelector('.enemy__health__img');
let charHealth = 140;
let enemyHealth = 140;

const healthImages = [
  { health: 140, src: "assets/png/health/7.png" },
  { health: 120, src: "assets/png/health/6.png" },
  { health: 100, src: "assets/png/health/5.png" },
  { health: 80, src: "assets/png/health/4.png" },
  { health: 60, src: "assets/png/health/3.png" },
  { health: 40, src: "assets/png/health/2.png" },
  { health: 20, src: "assets/png/health/1.png" },
  { health: 0, src: "assets/png/health/0.png" }
];

function getHealthImage(currentHealth) {
  for (let i = 0; i < healthImages.length; i++) {
    if (currentHealth >= healthImages[i].health - 20) {
      return healthImages[i].src;
    }
  }
  return healthImages[0].src;
}

attackBtn.disabled = true;

function makeAttack() {
  const attackSelected = [...attackRadios].find(a => a.checked);
  const defenceSelected = [...defenceCheckboxes].filter(d => d.checked).length;
  if (attackSelected && defenceSelected === 2) {
    attackBtn.disabled = false;
  } else {
    attackBtn.disabled = true;
  }
};

attackRadios.forEach(a => a.addEventListener('change', makeAttack));
defenceCheckboxes.forEach(d => d.addEventListener('change', makeAttack));


attackBtn.addEventListener('click', (e) => {
  e.preventDefault();
  generateEnemyMove();
  attackResult();
  defenceResult();
  checkFightEnd();
  charHealthImg.src = getHealthImage(charHealth);
  enemyHealthImg.src = getHealthImage(enemyHealth);
});

const logsBox = document.querySelector('.logs__wrapper');

function attackResult() {
  const charAttackSelected = [...attackRadios].find(a => a.checked)?.value;
  const damageAmountToEnemy = 10;
  if (enemyDefenceZones.includes(charAttackSelected)) {
    logsBox.innerHTML += `<strong>${characterName}</strong> attacked <strong>${enemyName.name}</strong> to <strong>${charAttackSelected}</strong> but <strong>${enemyName.name}</strong> was able to protect his <strong>${charAttackSelected}</strong><br>`;
  } else {
    logsBox.innerHTML += `<strong>${characterName}</strong> attacked <strong>${enemyName.name}</strong> to <strong>${charAttackSelected}</strong> and deal <strong>${damageAmountToEnemy}</strong> damage<br>`;
    enemyHealth -= damageAmountToEnemy;
    enemyHealthEl.innerHTML = `${enemyHealth}/140`;
    localStorage.setItem("enemyHealth", enemyHealth);
  }
};

function defenceResult() {
  const charAllDefenceSelected = [...defenceCheckboxes]
    .filter(d => d.checked)
    .map(d => d.value);

  const damageAmountToChar = 10;
  if (charAllDefenceSelected.includes(enemyAttackZone)) {
    logsBox.innerHTML += `<strong>${enemyName.name}</strong> attacked <strong>${characterName}</strong> to <strong>${enemyAttackZone}</strong> but <strong>${characterName}</strong> was able to protect his <strong>${enemyAttackZone}</strong><br>`;
  } else {
    logsBox.innerHTML += `<strong>${enemyName.name}</strong> attacked <strong>${characterName}</strong> to <strong>${enemyAttackZone}</strong> and deal <strong>${damageAmountToChar}</strong> damage<br>`;
    charHealth -= damageAmountToChar;
    charHealthEl.innerHTML = `${charHealth}/140`;
    localStorage.setItem("charHealth", charHealth);
  }
};

// fight result window
const fightResultWindow = document.querySelector('.fight__result__window');
const fightResultWindowOverlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.close__btn');
const winText = document.querySelector('.win__text');
const looseText = document.querySelector('.loose__text');
const drawText = document.querySelector('.draw__text');

const openfightResultWindow = () => {
  fightResultWindow.classList.add('active');
  fightResultWindowOverlay.classList.add('active');
}
const closefightResultWindow = () => {
  fightResultWindow.classList.remove('active');
  fightResultWindowOverlay.classList.remove('active');
}
closeBtn.addEventListener('click', () => {
  closefightResultWindow();
  resetFight();
});
fightResultWindowOverlay.addEventListener('click', () => {
  closefightResultWindow();
  resetFight();
});

// check fight result
function checkFightEnd() {
  if (charHealth <= 0 && enemyHealth <= 0) {
    openfightResultWindow();
    drawText.classList.add('active');
  } else if (charHealth <= 0) {
    openfightResultWindow();
    looseText.classList.add('active');
  } else if (enemyHealth <= 0) {
    openfightResultWindow();
    winText.classList.add('active');
  } else {
    return;
  }
  localStorage.removeItem("charHealth");
  localStorage.removeItem("enemyHealth");
}

function resetFight() {
  charHealth = 140;
  enemyHealth = 140;
  charHealthEl.innerHTML = `${charHealth}/140`;
  enemyHealthEl.innerHTML = `${enemyHealth}/140`;
  logsBox.innerHTML = '';
  charHealthImg.src = getHealthImage(charHealth);
  enemyHealthImg.src = getHealthImage(enemyHealth);
  [...attackRadios, ...defenceCheckboxes].forEach(i => i.checked = false);
  attackBtn.disabled = true;
}