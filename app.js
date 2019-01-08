// build a config object will all the settings
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  //    width: "100vw",
  //    height: "100vh",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

// build the game and start // giving the config as a parameter
var game = new Phaser.Game(config);

// preload function to load assets before the game
function preload() {
  this.load.image("ground", "assets/platform.png");
  this.load.image("pika", "assets/pika.png");

  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
}

// declare all items
var platforms;
var player;
var keyboard;

// create function gets ran at start of game
function create() {
  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, "ground")
    .setScale(2)
    .refreshBody();
  //    platforms.create(400, 500, "pika").setScale(0.2).refreshBody();
  //    platforms.create(450, 450, "pika").setScale(0.2).refreshBody();

  // add dynamic physics to player body // player has 9 frames total ==> 4 for running left ==> 1 for facing the camera ==> 4 for running right
  player = this.physics.add.sprite(100, 450, "dude");
  // set bounce scale for player
  player.setBounce(0.1);
  // don't allow player to leave screen so add colition with world borders to true
  player.setCollideWorldBounds(true);

  // build the running animation

  // running left animation
  this.anims.create({
    key: "left",
    // frames 0-3 for left
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  // Front/turning sprite
  this.anims.create({
    key: "turn",
    frames: [
      {
        key: "dude",
        frame: 4
      }
    ],
    frameRate: 20
  });

  // running right animation
  this.anims.create({
    key: "right",
    // frames 0-3 for right
    frames: this.anims.generateFrameNumbers("dude", {
      start: 5,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  });

  // add a collision relation between player and platforms
  this.physics.add.collider(player, platforms);
}

function update() {
    // if (player.x < 30 || player.x > 770) {
    //     player.setVelocityY(-150);
    //     console.log("true")
    // }


  cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    // if left arrow is pressed
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    // if right arrow is pressed
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else {
    // if neither
    player.setVelocityX(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    // if user jumps while on the ground
    player.setVelocityY(-150);
  }
}
