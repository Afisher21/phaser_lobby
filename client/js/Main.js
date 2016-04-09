// If pRace does not exist (it shouldn't) make it
var pRace = pRace || {};

pRace.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// Variables for running set up stuff

var pRace_frames = 0;


// Variables for Game 
// Game
var player;
var platforms;
var cursors;
var reset_key;
var interact_key;
var doubleJump;
var playerStartX;
var playerStartY;
//music
var music;
// scale/camera
var worldScale=1;
// interactable
var hazards;
var flags;
var stars;
var trapOneSpikes;
var trapTwoLaser;
var trapThreeLaser;
var buttonOne;
var trapButtonOne;
var buttonTwo;
var trapButtonTwo;
var buttonThree;
var trapButtonThree;
var trapGuns;
var  jumptimer = 0;
// Timer
// code from http://www.html5gamedevs.com/topic/1870-in-game-timer/
var timer;
var minutes = 0;
var seconds = 0;
var milliseconds = 0;
// Multiplayer
//var http = require('http');
var socket;
var players;


// Add states game can be in 
/* 
                            V|-------------|^
    Main -> Preload -> MainMenu -> Instructions || Game
*/
pRace.game.state.add('Preload', pRace.Preload);
pRace.game.state.add('MainMenu', pRace.MainMenu);
// pRace.game.state.add('Lobby', pRace.Lobby);
pRace.game.state.add('Instructions', pRace.Instructions);
pRace.game.state.add('Game', pRace.Game);

// Send game to correct state

pRace.game.state.start('Preload');