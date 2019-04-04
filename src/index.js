import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Phaser from 'phaser'
import BootGame from './scenes/BootGame'
import PlayGame from './scenes/PlayGame'
import env from './util/env'
import dc from './util/device-compatibility'

// remove useless reference of Phaser
delete window.Phaser

dc.disableScroll()

const config = {
  backgroundColor: 0x000000,
  banner: !env.isProduction(),
  autoFocus: true,
  type: Phaser.AUTO,
  parent: 'game-container',
  scaleMode: Phaser.Scale.ENVELOP,
  forceOrientation: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1080,
  height: 1750,
  scene: [BootGame, PlayGame],
  physics: {
    default: 'arcade',
  },
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
