(function () {
	if (typeof Asteroids=== "undefined") { 
		Asteroids = {}; 
	}

	var Game = Asteroids.Game = function(height, width){ 
		this.enemies = []; 
		this.explosions = []; 
		this.height = height;
		this.width = width; 
		this.lives = 5;
		this.score = 0;  
		var pos = [Math.floor(Math.random()*this.width) , Math.floor(Math.random()*this.height)];
		this.ship = new MovingObject.Ship(pos, this.height, this.width);
		this.level = 1; 
		this.created_trackers = 0; 
		this.created_floaters = 0; 
		this.created_dodgers = 0; 
	}; 

	var DIM_X = this.width; 
	var DIM_Y = this.height; 
	var NUM_TRACKERS = 60; 
	var NUM_FLOATERS = 50; 
	var NUM_DODGERS = 40;
	var enemyDeathSound = document.getElementById("enemy-death"); 
	var deathSound = document.getElementById("ship-death");  


	Game.BG = Asteroids.Util.loadImage("./assets/galaxybackground.jpg");

	Game.prototype.addTrackers = function() { 
		var that = this; 

	var createTracker = function () {
		var pos = [ Math.floor(Math.random()*that.width) , Math.floor(Math.random()*that.height)];		
		if (that.created_trackers < NUM_TRACKERS) {
			that.enemies.push(new MovingObject.Tracker(pos, that.height, that.width, that.ship));
			setTimeout(function () {
				createTracker();
			}, 800);
			that.created_trackers += 1; 
		}};
	createTracker();
	};

	Game.prototype.addFloaters = function(){
		var that = this; 

	var createFloater = function () {
		var pos = [ Math.floor(Math.random()*that.width) , Math.floor(Math.random()*that.height)];
		if (that.created_floaters < NUM_FLOATERS) {
			that.enemies.push(new MovingObject.Floater(pos, that.height, that.width, that.ship));
			setTimeout(function () {
				createFloater();
			}, 1000);
			that.created_floaters += 1; 
		}};
	createFloater();
	};

	Game.prototype.addDodgers = function(){
		var that = this; 

	var createDodger = function () {
		var pos = [ Math.floor(Math.random()*that.width) , Math.floor(Math.random()*that.height)];
		if (that.created_dodgers < NUM_DODGERS) {
			that.enemies.push(new MovingObject.Dodger(pos, that.height, that.width, that.ship));
			setTimeout(function () {
				createDodger();
			}, 1200);
			that.created_dodgers += 1; 
		}};
	createDodger();
	};

	Game.prototype.draw = function(ctx) {
		ctx = ctx.getContext('2d'); 
		ctx.clearRect(0,0,this.width,this.height); 
		ctx.drawImage(Game.BG, 0, 0, this.width, this.height); 
		ctx.font="20px Georgia";
		ctx.fillStyle="white"; 
		ctx.fillText("Lives remaining:"+this.lives, 10, 20); 
		ctx.font="20px Georgia";
		ctx.fillStyle="white";
		ctx.fillText("Score:"+this.score, 10, 40);
		this.allObjects().forEach(function(object) {
			object.render(ctx);  
		});
	};	

	Game.prototype.moveObjects = function(time) {  
		this.allObjects().forEach(function(object) { 
			if (typeof object !== "undefined"){
				object.move(time); 
			}
		});
	};

	Game.prototype.allObjects = function() {
		allObjs = [].concat(this.enemies).concat(this.ship).concat(this.ship.bullets);
		return allObjs;
	};

	Game.prototype.checkCollisions = function() { 
		var objects = this.allObjects();
		var ship = this.ship;
		for (var i = 0; i < objects.length-1; i++){
			var obj1 = objects[i];
			for (var j = i + 1; j < objects.length; j++){
				var obj2 = objects[j];
				if (obj1.isCollidedWith(obj2) && obj1 instanceof MovingObject.Tracker && obj2 instanceof MovingObject.Tracker){
					obj1.randVel();
				}
				if ([obj1, obj2].some(function(obj){return obj === ship}) && obj1.isCollidedWith(obj2)){
					ship.relocate();
					deathSound.play(); 
					this.lives -= 1;
					ship.isInvincible = true; 
					setTimeout(function(){ ship.isInvincible = false; }, 2000);  
				}
			} 
		}
	};

	Game.prototype.end = function(gameView, ctx){
		var that = this;
		this.created_trackers = NUM_TRACKERS;
		this.created_floaters = NUM_FLOATERS;
		this.created_dodgers = NUM_DODGERS; 
		document.removeEventListener('click', function(){gameView.reset();});
		document.addEventListener('click', function(){gameView.reset();});
		ctx = ctx.getContext('2d'); 
		ctx.font="40px Georgia";
		ctx.fillStyle="White"; 
		ctx.fillText("You Lost. Click anywhere to try again.", 150 , this.height/2);
	};

	Game.prototype.win = function(gameView, ctx){
		var that = this;
		document.removeEventListener('click', function(){gameView.reset();});
		document.addEventListener('click', function(){gameView.reset();});
		ctx = ctx.getContext('2d'); 
		ctx.font="40px Georgia";
		ctx.fillStyle="White"; 
		ctx.fillText("Congratulations!! You won! Click anywhere to play again.", 100 , this.height/2);
	};

	Game.prototype.over = function(){
		return (this.lives === 0) || (this.enemies.length === 0);
	};

	Game.prototype.reset = function(){
		this.enemies = []; 
		this.lives = 2; 
		this.ship = []; 
		this.score = 0; 
		this.created_trackers = 0;
		this.created_dodgers = 0;
		this.created_floaters = 0; 
		var pos = [Math.floor(Math.random()*this.width) , Math.floor(Math.random()*this.height)];
		this.ship = new MovingObject.Ship(pos, this.height, this.width);
		this.addTrackers(); 
		this.addFloaters(); 
		this.addDodgers(); 
	};

	Game.prototype.checkBullets = function() {        
		var bullets = this.ship.bullets;
		var enemies = this.enemies;
		for (var i = 0; i < bullets.length; i ++){
			for (var j = 0; j < enemies.length; j ++){
				if (typeof bullets[i] !== "undefined"){
					if (bullets[i].isCollidedWith(enemies[j])){
						bullets.remove(i);
						enemies.remove(j);
						enemyDeathSound.play(); 
						this.score += 1; 
					} else if (this.isOutOfBounds(bullets[i].position)){ 
						bullets.remove(i);
					} 
				}
			}		
		}
	};

	Game.prototype.checkTargets = function(){
		var bullets = this.ship.bullets;
		var enemies = this.enemies;
		for (var i = 0; i < enemies.length; i ++){
			for (var j = 0; j < bullets.length; j ++){
				if (typeof bullets[i] !== "undefined"){
					if (typeof enemies[j] !== "undefined"){
						(enemies[j].isTargetedBy(bullets[i]));
					}
				}
			}
		}	
	};

	Game.prototype.step = function(time) { 
		this.checkCollisions();
		this.checkBullets();
		this.checkTargets(); 	
		this.moveObjects(time);
	};

	Game.prototype.isOutOfBounds = function(pos){ 
		if ((pos[0] > this.width) || (pos[0] < 0) || (pos[1] > this.height) || (pos[1] < 0)){
			return true;
	}};

})();


