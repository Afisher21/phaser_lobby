var pRace = pRace || {};

pRace.Preload = function(){};

pRace.Preload.prototype = {
    preload: function(){
        //http://openthisart.org/content/bevouliin-free-this-obstacle-spikes
        // this.load.bitmapFont('desyrel', '/assets/fonts/desyrel.png', '/assets/fonts/desyrel.xml');
        this.time.advancedTiming = true;
        this.load.image('flag','assets/flag.png');
        this.load.image('spike','assets/spike D.png');
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform2.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('button', 'assets/button.png');
        this.load.image('trapGun', 'assets/trapGun.png');
        this.load.image('laser', 'assets/laser.png');
        //https://www.iconfinder.com/icons/811512/audio_media_multimedia_play_play_button_player_icon#size=128
        this.load.image('Play!', 'assets/play_button.png');
        this.load.image('InstructionImg','assets/Instructions.png');
        this.load.image('BackImg','assets/back_button.png');
        //this.load.audio('music', 'assets/jumper.mp3');
        this.load.spritesheet('dude', 'assets/dude2.png', 19, 27);
        this.load.spritesheet('dude0', 'assets/dude2.png', 19, 27);
        // These lines caused issues being located here
        //this.renderer.renderSession.roundPixels = true;
        //Phaser.Canvas.setImageRenderingCrisp(game.this.canvas)
    },
    create: function(){
        this.state.start('MainMenu');
    }
}