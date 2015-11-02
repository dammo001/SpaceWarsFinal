function Sprite(url, pos, size, speed, frames, dir, once, scalar) {
    this.sprite_pos = pos;
    this.sprite_size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 0;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.position = pos; 
    this.scalar = scalar; 
}
    Sprite.prototype.update = function(time) {
    	this._index += this.speed*time;
    };

    Sprite.prototype.render = function(ctx) {
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
                  this.position[0]-30, this.position[1]-20,
                  this.sprite_size[0]*this.scalar[0], this.sprite_size[1]*this.scalar[1]);
	};	
