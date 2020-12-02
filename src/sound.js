'use strict'

const alertSound = new Audio('sound/alert.wav');
const bgSound = new Audio('sound/bg.mp3');
const bugSound = new Audio('sound/bug_pull.mp3');
const carrotSound = new Audio('sound/carrot_pull.mp3');
const gameWinSound = new Audio('sound/game_win.mp3');

export function playAlert() {
  alertSound.play();
}

export function playBackground() {
  bgSound.currentTime = 0;
  bgSound.play();
}

export function stopBackground() {
  bgSound.pause();
}

export function playBug() {
  bugSound.play();
}

export function playCarrot() {
  carrotSound.currentTime = 0;
  carrotSound.play();
}

export function playWin() {
  gameWinSound.play();
}