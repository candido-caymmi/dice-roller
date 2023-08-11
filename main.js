const die = document.querySelector('.die');
const result = document.querySelector('.result');


die.addEventListener('click', ()=>{
    let roll = Math.floor(Math.random() * 6) + 1;
    result.classList.remove('result-animation'); 
    die.classList.remove('die-animation');
    void result.offsetWidth; 
    void die.offsetWidth; 
    die.classList.add('die-animation'); 
    result.classList.add('result-animation'); 
    
    result.innerHTML = roll;
});


