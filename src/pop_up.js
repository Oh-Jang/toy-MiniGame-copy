'use strict';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpReplayBtn = document.querySelector('.pop-up__btn');
    this.popUpReplayBtn.addEventListener('click', () => {
      this.onClick && this.onClick();
      this.hide();
    });
    this.popUpText = document.querySelector('.pop-up__text');
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.textContent = text
    this.popUp.classList.remove('pop-up-hide')
  }

  hide() {
    this.popUp.classList.add('pop-up-hide')
  }
}
