'use strict';

import PopUp from './pop_up.js'
import Field from './field.js'
import * as sound from './sound.js'

const CARROT_NUM = 3;
const BUG_NUM = 2;
const TIME_DURATION = 3;
export default class Game {
  constructor(carrotCount, bugCount, timeDuration) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.timeDuration = timeDuration;
    this.gameBtn = document.querySelector('.game__btn');
    this.gameBtn.addEventListener('click', () => {
      if(!this.started) {
        this.field.init();
        this.start();
      } else {
        this.stop();
        sound.playAlert();
        this.gameFinishBanner.showWithText(`Replay❓`)
        this.gameBtnIco.classList.remove('fa-stop')
        this.gameBtnIco.classList.add('fa-play')
      }
    });
    this.gameBtnIco = this.gameBtn.childNodes[0];
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.started = false;
    this.score = 0;
    this.timerId = null;
    this.gameFinishBanner = new PopUp();
    this.gameFinishBanner.setClickListener(() => {
      this.start();
    });
    this.field = new Field(this.carrotCount, this.bugCount);
    this.field.gameField.addEventListener('click', (event) => {
      if(!this.started) {
        return
      }
      const target = event.target;
      if(target.matches('.carrot')) {
        target.remove();
        this.score++
        this.updatdScore();
        sound.playCarrot();
        if(this.score === this.carrotCount) {
          this.stop();
          sound.playWin();
          this.gameFinishBanner.showWithText(`YOU WON 🎇`)
        }
      } else if(target.matches('.bug')) {
        this.stop();
        sound.playBug();
        this.gameFinishBanner.showWithText('YOU LOST 💣')
      }
    })
  }

  start() {
    this.started = true;
    this.score = 0;
    this.showBtn();
    this.field.init();
    this.updatdScore();
    this.onTimer();
    sound.playBackground()
  }

  stop() {
    this.started = false;
    this.hideBtn();
    clearInterval(this.timerId);
    sound.stopBackground();
  }

  onTimer() {
    let remainSec = this.timeDuration;
    this.gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
    this.timerId = setInterval(() => {
      remainSec--;
      this.gameTimer.textContent = `${Math.floor(remainSec / 60)}:${remainSec % 60}`
      if(remainSec <= 0) {
        this.stop();
        sound.playAlert();
        this.gameFinishBanner.showWithText(`YOU LOST ⏰`);
      };
    }, 1000)
  }

  showBtn() {
    this.gameBtn.classList.remove('game__btn-hide');
    this.gameBtnIco.classList.remove('fa-play');
    this.gameBtnIco.classList.add('fa-stop');
  }

  hideBtn() {
    this.gameBtn.classList.add('game__btn-hide');
  }

  updatdScore() {
    this.gameScore.textContent = `${this.carrotCount - this.score}`
  }
}