console.log("Скрипт работает")
let money = 10;
let bet = 0;
let userNumber;
let full_cup_number;
let fullCupImage = null;
let doc_money = document.querySelector('.money');
let doc_bet = document.querySelector('.bet');
let bet_button = document.querySelector('.Place-a-bet-button');
let bet_value = document.querySelector('.Place-a-bet-input');
let player_message = document.querySelector('.player-message')

const buttonsArray = document.getElementsByClassName('cupButton');
const imageArray = document.getElementsByClassName('image-cup');
score();

function mix_cup() {
    full_cup_number = getRandomInt(1, 4);
    console.log("случайное число: " + full_cup_number);
    player_message.textContent = "Теперь выбери наперсток";
    return full_cup_number;
};

function score() {
    doc_money.textContent = "Деньги: " + money;
    doc_bet.textContent = "Ставка: " + bet;
};

//checkOneMore не понятно как происходит проверка 
//При неугаданном наперстке из money верно вычитается bet
//При угаданном наперстке money складывается с bet как показанно в примере ниже
//money = 10 bet = 2 -> money = 102 
//======================================================
//Оставил старые комменты, что бы ты мог мной гордиться!
//В итоге я смог отследить место, где bet превращается в string, точнее читается как стринг ^^
//осталось лишь непонятно почему js адекватно понимает вычитание и пиздит на сложении номера и строки..
function checkOneMore(event) {
    bet_button.disabled = false; //наверное стоит сделать функцию на кнопку.. 
    //Мне очень не нравится прыгание по функциям, код ХУЙ ПРОЧТЕШЬ!!!!
    if (event.target.id.indexOf(`${full_cup_number}`) !== -1) {
        player_message.textContent = `Ты Угадал, молодец!`;
        money += +bet; //я не понимаю почему при сложении bet превращается в строку..
        disable_cups();
        score();
    } else {
        player_message.textContent = `Ха ха, мимо!`;
        money -= bet;
        disable_cups();
        score();
    }
};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
};

function enable_cups() {
    for (let index = 0; index < buttonsArray.length; index++) {
        buttonsArray[index].disabled = false;
    }
    // document.querySelector('.cup-1').disabled = false;
    console.log('пытаемся разморозить кнопку');
};

function disable_cups() {
    for (let index = 0; index < buttonsArray.length; index++) {
        buttonsArray[index].disabled = true;
    }
};

function refresh_cups() {
    for (let index = 0; index < imageArray.length; index++) {
        imageArray[index].src = "public/Cup.png";
        console.log("Обновляем наперстки");
     }
    console.log("Обновляем..");
    //fullCupImage = document.getElementById(`cup${full_cup_number}Image`);
    //fullCupImage.src = "public/Cup.png";
}

//handleCheckCup Честно говоря мне не нравится такая проверка.. 
//Слишком много IF, понимаешь? я уверен что можно сделать проще
const handleCheckCup = function () {
    
    refresh_cups();
    console.log("КЛИК!");
    console.log(typeof bet);
    bet = Number(bet_value.value); //И тут мы волшебным образом превращали наш Number в String =)
    console.log(typeof bet);
    console.log('bet');

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
        bet_button.disabled = true; //наверное стоит сделать функцию на кнопку..
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

    // Тут если не ставить setTimeout, 
    // алерты и confirm выполнются раньше чем исполнится 61-я строка
    setTimeout(() => checkOneMore(event), 100);
};

for (let index = 0; index < buttonsArray.length; index++) {
    buttonsArray[index].addEventListener('click', handleCupClick);
};

