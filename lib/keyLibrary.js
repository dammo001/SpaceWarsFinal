(function(){
  _keys = {};

  var canvas = document.getElementById("game-canvas");

  var addKey = function(event) {
    _keys[event.keyCode] = true;
  };

  var removeKey = function(event) {
    _keys[event.keyCode] = false;
  };

  document.addEventListener("keydown", function(event) {
    addKey(event);
  });

  document.addEventListener("keyup", function(event) {
    removeKey(event);
  });

  Asteroids.input = {
    getKeyState: function(keyLetter) {
      var key; 
      if(keyLetter === 'up') {
        key = 38;
      } else if (keyLetter === 'down') {
        key = 40;
      } else if (keyLetter === 'left') {
        key = 37; 
      } else if (keyLetter === 'right') {
        key = 39; 
      } else {
        key = keyLetter.charCodeAt();
      }
      return _keys[key];
    }
  };
})();
