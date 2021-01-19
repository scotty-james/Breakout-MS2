"strict";
/*jshint esversion: 6 */

levelLost = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "levelLost" });
  },
  init() {
    this.fontStyle = {
      fontSize: "5rem",
      fontFamily: "Righteous, sans-serif",
    };
    this.smallFont = {
      fontSize: "3rem",
      fontFamily: "Righteous, sans-serif",
    };
  },
  preload() {},
  create(data) {
    this.add.image(400, 520, "background");

    this.GameOverText = this.add
      .text(400, 200, "GAME OVER!", this.fontStyle)
      .setOrigin(0.5);

    this.GameOverText = this.add
      .text(400, 300, `You Scored ${data} Points`, this.smallFont)
      .setOrigin(0.5);

    this.GameOverText = this.add
      .text(400, 400, "Click Anywhere To Try Again!", this.smallFont)
      .setOrigin(0.5);

    this.input.on("pointerdown", () => {
      this.cameras.main.fadeOut(1000, 0, 0, 0);
    });
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      (cam, effect) => {
        this.scene.start("levelOne");
      }
    );
  },
});
