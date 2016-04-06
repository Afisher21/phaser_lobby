var pRace = pRace || {};
pRace.Instructions = function(){};

pRace.Instructions.prototype = {
    create: function(){
        
    
        this.game.add.text(0,90,'Controls: arrow keys to move\n "r" to reset yourself\n "t" to activate traps' , {font: '14px Arial', fill: '#fff'});
        this.game.add.text(0,190,'Collect the powerstar to gain the ability to double jump. Good luck!' , {font: '14px Arial', fill: '#fff'});
    
        button_back = this.game.add.button(0, 20, 'BackImg', this.backButton, this);
    },
    update: function(){
        if( pRace_frames === 1){
            this.game.state.start('MainMenu');
        }
        
    },
    backButton: function(){
        
        pRace_frames = 1;   
    }
};