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
import _font from 'assets/fonts/stacked-pixel.ttf'

class BootGame extends Phaser.Scene {
  constructor() {
    super('BootGame')
  }

  init() {
    const { width, height } = this.game.config
    this.gameWidth = width
    this.gameHeight = height
    this.gameCenterX = width / 2
    this.gameCenterY = height / 2
  }

  preload() {
    this.load.webFont('Stacked Pixel', _font)
  }

  create() {
    const progressBoxX = 200
    const progressBoxY = this.gameCenterY
    const progressBoxWidth = this.gameWidth - 2 * progressBoxX
    const progressBoxHeight = 70

    const progressBarX = progressBoxX + 10
    const progressBarY = progressBoxY + 10
    const progressBarWidth = progressBoxWidth - 20
    const progressBarHeight = progressBoxHeight - 20

    const percentTextX = this.gameCenterX
    const percentTextY = this.gameCenterY + progressBoxHeight / 2

    const assetTextX = this.gameCenterX
    const assetTextY = this.gameCenterY + 100

    const progressBar = this.add.graphics()

    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.5)
    progressBox.fillRect(
      progressBoxX,
      progressBoxY,
      progressBoxWidth,
      progressBoxHeight
    )

    const percentText = this.add
      .text(percentTextX, percentTextY, '0%', {
        fontFamily: 'Stacked Pixel',
        fontSize: 40,
        color: '#ffffff',
      })
      .setOrigin(0.5)

    const assetText = this.add
      .text(assetTextX, assetTextY, '', {
        fontFamily: 'Stacked Pixel',
        fontSize: 40,
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5)

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

    this.load.on('progress', function(progress) {
      progressBar.clear()
      progressBar.fillStyle(0xffffff, 1)
      progressBar.fillRect(
        progressBarX,
        progressBarY,
        progressBarWidth * progress,
        progressBarHeight
      )

      percentText.setText(Number.parseInt(progress * 100) + '%')
    })

    this.load.on('fileprogress', function(file) {
      assetText.setText('Loading asset: ' + file.src)
    })

    this.load.once('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      percentText.destroy()
      assetText.destroy()

      this.nextScene()
    })

    this.load.start()
  }

  nextScene() {
    this.scene.start('PlayGame')
  }
}

export default BootGame
