(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'green'; 
	var RADIUS = 12; 

	var Dodger= MovingObject.Dodger = function(pos, height, width, ship){
	Asteroids.MovingObject.call(this, {"position": pos, "velocity": Asteroids.Util.prototype.randomVec(RADIUS), "color": COLOR, "radius": RADIUS, "height": height, "width": width, "ship": ship,
	"url": "./assets/bitsspace.jpg", "sprite_size": [330,260], "sprite_pos": [650,60], "speed": 15, "frames": [0], "scalar": [.12,.12] });
	this.hasDodged = false; 
	 }; 

	MovingObject.Dodger.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Dodger.prototype.move = function(time){
		if (!this.hasDodged){
			this.findVel(); 
		}
		this.position[0] = this.position[0] + this.velocity[0]*time*3;
		if (this.position[0] < 5){
			this.position[0] = 5;
		} else if (this.position[0] > this.width-1){
			this.position[0] = this.width-5;
		}
		this.position[1] = this.position[1] + this.velocity[1]*time*3; 
		if (this.position[1] < 5){
			this.position[1] = 5 ;
		} else if (this.position[1] > this.height-5){
			this.position[1] = this.height-5;
		}
	};

	MovingObject.Dodger.prototype.findVel = function(){
		this.velocity = Asteroids.Util.findVecTo(this.position, this.ship.position, 30); 
	};

	MovingObject.Dodger.prototype.perpVel = function(bullet){
		var vel = Asteroids.Util.prototype.distance([0,0], this.velocity); 
		this.velocity = Asteroids.Util.findVecAway(this.position, bullet.position, vel*1.4);
	};

	MovingObject.Dodger.prototype.isTargetedBy = function(bullet){	
		var that = this; 
		if ((Asteroids.Util.prototype.distance(this.position, bullet.position) < 80) && (!this.hasDodged)){
			this.hasDodged = true;
			setTimeout(function(){ that.hasDodged = false;}, 80); 
			this.perpVel(bullet); 
		} 
	};

})();


