import Phaser from "phaser";
import PreloadScene from "./PreloadScene";
import GameScene from "./GameScene";
import LevelCompleteScene from "./LevelCompleteScene";

const config = {
  type: Phaser.AUTO,
  parent: "Milestone 2",
  width: 800,
  height: 600,
  scene: [PreloadScene, GameScene, LevelCompleteScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: false,
      debug: false,
    },
  },
};
export { config };
