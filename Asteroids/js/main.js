// TODO: Make viewport movable
// TODO: Clear all canvas before resizing

var textures = [
	"assets/asteroid_tileset.png"
];

var asteroids = [];

var options = function() {
	var self = this;

	this.asteroid_data = {
		cpm: 10,
		cap: 200,
		speed: 5,
		textures: null
	}

	//Construction viewport
	this.viewport = {x:0,y:0,rotation: 0};
	this.viewport.canvas = $("#viewport").get(0);
	if(!this.viewport.canvas) return null;
	this.viewport.ctx = this.viewport.canvas.getContext("2d");
	this.viewport.size = {w: this.viewport.canvas.width,h: this.viewport.canvas.height};
	this.viewport.object = function(dx,dy,ox,oy,ow,oh,x,y,w,h,tex) {
		this.dx = dx;
		this.dy = dy;
		this.offsetX = ox;
		this.offsetY = oy;
		this.cw = ow;
		this.ch = oh;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.rotation = 0;
		this.tex = tex;

		return this;
	}
	this.viewport.objects = [];
	this.viewport.draw = function() {
		self.viewport.ctx.clearRect(0,0,self.viewport.size.w,self.viewport.size.h);
		for(let o of self.viewport.objects)
		{
			self.viewport.ctx.save();
				self.viewport.ctx.translate(o.x+(o.w/2),o.y+(o.h/2));
				self.viewport.ctx.rotate(o.rotation);
				self.viewport.ctx.drawImage(o.tex,o.offsetX,o.offsetY,o.cw,o.ch,-(o.w/2),-(o.h/2),o.w,o.h);
			self.viewport.ctx.restore();
		}
	}

	this.clock = {
		ticks: 0,
		delta: 0,
		last: new Date(),
		tick: function() {
			let now = new Date();
			self.clock.delta = now - self.clock.last;
			self.clock.last = now;
			self.clock.ticks++;
		}
	}

	return this;
}

var run = function() {
	options.clock.tick();

	update();
	options.viewport.draw();

	requestAnimationFrame(run);
}

var update = function() {
	if(options.clock.ticks % options.asteroid_data.cpm == 0) {
		if(options.viewport.objects.length < options.asteroid_data.cap)
		{
			options.viewport.objects.push(new options.viewport.object(
				Math.random()*options.asteroid_data.speed,
				Math.random()*options.asteroid_data.speed,
				Math.round(Math.random()*8) * 124.625,
				Math.round(Math.random()*8) * 124.875,
				124.625,
				124.875,
				Math.random()*options.viewport.size.w,
				-64,
				64,
				64,
				options.asteroid_data.textures[0]
			));
		}
		else
			console.log("Cap exceeed " ,options.viewport.objects.length + '/' + options.asteroid_data.cap)
	}

	for(let i = 0; i < options.viewport.objects.length; i++)
	{
		let o = options.viewport.objects[i];
		if(((o.x + o.w) > options.viewport.size.w && o.dx > 0) || o.x < 0) o.dx = -o.dx;
		if(o.y >= options.viewport.size.h || o.y < -64 || (o.x > options.viewport.size.w)) { options.viewport.objects.splice(i,1); }

		o.x += o.dx;
		o.y += o.dy;
		o.rotation += 0.1;
	}
}

var init = function(textures) {
	options.asteroid_data.textures = textures;

	requestAnimationFrame(run);
}

$(document).ready(function() {
	options = new options();
	load_sprites(textures,init);
});
