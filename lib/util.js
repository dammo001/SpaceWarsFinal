(function () {
	if (typeof Asteroids === "undefined") { 
		Asteroids = {}; 
	}

	var Util = Asteroids.Util = function(){ 
	}; 

	Util.loadImage = function (img_path) {
		var img = new Image();
	    img.src = img_path;

	    return img;
	};

	Util.prototype.randomVec = function(length) { 
		return [length*Math.random()*(Math.random() < 0.5 ? -1 : 1), length*Math.random()*(Math.random() < 0.5 ? -1 : 1)];
	};

	Util.prototype.distance = function(pos1, pos2) {
		var x1 = pos1[0];
		var y1 = pos1[1];
		var x2 = pos2[0];
		var y2 = pos2[1];
		var xDist = Math.pow((x1 - x2),2);
		var yDist = Math.pow((y1 - y2),2);
		return Math.sqrt(xDist + yDist);
	};

	var dir = Util.dir = function (vec) {
	    var norm = Util.norm(vec);
	    return Util.scale(vec, 1 / norm);
	};

	var findVecTo = Util.findVecTo = function(pointFrom, pointTo, vel) { 
		var x1 = pointFrom[0];
		var y1 = pointFrom[1];
		var x2 = pointTo[0];
		var y2 = pointTo[1]; 
		var dX = (x2-x1);
		var dY = (y2-y1); 
		var s = (Util.prototype.distance(pointFrom, pointTo) / vel); 
		var vX = dX/s; 
		var vY = dY/s;
		return [vX, vY]; 
	};

	var findVecAway = Util.findVecAway = function(dodgerPos, bulletPos, vel) {
		var path = Util.findVecTo(dodgerPos, bulletPos, vel);
		var newVel = Util.findPerp(path); 
		return newVel; 
	};

	var flipVec = Util.flipVec = function(vec){
		var flip;
		flip = [-vec[0],-vec[1]];
		return flip;
	};

	var findPerp = Util.findPerp = function(vec){
		var perp;
		perp = [-vec[1], vec[0]];
		return perp; 
	};

	var norm = Util.norm = function (vec) {
	    return Util.dist([0, 0], vec);
	};

	var scale = Util.scale = function (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	};

	Array.prototype.remove = function(from, to) {
  		var rest = this.slice((to || from) + 1 || this.length);
  		this.length = from < 0 ? this.length + from : from;
  		return this.push.apply(this, rest);
};

})();

