(function () {
	if (typeof Asteroids === "undefined") { 
		Asteroids = {}; 
	}
	
	var requestAnimFrame = (function(){
    	return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
	})();

	var gameView = Asteroids.gameView = function(ctx, height, width){ 
		this.game = new Asteroids.Game(height,width);
		this.game.addTrackers();
		this.game.addFloaters(); 
		this.game.addDodgers();
		this.ctx = ctx;
		this.gameTime = 0; 
		this.lastTime = null;
	};

	var isOver = false; 
	var requestId;
	var bgMusic = document.getElementById("bg-audio"); 

	gameView.prototype.main = function(){
	    var now = Date.now();
	    var dt = (now - this.lastTime) / 1000.0;

	    this.update(dt);

	    this.lastTime = now;
	    requestId = requestAnimFrame(this.main.bind(this));
	    if (!isOver){
			if (this.game.over()){
				this.end(); 
				window.cancelAnimationFrame(requestId);
				requestId = undefined; 
			} 
		}
	};

	gameView.prototype.update = function(time){ 
		this.gameTime += time;
		this.game.ship.update(time); 
		this.game.ship.checkKeyState(); 
		this.game.ship.checkFire(); 
		this.game.step(time);
		this.game.draw(this.ctx);
		bgMusic.play();
	};

	gameView.prototype.start = function() { 
		this.lastTime = Date.now();
		bgMusic.play();
		var game = this.game;
		var ctx = this.ctx;
		if (!requestId){
			this.main(); 
		}	
	}; 

	gameView.prototype.end = function(){
		if (!isOver){
			if (this.game.lives === 0){
			this.game.end(this, this.ctx); 
			} else {
				this.game.win(this, this.ctx); 
			}
		}
		isOver = true;
		bgMusic.pause();  
	};


	gameView.prototype.reset = function(){
		this.game.reset();
		this.start(); 
		isOver = false; 
	};

})();

