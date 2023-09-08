class Die {
    constructor(dieType) {
        // Sets target number and CSS class
        this.dieType = dieType;
        this.createDieElements();

        // Adds roll event
        this.dieElement.addEventListener('click', () => { this.roll() });
        this.roll();
    }

    createDieElements() {
        // Creates die elements
        this.dieContainer = document.createElement('div');
        this.dieElement = document.createElement('div');
        this.resultElement = document.createElement('span');

        // Adds appropriate classes to the die's elements
        this.dieContainer.classList.add('die-container');
        this.dieElement.classList.add(this.dieType.dieCSSClass);
        this.resultElement.classList.add('result');

        // Append divs in the corrent orders
        this.dieElement.appendChild(this.resultElement);
        this.dieContainer.appendChild(this.dieElement);
    }

    animation() {
        // Removes animation classes
        this.resultElement.classList.remove('result-animation');
        this.dieElement.classList.remove('die-animation');

        // Force reflow
        void this.resultElement.offsetWidth;
        void this.dieElement.offsetWidth;

        // Adds animation classes
        this.dieElement.classList.add('die-animation');
        this.resultElement.classList.add('result-animation');
    }

    roll() {
        let roll = Math.floor(Math.random() * this.dieType.dieTargetNumber) + 1;

        this.animation();

        // Updates result value
        this.resultElement.innerHTML = roll;
    }
}

class DieType {
    constructor(dieCSSClass, dieTargetNumber){
        this.dieCSSClass = dieCSSClass;
        this.dieTargetNumber = dieTargetNumber;
    }
}

class DiceManager {
    constructor() {
        this.diceContainer = document.querySelector('.dice-container');
        this.allDice = [];
    }

    addNewDie(dieType) {
        let newDie = new Die(dieType);

        // Appends die element to the dice container
        this.diceContainer.appendChild(newDie.dieContainer);

        // Adds new die to the list (allDice) of dice
        this.allDice.push(newDie);
    }

    removeDie() {
        // Deletes all elements from the last die of the list (allDice)
        const toBeRemovedDie = this.allDice.pop();
        toBeRemovedDie.dieContainer.remove();
        toBeRemovedDie.dieElement.remove();
        toBeRemovedDie.resultElement.remove();
    }

    rollMultipleDice() {
        this.allDice.forEach(die => {
            die.roll();
        });
    }
}


function main() {
    const diceManager = new DiceManager();

    // Dice Add/Remove/Roll buttons
    const buttonAddD6 = document.querySelector('.add-d6');
    const buttonAddD20 = document.querySelector('.add-d20');
    const buttonRemove = document.querySelector('.remove');
    const buttonRoll = document.querySelector('.roll');

    buttonAddD6.addEventListener('click', () => {
        const dieType = new DieType('d6', 6);
        diceManager.addNewDie(dieType);
    })

    buttonAddD20.addEventListener('click', () => {
        const dieType = new DieType('d20', 20);
        diceManager.addNewDie(dieType);
    })

    buttonRoll.addEventListener('click', () => {
        diceManager.rollMultipleDice();
    })

    buttonRemove.addEventListener('click', () => {
        diceManager.removeDie();
    });

}

main();


