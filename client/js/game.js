var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
   //http://opengameart.org/content/bevouliin-free-game-obstacle-spikes
  // game.load.bitmapFont('desyrel', '/assets/fonts/desyrel.png', '/assets/fonts/desyrel.xml');
    game.time.advancedTiming = true;
   game.load.image('diamond','assets/diamond.png');
    game.load.image('spike','assets/spike D.png');
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('button', 'assets/button.png');
    game.load.image('trapGun', 'assets/trapGun.png');
    game.load.image('laser', 'assets/laser.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

// Game
var player;
var platforms;
var cursors;
var reset_key;
var interact_key;
var doubleJump;
var playerStartX;
var playerStartY;

// scale/camera
var worldScale=1;

// interactable
var hazards;
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

function create() {
    socket = io.connect();

    //change to -1 to disable doubleJump, change to 0 to enable. Stars will enable.
    doubleJump = -1;

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);
   game.world.setBounds(0,0,2000,2000); // (x,y, width, height)?
    //  A simple background for our game
    var sky = game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(4, 4);
    


    //  The platforms group contains the ground and the ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(6, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create some ledges
    // var ledge = platforms.create(400, 400, 'ground');
    // ledge.body.immovable = true;

    // ledge = platforms.create(-150, 250, 'ground');
    // ledge.body.immovable = true;
    
    var ledge = platforms.create(350,game.world.height-150, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(550,game.world.height-240, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(350,game.world.height-330, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(550,game.world.height-420, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(120,game.world.height-510, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.9,1);

    ledge = platforms.create(0,game.world.height-600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.1,1);

    ledge = platforms.create(120,game.world.height-690, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1.5,1);

    ledge = platforms.create(120,game.world.height-780, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1.2,1);

    //ahead trap ledge
    ledge = platforms.create(650,game.world.height-870, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(920,game.world.height-600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1220,game.world.height-510, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1650,game.world.height-510, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1850,game.world.height-600, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.1,1);

    ledge = platforms.create(1960,game.world.height-690, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.1,1);

    ledge = platforms.create(1850,game.world.height-780, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.1,1);

    ledge = platforms.create(1650,game.world.height-870, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1850,game.world.height-960, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1250,game.world.height-960, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(850,game.world.height-1100, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(450,game.world.height-1240, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(850,game.world.height-1380, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(.3,1);

    ledge = platforms.create(1250,game.world.height-1520, 'ground');
    ledge.body.immovable = true;
    ledge.scale.setTo(1.5,1);

    // The player and its 
    playerStartX = 32; //original : 32
    playerStartY = game.world.height - 150; //original : 150
    player = game.add.sprite(playerStartX, playerStartY, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    //    player.body.bounce.y = 0.2;
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    
    // Focus camera on player
    game.camera.focusOnXY(0,0);

    // Create array of other players
    players = [];

    // Add a Hazard
    hazards = game.add.group();
    hazards.enableBody=true;
    for(var i=0;i<5;i++){

        var hazard = hazards.create(385+i*10, game.world.height-541, 'spike');
        hazard.scale.setTo(.1,.1);
        hazard.body.immovable = true;
    }

    for(var i=0;i<5;i++){

        hazard = hazards.create(275+i*10, game.world.height-541, 'spike');
        hazard.scale.setTo(.1,.1);
        //hazard.angle += 180;
        hazard.body.immovable = true;
    }

    for(var i=0;i<5;i++){

        hazard = hazards.create(165+i*10, game.world.height-541, 'spike');
        hazard.scale.setTo(.1,.1);
        //hazard.angle += 180;
        hazard.body.immovable = true;
    }


    //trap one of the map
    buttonOne = game.add.group();
    buttonOne.enableBody = true;
    var trapButtonOne = buttonOne.create(990, 2380, 'button');
    buttonOne.scale.setTo(.5,.5);
    trapButtonOne.body.immovable = true;


    //trap two of the map
    buttonTwo = game.add.group();
    buttonTwo.enableBody = true;
    var trapButtonTwo = buttonTwo.create(1480, 2230, 'button');
    buttonTwo.scale.setTo(.5,.5);
    trapButtonTwo.body.immovable = true;
    trapButtonTwo.anchor.setTo(.5,.5);
    trapButtonTwo.scale.x *= -1;
    var trapGun = buttonTwo.create(1345, 2010, 'trapGun');
    trapGun.scale.setTo(2,2);
    trapGun.body.immovable = true;
    trapTwoLaser = game.add.group();
    trapTwoLaser.enableBody = true;
    var laserTwo = trapTwoLaser.create(-100, 470, 'laser');
    laserTwo.scale.setTo(1,6);
    laserTwo.body.immovable = true;




    //trap three of the map
    buttonThree = game.add.group();
    buttonThree.enableBody = true;
    var trapButtonThree = buttonThree.create(3885, 2050, 'button');
    buttonThree.scale.setTo(.5,.5);
    trapButtonThree.body.immovable = true;
    trapButtonThree.anchor.setTo(.5,.5);
    trapButtonThree.scale.x *= -1;
    var trapGun = buttonTwo.create(3860, 2150, 'trapGun');
    trapGun.scale.setTo(2,2);
    trapGun.body.immovable = true;
    trapGun.anchor.setTo(.5,.5);
    trapGun.scale.y *= -1;
    trapThreeLaser = game.add.group();
    trapThreeLaser.enableBody = true;
    var laserThree = trapThreeLaser.create(2200, 1320, 'laser');
    laserThree.scale.setTo(1,5);
    laserThree.body.immovable = true;
    laserThree.anchor.setTo(.5,.5);
    laserThree.scale.y *= -1;
    //laserThree.visible = false;


    trapOneSpikes = game.add.group();
    trapOneSpikes.enableBody = true;
    for(var i=0;i<6;i++){

        var spikes = trapOneSpikes.create(180+i*10, 1312, 'spike');      //1312
        spikes.scale.setTo(.07,.07);
        spikes.body.immovable = true;
    }
    for(var i=0;i<6;i++){

        spikes = trapOneSpikes.create(330+i*10, 1312, 'spike');
        spikes.scale.setTo(.07,.07);
        spikes.body.immovable = true;
    }
    for(var i=0;i<6;i++){

        spikes = trapOneSpikes.create(480+i*10, 1312, 'spike');
        spikes.scale.setTo(.07,.07);
        spikes.body.immovable = true;
    }


    //end of race
    hazards.create(1800,450,'diamond');

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 12 of them evenly spaced apart
    // for (var i = 0; i < 2; i++)
    // {
    //     //  Create a star inside of the 'stars' group
    //     var star = stars.create(200 + i * 100, 0, 'star');

    //     //  Let gravity do its thing
    //     star.body.gravity.y = 300;

    //     //  This just gives each star a slightly random bounce value
    //     star.body.bounce.y = 0.7 + Math.random() * 0.2;
    // }

        //Create a star inside of the 'stars' group
        var star = stars.create(1265, 1200, 'star');

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

   // timer = game.add.bitmapText(250, 250, 'desyrel', '00:00:00', 20);
    //  Our controls.
    game.world.scale.set(worldScale);
    game.world.bringToTop(player);

    /*
         Camera follow options:
      FOLLOW_PLATFORMER
      FOLLOW_LOCKON
      FOLLOW_TOPDOWN
      FOLLOW_TOPDOWN_TIGHT
    */
    game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
    cursors = game.input.keyboard.createCursorKeys();
    reset_key = game.input.keyboard.addKey(Phaser.Keyboard.R);
    interact_key = game.input.keyboard.addKey(Phaser.Keyboard.T);
    setEventHandlers();
}











// socket io stuff
var setEventHandlers = function () {
  // Socket connection successful
  socket.on('connect', onSocketConnected);

  // Socket disconnection
  socket.on('disconnect', onSocketDisconnect);

  // New player message received
  socket.on('new player', onNewPlayer);

  // Player move message received
  socket.on('move player', onMovePlayer);

  // Player removed message received
  socket.on('remove player', onRemovePlayer);
  
  // check traps
  socket.on('trap activated', onActivateTrap);
}
// Activate trap
function onActivateTrap(data){
	var trap = data.trapNumb;
	if (trap === 1){
		activateTrapOne();
		game.time.events.add(3000, resetTrapOne, this);
	}
   if (trap === 2){
      activateTrapTwo();
      game.time.events.add(1500, resetTrapTwo, this);
   }
   if (trap === 3){
      activateTrapThree();
      game.time.events.add(1500, resetTrapThree, this);
   }
}

// Socket connected for first time
function onSocketConnected () {
  console.log('Connected to socket server');

  // Reset players on reconnect
  players.forEach(function (enemy) {
    enemy.player.kill();
  })
  players = [];

  // Send local player data to the game server
  socket.emit('new player', { x: player.x, y: player.y });
}

// Socket disconnected
function onSocketDisconnect () {
  console.log('Disconnected from socket server');
}

// New player
function onNewPlayer (data) {
  console.log('New player connection in game.js:', data.id);

  // Avoid possible duplicate players
  var duplicate = playerById(data.id);
  if (duplicate) {
    console.log('Duplicate player!');
    return;
  }

  // Add new player to the remote players array
  players.push(new RemotePlayer(data.id, game, player, playerStartX, playerStartY));
}

// Move player
function onMovePlayer (data) {
  var movePlayer = playerById(data.id);
   var oldX = movePlayer.player.x;
  // Player not found
  if (!movePlayer) {
    console.log('Player not found: ', data.id);
    return;
  }

  // Update player position?
  if(data.x>oldX){
      // animate right
      //movePlayer.player.animations.play('right');
  }
  if(data.x<oldX){
     // animate left
    // movePlayer.player.animations.play('left');
  }
  movePlayer.player.x = data.x
  movePlayer.player.y = data.y
}

// Remove player
function onRemovePlayer (data) {
  var removePlayer = playerById(data.id)

  // Player not found
  if (!removePlayer) {
    console.log('Player not found: ', data.id)
    return
  }

  removePlayer.player.kill()

  // Remove player from array
  players.splice(players.indexOf(removePlayer), 1)
}























function update() {
    //updateTimer();
    //for(var i =0; i< players.length; i++){
    //  Collide the player and the stars with the platforms
        game.physics.arcade.collide(player, platforms);
        game.physics.arcade.collide(stars, platforms);
        game.physics.arcade.collide(hazards, stars);   
        //game.physics.arcade.collide(player,buttons);
        //game.physics.arcade.collide(player, buttonOne, activateTrapOneContainer, null, this);   
      // players[i].update();
    //}
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, hazards, resetPlayer, null, this);
    game.physics.arcade.overlap(player, trapOneSpikes, resetPlayer, null, this);
    game.physics.arcade.overlap(player, trapTwoLaser, resetPlayer, null, this);
    game.physics.arcade.overlap(player, trapThreeLaser, resetPlayer, null, this);
    game.physics.arcade.overlap(player, buttonOne, activateTrapOneContainer, null, this);
    game.physics.arcade.overlap(player, buttonTwo, activateTrapTwoContainer, null, this);
    game.physics.arcade.overlap(player, buttonThree, activateTrapThreeContainer, null, this);
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -175;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 175;

        player.animations.play('right');
    }
    else if(reset_key.isDown)
    {
      player.body.x = 32;
      player.body.y = game.world.height - 150;
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
    if ( player.body.touching.down && doubleJump === 0){
        doubleJump++;
    }
    // allow the player to double jump;
    if (cursors.up.isDown && doubleJump > 0 && player.body.velocity.y >= - 200){
        player.body.velocity.y = -350;
        doubleJump-=1;
    }

    socket.emit('move player',{ x: player.x, y: player.y });
}
function render(){
    game.debug.text(game.time.fps,2,14, "#00ff00");
}

function collectStar (player, star) {
    
    // Removes the star from the screen
    star.kill();
    // Only updates player's motion for an instant. need to modify it
    // for x seconds
    //player.body.velocity.x *= 3;
    doubleJump += 1;

}

function resetPlayer (player, hazard){
    player.kill();
    game.time.events.add(1500, reset, this);

    //player.reset(32, game.world.height - 150);

}

function reset(){
    player.kill();
    player.reset(32, game.world.height - 150);
}

function activateTrapOneContainer (player, trapButtonOne){
    if(interact_key.isDown)
    {
        //trapButtonOne.kill();
		socket.emit('trap activated',{ trapNumb: 1 });
      activateTrapOne();
    }    
}
function activateTrapOne(){
    trapOneSpikes.setAll('y', 1288);
   function resetTrapOne (){
      trapOneSpikes.setAll('y', 1312);
   }
      game.time.events.add(3000, resetTrapOne, this);
}


function activateTrapTwoContainer (player, trapButtonTwo){
    if(interact_key.isDown)
    {
        //trapButtonOne.kill();
        //activateTrapOne();
        //game.time.events.add(3000, resetTrapOne, this);
        socket.emit('trap activated',{ trapNumb: 2 });
        activateTrapTwo();
    }   
}
function activateTrapTwo(){
    trapTwoLaser.setAll('x', 700);
   function resetTrapTwo (){
       trapTwoLaser.setAll('x', -100);
   }
    game.time.events.add(1500, resetTrapTwo, this);
}


function activateTrapThreeContainer (player, trapButtonThree){
    if(interact_key.isDown)
    {
        //trapButtonOne.kill();
        //activateTrapOne();
        //game.time.events.add(3000, resetTrapOne, this);
        socket.emit('trap activated',{ trapNumb: 3 });
        activateTrapThree();
    }   
}
function activateTrapThree(){
    trapThreeLaser.setAll('x', 1928);
   function resetTrapThree (){
       trapThreeLaser.setAll('x', 2050);
   }
   game.time.events.add(1500, resetTrapThree, this);
}



function updateTimer() {
    minutes = Math.floor(game.time.time / 60000) % 60;
    seconds = Math.floor(game.time.time / 1000) % 60;
    milliseconds = Math.floor(game.time.time) % 100;
    //If any of the digits becomes a single digit number, pad it with a zero
    if (milliseconds < 10)
            milliseconds = '0' + milliseconds;
    if (seconds < 10)
            seconds = '0' + seconds;
    if (minutes < 10)
            minutes = '0' + minutes;
    timer.setText(minutes + ':'+ seconds + ':' + milliseconds);
}
// Find player by ID
function playerById (id) {
  for (var i = 0; i < players.length; i++) {
    if (players[i].player.name === id) {
      return players[i]
    }
  }

  return false
}
