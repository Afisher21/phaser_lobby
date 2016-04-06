var util = require('util')
var http = require('http')
var path = require('path')
var ecstatic = require('ecstatic')
var io = require('socket.io')

var pg = require('pg');

pg.defaults.ssl = true;
pg.connect("process.env.postgres://ikmzkluqcvshjh:QYruHgRuFPKk2Qhk4xDgNCbWyN@ec2-54-225-223-40.compute-1.amazonaws.com:5432/d67eroqetivb2j", function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

var Player = require('./Player')

var port = process.env.PORT || 10003

/* ************************************************
** GAME VARIABLES
************************************************ */
var socket	// Socket controller
var players	// Array of connected players
var playerColorMax

/* ************************************************
** GAME INITIALISATION
************************************************ */

// Create and start the http server
var server = http.createServer(
  ecstatic({ root: path.resolve(__dirname, '../client') })
).listen(port, function (err) {
  if (err) {
    throw err
  }

  init()
})

console.log("Pit Race Server started on port " + port);


function init () {
  // Create an empty array to store players
  players = []

  // Initialize playerColors to amount defined
  playerColorMax = 1;
  
  // Attach Socket.IO to server
  socket = io.listen(server)

  // Start listening for events
  setEventHandlers()
}
var setEventHandlers = function () {
  // Socket.IO
  socket.sockets.on('connection', onSocketConnection)
}

// New socket connection
function onSocketConnection (client) {
  util.log('New player has connected: ' + client.id)

  // Listen for client disconnected
  client.on('disconnect', onClientDisconnect)

  // Listen for new player message
  client.on('new player', onNewPlayer)

  // Listen for move player message
  client.on('move player', onMovePlayer)
  
  // Listen for trap activation
  client.on('trap activated', onTrapActivation)
}

// Socket registered trap activation
function onTrapActivation(data){
  // Broadcast trap activation to connected socket clients
  this.broadcast.emit('trap activated', {trapNumb: data.trapNumb})
}

// Socket client has disconnected
function onClientDisconnect () {
  util.log('Player has disconnected: ' + this.id)

  var removePlayer = playerById(this.id)

  // Player not found
  if (!removePlayer) {
    util.log('Player not found: ' + this.id)
    return
  }

  // Remove player from players array
  players.splice(players.indexOf(removePlayer), 1)

  // Broadcast removed player to connected socket clients
  this.broadcast.emit('remove player', {id: this.id})
}

// New player has joined
function onNewPlayer (data) {
  // Create a new player
  var newPlayer = new Player(data.x, data.y, (players.length % playerColorMax))
  newPlayer.id = this.id

  // Broadcast new player to connected socket clients
  this.broadcast.emit('new player', {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), color: newPlayer.getColor()})

  // Send existing players to the new player
  var i, existingPlayer
  for (i = 0; i < players.length; i++) {
    existingPlayer = players[i]
    this.emit('new player', {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), color: newPlayer.getColor()})
  }

  // Add new player to the players array
  players.push(newPlayer)
}

// Player has moved
function onMovePlayer (data) {
  // Find player in array
  var movePlayer = playerById(this.id)
  // Player not found
  if (!movePlayer) {
    util.log('Player not found: ' + this.id)
    return
  }

  // Update player position
  movePlayer.setX(data.x)
  movePlayer.setY(data.y)

  // Broadcast updated position to connected socket clients
  this.broadcast.emit('move player', {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()})
}


/* ************************************************
** GAME HELPER FUNCTIONS
************************************************ */
// Find player by ID
function playerById (id) {
  var i
  for (i = 0; i < players.length; i++) {
    if (players[i].id === id) {
      return players[i]
    }
  }

  return false
}
