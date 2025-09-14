const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20; 

const enteredValue = parseInt(prompt('Maximum life for you the monster.', '100'));


let chosenMaxLife = parseInt(enteredValue);
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
  
adjustHealthBars(chosenMaxLife);

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endArround() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if (currentPlayerHealth <=0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealt(initialPlayerHealth);
        alert('YOU WOULD BE DEAD BUT THE BONUS LIFE SAVED YOU');
    }
        
    if (currentMonsterHealth <=0 && currentPlayerHealth > 0) {
        alert('YOU WON!');
        
    } else if(currentPlayerHealth <= 0 && currentPlayerHealth > 0) {
        alert('YOU LOST!')
       
    } else if(currentPlayerHealth <=0 && currentMonsterHealth <=0 && currentMonsterHealth <=0 ) {
        alert('YOU HAVE A DRAW!')
       
    }
    if ( currentMonsterHealth <= 0 || currentPlayerHealth <= 0 ) {
        reset();
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode == 'ATTACK') {
        maxDamage = ATTACK_VALUE; 
    } else if(mode =='STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
    endArround();
}
    
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click',strongAttackHandler);
healBtn.addEventListener('click',healPlayerHandler);
 oiii