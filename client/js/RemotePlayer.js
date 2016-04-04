var RemotePlayer = function(index, game, player, startX, startY, color) {
    // possibly accept cursors as another argument?
  this.game = game;
  this.player = player;

  // The player and its settings
    this.player = game.add.sprite(startX, startY, 'dude' + color.toString());
    this.player.name = index.toString();

    //  We need to enable physics on the player
    game.physics.arcade.enable(this.player);
    //this.player.body.gravity.y = 600;
    this.player.body.collideWorldBounds = true;
    this.player.body.immovable = true

    //  Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.player.animations.add('stop',[4],10, true);
    
    this.lastPosition = {x: startX, y: startY};
}
function RPUpdate(socketPlayer) {
  if (socketPlayer.player.x < socketPlayer.lastPosition.x) {
    socketPlayer.player.play('left')
  }
  else if(socketPlayer.player.x > socketPlayer.lastPosition.x){
     socketPlayer.player.play('right')
  }
  else{
    socketPlayer.player.play('stop')
  }

  socketPlayer.lastPosition.x = socketPlayer.player.x
  socketPlayer.lastPosition.y = socketPlayer.player.y
}

window.RemotePlayer = RemotePlayer
