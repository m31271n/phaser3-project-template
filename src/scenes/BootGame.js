import Phaser from 'phaser'
import _rect from 'assets/rect.png'
import _logo from 'assets/logo.png'

class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame')
  }

  preload() {
    this.load.image('rect', _rect)
    this.load.image('logo', _logo)
  }

  create() {
    const { width, height } = this.game.config
    const centerX = width / 2
    const centerY = height / 2

    this.add
      .text(centerX, centerY, 'Loading Game...', { color: '#000' })
      .setOrigin(0.5)

    this.delay = this.time.addEvent({
      delay: 500,
      callbackScope: this,
      callback: this.nextScene,
    })
  }

  nextScene() {
    this.delay.remove()
    this.scene.start('PlayGame')
  }
}

export default BootGame
