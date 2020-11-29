'use strict'

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpReplayBtn = document.querySelector('.pop-up__btn');
    this.popUpReplayBtn.addEventListener('click', () => {
      this.onClick();
      this.hide();
    });
    this.popUpText = document.querySelector('.pop-up__text');
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUpText.textContent = text
    this.popUp.style.visibility = 'visible'
  }

  hide() {
    this.popUp.style.visibility = 'hidden'
  }
}
