var pRace = pRace || {};

pRace.Game = function(){};
pRace.Game.prototype = {
    create: function() {
        socket = io.connect();
    
        //change to -1 to disable doubleJump, change to 0 to enable. Stars will enable.
        doubleJump = -1;
    
        //  We're going to be using physics, so enable the Arcade Physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.world.setBounds(0,0,2000,2000); // (x,y, width, height)?
        //  A simple background for our game
        var sky = this.add.sprite(0, 0, 'sky');
        sky.scale.setTo(4, 4);
    
        // music = game.add.audio('music');
        // music.loop = true;
        // music.play();
    
    
        //  The platforms group contains the ground and the ledges we can jump on
        platforms = this.add.group();
    
        //  We will enable physics for any object that is created in this group
        platforms.enableBody = true;
    
        // Here we create the ground.
        var ground = platforms.create(0, this.world.height - 64, 'ground');
    
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(6, 2);
    
        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;
    
        //  Now let's create some ledges
        // var ledge = platforms.create(400, 400, 'ground');
        // ledge.body.immovable = true;
    
        // ledge = platforms.create(-150, 250, 'ground');
        // ledge.body.immovable = true;
    
        var ledge = platforms.create(350,this.world.height-150, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(550,this.world.height-240, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(350,this.world.height-330, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(550,this.world.height-420, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(120,this.world.height-510, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.9,1);
    
        ledge = platforms.create(0,this.world.height-600, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.1,1);
    
        ledge = platforms.create(120,this.world.height-690, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1.5,1);
    
        ledge = platforms.create(120,this.world.height-780, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1.2,1);
    
        //ahead trap ledge
        ledge = platforms.create(650,this.world.height-870, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(920,this.world.height-600, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1220,this.world.height-510, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1650,this.world.height-510, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1850,this.world.height-600, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.1,1);
    
        ledge = platforms.create(1960,this.world.height-690, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.1,1);
    
        ledge = platforms.create(1850,this.world.height-780, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.1,1);
    
        ledge = platforms.create(1650,this.world.height-870, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1850,this.world.height-960, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1250,this.world.height-960, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(850,this.world.height-1100, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(450,this.world.height-1240, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(850,this.world.height-1380, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(.3,1);
    
        ledge = platforms.create(1250,this.world.height-1520, 'ground');
        ledge.body.immovable = true;
        ledge.scale.setTo(1.5,1);
    
        // The player and its
        playerStartX = this.world.width - 1968; //original : 32
        playerStartY = this.world.height - 150; //original : 150
        player = this.add.sprite(playerStartX, playerStartY, 'dude');
    
        //  We need to enable physics on the player
        this.physics.arcade.enable(player);
    
        //  Player physics properties. Give the little guy a slight bounce.
        //    player.body.bounce.y = 0.2;
        player.body.gravity.y = 900;
        player.body.collideWorldBounds = true;
    
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    
        // Focus camera on player
        this.camera.focusOnXY(0,0);
    
        // Create array of other players
        players = [];
      
      // Add finish line flag
         flags = this.add.group();
         flags.enableBody = true;
         var finishFlag = flags.create(1800,423,'flag');
         finishFlag.body.immovable = true;
    
       // Add a Hazard
        hazards = this.add.group();
        hazards.enableBody=true;
        for(var i=0;i<5;i++){
    
            var hazard = hazards.create(385+i*10, this.world.height-541, 'spike');
            hazard.scale.setTo(.1,.1);
            hazard.body.immovable = true;
        }
    
        for(var i=0;i<5;i++){
    
            hazard = hazards.create(275+i*10, this.world.height-541, 'spike');
            hazard.scale.setTo(.1,.1);
            //hazard.angle += 180;
            hazard.body.immovable = true;
        }
    
        for(var i=0;i<5;i++){
    
            hazard = hazards.create(165+i*10, this.world.height-541, 'spike');
            hazard.scale.setTo(.1,.1);
            //hazard.angle += 180;
            hazard.body.immovable = true;
        }
        
        trapGuns = this.add.group();
        trapGuns.enableBody = true;
        
         //trap one of the map
        buttonOne = this.add.group();
        buttonOne.enableBody = true;
        trapButtonOne = buttonOne.create(990, 2380, 'button');
        buttonOne.scale.setTo(.5,.5);
        trapButtonOne.body.immovable = true;
    
    
        //trap two of the map
        buttonTwo = this.add.group();
        buttonTwo.enableBody = true;
        trapButtonTwo = buttonTwo.create(1480, 2230, 'button');
        buttonTwo.scale.setTo(.5,.5);
        trapButtonTwo.body.immovable = true;
        trapButtonTwo.anchor.setTo(.5,.5);
        trapButtonTwo.scale.x *= -1;
        var trapGun = trapGuns.create(671, 1008, 'trapGun');
        //trapGun.scale.setTo(2,2);
        trapGun.body.immovable = true;
        trapTwoLaser = this.add.group();
        trapTwoLaser.enableBody = true;
        var laserTwo = trapTwoLaser.create(-100, 470, 'laser');
        laserTwo.scale.setTo(1,6);
        laserTwo.body.immovable = true;
    
    
    
    
        //trap three of the map
        buttonThree = this.add.group();
        buttonThree.enableBody = true;
        trapButtonThree = buttonThree.create(3885, 2050, 'button');
        buttonThree.scale.setTo(.5,.5);
        trapButtonThree.body.immovable = true;
        trapButtonThree.anchor.setTo(.5,.5);
        trapButtonThree.scale.x *= -1;
        var trapGun = trapGuns.create(1928, 1075, 'trapGun');
        //trapGun.scale.setTo(2,2);
        trapGun.body.immovable = true;
        trapGun.anchor.setTo(.5,.5);
        trapGun.scale.y *= -1;
        trapThreeLaser = this.add.group();
        trapThreeLaser.enableBody = true;
        var laserThree = trapThreeLaser.create(2200, 1320, 'laser');
        laserThree.scale.setTo(1,5);
        laserThree.body.immovable = true;
        laserThree.anchor.setTo(.5,.5);
        laserThree.scale.y *= -1;
        //laserThree.visible = false;
    
    
        
        trapOneSpikes = this.add.group();
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
    
        //  Finally some stars to collect
        stars = this.add.group();
    
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
    
       // timer = this.add.bitmapText(250, 250, 'desyrel', '00:00:00', 20);
        //  Our controls.
        this.world.scale.set(worldScale);
        this.world.bringToTop(player);
    
        /*
             Camera follow options:
          FOLLOW_PLATFORMER
          FOLLOW_LOCKON
          FOLLOW_TOPDOWN
          FOLLOW_TOPDOWN_TIGHT
        */
        this.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
        cursors = this.input.keyboard.createCursorKeys();
        reset_key = this.input.keyboard.addKey(Phaser.Keyboard.R);
        interact_key = this.input.keyboard.addKey(Phaser.Keyboard.T);
        jump_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.setEventHandlers();
    },
    // socket io stuff
    setEventHandlers: function() {
      // Socket connection successful
      socket.on('connect', this.onSocketConnected);
    
      // Socket disconnection
      socket.on('disconnect', this.onSocketDisconnect);
    
      // New player message received
      socket.on('new player', this.onNewPlayer);
    
      // Player move message received
      socket.on('move player', this.onMovePlayer);
    
      // Player removed message received
      socket.on('remove player', this.onRemovePlayer);
    
      // check traps
      socket.on('trap activated', this.onActivateTrap);
    },
    // Activate trap
    onActivateTrap: function(data){
    	var trap = data.trapNumb;
    	if (trap === 1){
    		this.activateTrapOne();
    	}
       if (trap === 2){
          this.activateTrapTwo();
       }
       if (trap === 3){
          this.activateTrapThree();
       }
    },
    
    // Socket connected for first time
    onSocketConnected: function() {
      console.log('Connected to socket server');
    
      // Reset players on reconnect
      players.forEach(function (enemy) {
        enemy.player.kill();
       })
      players = [];
          // Send local player data to the game server
      socket.emit('new player', { x: player.x, y: player.y });
    },
    
    // Socket disconnected
    onSocketDisconnect: function() {
      console.log('Disconnected from socket server');
    },
    
    // New player
    onNewPlayer: function(data) {
      console.log('New player connection in game.js:', data.id);
    
      // Avoid possible duplicate players
      var duplicate = this.playerById(data.id);
      if (duplicate) {
        console.log('Duplicate player!');
        return;
      }
    
      // Add new player to the remote players array
      players.push(new RemotePlayer(data.id, this, player, playerStartX, playerStartY, data.color));
    },
    
    // Move player
    onMovePlayer: function(data) {
      var movePlayer = this.playerById(data.id);
       //var oldX = movePlayer.player.x;
      // Player not found
      if (!movePlayer) {
        console.log('Player not found: ', data.id);
        return;
      }
    
      movePlayer.player.x = data.x
      movePlayer.player.y = data.y
    },
    
    // Remove player
    onRemovePlayer: function(data) {
      var removePlayer = this.playerById(data.id)
    
      // Player not found
      if (!removePlayer) {
        console.log('Player not found: ', data.id)
        return
      }
    
      removePlayer.player.kill()
    
      // Remove player from array
      players.splice(players.indexOf(removePlayer), 1)
    },
    
    update: function() {
        //updateTimer();
        //for(var i =0; i< players.length; i++){
        //  Collide the player and the stars with the platforms
            this.physics.arcade.collide(player, platforms);
            this.physics.arcade.collide(stars, platforms);
            this.physics.arcade.collide(hazards, stars);
            //this.physics.arcade.collide(player,buttons);
            //this.physics.arcade.collide(player, buttonOne, activateTrapOneContainer, null, this);
          // players[i].update();
        //}
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        this.physics.arcade.overlap(player, hazards, this.resetPlayer, null, this);
        this.physics.arcade.overlap(player, trapOneSpikes, this.resetPlayer, null, this);
        this.physics.arcade.overlap(player, trapTwoLaser, this.resetPlayer, null, this);
        this.physics.arcade.overlap(player, trapThreeLaser, this.resetPlayer, null, this);
        this.physics.arcade.overlap(player, buttonOne, this.activateTrapOneContainer, null, this);
        this.physics.arcade.overlap(player, buttonTwo, this.activateTrapTwoContainer, null, this);
        this.physics.arcade.overlap(player, buttonThree, this.activateTrapThreeContainer, null, this);
        this.physics.arcade.overlap(player, flags, this.touchFlag, null, this);
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
          player.body.x = playerStartX;
          player.body.y = playerStartY;
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
            player.body.velocity.y = -450;
    
            setTimeout(function(){
                player.jumping = true;
            }, 100);
        }
    
        if (player.jumping && player.body.touching.down)
        {
            player.jumping = false;
            if (doubleJump === 0)
            {
                doubleJump = 1;
            }
        }
    
        if (doubleJump === 1 && !cursors.up.isDown && player.jumping)
        {
                doubleJump = 2;
        }
    
        if (player.body.touching.down && doubleJump === 2)
        {
            doubleJump = 1;
        }
    
        if (cursors.up.isDown && player.jumping && doubleJump === 2)
        {
            player.body.velocity.y = -450;
            doubleJump = 0;
        }
        /*if ((cursors.up.isDown || jump_key.isDown) && player.body.touching.down)
        {
            player.body.velocity.y = -350;
        }
        if (     player.body.touching.down && doubleJump === 0){
            doubleJump++;
        }
        // allow the player to double jump;
        if ((cursors.up.isDown || jump_key.isDown) && doubleJump > 0 && player.body.velocity.y >= - 200){
            player.body.velocity.y = -350;
            doubleJump-=1;
        }*/
    
        socket.emit('move player',{ x: player.x, y: player.y });
    },
    render: function() {
  //      this.debug.text(this.time.fps,2,14, "#00ff00");
    },
    collectStar: function(player, star) {
    
        // Removes the star from the screen
        star.kill();
    
        doubleJump += 1;
    
    },
    touchFlag: function(player, flag){
       this.resetPlayer(player,flag);
    },
    resetPlayer: function(player, hazard){
        function innerReset(){
            player.reset(playerStartX, playerStartY);
            player.body.x = playerStartX;
            player.body.y = playerStartY;
            console.log("Player sent to: (" + playerStartX + "," + playerStartY +") ");
        }
        player.kill();
        this.time.events.add(1500, innerReset, this);
    },
    activateTrapOneContainer: function(player, trapButtonOne){
        if(interact_key.isDown)
        {
            //trapButtonOne.kill();
    		socket.emit('trap activated',{ trapNumb: 1 });
          this.activateTrapOne();
        }
    },
    activateButtonOne: function()
    {
        console.log('button one pressed');
        trapButtonOne.loadTexture('button_pressed');
        function resetButtonOne()
        {
            trapButtonOne.loadTexture('button');
        }
        this.time.events.add(3000, resetButtonOne, this);
    },
    activateTrapOne: function(){
        trapOneSpikes.setAll('y', 1288);
        this.activateButtonOne();
       function resetTrapOne (){
          trapOneSpikes.setAll('y', 1312);
       }
          this.time.events.add(3000, resetTrapOne, this);
    },
    activateTrapTwoContainer: function (player, trapButtonTwo){
        if(interact_key.isDown)
        {
            //trapButtonOne.kill();
            //activateTrapOne();
            //this.time.events.add(3000, resetTrapOne, this);
            socket.emit('trap activated',{ trapNumb: 2 });
            this.activateTrapTwo();
        }
    },
    activateButtonTwo: function()
    {
        trapButtonTwo.loadTexture('button_pressed');
        function resetButtonTwo()
        {
            trapButtonTwo.loadTexture('button');
        }
        this.time.events.add(1500, resetButtonTwo, this);
    },
    activateTrapTwo: function(){
        trapTwoLaser.setAll('x', 700);
        this.activateButtonTwo();
        function resetTrapTwo (){
           trapTwoLaser.setAll('x', -100);
        }
        this.time.events.add(1500, resetTrapTwo, this);
    },
    activateTrapThreeContainer: function (player, trapButtonThree){
        if(interact_key.isDown)
        {
            //trapButtonOne.kill();
            //activateTrapOne();
            //this.time.events.add(3000, resetTrapOne, this);
            socket.emit('trap activated',{ trapNumb: 3 });
            this.activateTrapThree();
        }
    },
    activateButtonThree: function()
    {
        trapButtonThree.loadTexture('button_pressed');
        function resetButtonThree()
        {
            trapButtonThree.loadTexture('button');
        }
        this.time.events.add(1500, resetButtonThree, this);
    },
    activateTrapThree: function(){
        trapThreeLaser.setAll('x', 1928);
        this.activateButtonThree();
       function resetTrapThree (){
           trapThreeLaser.setAll('x', 2050);
       }
       this.time.events.add(1500, resetTrapThree, this);
    },
    updateTimer: function() {
        minutes = Math.floor(this.time.time / 60000) % 60;
        seconds = Math.floor(this.time.time / 1000) % 60;
        milliseconds = Math.floor(this.time.time) % 100;
        //If any of the digits becomes a single digit number, pad it with a zero
        if (milliseconds < 10)
                milliseconds = '0' + milliseconds;
        if (seconds < 10)
                seconds = '0' + seconds;
        if (minutes < 10)
                minutes = '0' + minutes;
        timer.setText(minutes + ':'+ seconds + ':' + milliseconds);
    },
    // Find player by ID
    playerById: function(id) {
      for (var i = 0; i < players.length; i++) {
        if (players[i].player.name === id) {
          return players[i]
        }
      }
    
      return false
    }
};