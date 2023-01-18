/* * * * * * * */
/* Challenge 6 */
/* * * * * * * */

/*
Dans ce challenge on aborde les fonctions,
mais aussi un peu tout le reste !
Je l'ai fait sous la forme d'un mini RPG, hope you have fun!
*/

/*********************/

let playerLife = 150;
let playerLifeMax = playerLife;
let enemyLife1 = 150;
let enemyLife1Max = enemyLife1;

const miniPotion = 10;
const maxiPotion = 30;
let damageBoost = 0;
let disabled = true;
let c = 100;
let potionMin = 2;
let potionMax = 1;
let countBP = 1;
let countTOL = 1;
let countFB = 2;
let eHC = 0;
let multiattack = 1;

/* = = = = = = = =*/
function changeEnemy(p) {
  let enemyImg = document.querySelector("#enemy img");
  let enemyaudio = document.querySelector("#bSound audio");
  let enemyback = document.querySelector("body");
  if (p == 1) {
    enemyImg.setAttribute("src", "./personage/enemy2.gif");
    enemyImg.style.transform = "scaleX(1)";
    enemyaudio.setAttribute("src", "./background/bSound2.mp3");
    enemyback.style.backgroundImage = "url(./background/background2+.png)";
  }
  if (p == 2) {
    enemyImg.setAttribute("src", "./personage/enemy3.gif");
    enemyaudio.setAttribute("src", "./background/bSound3.mp3");
    enemyback.style.backgroundImage = "url(./background/background3+.png)";
  }
}
function logger(msg) {
  let chatDisplay = document.querySelector("#log span");
  chatDisplay.innerHTML = msg;
}
function levelUp() {
  if (enemyLife1 <= 0 && playerLifeMax == 150) {
    playerLife = 300;
    playerLifeMax = playerLife;
    enemyLife1 = 300;
    enemyLife1Max = enemyLife1;
    potionMin = 5;
    potionMax = 2;
    countBP = 2;
    countTOL = 2;
    countFB = 3;

    let a = document.getElementById("audio-death-enemy");
    a.play();
    inventori();
    changeEnemy(1);
  }

  if (enemyLife1 == 0 && playerLifeMax == 300) {
    playerLife = 600;
    playerLifeMax = playerLife;
    enemyLife1 = 600;
    enemyLife1Max = enemyLife1;
    potionMin = 30;
    potionMax = 10;
    countBP = 10;
    countTOL = 10;
    countFB = 20;
    inventori();
    changeEnemy(2);
    let a = document.getElementById("audio-death-enemy");
    a.play();
  }

  if (enemyLife1 == 0 && playerLifeMax == 600) {
    playerLife = 1200;
    playerLifeMax = playerLife;
    enemyLife1 = 2500;
    enemyLife1Max = enemyLife1;
    multiattack = 2;

    let a = document.getElementById("audio-death-last-boss");
    a.play();
    inventori();
  }
  if (enemyLife1 == 0 && playerLifeMax == 1200) {
    let a = document.getElementById("audio-death-enemy");
    a.play();
  }
}

function attackWithHands() {
  let a = document.getElementById("audio-punch");
  a.play();

  if (enemyLife1 >= 20) {
    enemyLife1 = enemyLife1 - 10 - damageBoost;
    damageBoost = 0;

    logger("Punch! Enemy life is now at " + enemyLife1 + " hp");
  } else {
    enemyLife1 = 0;
    logger(" Player wins! Enemy defeated");
  }
  levelUp();
  updateLife();
}

function attackWithSword() {
  let a = document.getElementById("audio-sword");
  a.play();
  if (enemyLife1 >= 20) {
    enemyLife1 = enemyLife1 - 20 - damageBoost;
    damageBoost = 0;

    logger(" Swing! Enemy life is now at " + enemyLife1 + " hp");
  } else {
    enemyLife1 = 0;
    logger(" Player wins! Enemy defeated");
  }
  levelUp();
  updateLife();
}

