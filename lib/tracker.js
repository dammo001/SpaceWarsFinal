(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'green'; 
	var RADIUS = 8; 

	var Tracker= MovingObject.Tracker = function(pos, height, width, ship){
	Asteroids.MovingObject.call(this, {"position": pos, "velocity": Asteroids.Util.prototype.randomVec(RADIUS), "color": COLOR, "radius": RADIUS, "height": height, "width": width, "ship": ship,
	"url": "./assets/bitsspace.jpg", "sprite_size": [320,250], "sprite_pos": [50,60], "speed": 15, "frames": [0], "scalar": [.08,.08] });
	}; 

	MovingObject.Tracker.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Tracker.prototype.move = function(time){
		this.findVel(); 
		this.position[0] = this.position[0] + this.velocity[0]*time*4.6;
		if (this.position[0] < 5){
			this.position[0] = 5;
		} else if (this.position[0] > this.width-1){
			this.position[0] = this.width-5;
		}
		this.position[1] = this.position[1] + this.velocity[1]*time*4.6; 
		if (this.position[1] < 5){
			this.position[1] = 5 ;
		} else if (this.position[1] > this.height-5){
			this.position[1] = this.height-5;
		}
	};

	MovingObject.Tracker.prototype.findVel = function(){
		this.velocity = Asteroids.Util.findVecTo(this.position, this.ship.position, 40); 
	};

	MovingObject.Tracker.prototype.randVel = function(){
		this.velocity = Asteroids.Util.prototype.randomVec(40); 
	};

})();


