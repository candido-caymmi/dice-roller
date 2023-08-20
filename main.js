const buttonAdd = document.querySelector('.add');
const buttonRemove = document.querySelector('.remove');
const buttonRoll = document.querySelector('.roll');

let allDice = [];

function addNewDie() {
    const diceContainer = document.querySelector('.dice-container');

    // Creates new die
    let newDie = {
        dieElement: document.createElement('div'),
        resultElement: document.createElement('span')
    }

    // Adds appropriate classes to the die's elements
    newDie.dieElement.classList.add('die');
    newDie.resultElement.classList.add('result');

    newDie.dieElement.appendChild(newDie.resultElement);
    diceContainer.appendChild(newDie.dieElement);

    addRollEvent(newDie);
    allDice.push(newDie);

    // Rolls the new die
    rollDie(newDie);
}

function removeDie(dice){
    const toBeRemovedDie = dice.pop();
    toBeRemovedDie.dieElement.remove();
    toBeRemovedDie.resultElement.remove();
}

function rollMultipleDice(dice) {
    dice.forEach(die => {
        rollDie(die);
    });
}

function addRollEvent(die) {
    die.dieElement.addEventListener('click', () => { rollDie(die) ;});
}

function rollDie(die) {
    let roll = Math.floor(Math.random() * 6) + 1;

    // Removes animation classes
    die.resultElement.classList.remove('result-animation');
    die.dieElement.classList.remove('die-animation');

    // Force reflow
    void die.resultElement.offsetWidth;
    void die.dieElement.offsetWidth;

    // Adds animation classes
    die.dieElement.classList.add('die-animation');
    die.resultElement.classList.add('result-animation');

    // Updates result value
    die.resultElement.innerHTML = roll;
}

buttonAdd.addEventListener('click', addNewDie);
buttonRoll.addEventListener('click', () => {
    rollMultipleDice(allDice);
})
buttonRemove.addEventListener('click', () => {
    removeDie(allDice);
});