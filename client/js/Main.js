// If pRace does not exist (it shouldn't) make it
var pRace = pRace || {};

pRace.game = new Phaser.Game(600, 800, Phaser.AUTO, '');

// Variables for running set up stuff

var gameWorld = [];
var gameState = { color: "", position: 0};
var frame = "";
var color = "";
var gameFrame = 0;
var pRace_frames = 0;
var pRace_colors = 0;

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
var buttonTwo;
var buttonThree;
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
                            |-------------|
    Main -> Preload -> MainMenu -> Instructions || Game
*/
pRace.game.state.add('Preload', pRace.Preload);
pRace.game.state.add('MainMenu', pRace.MainMenu);
// pRace.game.state.add('Lobby', pRace.Lobby);
pRace.game.state.add('Instructions', pRace.Instructions);
pRace.game.state.add('Game', pRace.Game);

// Send game to correct state

pRace.game.state.start('Preload');