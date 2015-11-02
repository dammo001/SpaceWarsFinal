(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'green'; 
	var RADIUS = 20; 

	var Floater= MovingObject.Floater = function(pos, height, width, ship){
	Asteroids.MovingObject.call(this, {"position": pos, "velocity": Asteroids.Util.prototype.randomVec(RADIUS), "color": COLOR, "radius": RADIUS, "height": height, "width": width, "ship": ship,
	"url": "./assets/bitsspace.jpg", "sprite_size": [330,260], "sprite_pos": [350,60], "speed": 15, "frames": [0], "scalar": [.18,.18] });
	 }; 

	MovingObject.Floater.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Floater.prototype.move = function(time){
		if (this.position[0] < 20){
			this.velocity = Asteroids.Util.flipVec(this.velocity);
		} else if (this.position[0] > this.width-1){
			this.velocity = Asteroids.Util.flipVec(this.velocity);
		}
		this.position[0] = this.position[0] + this.velocity[0]*time*2.5;
		if (this.position[1] < 5){
			this.velocity = Asteroids.Util.flipVec(this.velocity);
		} else if (this.position[1] > this.height-5){			
			this.velocity = Asteroids.Util.flipVec(this.velocity);
		}
		this.position[1] = this.position[1] + this.velocity[1]*time*2.5; 
	};

})();


