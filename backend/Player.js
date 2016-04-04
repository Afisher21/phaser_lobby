/* ************************************************
** GAME PLAYER CLASS
************************************************ */
var Player = function (startX, startY, startColor) {
  var x = startX
  var y = startY
  var color = startColor
  var id

  // Getters and setters
  var getX = function () {
    return x
  }

  var getY = function () {
    return y
  }
  
  var getColor = function(){
    return color
  }

  var setX = function (newX) {
    x = newX
  }

  var setY = function (newY) {
    y = newY
  }
  
  var setColor = function(newColor){
    color = newColor
  }

  // Define which variables and methods can be accessed
  return {
    getX: getX,
    getY: getY,
    getColor: getColor,
    setX: setX,
    setY: setY,
    setColor: setColor,
    id: id
  }
}

// Export the Player class so you can use it in
// other files by using require("Player")
module.exports = Player
