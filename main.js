const dice = document.querySelectorAll('.die');
const result = document.querySelectorAll('.result');

for(let i=0; i<dice.length; i++){
    dice[i].addEventListener('click', ()=> {
        let roll = Math.floor(Math.random() * 6) + 1;

        result[i].classList.remove('result-animation');
        dice[i].classList.remove('die-animation');
        void result[i].offsetWidth;
        void dice[i].offsetWidth;
        dice[i].classList.add('die-animation');
        result[i].classList.add('result-animation');

        result[i].innerHTML = roll;
    })
}



