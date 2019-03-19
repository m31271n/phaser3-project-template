import Phaser from 'phaser'
import _logo from 'assets/logo.png'

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame')
  }

  preload() {
    this.load.image('logo', _logo)
  }

  create() {
    const logo = this.add.image(400, 150, 'logo')

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    })
  }
}

export default PlayGame
