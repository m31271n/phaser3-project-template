import Phaser from 'phaser'
import BootGame from './scenes/BootGame'
import PlayGame from './scenes/PlayGame'

const config = {
  backgroundColor: 0xecf0f1,
  autoFocus: true,
  type: Phaser.AUTO,
  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  scene: [BootGame, PlayGame],
}

window.onload = function() {
  const game = new Phaser.Game(config)
  window.game = game
}
