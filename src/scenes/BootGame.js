import Phaser from 'phaser'

class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame')
  }

  create() {
    const { width, height } = this.game.config
    const centerX = width / 2
    const centerY = height / 2

    this.add
      .text(centerX, centerY, 'Loading Game...', { color: '#000' })
      .setOrigin(0.5)

    // emulate elapsed time which is consumed by loader
    this.time.addEvent({
      delay: 2000,
      callbackScope: this,
      callback: this.nextScene,
    })
  }

  nextScene() {
    this.scene.start('PlayGame')
  }
}

export default BootGame
