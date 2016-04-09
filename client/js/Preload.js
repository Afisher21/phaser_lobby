var pRace = pRace || {};

pRace.Preload = function(){};

pRace.Preload.prototype = {
    preload: function(){
    this.time.advancedTiming = true;
    this.load.image('flag','assets/flag.png');
    this.load.image('spike','assets/spike D.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform2.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('button', 'assets/button.png');
    this.load.image('button_pressed', 'assets/button_pressed.png');
    this.load.image('trapGun', 'assets/trapGun.png');
    this.load.image('laser', 'assets/laser.png');
    //this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    //this.load.audio('music', 'assets/jumper.mp3');
    this.load.spritesheet('dude', 'assets/dude2.png', 19, 27);
    this.load.spritesheet('dude0', 'assets/dude3.png', 19, 27);
    this.load.spritesheet('dude1', 'assets/dude4.png', 19, 27);
    this.load.spritesheet('dude2', 'assets/dude5.png', 19, 27);
    this.load.spritesheet('dude3', 'assets/dude6.png', 19, 27);
    this.load.spritesheet('dude4', 'assets/dude7.png', 19, 27);
    this.load.spritesheet('dude5', 'assets/dude8.png', 19, 27);
    this.load.spritesheet('dude6', 'assets/dude9.png', 19, 27);
   // pRace.game.renderer.renderSession.roundPixels = true;
   // Phaser.Canvas.setImageRenderingCrisp(pRace.game.canvas)
        //https://www.iconfinder.com/icons/811512/audio_media_multimedia_play_play_button_player_icon#size=128
        this.load.image('Play!', 'assets/play_button.png');
        this.load.image('InstructionImg','assets/Instructions.png');
        this.load.image('BackImg','assets/back_button.png');

        // These lines caused issues being located here
        //this.renderer.renderSession.roundPixels = true;
        //Phaser.Canvas.setImageRenderingCrisp(pRace.game.canvas)
    },
    create: function(){
        this.state.start('MainMenu');
    }
}