console.log("Скрипт работает")
var money = 10;
let bet = 0;
let userNumber;
let full_cup_number;
let fullCupImage = null;
let doc_money = document.querySelector('.money');
let doc_bet = document.querySelector('.bet');

const buttonsArray = document.getElementsByClassName('cupButton');

score(money,bet);

function mix_cup() {
    full_cup_number = getRandomInt(1,4);
    console.log("случайное число: " + full_cup_number);
    return full_cup_number;
};

function score(money, bet) {
    doc_money.textContent = "Деньги: " + money;
    doc_bet.textContent = "Ставка: " + bet;
};

function checkOneMore(event) {
    if (event.target.id.indexOf(`${full_cup_number}`) !== -1) {
        alert(`Ты Угадал, молодец!`);
    } else {
        alert(`Ха ха, мимо!`);
    }

    if (confirm('Ещё раз?')) {
        window.location.reload();
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

const handleCheckCup = function() {
    userNumber = +prompt("Выбери ка номер напёрстка!");
    if (userNumber) {
        alert(`Ты выбрал номер: ${userNumber}, теперь проверь!`);
        mix_cup();
    } else {
        return;
    }
}

const handleCupClick = function(event) {
    fullCupImage = document.getElementById(`cup${full_cup_number}Image`);

    if (!fullCupImage) {
        alert('Сначала сделай ставку!');
        return;
    }

    fullCupImage.src = "public/Cup_with_ball.png";

    // Тут если не ставить setTimeout, 
    // алерты и confirm выполнются раньше чем исполнится 61-я строка
    setTimeout(() => checkOneMore(event), 100);
};

for (let index = 0; index < buttonsArray.length; index++) {
    buttonsArray[index].addEventListener('click', handleCupClick);
}
