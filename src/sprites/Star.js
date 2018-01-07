import { Sprite } from 'phaser';
import { groups, sprites } from '../shared';

const spriteKey = 'star';

export default class Star extends Sprite {
  static key = spriteKey;

  /**
   * @param {Phaser.Game} game
   * @param {Number}      x
   * @param {Number}      y
   */
  constructor(game, x, y) {
    super(game, x, y, spriteKey);

    // Add sprite to the game.
    game.add.existing(this);

    // Enable physics for sprite.
    game.physics.arcade.enable(this);

    // Let gravity do its thing.
    this.body.gravity.y = 100;

    // This just gives each star a slightly random bounce value.
    this.body.bounce.y = 0.4 + Math.random() * 0.2;
  }

  collectStar(star, player) {
    // Removes the star from the screen.
    star.kill();
  }

  update() {
    const { game } = this;

    // Check for collision against the platforms so the stars won't fall
    // through to the bottom of the game.
    game.physics.arcade.collide(this, groups.platforms);

    // Check for an overlap between the player and star.
    game.physics.arcade.overlap(
      this,
      sprites.player,
      this.collectStar,
      null,
      this
    );
  }
}
