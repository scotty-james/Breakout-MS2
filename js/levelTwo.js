"strict";
/*jshint esversion: 6 */

levelTwo = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelTwo" });
  },
  init() {
    this.gameHasStarted = false;
    this.gameOver = false;
    this.score = 0;
    this.lives = 3;
    this.fontStyle = {
      fontSize: "3.2rem",
      fontFamily: "Righteous, sans-serif",
    };
    this.scale = 0.25;
  },
  preload() {},
  create() {
    this.add.image(400, 350, "space3");
    this.cameras.main.fadeIn(1000, 0, 0, 0);

    this.createGameText();
    this.createPlayer();
    this.createBall();
    this.createCursors();
    this.createBricks();
    this.createWorldCollsion();
    this.createGameCollision();
    this.createSounds();
    this.createKillerBrick();

    this.activeBricks = () =>
      this.brick7.countActive() +
      this.brick8.countActive() +
      this.brick6.countActive() +
      this.brick3.countActive() +
      this.brick4.countActive() +
      this.brick5.countActive();

    this.explode = () =>
      this.add.sprite(this.ball.x, this.ball.y, "boom").play("explode1");
  },

  createGameText() {
    this.gameScoreText = this.add.text(
      20,
      20,
      `Score: ${this.score}`,
      this.fontStyle
    );

    this.gameStartText = this.add
      .text(400, 400, "Press SPACEBAR to Start Game!", this.fontStyle)
      .setOrigin(0.5);

    this.levelText = this.add.text(670, 20, "Level: 2", this.fontStyle);

    this.livesText = this.add.text(
      670,
      620,
      `Lives: ${this.lives}`,
      this.fontStyle
    );
  },
  createPlayer() {
    this.player = this.physics.add.sprite(400, 620, "player");
    this.player.scaleX = this.scale;
    this.player.scaleY = this.scale;
  },
  createBall() {
    this.ball = this.physics.add.sprite(400, 565, "ball");
    this.ball.scaleX = this.scale;
    this.ball.scaleY = this.scale;
  },
  createCursors() {
    this.cursors = this.input.keyboard.createCursorKeys();
  },
  createBricks() {
    this.brick7 = this.physics.add.group({
      key: "brick7",
      immovable: true,
      repeat: 5,
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 150,
        y: 290,
        stepX: 100,
      },
    });
    this.brick8 = this.physics.add.group({
      key: "brick8",
      immovable: true,
      repeat: 6,
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 100,
        y: 250,
        stepX: 100,
      },
    });

    this.brick6 = this.physics.add.group({
      key: "brick6",
      immovable: true,
      repeat: 18,
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 40,
        y: 210,
        stepX: 40,
      },
    });

    this.brick3 = this.physics.add.group({
      key: "brick3",
      immovable: true,
      repeat: 6,
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 100,
        y: 170,
        stepX: 100,
      },
    });

    this.brick4 = this.physics.add.group({
      key: "brick4",
      immovable: true,
      repeat: 5,
      setScale: { x: this.scale, y: this.scale },
      setXY: {
        x: 150,
        y: 130,
        stepX: 100,
      },
    });

    this.brick5 = this.physics.add.group({
      key: "brick5",
      immovable: true,
      setScale: { x: 0.35, y: this.scale },
      repeat: 2,
      setXY: {
        x: 260,
        y: 90,
        stepX: 140,
      },
    });
  },
  createWorldCollsion() {
    this.player.setCollideWorldBounds(true);
    this.ball.setCollideWorldBounds(true);
    this.physics.world.checkCollision.down = false;
  },
  createGameCollision() {
    this.physics.add.collider(
      this.ball,
      this.brick7,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick8,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick6,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick3,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick4,
      this.smashBrick,
      null,
      this
    );
    this.physics.add.collider(
      this.ball,
      this.brick5,
      this.smashBrick,
      null,
      this
    );

    this.physics.add.collider(
      this.ball,
      this.player,
      this.ballHitPlayer,
      null,
      this
    );
  },
  createSounds() {
    this.playerHitSound = "playerHit";
    this.brickHitSound = "brickHit";
  },
  createKillerBrick() {
    this.killerBrick = this.physics.add.group();
    this.physics.add.collider(
      this.player,
      this.killerBrick,
      this.hitKillerBrick,
      null,
      this
    );
  },

  update() {
    this.updatedCursorMoves();
    this.updateBallMoves();
    this.updatePlayerMoves();
    this.updateLoseLives();
    this.updateWinLose();
  },
  updatedCursorMoves() {
    this.PlayerMoveleft = this.cursors.left.isDown;
    this.PlayerMoveRight = this.cursors.right.isDown;
    this.spacebarIsDown = this.cursors.space.isDown;
  },

  updateBallMoves() {
    if (this.gameHasStarted === false) {
      this.ball.setX(this.player.x);

      if (this.spacebarIsDown) {
        this.gameHasStarted = true;
        this.ball.setVelocityY(-350);
        this.ball.setVelocityX(350);
        this.gameStartText.setVisible(false);
      }
    }
    this.ball.setBounce(1, 1);
    this.ball.setFriction(0, 0);
  },
  updatePlayerMoves() {
    if (this.PlayerMoveleft) {
      this.player.setVelocityX(-700);
    } else if (this.PlayerMoveRight) {
      this.player.setVelocityX(700);
    } else {
      this.player.setVelocityX(0);
    }
    this.player.setImmovable(true);
  },
  updateLoseLives() {
    if (this.ball.y > this.player.y) {
      this.lives--;
      {
        if (this.lives > 0) {
          this.livesText.setText(`Lives: ${this.lives}`);
          this.ballReset();
        } else {
          this.gameOver = true;
        }
      }
    }
  },
  updateWinLose() {
    if (this.gameLost() === true) {
      this.ball.disableBody(true, true);
      this.gameHasStarted = false;
      this.player.setTint(0xff1111);
      this.time.addEvent({
        delay: 1500,
        loop: false,
        callback: () => {
          this.scene.start("levelLost", this.score);
        },
      });
    } else if (this.gameWon() === true) {
      this.ball.disableBody(true, true);
      this.gameHasStarted = false;
      this.scene.start("levelComplete", this.score);
    }
  },
  smashBrick(ball, brick) {
    this.score += 25;
    this.gameScoreText.setText(`Score: ${this.score}`);
    this.sound.play("brickHitSound");
    brick.disableBody(true, true);

    const explode = {
      key: "explode1",
      frames: "boom",
      frameRate: 20,
    };

    this.anims.create(explode);
    this.brickExplode();
  },
  ballHitPlayer(ball, player) {
    this.sound.play("playerHitSound");
    this.ball.setVelocityY(this.ball.body.velocity.y - 15);

    if (this.activeBricks() < 20) {
      const x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);

      const killerBrick = this.killerBrick.create(x, 15, "killer");
      killerBrick.setBounce(1.1);
      killerBrick.setCollideWorldBounds(true);
      killerBrick.setVelocityY(-300);
    }
  },

  hitKillerBrick(player, killerBrick) {
    this.playerExplode();
    this.physics.pause();
    killerBrick.disableBody(true);
    this.gameOver = true;
  },

  ballReset() {
    this.ball.setVelocity(0);
    this.ball.setPosition(this.player.x, 565);
    this.gameHasStarted = false;
  },

  brickExplode() {
    this.add.sprite(this.ball.x, this.ball.y, "boom").play("explode1");
  },

  playerExplode() {
    this.add.sprite(this.player.x, this.player.y, "boom").play("explode1");
  },

  gameLost() {
    if (this.gameOver === true) {
      return true;
    }
  },
  gameWon() {
    if (this.activeBricks() === 0) {
      return true;
    }
  },
});
