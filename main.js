'use strict'
const IMG_WIDTH = 80;
const IMG_HEIGHT = 80;

const gameBtn = document.querySelector('.game__btn');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const popUpReplayBtn = document.querySelector('.pop-up__btn');
const popUpText = document.querySelector('.pop-up__text');

let score = 0;
let timerId = null;
let remainSec = 10;


function gameInit() {
  gameStart();
};

function gameStart() {
  gameField.innerHTML = ''
  addItems('carrot', 'img/carrot.png', 5);
  addItems('bug', 'img/bug.png', 5);
  onTimer();
};

function addItems(className, url, num) {
  const fieldRect = gameField.getBoundingClientRect();
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width - IMG_WIDTH;
  const y2 = fieldRect.height - IMG_HEIGHT;

  for(let i = 0; i < num; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', url)
    item.style.position = 'absolute'
    item.style.left = `${makeRandomNum(x1, x2)}px`
    item.style.top = `${makeRandomNum(y1, y2)}px`
    gameField.appendChild(item);
  };

  console.log(makeRandomNum(y1, y2))
};

function makeRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onTimer() {
  gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
  remainSec--
  timerId = setInterval(() => {
    gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
    remainSec--
  }, 1000)
};

gameBtn.addEventListener('click', (event) => {
  gameInit();

  const gameBtnIco = gameBtn.childNodes[0];
  gameBtnIco.classList.remove('fa-play')
  gameBtnIco.classList.add('fa-stop')
});

popUpReplayBtn.addEventListener('click', () => {
});