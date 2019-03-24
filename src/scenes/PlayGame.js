import Phaser from 'phaser'

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame')
  }

  create() {
    const { width, height } = this.game.config
    const x = width / 2
    const y = height / 2
    const logo = this.add.image(x, y, 'logo')

    this.tweens.add({
      targets: logo,
      y: y - 100,
      duration: 1000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    })

    this.topLeft = this.add
      .image(0, 0, 'rect')
      .setTint(0x00ff00)
      .setInteractive()
      .on('pointerup', () => {
        console.log('TOP LEFT')
      })

    this.topRight = this.add
      .image(0, 0, 'rect')
      .setTint(0x00ff00)
      .setInteractive()
      .on('pointerup', () => {
        console.log('TOP RIGHT')
      })

    this.bottomLeft = this.add
      .image(0, 0, 'rect')
      .setTint(0x00ff00)
      .setInteractive()
      .on('pointerup', () => {
        console.log('BOTTOM LEFT')
      })

    this.bottomRight = this.add
      .image(0, 0, 'rect')
      .setTint(0x00ff00)
      .setInteractive()
      .on('pointerup', () => {
        console.log('BOTTOM RIGHT')
      })
  }

  update() {
    const { topLeft, topRight, bottomLeft, bottomRight, } = this

    this.setWidgetPosition({ target: topLeft, top: 50, left: 50 })
    this.setWidgetPosition({ target: topRight, top: 50, right: 50 })
    this.setWidgetPosition({ target: bottomLeft, bottom: 50, left: 50 })
    this.setWidgetPosition({ target: bottomRight, bottom: 50, right: 50 })
  }

  setWidgetPosition({ target, top, bottom, left, right }) {
    // $ indicates that the unit is CSS pixel.
    const bounds = this.game.scale.canvasBounds

    const $width = this.game.scale.displaySize.width
    const $height = this.game.scale.displaySize.height

    let $x
    let $y
    let $viewportWidth
    let $viewportHeight

    if (this.game.scale.shouldRotate) {
      $x = bounds.y
      $y = bounds.x
      $viewportWidth = window.innerHeight
      $viewportHeight = window.innerWidth
    } else {
      $x = bounds.x
      $y = bounds.y
      $viewportWidth = window.innerWidth
      $viewportHeight = window.innerHeight
    }

    // No $ indicates that the unit is physical pixel.
    const { width, height } = this.game.config

    // this scale is required when converting CSS size into canvas size.
    const { x: scaleX, y: scaleY } = this.game.scale.displayScale

    // adjust $left, $top, $right, $bottom according the scale mode
    const $properLeft = $x >= 0 ? 0 : -$x
    const $properTop = $y >= 0 ? 0 : -$y

    const $properWidth = $width > $viewportWidth ? $viewportWidth : $width
    const $properHeight = $height > $viewportHeight ? $viewportHeight : $height
    const $properRight = $properLeft + $properWidth
    const $properBottom = $properTop + $properHeight

    const boundLeft = $properLeft * scaleX
    const boundTop = $properTop * scaleY
    const boundRight = $properRight * scaleX
    const boundBottom = $properBottom * scaleY

    let x
    let y

    if (left !== undefined) x = boundLeft + left
    if (top !== undefined) y = boundTop + top
    if (right !== undefined) x = boundRight - right
    if (bottom !== undefined) y = boundBottom - bottom

    target.setPosition(x, y)
  }
}

export default PlayGame
