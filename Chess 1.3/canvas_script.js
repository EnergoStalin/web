var load_images = function(arr, callback) {
	let total = arr.length,
	res = [];
	
	let onload = function() {
		if(--total == 0) { console.log("Loaded... ",total); callback(res); }
	}

	for(let i = 0; i < arr.length; i++)
	{
		res.push(new Image());
		res[i].addEventListener("load", onload);
		res[i].src = arr[i];
	}
}
var _Chess = function() {
	//context
	var that = this;
	//Classes
	this.Coord2D = function(x,y) {
		this.x = x;
		this.y = y;
		this.contain = function(c,size) {
			if(c.x > this.x && c.x < (this.x + size) && y > this.y && y < (this.y + size)) return true;
			return false;
		}
		
		return this;
	}
	this.viewport = function() {
		var that2 = this;
		this.x = this.y = 0;
		this.size =  {
			w: 800,
			h: 600
		};
		this.canvas = document.createElement("canvas");
		this.canvas.style = "width: 800px; height: 600px;";
		document.body.appendChild(this.canvas);
		this.ctx = this.canvas.getContext("2d");
		this.background = "gray";
		this.draw = function() {
			that2.ctx.fillStyle = that2.background;
			that2.ctx.fillRect(0,0,that2.size.w,that2.size.h);
			that2.ctx.drawImage(that.tileset.img,0,0,that.tileset.img.width/2,that.tileset.img.height/2);
		}
	};

	this.viewport = new this.viewport();

	//sprites
	this.sprites = [
		"SPRITES/memI0.png"
	];

	//chess order
	this.order = [
		"rook",
		"horse",
		"elephant",
		"quinn",
		"king",
		"elephant",
		"horse",
		"rook",
	];

	//UV coord
	this.tilesetUV = {
		"quinn": new this.Coord2D(0,0),
		"king": new this.Coord2D(64,0),
		"rook": new this.Coord2D(64*2,0),
		"horse": new this.Coord2D(64*3,0),
		"elephant": new this.Coord2D(64*4,0),
		"pawn": new this.Coord2D(64*5,0)
	};

	//Chess desk
	this.desk = [];

	//tileset
	this.tileset = {size: 64, url: "", img: null, load: function(l)
		{
			that.tileset.url = l[0].src;
			that.tileset.img = l[0];

			that.init(null);
		}
	};

	this.loop = function() {
		that.viewport.draw();

		requestAnimationFrame(that.loop);
	}

	//Init function
	this.init = function(evt)
	{
		if(evt != null)
		{
			load_images(that.sprites,that.tileset.load);
			return;
		}
		
		requestAnimationFrame(that.loop);
	}
};

var Chess = new _Chess();

window.addEventListener("DOMContentLoaded",Chess.init);