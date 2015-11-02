(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'red'; 
	var RADIUS = 4; 

	var Bullet = MovingObject.Bullet = function(pos, vel){
		Asteroids.MovingObject.call(this, {"position": pos, "velocity": vel, "color": COLOR, "radius": RADIUS, "url": "./assets/bulletSheet.jpg",
		"sprite_pos": [64,74], "sprite_size": [20,25], "speed": 15, "scalar": [1,1], "frames":[0] });
	}; 

	MovingObject.Bullet.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Bullet.prototype.move = function(time){ 
		this.position[0] += this.velocity[0]*time*6;
		this.position[1] += this.velocity[1]*time*6;
	};

	MovingObject.Bullet.prototype.findVel = function(){
	};

	MovingObject.Bullet.prototype.isCollidedWith = function(otherObject){
		if (otherObject instanceof MovingObject.Ship){
			return false;
		} else if (Asteroids.Util.prototype.distance(this.position, otherObject.position) > (this.radius + otherObject.radius)){
			return false;
		} else {
			return true;
		}
	};

})();
