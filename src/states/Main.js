import { Physics, State } from 'phaser';
import { Ground, Sky } from '../sprites';
import { groups } from '../shared';

export default class Main extends State {
  /** State key. */
  static key = 'main';

  create() {
    const { game } = this;

    // We're going to be using physics, so enable the Arcade Physics system.
    this.physics.startSystem(Physics.ARCADE);

    // A simple background for our game.
    new Sky(game, 0, 0);

    // The platforms group contains the ground and the 2 ledges we can jump on.
    // It's created after the background so the order of layers (z-depth) is
    // maintained (otherwise, the platforms will be hidden by the background).
    groups.platforms = this.add.group();

    // Here we create the ground.
    const ground = new Ground(this.game, 0, this.world.height - 64);

    // Scale it to fit the width of the game.
    // (The original sprite is 400x32 in size.)
    ground.scale.setTo(2, 2);

    // Now let's create two ledges.
    [[400, 400], [-150, 250]].forEach(coordinates => {
      new Ground(game, ...coordinates);
    });
  }
}
