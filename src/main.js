'use strict'

import PopUp from './pop_up.js'
import Field from './field.js'


const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');

const CARROT_NUM = 3;
const BUG_NUM = 2;
const TIME_DURATION = 3;

const gameBtn = document.querySelector('.game__btn');
const gameBtnIco = gameBtn.childNodes[0];
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timerId = null;


const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(startGame);

const field = new Field(3, 2);

gameBtn.addEventListener('click', () => {
  if(gameBtnIco.matches('.fa-play')) {
    field.init();
    startGame();
  } else {
    stopGame();
    alertSound.play();
    gameFinishBanner.showWithText(`Replay❓`)
    gameBtnIco.classList.remove('fa-stop')
    gameBtnIco.classList.add('fa-play')
  }
});

field.gameField.addEventListener('click', (event) => {
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
      gameWinSound.play();
      gameFinishBanner.showWithText(`YOU WON 🎇`)
    }
  } else if(target.matches('.bug')) {
    stopGame();
    bugSound.play();
    gameFinishBanner.showWithText('YOU LOST 💣')
  }
})

function startGame() {
  score = 0;
  onTimer();
  updatdScore();
  showGameBtn();
  bgSound.play();
  started = true;
};

function stopGame() {
  bgSound.pause();
  bgSound.currentTime = 0;
  clearInterval(timerId);
  started = false;
  hideGameBtn();
}

function onTimer() {
  let remainSec = TIME_DURATION;
  gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
  timerId = setInterval(() => {
    remainSec--;
    gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
    if(remainSec <= 0) {
      stopGame();
      alertSound.play();
      gameFinishBanner.showWithText(`YOU LOST ⏰`);
    };
  }, 1000)
};

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