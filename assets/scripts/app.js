const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20; 

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER ='GAME OVER';

const enteredValue = parseInt(prompt('Maximum life for you the monster.', '100'));


let chosenMaxLife = parseInt(enteredValue);
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife<=0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
  
adjustHealthBars(chosenMaxLife);

function writeToLog(ev,val,monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        target: 'MONSTER',
        finalMonsterHealth: currentMonsterHealth,
        finalPlayerHealth: playerHealth
    };
    if (ev == LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = 'MONSTER';
    } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
          logEntry = {
            event: ev,
            value: val,
            target :'MONSTER',
            finalMonsterHealth: currentMonsterHealth,
            finalPlayerHealth: playerHealth
        };
     
    } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
            logEntry = {
            event: ev,
            value: val,
            target :'PLAYER',
            finalMonsterHealth: currentMonsterHealth,
            finalPlayerHealth: playerHealth
        };
       
    } else if (ev === LOG_EVENT_PLAYER_HEAL) {
            logEntry = {
            event: ev,
            value: val,
            target :'PLAYER',
            finalMonsterHealth: currentMonsterHealth,
            finalPlayerHealth: playerHealth
        };
        
    } else if (ev === LOG_EVENT_GAME_OVER) {
            logEntry = {
            event: ev,
            value: val,
            finalMonsterHealth: currentMonsterHealth,
            finalPlayerHealth: playerHealth
        };       
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endArround() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK,playerDamage,currentMonsterHealth,currentPlayerHealth);

    if (currentPlayerHealth <=0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealt(initialPlayerHealth);
        alert('YOU WOULD BE DEAD BUT THE BONUS LIFE SAVED YOU');
    }
        
    if (currentMonsterHealth <=0 && currentPlayerHealth > 0) {
        alert('YOU WON!');
        writeToLog(logEvent,damage,currentMonsterHealth,currentPlayerHealth);
        
    } else if(currentPlayerHealth <= 0 && currentPlayerHealth > 0) {
        alert('YOU LOST!');
        writeToLog(logEvent,'MONSTER WON',currentMonsterHealth,currentPlayerHealth);
       
    } else if(currentPlayerHealth <=0 && currentMonsterHealth <=0 && currentMonsterHealth <=0 ) {
        alert('YOU HAVE A DRAW!');
        writeToLog(logEvent,'A DRAW',currentMonsterHealth,currentPlayerHealth);
       
    }
    if ( currentMonsterHealth <= 0 || currentPlayerHealth <= 0 ) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    let logEvent;
    if (mode == 'ATTACK') {
        maxDamage = ATTACK_VALUE; 
        logEvent = LOG_EVENT_PLAYER_ATTACK
    } else if(mode =='STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(LOG_EVENT_GAME_OVER,'PLAYER WON',currentMonsterHealth,currentPlayerHealth);
    endArround();

}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
   attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
    let healValue; 
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("YOU CAN'T HEAL TO MORE THAN YOUR INITIAL HEALTH");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(HEAL_VALUE);
    currentPlayerHealth += HEAL_VALUE;
    writeToLog(LOG_EVENT_PLAYER_HEAL,healValue,currentMonsterHealth,currentPlayerHealth);
    endArround();
}
function printLogHandler(){
    console.log(battleLog);
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
