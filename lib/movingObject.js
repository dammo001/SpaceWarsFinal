	(function () {
		if (typeof Asteroids === "undefined") { 
			Asteroids = {}; 
		}

	var MovingObject = Asteroids.MovingObject = function (options){ 
		this.position = options.position || [0,0]; 
		this.velocity = options.velocity || [30,30];  
		this.radius = options.radius || 70;
		this.color = options.color || 'grey';
		this.height = options.height; 
		this.width = options.width;
		this.ship = options.ship;
		this.sprite_pos = options.sprite_pos; 
		this.sprite_size = options.sprite_size; 
		this.url = options.url;
		this.speed = options.speed;
		this.frames = options.frames;
		this.dir = 'horizontal';
		this._index = 0;
		this.scalar = options.scalar; 
	};

	Asteroids.MovingObject.prototype = Object.create(Sprite.prototype);

	MovingObject.prototype.draw = function(ctx) { 
		var x = this.position[0];
		var y = this.position[1];
		ctx.beginPath(); 
		ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();
	 };

	MovingObject.prototype.move = function(time){

		this.position[0] = this.position[0] + this.velocity[0]*time*3.5;
		if (this.position[0] < 5){
			this.position[0] = 5;
		} else if (this.position[0] > this.width-1){
			this.position[0] = this.width-5;
		}
		this.position[1] = this.position[1] + this.velocity[1]*time*3.5; 
		if (this.position[1] < 5){
			this.position[1] = 5 ;
		} else if (this.position[1] > this.height-5){
			this.position[1] = this.height-5;
		}
	};

	MovingObject.prototype.isCollidedWith = function(otherObject){
		if (Asteroids.Util.prototype.distance(this.position, otherObject.position) > (this.radius + otherObject.radius)){
			return false;
		} else if (otherObject.isInvincible){
			return false;
		} else {
			return true;
		}
	};

	MovingObject.prototype.isTargetedBy = function(){

	};

})();

