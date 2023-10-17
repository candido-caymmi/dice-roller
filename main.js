let diceData;

fetch("./dice-data.json")
.then(res => res.json())
.then(data => {
    diceData = data;
    // Calls main() after the data is fetched
    main();
})
.catch(error => {
    console.error('Error fetching data:', error);
});

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
        // Removes the last die from the list (this.allDice), then removes it's elements from the HTML 
        if(this.allDice.length !== 0){
            const toBeRemovedDie = this.allDice.pop();
            toBeRemovedDie.dieContainer.remove();
            toBeRemovedDie.dieElement.remove();
            toBeRemovedDie.resultElement.remove();
        }
    }

    rollMultipleDice() {
        this.allDice.forEach(die => { die.roll(); });
    }
}

function main() {
    const diceManager = new DiceManager();
 
    // Dice Remove/Roll buttons
    const buttonRemove = document.querySelector('.remove');
    const buttonRoll = document.querySelector('.roll');
    buttonRoll.addEventListener('click', () => { diceManager.rollMultipleDice(); })
    buttonRemove.addEventListener('click', () => { diceManager.removeDie(); });

    // Dice Add buttons
    diceData.forEach((dieData) => {
        const button = document.querySelector(`.add-${dieData.dieCSSClass}`);
        button.addEventListener('click', ()=> {
            diceManager.addNewDie(dieData);
        })
    });
}




