let diceData;

fetch("/dice-data/dice.JSON")
.then(res => res.json())
.then(data => diceData = data);

class Die {
    constructor(dieData) {
        const { dieCSSClass, targetNumber } = dieData;
        
        this.dieCSSClass = dieCSSClass;
        this.targetNumber = targetNumber;
        
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
        this.dieElement.classList.add('die');
        this.dieElement.classList.add(this.dieCSSClass);
        this.resultElement.classList.add('result');

        // Append divs in the correct order
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
        let roll = Math.floor(Math.random() * this.targetNumber) + 1;
        this.animation();
        this.resultElement.innerHTML = roll;
    }
}

class DiceManager {
    constructor() {
        this.diceContainer = document.querySelector('.dice-container');
        this.allDice = [];
    }

    addNewDie(dieData) {
        let newDie = new Die(dieData);

        // Appends die element to the dice container
        this.diceContainer.appendChild(newDie.dieContainer);

        // Adds new die to the list (allDice) of dice
        this.allDice.push(newDie);
    }

    removeDie() {
        // Deletes all elements from the last die of the list (allDice)
        if(this.allDice.length !== 0){
            const toBeRemovedDie = this.allDice.pop();
            toBeRemovedDie.dieContainer.remove();
            toBeRemovedDie.dieElement.remove();
            toBeRemovedDie.resultElement.remove();
        }
    }

    rollMultipleDice() {
        this.allDice.forEach(die => {
            die.roll();
        });
    }
}

function main() {
    const diceManager = new DiceManager();
 
    // Dice Remove/Roll buttons
    const buttonRemove = document.querySelector('.remove');
    const buttonRoll = document.querySelector('.roll');

    // Dice Add buttons
    const buttonAddD4 = document.querySelector('.add-d4');
    const buttonAddD6 = document.querySelector('.add-d6');
    const buttonAddD8 = document.querySelector('.add-d8');
    const buttonAddD10 = document.querySelector('.add-d10');
    const buttonAddD12 = document.querySelector('.add-d12');
    const buttonAddD20 = document.querySelector('.add-d20');


    buttonRoll.addEventListener('click', () => {
        diceManager.rollMultipleDice();
    })
    buttonRemove.addEventListener('click', () => {
        diceManager.removeDie();
    });

    buttonAddD4.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d4);
    })
    buttonAddD6.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d6);
    })
    buttonAddD8.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d8);
    })
    buttonAddD10.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d10);
    })
    buttonAddD12.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d12);
    })
    buttonAddD20.addEventListener('click', () => {
        diceManager.addNewDie(diceData.dice.d20);
    })


    
}

main();


