(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}
	
	var COLOR = 'green'; 
	var RADIUS = 44; 

	var Floater= MovingObject.Floater = function(pos, height, width, ship){
	Asteroids.MovingObject.call(this, {"position": pos, "velocity": Asteroids.Util.prototype.randomVec(RADIUS), "color": COLOR, "radius": RADIUS, "height": height, "width": width, "ship": ship,
	"url": "./assets/bitsspace.jpg", "sprite_size": [270,260], "sprite_pos": [350,40], "speed": 15, "frames": [0], "scalar": [.35,.35] });
	 this.lives = 5; 
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

	MovingObject.Floater.prototype.render = function(ctx) {
    var frame;

    if(this.speed > 0) {
        var max = this.frames.length;
        var idx = Math.floor(this._index);
        frame = this.frames[idx % max];

        if(this.once && idx >= max) {
            this.done = true;
            return;
        }
    }
    else {
        frame = 0;
    }

    var x = this.sprite_pos[0];
    var y = this.sprite_pos[1];

    if(this.dir == 'vertical') {
        y += frame * this.sprite_size[1];
    }
    else {
        x += frame * this.sprite_size[0];
    }

    ctx.drawImage(Asteroids.Util.loadImage(this.url),
                  x, y,
                  this.sprite_size[0], this.sprite_size[1],
                  this.position[0]-this.sprite_size[0]/2*this.scalar[0], this.position[1]- this.sprite_size[1]/2*this.scalar[1],
                  this.sprite_size[0]*this.scalar[0], this.sprite_size[1]*this.scalar[1]);
	};	

})();


