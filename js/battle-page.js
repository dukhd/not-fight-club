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
} else {
  enemyName = getRandomItem(enemies);
  localStorage.setItem("enemy", JSON.stringify(enemyName));
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

const enemyBox = document.querySelector('.enemy__side');
const enemyBoxOverlay = document.querySelector('.enemy__side__overlay');
const enemyInfoWindow = document.querySelector('.enemies__info__window');
const enemyInforWindowCloseBtn = document.querySelector('.enemies__info__window__close__btn');

enemyBox.addEventListener('mousemove', () => {
  enemyBoxOverlay.classList.add('active');
});
enemyBox.addEventListener('mouseleave', () => {
  enemyBoxOverlay.classList.remove('active');
});
enemyBox.addEventListener('click', () => {
  enemyInfoWindow.classList.add('active');
  fightResultWindowOverlay.classList.add('active');
});
enemyInforWindowCloseBtn.addEventListener('click', () => {
  closeEnemyInfoWindow();
});

function closeEnemyInfoWindow() {
  enemyInfoWindow.classList.remove('active');
  fightResultWindowOverlay.classList.remove('active');
};

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
  if (enemyName.name === 'Thornel') {
    enemyAttackZone = getRandomItem(bodyParts);
    enemyDefenceZones = getRandomItems(bodyParts, 3);
  }
  if (enemyName.name === 'Veyra') {
    enemyAttackZone = getRandomItems(bodyParts, 2);
    enemyDefenceZones = getRandomItem(bodyParts);
  }
  if (enemyName.name === 'Koril') {
    enemyAttackZone = getRandomItems(bodyParts, 2);
    enemyDefenceZones = getRandomItems(bodyParts, 2);
  }
  if (enemyName.name === 'Sylth') {
    enemyAttackZone = getRandomItem(bodyParts);
    enemyDefenceZones = getRandomItem(bodyParts);
  }
  
}

// enemy crit
let enemyCritsUsed = 0;
const maxEnemyCrits = 2;

const enemiesCritData = {
  Thornel: { critChance: 0.01, critMultiplier: 2 },
  Veyra:   { critChance: 0.10, critMultiplier: 1.5 },
  Koril:   { critChance: 0.10, critMultiplier: 1.5 },
  Sylth:   { critChance: 0.15, critMultiplier: 1.5 }
};
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


let charCritsUsed = 0;
const maxCharCrits = 2;
const charCritChance = 0.20;
const charCritMultiplier = 1.5;

function attackResult() {
  const charAttackSelected = [...attackRadios].find(a => a.checked)?.value;
  const damageAmountToEnemyBase = 10;

  let damageAmountToEnemy = damageAmountToEnemyBase;
  let isCharCrit = false;
  if (Math.random() < charCritChance && charCritsUsed < maxCharCrits) {
    isCharCrit = true;
    charCritsUsed++;
    damageAmountToEnemy = Math.floor(damageAmountToEnemyBase * charCritMultiplier);
  }

  if (enemyDefenceZones.includes(charAttackSelected)) {
    if (isCharCrit) {
      logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span>, <span class="enemy_name log">${enemyName.name}</span> tried to block but <span class="char_name log">${characterName}</span> was very lucky and crit his opponent for <span class="log crit">${damageAmountToEnemy} damage!</span><br>`;
      enemyHealth -= damageAmountToEnemy;
    } else {
      logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span>, but <span class="enemy_name log">${enemyName.name}</span> blocked it.<br>`;
    }
  } else {
    if (isCharCrit) {
      logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span> and dealt <span class="log crit">${damageAmountToEnemy} critical damage!</span><br>`;
    } else {
      logsBox.innerHTML += `<span class="char_name log">${characterName}</span> attacked <span class="enemy_name log">${enemyName.name}</span> to <span class="log">${charAttackSelected}</span> and dealt <span class="log">${damageAmountToEnemy} damage.</span><br>`;
    }
    enemyHealth -= damageAmountToEnemy;
  }

  enemyHealthEl.innerHTML = `${enemyHealth}/140`;
  localStorage.setItem("enemyHealth", enemyHealth);
};

function defenceResult() {
  const charAllDefenceSelected = [...defenceCheckboxes]
    .filter(d => d.checked)
    .map(d => d.value);

  const damageAmountToCharBase = 10;
  let isCrit = false;

  const critData = enemiesCritData[enemyName.name];
  if (Math.random() < critData.critChance && enemyCritsUsed < maxEnemyCrits) {
    isCrit = true;
    enemyCritsUsed++;
  }

  const attackZones = Array.isArray(enemyAttackZone) ? enemyAttackZone : [enemyAttackZone];

  attackZones.forEach(zone => {
    let damageAmountToChar = damageAmountToCharBase;

    if (isCrit) damageAmountToChar = Math.floor(damageAmountToChar * critData.critMultiplier);

    if (charAllDefenceSelected.includes(zone)) {
      if (isCrit) {
        logsBox.innerHTML += `<span class="enemy_name log">${enemyName.name}</span> attacked <span class="char_name log">${characterName}</span> at <span class="log">${zone}</span>, <span class="char_name log">${characterName}</span> tried to block but <span class="enemy_name log">${enemyName.name}</span> was very lucky and crit his opponent for <span class="log crit">${damageAmountToChar} damage!</span><br>`;
        charHealth -= damageAmountToChar;
      } else {
        logsBox.innerHTML += `<span class="enemy_name log">${enemyName.name}</span> attacked <span class="char_name log">${characterName}</span> at <span class="log">${zone}</span> but <span class="char_name log">${characterName}</span> blocked it.<br>`;
      }
    } else {
      logsBox.innerHTML += `<span class="enemy_name log">${enemyName.name}</span> attacked <span class="char_name log">${characterName}</span> at <span class="log">${zone}</span> and dealt ${isCrit ? `<span class="log crit">${damageAmountToChar} critical damage!</span>` : `<span class="log">${damageAmountToChar} damage.</span>`}<br>`;
      charHealth -= damageAmountToChar;
    }

    charHealthEl.innerHTML = `${charHealth}/140`;
    localStorage.setItem("charHealth", charHealth);
  });
}

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
});
fightResultWindowOverlay.addEventListener('click', () => {
  closefightResultWindow();
  closeEnemyInfoWindow()
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
