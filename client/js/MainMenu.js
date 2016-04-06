var pRace = pRace || {};
pRace.MainMenu = function(){};

pRace.MainMenu.prototype = {
    create: function(){
    this.game.stage.backgroundColor = '#707070';      
    this.game.add.text(40,50,'This text is on the main menu and can be found in MainMenu.js' , {font: '14px Arial', fill: '#fff'});
    this.game.add.text(40,90,'Controls: arrow keys to move\n "R" to reset yourself\n "T" to activate traps' , {font: '14px Arial', fill: '#fff'});
    this.game.add.text(40,190,'Collect the powerstar to gain the ability to double jump. Good luck!' , {font: '14px Arial', fill: '#fff'});
    
    button_join_lobby = this.game.add.button(160, 500, 'Play!', this.join_lobby, this);
    button_instructions = this.game.add.button(400, 500, 'InstructionImg', this.instructionButton,this);
    },
    update: function(){
        if( pRace_frames === 1){
            this.game.state.start('Game');
        }
        else if(pRace_frames === 2){
            this.game.state.start('Instructions');
        }
        
    },
    join_lobby: function(){
        console.log("join_lobby called");
        pRace_frames = 1;   
    },
    instructionButton: function(){
        pRace_frames = 2;
    }
};