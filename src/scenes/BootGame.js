import Phaser from 'phaser'
import _rect from 'assets/rect.png'
import _logo from 'assets/logo.png'
import _background from 'assets/sprites/background.png'
import _stump from 'assets/sprites/stump.png'
import _trunk1 from 'assets/sprites/trunk1.png'
import _trunk2 from 'assets/sprites/trunk2.png'
import _branchLeft from 'assets/sprites/branch_left.png'
import _branchRight from 'assets/sprites/branch_right.png'
import _man from 'assets/sprites/man.png'
import _man_json from 'assets/sprites/man.json'
import _btn_play from 'assets/sprites/btn-play.png'

import _theme_ogg from 'assets/sounds/theme.ogg'
import _theme_mp3 from 'assets/sounds/theme.mp3'
import _cut_ogg from 'assets/sounds/cut.ogg'
import _cut_mp3 from 'assets/sounds/cut.mp3'
import _death_ogg from 'assets/sounds/death.ogg'
import _death_mp3 from 'assets/sounds/death.mp3'

class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame')
  }

  preload() {
    this.load.image('rect', _rect)
    this.load.image('logo', _logo)

    this.load.image('background', _background)

    this.load.image('stump', _stump)
    this.load.image('trunk1', _trunk1)
    this.load.image('trunk2', _trunk2)
    this.load.image('branchLeft', _branchLeft)
    this.load.image('branchRight', _branchRight)
    this.load.image('btn-play', _btn_play)

    this.load.atlas('man', _man, _man_json)

    this.load.audio('theme', [_theme_ogg, _theme_mp3])
    this.load.audio('cut', [_cut_ogg, _cut_mp3])
    this.load.audio('death', [_death_ogg, _death_mp3])

    this.load.on('complete', () => {
      this.nextScene()
    })
  }

  create() {
    const { width, height } = this.game.config
    const centerX = width / 2
    const centerY = height / 2

    this.add
      .text(centerX, centerY, 'Loading Game...', { color: '#000' })
      .setOrigin(0.5)
  }

  nextScene() {
    this.scene.start('PlayGame')
  }
}

export default BootGame
