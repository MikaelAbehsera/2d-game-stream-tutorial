// build a config object will all the settings
var config = {
    type: Phaser.AUTO,
    width: "100vw",
    height: "100vh",
    //width: "100vw",
    //height: "100vh",
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
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude",
        "assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48
        }
    );
}

// create function gets ran at start of game
function create() {

    // add player to the game
    player = this.physics.add.sprite(100, 450, "dude");
    // set bounce scale for player
    player.setBounce(0.2);
    // don't allow player to leave screen so add colition with world borders to true
    player.setCollideWorldBounds(true); 4


}

