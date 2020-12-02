'use strict'

import GameBuilder from './game.js'

const game = new GameBuilder()
  .withCarrotCount(2)
  .withBugCount(3)
  .withTimeDuration(3)
  .build();