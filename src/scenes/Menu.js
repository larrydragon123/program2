class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }


  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
  }
  create() {
    let menuConfig = {
      frontFamily: 'Courier',
      frontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }


    //show menu text
    this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, 'ROKET PATROL', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2, 'Use <- -> arrows to move & (↑) to fire', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding)*2, 'Press T for Two Players Mod', menuConfig).setOrigin(0.5);


    //display high score
    let highScoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 300
    }
    this.scoreHigh = this.add.text(borderUISize + borderPadding * 25, borderUISize + borderPadding * 2, 'Highest Score: '+ highScore, highScoreConfig);

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  }


  update() {
    let menuConfig = {
      frontFamily: 'Courier',
      frontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      }
      
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
    
    if (Phaser.Input.Keyboard.JustDown(keyT)) {
      twoPlayers=true;
      this.sound.play('sfx_select');
      this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding)*4, 'Two Players Mod Activated', menuConfig).setOrigin(0.5);
      this.add.text(game.config.width / 2, game.config.height / 2 + (borderUISize + borderPadding)*5, 'Plaeyr2 use A,D to move, and W to shoot', menuConfig).setOrigin(0.5);

    }


  }

}

// console.log("this");