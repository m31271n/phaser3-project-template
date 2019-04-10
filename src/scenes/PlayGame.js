import Phaser from 'phaser'

let GAME_OVER = false

const TREE_ROOT_POSITION = 1450
const TREE_TRUNK_HEIGHT = 243 // the height of trunk1 / trunk2 image
const TREE_TRUNK_VELOCITY_X = 1000
const TREE_TRUNK_VELOCITY_Y = 600
const TREE_TRUNK_GRAVITY = 2000

const PLAYER_POSITION_LEFT = 'left'
const PLAYER_POSITION_RIGHT = 'right'
const PLAYER_POSITION_Y = 1520

const DEPTH_TOP = 1
const DEPTH_MENU = 2

class PlayGame extends Phaser.Scene {
  constructor() {
    super('PlayGame')

    this.currentScore = 0
    this.trunks = ['trunk1', 'trunk2']
    this.branches = ['branchLeft', 'branchRight']
  }

  create() {
    this.setup()

    this.soundTheme.play()

    this.addBG()
    this.addTree()
    this.addScore()
    this.addPlayer()

    this.enableControl()

    this.addCorners()
  }

  update() {
    this.renderScore()
    const { topLeft, topRight, bottomLeft, bottomRight } = this

    Phaser.Display.Align.Viewport.Set(topLeft, { top: 50, left: 50 })
    Phaser.Display.Align.Viewport.Set(topRight, { top: 50, right: 50 })
    Phaser.Display.Align.Viewport.Set(bottomLeft, { bottom: 50, left: 50 })
    Phaser.Display.Align.Viewport.Set(bottomRight, { bottom: 50, right: 50 })
  }

  setup() {
    this.gameWidth = this.game.config.width
    this.gameHeight = this.game.config.height
    this.gameCenterX = this.gameWidth / 2
    this.gameCenterY = this.gameHeight / 2

    this.soundTheme = this.sound.add('theme', { loop: true })
    this.soundCut = this.sound.add('cut')
    this.soundDeath = this.sound.add('death')
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
  }

  addScore() {
    this.score = this.add
      .text(this.gameCenterX, 300, this.currentScore, {
        fontFamily: 'Stacked Pixel',
        color: '#ffffff',
        fontSize: 120,
      })
      .setStroke('#000000', 14)
      .setOrigin(0.5, 0)
      .setDepth(DEPTH_TOP)
  }

  renderScore() {
    this.score.setText(this.currentScore)
  }

  increaseScore() {
    this.currentScore += 1
  }

  resetScore() {
    this.currentScore = 0
  }

  addBtnPlay() {
    const btnPlay = this.add
      .image(this.gameCenterX, 1200, 'btn-play')
      .setDepth(DEPTH_MENU)
      .setInteractive()

    btnPlay.on('pointerdown', () => {
      btnPlay.y += 10
    })

    btnPlay.on('pointerup', () => {
      btnPlay.y -= 10
      this.restart()
    })
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
      frameRate: 5,
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
    player.setDepth(DEPTH_TOP)
    const x = player.width / 2
    const y = PLAYER_POSITION_Y
    player.setPosition(x, y)
    this.add.existing(player)

    player.play('breath')

    this.player = player
    this.playerPosition = PLAYER_POSITION_LEFT
  }

  enableControl() {
    this.canCut = true

    const { SPACE, LEFT, RIGHT } = Phaser.Input.Keyboard.KeyCodes

    const keySpace = this.input.keyboard.addKey(SPACE)
    const keyLeft = this.input.keyboard.addKey(LEFT)
    const keyRight = this.input.keyboard.addKey(RIGHT)

    keySpace.on('down', () => {
      if (!GAME_OVER) return
      this.restart()
    })

    keyLeft.on('down', () => {
      if (GAME_OVER) return
      this.cutLeft()
    })

    keyRight.on('down', () => {
      if (GAME_OVER) return
      this.cutRight()
    })

    this.input.on('pointerdown', ({ x }) => {
      if (GAME_OVER) return

      if (x <= this.gameWidth / 2) {
        this.cutLeft()
      } else {
        this.cutRight()
      }
    })
  }

  cutLeft() {
    if (!this.canCut) return

    this.movePlayerToLeft()
    this.checkDeath()

    this.addBlock()
    this.removeBlock()
    this.checkDeath()

    if (!GAME_OVER) {
      this.increaseScore()
    }
  }

  cutRight() {
    if (!this.canCut) return

    this.movePlayerToRight()
    this.checkDeath()

    this.addBlock()
    this.removeBlock()
    this.checkDeath()

    if (!GAME_OVER) {
      this.increaseScore()
    }
  }

  movePlayerToLeft() {
    const x = this.player.width / 2
    const y = PLAYER_POSITION_Y
    this.player.setFlipX(false).setPosition(x, y)

    this.player.play('cut')
    this.soundCut.play()
    this.playerPosition = PLAYER_POSITION_LEFT
  }

  movePlayerToRight() {
    const x = this.gameWidth - this.player.width / 2
    const y = PLAYER_POSITION_Y
    this.player.setFlipX(true).setPosition(x, y)

    this.player.play('cut')
    this.soundCut.play()
    this.playerPosition = PLAYER_POSITION_RIGHT
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

  removeBlock() {
    const block = this.tree.getFirst(true)
    this.tree.remove(block)

    this.physics.add.existing(block)

    block.setOrigin(0.5)
    block.y -= block.height / 2
    block.setDepth(DEPTH_TOP)

    block.body.setVelocityY(-TREE_TRUNK_VELOCITY_Y)
    block.body.setGravityY(TREE_TRUNK_GRAVITY)

    switch (this.playerPosition) {
      case PLAYER_POSITION_LEFT:
        block.body.setVelocityX(TREE_TRUNK_VELOCITY_X)
        break

      case PLAYER_POSITION_RIGHT:
        block.body.setVelocityX(-TREE_TRUNK_VELOCITY_X)
        break

      default:
    }

    const blocks = this.tree.getChildren()

    this.canCut = false
    blocks.forEach(block => {
      this.tweens.add({
        targets: block,
        y: block.y + TREE_TRUNK_HEIGHT,
        duration: 50,
        onComplete: () => {
          this.canCut = true
        },
      })
    })
  }

  checkDeath() {
    const currentBlock = this.tree.getFirst(true)
    const { key } = currentBlock.texture

    if (
      (key === 'branchLeft' && this.playerPosition === PLAYER_POSITION_LEFT) ||
      (key === 'branchRight' && this.playerPosition === PLAYER_POSITION_RIGHT)
    ) {
      GAME_OVER = true
      this.soundTheme.stop()
      this.soundDeath.play()
      this.addBtnPlay()
    }
  }

  restart() {
    GAME_OVER = false
    this.resetScore()
    this.scene.start('PlayGame')
  }

  addCorners() {
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
}

export default PlayGame
