/// <reference path="../phaser/phaser.min.js" />

var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


// Game variables
var game = new Phaser.Game(config);
var gameLevel;
var gameSpeed;

// Background/tile variables
var background_0;
var background_1;
var background0ScrollSpeed = 0.4;
var background1ScrollSpeed = 0.5;

// Player variables
var player;
var playerSpeed = 250;
var playerBullets;
var playerBulletSpeed = 400;
var playerFireRate = 5;
var bulletTimer = 0;
var playerBulletYOffset = 20;

// Enemy reguld variables
var eRegulds;
var eReguld;
var eReguldSpeed = 200;
var eReguldInterval = 3;

// Input variables
var noKeys;
var keyShoot;
var keyLeft;
var keyRight;
var keyUp;
var keyDown;

function preload ()
{
    this.load.image('stars_bg_0', 'assets/backgrounds/stars_bg_0.png');
    this.load.image('stars_bg_1', 'assets/backgrounds/stars_bg_1.png');

    this.load.image('player_bullet', 'assets/sprites/vf1/player_bullet.png');
    this.load.spritesheet('vf1_sp', 'assets/sprites/vf1/vf1_sp.png', { frameWidth: 32, frameHeight: 37});
    this.load.spritesheet('vf1_turn_l', 'assets/sprites/vf1/vf1_turn_l.png', { frameWidth: 32, frameHeight: 37});
    this.load.spritesheet('vf1_turn_r', 'assets/sprites/vf1/vf1_turn_r.png', { frameWidth: 32, frameHeight: 37});

    this.load.spritesheet('reguld_sp', 'assets/sprites/reguld/reguld_sp.png', { frameWidth: 33, frameHeight: 37});
    this.load.spritesheet('reguld_move', 'assets/sprites/reguld/reguld_move.png', { frameWidth: 33, frameHeight: 37});
}

function create ()
{
    // Keycode definitions
    keyShoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    // Background definitions
    background_0 = this.add.tileSprite(300, 400, 600, 800, 'stars_bg_0');
    background_1 = this.add.tileSprite(300, 400, 600, 800, 'stars_bg_1');

    // Player inits
    player = this.physics.add.sprite(300, 750, 'vf1_sp');
    player.setCollideWorldBounds(true);

    playerBullets = this.physics.add.group();

    // Enemy Reguld inits
    eRegulds = this.physics.add.group({
        key: 'reguld_sp',
        repeat: 2,
        setXY: { x: 40, y: 40, stepX: 70 }
    });

    // Colliders
    this.physics.add.collider(eRegulds, playerBullets);

    // Player animations
    this.anims.create({
        key: 'thrusters',
        frames: this.anims.generateFrameNumbers('vf1_sp', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn_l',
        frames: this.anims.generateFrameNumbers('vf1_turn_l', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn_r',
        frames: this.anims.generateFrameNumbers('vf1_turn_r', { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    // Enemy Reguld animations
    this.anims.create({
        key: 'reguld_move',
        frames: this.anims.generateFrameNumbers('reguld_move', { start: 0, end : 1}),
        frameRate: 10,
        repeat: -1
    });
}

function update ()
{
    eRegulds.children.iterate(function(child)
    {
        child.anims.play('reguld_move', true);
    });

    // Scroll backgrounds
    background_0.tilePositionY -= background0ScrollSpeed;
    background_1.tilePositionY -= background1ScrollSpeed;

    // Player shooting
    if (keyShoot.isDown && bulletTimer <= 0)
    {
        var playerBullet = playerBullets.create(player.x, player.y - playerBulletYOffset, 'player_bullet');
        playerBullet.setVelocityY(-playerBulletSpeed - playerSpeed);
        bulletTimer = playerFireRate;
    }
    else
    {
        bulletTimer--;
    }

    playerBullets.children.iterate(function (child) {
        if (child.y <= 0)
        {
            child.destroy();
        }
    });

    // Player movement and animations by keyboard input
    if (keyLeft.isDown)
    {
        player.setVelocityX(-playerSpeed);
        player.anims.play('turn_l', true);
    }
    else if (keyRight.isDown)
    {
        player.setVelocityX(playerSpeed);
        player.anims.play('turn_r', true);
    }
    else
    {
        player.anims.play('thrusters', true);
    }

    if (keyUp.isDown)
    {
        player.setVelocityY(-playerSpeed);
    }
    else if (keyDown.isDown)
    {
        player.setVelocityY(playerSpeed);
    }

    if (!keyUp.isDown && !keyDown.isDown)
    {
        player.setVelocityY(0);
    }

    if (!keyLeft.isDown && !keyRight.isDown)
    {
        player.setVelocityX(0);
    }
}