function enemyAttack() {
  let a = document.getElementById("audio-enemy-attack");
  if (playerLife >= 40) {
    playerLife = playerLife - 40 * multiattack;
    eHC += 1;
    if (playerLife <= 40) {
      document.getElementById("myBtn").disabled = false;
    }
    logger(" Enemy attacked! Player's life is now at " + playerLife + " hp");
  } else {
    playerLife = 0;
    comboAttack();
    logger(" Enemy wins! Player's life ended");
    let a = document.getElementById("audio-death-hero");
    a.play();
  }

  updateLife();
}

function takeBoostPotion() {
  if (countBP > 0) {
    countBP = countBP - 1;
    damageBoost = 5;
    logger(" Glup, taking Boost Potion = all attack + 5");
  } else {
    logger("Oops, no more potions!, please buy more ");
  }
  levelUp();
  inventori();
  let a = document.getElementById("audio-boost");
  a.play();
}

function inventori() {
  let inventoriDisplay = document.querySelector("#player .potionbar span");
  inventoriDisplay.innerHTML =
    " 🍸 " + potionMin + " <br><br> 🧉 " + potionMax + "<br><br>💪 " + countBP;
}
function takeHealthPotion(p) {
  if (c > 0 && p == miniPotion && potionMin > 0) {
    potionMin = potionMin - 1;
    c = c - 1;
    playerLife = playerLife + p;
    logger(
      " Glup, taking " +
        p +
        " Player took a potion, their life is now at " +
        playerLife +
        " hp"
    );
  } else if (c > 0 && p == maxiPotion && potionMax > 0) {
    potionMax = potionMax - 1;
    c = c - 1;
    playerLife = playerLife + p;
    logger(
      " Glup, taking " +
        p +
        " Player took a potion, their life is now at " +
        playerLife +
        " hp"
    );
  } else {
    logger("Oops, no more potions!, please buy more ");
  }
  levelUp();
  inventori();
  updateLife();
  let a = document.getElementById("audio-potion");
  a.play();
}

function comboAttack() {
  logger("COMBO ATTACK X" + eHC);
  for (let i = 0; i <= eHC; i++) {
    if (eHC >= 1) {
      if (enemyLife1 >= 0) {
        enemyLife1 = enemyLife1 - 10 - damageBoost;
        damageBoost = 0;
      } else {
        enemyLife1 = 0;
        logger(" Player wins! Enemy defeated");
      }
    }
    logger(" Punch! Enemy life is now at " + enemyLife1 + " hp");
  }
  activationCombo();
  updateLife();
  levelUp();
}

function attackFireBall() {
  if (countFB > 0) {
    countFB = countFB - 1;
    if (enemyLife1 >= 35) {
      enemyLife1 = enemyLife1 - 35 - damageBoost;
      damageBoost = 0;
    } else {
      enemyLife1 = 0;
      logger(" Player wins! Enemy defeated");
    }
    logger(" FireBall! Enemy life is now at " + enemyLife1 + " hp");
    activationCombo();
    updateLife();
    let a = document.getElementById("audio-fireball");
    a.play();
  }
}

function attackTheftOfLife() {
  if (countTOL > 0) {
    countTOL = countTOL - 1;
    if (enemyLife1 >= 20) {
      enemyLife1 = enemyLife1 - 10 - damageBoost;
      damageBoost = 0;
      playerLife = playerLife + 10;
    } else {
      enemyLife1 = 0;
      logger(" Player wins! Enemy defeated");
    }
    logger(
      " Theft of life! Enemy life is now at " +
        enemyLife1 +
        " hp" +
        " and Player gain" +
        playerLife +
        " hp"
    );
    activationCombo();
    updateLife();
    let a = document.getElementById("audio-stealth");
    a.play();
  }
}

function updateLife() {
  let playerDisplay = document.querySelector("#player .healthbar span");
  playerDisplay.innerHTML = playerLife;
  document.querySelector("#player .healthbar span").style.width =
    (playerLife / playerLifeMax) * 100 + "%";
  let enemyDisplay = document.querySelector("#enemy .healthbar span");
  enemyDisplay.innerHTML = enemyLife1;
  document.querySelector("#enemy .healthbar span").style.width =
    (enemyLife1 / enemyLife1Max) * 100 + "%";
}

function activationCombo() {
  document.getElementById("myBtn").disabled = true;
}

/* = = = = = = = =*/

activationCombo();
inventori();
updateLife();
levelUp();
