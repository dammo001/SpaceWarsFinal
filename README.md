# SpaceWars
[Click here to play!](https://dammo001.github.io/SpaceWarsFinal)

![screenshot](./assets/spacewarsGif.gif)

## Description
Destroy the aliens!

SpaceWars is a simple browser-based shooter game built entirely with JavaScript and HTML5 Canvas.

## Features
* Game mechanics built from the ground up, including collision detection, scoring, respawning, enemy AI etc.
* Sprite-based drawings and animations done with HTML5 Canvas
* Utilizes prototypal inheritance for creating the different types of moving objects


## The Code 
I had 2 major hurdles when creating this game. 

The first was that my game was initially run on a step loop using setInterval so that the game ran at 60 fps. Essentially, the game loop was called again every interval, causing animation to occur. While this was fine during the early stages of the game, I soon realized that that method didn't enable the sort of gameplay that I envisioned -- it was simply too choppy. So, I read up on other methods, and came across "requestAnimationFrame", a JS function that allows the browser to queue up the next loop and execute it at the next best possible moment, rather than executing it at an arbitrary time which may or may not be optimal. If you'd like to read more, see https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/

Another major hurdle I had was in creating the A.I. for my aliens. I decided that I wnated to have a floater that bonced off walls, a tracker which tracks the player at a fast speed, and a dodger which tracks at a slower speed, but can dodge bullets. The tracker was pretty easy, all I had to do was have it calculate the vector to the player's position at each step of the event loop. I thought the dodger would be pretty straightforward as well. My strategy was to loop through the bullets and, if a bullet was within a certain distance of a dodger, the dodger would change its velocity vector to one perpendicular of that of the incoming bullet. The difficulty ended up being in A) getting that to work and B) getting it to only happen for a small amount of time. After all, the dodger has to return to following the user after it dodges. To make this work, I ended up at the following code: 


	MovingObject.Dodger.prototype.findVel = function(){
		this.velocity = Asteroids.Util.findVecTo(this.position, this.ship.position, 30); 
	};

	MovingObject.Dodger.prototype.perpVel = function(bullet){
		var vel = Asteroids.Util.prototype.distance([0,0], this.velocity); 
		this.velocity = Asteroids.Util.findVecAway(this.position, bullet.position, vel*1.3);
	};

	MovingObject.Dodger.prototype.isTargetedBy = function(bullet){	
		var that = this; 
		bullet
		console.log(Asteroids.Util.prototype.distance(this.position, bullet.position))	
		if ((Asteroids.Util.prototype.distance(this.position, bullet.position) < 120) && 					(!this.hasDodged)){
			this.hasDodged = true;
			setTimeout(function(){ that.hasDodged = false;}, 100); 
			this.perpVel(bullet); 
		} 
	};
	
	
The trick here is that I created a new boolean "hasDodged" which I put on a timeout of 100ms. After the dodger dodges, its velocity vector is the perpendicular one for 100 ms. After that 100 ms passes and the timeout callback changes the dodgers state, the dodger goes back to using this.findVel() to determine its velocity (pointed at the player again). 

## Things to Come
* [ ] Smarter/safer spawning for player's character
* [ ] Spawn enemies at defined points
* [ ] Global leaderboard (utilizing a cloud DB)
* [ ] More stages for clearer gradation of difficulty, more enemy types
* [ ] Powerups
* [ ] More weapons?!
* [x] Sound effects!
