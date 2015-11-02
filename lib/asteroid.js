(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'green'; 
	var RADIUS = 8; 

	var Asteroid = MovingObject.Asteroid = function(pos, height, width, ship){
	Asteroids.MovingObject.call(this, {"position": pos, "velocity": Asteroids.Util.prototype.randomVec(RADIUS), "color": COLOR, "radius": RADIUS, "height": height, "width": width, "ship": ship});
	}; 

	MovingObject.Asteroid.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Asteroid.prototype.findVel = function(){
		this.velocity = Asteroids.Util.findVecTo(this.position, this.ship.position, 40); 
	};

})();