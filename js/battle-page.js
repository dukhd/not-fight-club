const chosenCharImg = document.getElementById('choosen__char__img');

const attackRadios = document.querySelectorAll('input[name="attack"]');
const defenceCheckboxes = document.querySelectorAll('input[name="defence"]');
const attackBtn = document.querySelector('.attack__btn');
const charHealthEl = document.querySelector(".char__health");
const enemyHealthEl = document.querySelector(".enemy__health");
const charHealthImg = document.querySelector('.char__health__img');
const enemyHealthImg = document.querySelector('.enemy__health__img');

const enemies = [
  { name: "Thornel", src: "assets/png/enemies/1.png" },
  { name: "Veyra", src: "assets/png/enemies/2.png" },
  { name: "Koril", src: "assets/png/enemies/3.png" },
  { name: "Sylth", src: "assets/png/enemies/4.png" }
];

const bodyParts = ["Head", "Neck", "Body", "Belly", "Legs"];

let enemyName = getRandomItem(enemies);
const enemyNameOutput = document.querySelector('.enemy__name');
const chosenEnemyImg = document.getElementById('random__enemy__img');
let enemyAttackZone = getRandomItem(bodyParts);
let enemyDefenceZones = getRandomItems(bodyParts, 2);
const savedEnemy = localStorage.getItem('enemy');

const logsBox = document.querySelector('.logs__wrapper');
const savedLogs = localStorage.getItem("logs");

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

attackBtn.disabled = true;

// wins/loses count
let totalWins = 0;
let totalLoses = 0;

// check saved fight start ----------------------
if (savedLogs) {
  logsBox.innerHTML = savedLogs;
};
if (savedEnemy) {
  enemyName = JSON.parse(savedEnemy);
}
const savedCharHealth = localStorage.getItem("charHealth");
const savedEnemyHealth = localStorage.getItem("enemyHealth");
if (savedCharHealth && savedEnemyHealth) {
  charHealth = parseInt(savedCharHealth, 10);
  enemyHealth = parseInt(savedEnemyHealth, 10);

  charHealthEl.innerHTML = `${charHealth}/140`;
  enemyHealthEl.innerHTML = `${enemyHealth}/140`;
  charHealthImg.src = localStorage.getItem("charHealthImg");
  enemyHealthImg.src = localStorage.getItem("enemyHealthImg");
}
const savedTotalWins = localStorage.getItem('totalWins');
const savedTotalLoses = localStorage.getItem('totalLoses');
if (savedTotalWins) {
  totalWins = parseInt(savedTotalWins, 10);
}
if (savedTotalLoses) {
  totalLoses = parseInt(savedTotalLoses, 10);
}

// check saved fight end ----------------------

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

// --------------------------------------------------------------------------------
if (enemyName) {
  enemyNameOutput.innerHTML = enemyName.name;
  chosenEnemyImg.src = enemyName.src;
}


function generateEnemyMove() {
  enemyAttackZone = getRandomItem(bodyParts);
  enemyDefenceZones = getRandomItems(bodyParts, 2);
}
// enemy box end


function getHealthImage(currentHealth) {
  for (let i = 0; i < healthImages.length; i++) {
    if (currentHealth >= healthImages[i].health - 20) {
      return healthImages[i].src;
    }
  }
  return healthImages[0].src;
}



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
  localStorage.setItem("logs", logsBox.innerHTML);
  localStorage.setItem("enemy", JSON.stringify(enemyName));
  localStorage.setItem("charHealth", charHealth);
  localStorage.setItem("enemyHealth", enemyHealth);
  localStorage.setItem("charHealthImg", charHealthImg.src);
  localStorage.setItem("enemyHealthImg", enemyHealthImg.src);
});



function attackResult() {
  const charAttackSelected = [...attackRadios].find(a => a.checked)?.value;
  const damageAmountToEnemy = 10;
  if (enemyDefenceZones.includes(charAttackSelected)) {
    logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span> but <span class="enemy_name log">${enemyName.name}</span> was able to protect his <span class="log">${charAttackSelected}</span><br>`;
  } else {
    logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span> and deal <span class="log">${damageAmountToEnemy}</span> damage<br>`;
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
    logsBox.innerHTML += `<span class="enemy_name log">${enemyName.name}</span> attacked <span class="char_name log">${characterName}</span> to <span class="log">${enemyAttackZone}</span> but <span class="char_name log">${characterName}</span> was able to protect his <span class="log">${enemyAttackZone}</span><br>`;
  } else {
    logsBox.innerHTML += `<span class="enemy_name log">${enemyName.name}</span> attacked <span class="char_name log">${characterName}</span> to <span class="log">${enemyAttackZone}</span> and deal <span class="log">${damageAmountToChar}</span> damage<br>`;
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
const loseText = document.querySelector('.lose__text');
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
    loseText.classList.remove('active');
    winText.classList.remove('active');
  } else if (charHealth <= 0) {
    openfightResultWindow();
    loseText.classList.add('active');
    drawText.classList.remove('active');
    winText.classList.remove('active');
    totalLoses += 1;
  } else if (enemyHealth <= 0) {
    openfightResultWindow();
    winText.classList.add('active');
    loseText.classList.remove('active');
    drawText.classList.remove('active');
    totalWins += 1;
  } else {
    return;
  }
  localStorage.setItem("totalWins", totalWins);
  localStorage.setItem("totalLoses", totalLoses);
  resetFight()
}

function resetFight() {
  localStorage.removeItem("charHealth");
  localStorage.removeItem("enemyHealth");
  localStorage.removeItem("logs");
  localStorage.removeItem("enemy");
  charHealth = 140;
  enemyHealth = 140;
  charHealthEl.innerHTML = `${charHealth}/140`;
  enemyHealthEl.innerHTML = `${enemyHealth}/140`;
  logsBox.innerHTML = '';
  charHealthImg.src = getHealthImage(charHealth);
  enemyHealthImg.src = getHealthImage(enemyHealth);

  enemyName = getRandomItem(enemies);
  enemyNameOutput.innerHTML = enemyName.name;
  chosenEnemyImg.src = enemyName.src;
  localStorage.setItem("enemy", JSON.stringify(enemyName));

  [...attackRadios, ...defenceCheckboxes].forEach(i => i.checked = false);
  attackBtn.disabled = true;
}
