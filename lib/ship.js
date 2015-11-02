(function () {
	if (typeof MovingObject === "undefined") { 
		MovingObject = {}; 
	}

	var RADIUS = 12;
	var COLOR = 'black';

	var Ship = MovingObject.Ship = function(pos, height, width){ 
		Asteroids.MovingObject.call(this, {"position": pos, "velocity": [0,0], "color": COLOR, "radius": RADIUS, "height": height, "width": width, "url": "./assets/flying_saucer.jpg",
		"sprite_pos": [5,28], "sprite_size": [55,32], "speed": 15, "scalar": [1,1], "frames": [0,1,2,3,4,3,2,1,0] });
		this.bullets = [];
		this.height = height;
		this.width = width; 
		this.hasFired = false;
		this.isInvincible = false; 
		this.laserSound = document.getElementById("laser");  
	}; 

	MovingObject.Ship.prototype = Object.create(Asteroids.MovingObject.prototype);

	MovingObject.Ship.prototype.findVel = function(){
	};

	MovingObject.Ship.prototype.relocate = function() { 
		var pos = [ Math.floor(Math.random()*this.width) , Math.floor(Math.random()*this.height)];
		this.position = pos;
		this.velocity = [0,0];
	 };

	MovingObject.Ship.prototype.power = function(impulse){ 
		if (this.velocity[0] >= 50){
			if (impulse[0] < 0){
				this.velocity[0] += impulse[0];  
			} else {
				impulse[0] = impulse[0]; 
			}
		} else if (this.velocity[0] <= -50){
			if (impulse[0] > 0){
				this.velocity[0] += impulse[0];
			} else {
				impulse[0] = impulse[0]; 
			}
		} else { 
			this.velocity[0] += impulse[0]; 
		}

		if (this.velocity[1] >= 50){
			if (impulse[1] < 0){
				this.velocity[1] += impulse[1];  
			} else {
				impulse[1] = impulse[1]; 
			}
		} else if (this.velocity[1] <= -50){
			if (impulse[1] > 0){
				this.velocity[1] += impulse[1];
			} else {
				impulse[1] = impulse[1]; 
			}
		} else { 
			this.velocity[1] += impulse[1]; 
		}
	};	

	MovingObject.Ship.prototype.isCollidedWith = function(otherObject){
		if (otherObject instanceof MovingObject.Bullet){
			return false;
		} else if (Asteroids.Util.prototype.distance(this.position, otherObject.position) > (this.radius + otherObject.radius)){
			return false;
		} else if (this.isInvincible){
			return false;
		} else {
			return true;
		}
	};

	MovingObject.Ship.prototype.checkKeyState = function() {
		that = this; 
	
		if (Asteroids.input.getKeyState('W')){
			that.power([0,-5]); 
		}
		if (Asteroids.input.getKeyState('S')){
			that.power([0,5]); 
		}
		if (Asteroids.input.getKeyState('A')){
			that.power([-5,0]); 
		}
		if (Asteroids.input.getKeyState('D')){
			that.power([5,0]); 
		}
	};

	MovingObject.Ship.prototype.checkFire = function(){
	
		var that = this; 
		var posx = that.position[0];
		var posy = that.position[1];
		var vel = Array.prototype.slice.call(that.velocity);

		if (!this.hasFired){
			if (Asteroids.input.getKeyState('up') && (Asteroids.input.getKeyState('left'))){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [-50, -50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('left') && (Asteroids.input.getKeyState('down'))){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [-50, 50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('down') && Asteroids.input.getKeyState('right')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [50, 50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('right') && Asteroids.input.getKeyState('up')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [50, -50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			}
		}

		if (!this.hasFired){
			if (Asteroids.input.getKeyState('up')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [0, -50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('down')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					that.bullets.push(new MovingObject.Bullet( [posx,posy], [0, 50] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('left')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					that.bullets.push(new MovingObject.Bullet( [posx,posy], [-50, 0] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			} else if (Asteroids.input.getKeyState('right')){
				if ((vel[0] === 0) && (vel[1] === 0)){
					return;
				}else{
					this.bullets.push(new MovingObject.Bullet( [posx,posy], [50, 0] ));
					this.hasFired = true;
					this.laserSound.play();  
					setTimeout(function(){
						that.hasFired = false;
						}, 120);
				}
			}
		}
	};
		
	// MovingObject.Ship.prototype.bindKeyHandlers = function(event) { 
	// 	that = this;
	// 	key('up', function(){ that.power([0,-5]); });
	// 	key('down', function(){ that.power([0,5]); });
	// 	key('left', function(){ that.power([-5,0]); });
	// 	key('right', function(){ that.power([5,0]); });
	// 	key('space', function(){ 

	// 		var posx = that.position[0];
	// 		var posy = that.position[1];
	// 		var vel = Array.prototype.slice.call(that.velocity);

	// 		if ((vel[0] === 0) && (vel[1] === 0)){
	// 			return;
	// 		}else{
	// 			that.bullets.push(new MovingObject.Bullet( [posx,posy], [vel[0], vel[1]] ));
	// 		}
	// 	});
	// };
})();