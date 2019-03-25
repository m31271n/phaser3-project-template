import Phaser from 'phaser'
import BootGame from './scenes/BootGame'
import PlayGame from './scenes/PlayGame'
import env from './util/env'
import dc from './util/device-compatibility'

// remove useless reference of Phaser
delete window.Phaser

dc.disableScroll()

const config = {
  backgroundColor: 0xecf0f1,
  banner: !env.isProduction(),
  autoFocus: true,
  type: Phaser.AUTO,
  parent: 'game-container',
  scaleMode: Phaser.Scale.FIT,
  forceOrientation: true,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 1080,
  height: 1750,
  scene: [BootGame, PlayGame],
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
