let money = 10;
let master_money = 20;
let bet = 0;
let userNumber;
let full_cup_number;
let fullCupImage = null;
let doc_money = document.querySelector('.money');
let doc_master_money = document.querySelector('.master-money');
let doc_bet = document.querySelector('.bet');
let bet_button = document.querySelector('.Place-a-bet-button');
let bet_value = document.querySelector('.Place-a-bet-input');
let player_message = document.querySelector('.player-message');


const buttonsArray = document.getElementsByClassName('cupButton');
const imageArray = document.getElementsByClassName('image-cup');
score();
gsap.to("#player_graph", 2, {duration:1, height:money * 7});
gsap.to("#master_graph", 2, {duration:2, height:master_money * 7});



function mix_cup() {
    full_cup_number = getRandomInt(1, 4);
    console.log(full_cup_number);
    player_message.textContent = "Теперь выбери наперсток";
    return full_cup_number;
};

function score() {
    doc_money.textContent = "Деньги игрока: " + money;
    doc_master_money.textContent="Деньги мастера: " + master_money;
    doc_bet.textContent = "Ставка: " + 0;
};

function checkOneMore(event) {
    bet_button.disabled = false; 
    if (event.target.id.indexOf(`${full_cup_number}`) !== -1) {
        player_message.textContent = `Ты Угадал, молодец!`;
        money += +bet; 
        master_money -= bet;
        disable_cups();
        gsap.to("#master_graph", 2, {height:master_money * 7});
        gsap.to("#player_graph", 2, {height:money * 7, delay: 2});
        score();
    } else {
        player_message.textContent = `Ха ха, мимо!`;
        money -= bet;
        master_money += bet;
        disable_cups();
        gsap.to("#player_graph", 2, {height:money * 7});
        gsap.to("#master_graph", 2, {height:master_money * 7, delay: 2});
        score();
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
};

function enable_cups() {
    for (let index = 0; index < buttonsArray.length; index++) {
        buttonsArray[index].disabled = false;
    }
};

function disable_cups() {
    for (let index = 0; index < buttonsArray.length; index++) {
        buttonsArray[index].disabled = true;
    }
};

function refresh_cups() {
    for (let index = 0; index < imageArray.length; index++) {
        imageArray[index].src = "public/Cup.png";
     }
}

const handleCheckCup = function () {
    refresh_cups();
    bet = Number(bet_value.value); 
    if (bet > money) {
        player_message.textContent = "Ты слишком беден!";
    }
    else if (bet < 0) {
        player_message.textContent = "Опция отрицательной ставки доступна только вип клиентам";
    }
    else if (bet == 0) {
        player_message.textContent = "Тут не играют на интерес, но вы можете поставить на кон свои вещи =)";
    }
    else {
        doc_bet.textContent = "Ставка: " + bet;
        bet_button.disabled = true; 
        enable_cups();
        mix_cup();
    }
}

const handleCupClick = function (event) {

    fullCupImage = document.getElementById(`cup${full_cup_number}Image`);

    if (!fullCupImage) {
        player_message.textContent = "Сначала сделай ставку!";
        return;
    }

    fullCupImage.src = "public/Cup_with_ball.png";
    setTimeout(() => checkOneMore(event), 100);
};

for (let index = 0; index < buttonsArray.length; index++) {
    buttonsArray[index].addEventListener('click', handleCupClick);
};
