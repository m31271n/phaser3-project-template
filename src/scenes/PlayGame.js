import Phaser from 'phaser'

const TREE_TRUNK_HEIGHT = 243 // the height of trunk1 / trunk2 image
const TREE_ROOT_POSITION = 1450
const PLAYER_POSITION_LEFT = 'left'
const PLAYER_POSITION_RIGHT = 'right'
const PLAYER_POSITION_Y = 1520

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame')

    this.trunks = ['trunk1', 'trunk2']
    this.branches = ['branchLeft', 'branchRight']
  }

  setup() {
    this.gameWidth = this.game.config.width
    this.gameHeight = this.game.config.height
    this.gameCenterX = this.gameWidth / 2
    this.gameCenterY = this.gameHeight / 2
  }

  create() {
    this.setup()

    this.addBG()
    this.addTree()
    this.addPlayer()

    this.enableControl()

    this.addCorners()
  }

  addBG() {
    const bg = new Phaser.GameObjects.Sprite(this, 0, 0, 'background')
      .setOrigin(0.5, 1)
      .setPosition(this.gameCenterX, this.gameHeight)

    this.add.existing(bg)
  }

  addTree() {
    const x = this.gameCenterX
    const y = TREE_ROOT_POSITION
    const stump = new Phaser.GameObjects.Sprite(this, x, y, 'stump')
    stump.setOrigin(0.485, 0)

    this.add.existing(stump)

    this.tree = this.add.group()

    for (let i = 0; i < 6; i++) {
      this.addBlock()
    }

    this.canCut = true
  }

  addPlayer() {
    const breathFrames = this.anims.generateFrameNames('man', {
      prefix: 'breath',
      start: 1,
      end: 2,
      zeroPad: 2,
    })

    this.anims.create({
      key: 'breath',
      frames: breathFrames,
      frameRate: 3,
      repeat: -1,
    })

    const cutFrames = this.anims.generateFrameNames('man', {
      prefix: 'cut',
      start: 1,
      end: 3,
      zeroPad: 2,
    })

    const cutAnimation = this.anims.create({
      key: 'cut',
      frames: cutFrames,
      frameRate: 15,
    })

    const { ANIMATION_COMPLETE } = Phaser.Animations.Events
    cutAnimation.on(ANIMATION_COMPLETE, () => {
      this.player.play('breath')
    })

    const player = new Phaser.GameObjects.Sprite(this, 0, 0, 'man')
    player.setOrigin(0.5, 1)
    const x = player.width / 2
    const y = PLAYER_POSITION_Y
    player.setPosition(x, y)
    this.add.existing(player)

    player.play('breath')

    this.player = player
    this.playerPosition = PLAYER_POSITION_LEFT
  }

  movePlayerToLeft() {
    const x = this.player.width / 2
    const y = PLAYER_POSITION_Y
    this.player.setFlipX(false).setPosition(x, y)

    this.player.play('cut')
    this.playerPosition = PLAYER_POSITION_LEFT
  }

  movePlayerToRight() {
    const x = this.gameWidth - this.player.width / 2
    const y = PLAYER_POSITION_Y
    this.player.setFlipX(true).setPosition(x, y)

    this.player.play('cut')
    this.playerPosition = PLAYER_POSITION_RIGHT
  }

  enableControl() {
    const { SPACE, LEFT, RIGHT } = Phaser.Input.Keyboard.KeyCodes

    const keySpace = this.input.keyboard.addKey(SPACE)
    const keyLeft = this.input.keyboard.addKey(LEFT)
    const keyRight = this.input.keyboard.addKey(RIGHT)

    keySpace.on('down', () => console.log('SPACE'))
    keyLeft.on('down', () => this.movePlayerToLeft())
    keyRight.on('down', () => this.movePlayerToRight())

    this.input.on('pointerdown', ({ x }) => {
      if (x <= this.gameWidth / 2) {
        this.movePlayerToLeft()
      } else {
        this.movePlayerToRight()
      }
    })
  }

  get randomTrunkKey() {
    const trunks = this.trunks
    const index = Phaser.Math.Between(0, trunks.length - 1)
    const key = trunks[index]
    return key
  }

  get randomBranchKey() {
    const branchs = this.branches
    const index = Phaser.Math.Between(0, branchs.length - 1)
    const name = branchs[index]
    return name
  }

  get randomBlockKey() {
    return Math.random() * 4 <= 1 ? this.randomTrunkKey : this.randomBranchKey
  }

  isBranch(key) {
    const branchs = this.branches
    return branchs.includes(key)
  }

  addBlock() {
    const index = this.tree.getLength()

    const isFirstTwoBlock = index < 2
    const lastTrunk = this.tree.getLast(true)
    const isLastTrunkIsBranch = this.isBranch(
      lastTrunk && lastTrunk.texture.key
    )

    let key
    if (isFirstTwoBlock || isLastTrunkIsBranch) {
      key = this.randomTrunkKey
    } else {
      key = this.randomBlockKey
    }

    const trunk = new Phaser.GameObjects.Sprite(
      this,
      this.gameCenterX,
      TREE_ROOT_POSITION - TREE_TRUNK_HEIGHT * index,
      key
    ).setOrigin(0.5, 1)

    this.add.existing(trunk)
    this.tree.add(trunk)
  }

  update() {
    const { topLeft, topRight, bottomLeft, bottomRight } = this

    this.setWidgetPosition({ target: topLeft, top: 50, left: 50 })
    this.setWidgetPosition({ target: topRight, top: 50, right: 50 })
    this.setWidgetPosition({ target: bottomLeft, bottom: 50, left: 50 })
    this.setWidgetPosition({ target: bottomRight, bottom: 50, right: 50 })
  }

  addCorners() {
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
