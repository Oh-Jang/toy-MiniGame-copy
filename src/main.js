'use strict'

const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');

const CARROT_NUM = 10;
const BUG_NUM = 10;
const IMG_WIDTH = 80;
const IMG_HEIGHT = 80;

const gameBtn = document.querySelector('.game__btn');
const gameBtnIco = gameBtn.childNodes[0];
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameField = document.querySelector('.game__field');
const popUp = document.querySelector('.pop-up');
const popUpReplayBtn = document.querySelector('.pop-up__btn');
const popUpText = document.querySelector('.pop-up__text');

let started = false;
let score = 0;
let timerId = null;


gameBtn.addEventListener('click', () => {
  if(gameBtnIco.matches('.fa-play')) {
    startGame();
    gameBtnIco.classList.remove('fa-play')
    gameBtnIco.classList.add('fa-stop')
  } else {
    stopGame();
    hideGameBtn();
    alertSound.play();
    showPopUp(`Replay❓`)
    gameBtnIco.classList.remove('fa-stop')
    gameBtnIco.classList.add('fa-play')
  }
});

popUpReplayBtn.addEventListener('click', () => {
  startGame();
  showGameBtn();
  hidePopUp();
});

gameField.addEventListener('click', (event) => {
  if(!started) {
    return
  }
  const target = event.target;

  if(target.matches('.carrot')) {
    target.remove();
    score++
    updatdScore();
    carrotSound.currentTime = 0;
    carrotSound.play();
    if(score === CARROT_NUM) {
      stopGame();
      hideGameBtn();
      gameWinSound.play();
      showPopUp(`YOU WON 🎇`)
    }
  } else if(target.matches('.bug')) {
    stopGame();
    hideGameBtn();
    bugSound.play();
    showPopUp('YOU LOST 💣')
  }
})

function startGame() {
  score = 0;
  gameField.innerHTML = ''
  addItems('carrot', 'img/carrot.png', CARROT_NUM);
  addItems('bug', 'img/bug.png', BUG_NUM);
  onTimer();
  updatdScore();
  bgSound.play();
  started = true;
};

function stopGame() {
  bgSound.pause();
  bgSound.currentTime = 0;
  clearInterval(timerId);
  started = false;
}

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
};

function makeRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onTimer() {
  let remainSec = 10;
  gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
  timerId = setInterval(() => {
    remainSec--;
    gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
    if(remainSec <= 0) {
      stopGame();
      hideGameBtn();
      alertSound.play();
      showPopUp(`YOU LOST ⏰`);
    };
  }, 1000)
};


function showPopUp(text) {
  popUpText.textContent = text
  popUp.style.visibility = 'visible'
}

function hidePopUp() {
  popUp.style.visibility = 'hidden'
}

function showGameBtn() {
  gameBtn.style.visibility = 'visible'
  gameBtnIco.classList.remove('fa-play')
  gameBtnIco.classList.add('fa-stop')
}

function hideGameBtn() {
  gameBtn.style.visibility = 'hidden'
}

function updatdScore() {
  gameScore.textContent = `${CARROT_NUM - score}`
}