console.log("Скрипт работает")
var money = 10;
let bet = 0;
let full_cup;
let doc_money = document.querySelector('.money');
let doc_bet = document.querySelector('.bet');

score(money,bet);
mix_cup();

function mix_cup(){
full_cup = getRandomInt(1,4);
console.log("случайное число " + full_cup);
return full_cup;
}



function score(money, bet){
    doc_money.textContent = "Деньги: " + money;
    doc_bet.textContent = "Ставка: " + bet;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  }