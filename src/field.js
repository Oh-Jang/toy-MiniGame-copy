'use strict';

const IMG_SIZE = 80;
export default class Field {
  constructor(carrotCount, bugCount) {
    this.gameField = document.querySelector('.game__field');
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
  }

  init() {
    this.gameField.innerHTML = ''
    this._addItems('carrot', 'img/carrot.png', this.carrotCount);
    this._addItems('bug', 'img/bug.png', this.bugCount);
  }

  _addItems(className, url, num) {
    const fieldRect = this.gameField.getBoundingClientRect();
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - IMG_SIZE;
    const y2 = fieldRect.height - IMG_SIZE;

    for(let i = 0; i < num; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', url)
      item.style.position = 'absolute'
      item.style.left = `${makeRandomNum(x1, x2)}px`
      item.style.top = `${makeRandomNum(y1, y2)}px`
      this.gameField.appendChild(item);
    };
  };
}

function makeRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}