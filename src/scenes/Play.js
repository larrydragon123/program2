class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  preload() {
    //load imagines
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('rocket2', './assets/rocket2.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');

    //load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 64,
      starFrame: 0,
      endFrame: 9

    });

  }
  create() {

    //place starfield
    this.starfiled = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    //green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width,
      borderUISize * 2, 0x00FF00).setOrigin(0, 0);
    //white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

    // add rocket(player 1 2)
    this.p1Rocket = new Rocket(this, game.config.width / 2 + 5, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    if(twoPlayers == true){
    this.p2Rocket = new Rocket2(this, game.config.width / 2 - 5, game.config.height - borderUISize - borderPadding, 'rocket2').setOrigin(0.5, 0);
    }

    // add spaceship (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

    //add score
    // initialize score
    
    this.p1Score = 0;
    if(twoPlayers == true){
    this.p2Score = 0;
    }


    //define keys
    keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 9,
        first: 0
      }),
      frameRate: 30
    });

    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 110
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, "P1:"+this.p1Score, scoreConfig);

    if(twoPlayers == true){let score2Config = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 110
    }
    this.scoreRight = this.add.text(borderUISize + borderPadding*13, borderUISize + borderPadding * 2, "P2:"+this.p2Score, score2Config);}


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


    // GAME OVER flag
    this.gameOver = false;
    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    // if(twoPlayers == true){score2Config.fixedWidth = 0;}
    this.clock = this.time.delayedCall(60000, () => {
      this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);

  }

  update() {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
      twoPlayers = false;
    }

    this.starfiled.tilePositionX -= starSpeed;


    if (!this.gameOver) {
      this.p1Rocket.update();         // update rocket sprite
      if(twoPlayers == true){
      this.p2Rocket.update();}         // update rocket sprite
      this.ship01.update();           // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
    }



    //checkCollision
    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      
      this.shipExplode(this.ship03);
      this.p1Score += this.ship03.points;
      this.scoreLeft.text = "P1:"+this.p1Score;
      // score += 30;
      // this.add.text(50,50,"Score: "+score);

    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
      this.p1Score += this.ship02.points;
      this.scoreLeft.text = "P1:"+this.p1Score;
      // score += 20;
      // this.add.text(50,50,"Score: "+score);

    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
      this.p1Score += this.ship01.points;
      this.scoreLeft.text = "P1:"+this.p1Score;
      // score += 10;
      // this.add.text(50,50,"Score: "+score);

    }
    //checkCollision
    if(twoPlayers == true){if (this.checkCollision(this.p2Rocket, this.ship03)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship03);
      this.p2Score += this.ship03.points;
      this.scoreRight.text = "P2:"+this.p2Score;
      // score += 30;
      // this.add.text(50,50,"Score: "+score);

    }
    if (this.checkCollision(this.p2Rocket, this.ship02)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship02);
      this.p2Score += this.ship02.points;
      this.scoreRight.text = "P2:"+this.p2Score;
      // score += 20;
      // this.add.text(50,50,"Score: "+score);

    }
    if (this.checkCollision(this.p2Rocket, this.ship01)) {
      this.p2Rocket.reset();
      this.shipExplode(this.ship01);
      this.p2Score += this.ship01.points;
      this.scoreRight.text = "P2:"+this.p2Score;
      // score += 10;
      // this.add.text(50,50,"Score: "+score);

    }}
    if(highScore < this.p1Score){
      highScore = this.p1Score;
      this.scoreHigh.text = 'Higest Score: ' + highScore;
    }
    if(twoPlayers == true){if(highScore < this.p2Score){
      highScore = this.p2Score;
      this.scoreHigh.text = 'Higest Score: ' + highScore;
    }}

  }

  checkCollision(rocket, ship) {

    // simple AABB checking
    if (rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y) {
      return true;

    } else {
      return false;
    }
  }

  shipExplode(ship) {
    //temporary hide the ship
    ship.alpha = 0;
    //create explosion sprite at ships position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');
    boom.on('animationcomplete', () => {
      ship.reset();
      ship.alpha = 1;
      boom.destroy();
    });
    // score add and repaint
    
    
    
    
    this.sound.play('sfx_explosion');
  }




}


// console.log("this");