var pRace = pRace || {};
pRace.MainMenu = function(){};

pRace.MainMenu.prototype = {
    create: function(){
        
    this.game.add.text(0,50,'This text is on the main menu and can be found in MainMenu.js' , {font: '14px Arial', fill: '#fff'});
    this.game.add.text(0,90,'Controls: arrow keys to move\n "r" to reset yourself\n "t" to activate traps' , {font: '14px Arial', fill: '#fff'});
    this.game.add.text(0,190,'Collect the powerstar to gain the ability to double jump. Good luck!' , {font: '14px Arial', fill: '#fff'});
    
    button_join_lobby = this.game.add.button(160, 500, 'Play!', this.join_lobby, this);
    },
    update: function(){
        if( pRace_frames == 1){
            this.game.state.start('Game');
        }
        else if(pRace_frames == 2){
            this.game.state.start('Instructions');
        }
        
    },
    join_lobby: function(){
        
        pRace_frames = 1;   
    }
};