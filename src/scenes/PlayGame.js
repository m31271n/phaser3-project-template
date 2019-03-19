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

    this.rect = this.add.image(0, 0, 'rect').setTint(0x00ff00)
  }

  update() {
    this.setWidgetPosition({ left: 50, bottom: 50 })
  }

  setWidgetPosition({ top, bottom, left, right }) {
    // $ indicates that the unit is CSS pixel.
    const {
      left: $left,
      top: $top,
      bottom: $bottom,
      right: $right,
      width: $width,
      height: $height,
    } = this.game.canvas.getBoundingClientRect()
    const { innerWidth: $viewportWidth, innerHeight: $viewportHeight } = window

    // No $ indicates that the unit is physical pixel.
    const { width, height } = this.game.config

    // this scale is required when converting CSS size into canvas size.
    const scaleRatio = width / $width

    const adjustedLeft = $left >= 0 ? 0 : -$left
    const adjustedTop = $top >= 0 ? 0 : -$top
    const adjustedWidth = $width > $viewportWidth ? $viewportWidth : $width
    const adjustedHeight = $height > $viewportHeight ? $viewportHeight : $height
    const adjustedRight = adjustedLeft + adjustedWidth
    const adjustedBottom = adjustedTop + adjustedHeight

    const boundLeft = adjustedLeft * scaleRatio
    const boundTop = adjustedTop * scaleRatio
    const boundRight = adjustedRight * scaleRatio
    const boundBottom = adjustedBottom * scaleRatio

    let x
    let y

    if (left !== undefined) x = boundLeft + left
    if (top !== undefined) y = boundTop + top
    if (right !== undefined) x = boundRight - right
    if (bottom !== undefined) y = boundBottom - bottom

    this.rect.setPosition(x, y)
  }
}

export default PlayGame
