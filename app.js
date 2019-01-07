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

