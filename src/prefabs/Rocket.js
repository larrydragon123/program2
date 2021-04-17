//Rocket (player) prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false; //track rocket firing status
        this.moveSpeed = 2;    //pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        //left/right movement
        if (true) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {//prevent going through wall
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired move the rocket up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;

        }

        //reset
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}

class Rocket2 extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false; //track rocket firing status
        this.moveSpeed = 2;    //pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        //left/right movement
        if (true) {
            if (keyA.isDown && this.x >= borderUISize + this.width) {//prevent going through wall
                this.x -= this.moveSpeed;
            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }
        // if fired move the rocket up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;

        }

        //reset
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }
    //reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}