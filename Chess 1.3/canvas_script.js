var tileset = new Image();
var turn = true;
var tile = [];
var Viewport = {x: 140,y: 40};
var Coord = function(x,y) {
	this.x = x;
	this.y = y;
	this.selected = false;
	this.contain = function(x,y,size) {
		if(x > this.x && x < (this.x + size) && y > this.y && y < (this.y + size)) return true;
		return false;
	}
	
	return this;
}

var FigureCoord = {
	"quinn": new Coord(0,0),
	"king": new Coord(64,0),
	"rook": new Coord(64*2,0),
	"horse": new Coord(64*3,0),
	"elephant": new Coord(64*4,0),
	"pawn": new Coord(64*5,0)
}

var FigureSet = [
	"rook",
	"horse",
	"elephant",
	"quinn",
	"king",
	"elephant",
	"horse",
	"rook",
]

var Check = function(type,coord) {
	this.size = 64;
	this.type = type;
	this.coord = coord;
	this.absCoord = null;
};

var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext("2d");

function getRelativeMousePosition(mousex,mousey) {
	var rect = canvas.getBoundingClientRect();
	return {x: mousex - rect.left - Viewport.x, y: mousey - rect.top - Viewport.y}
}

function Draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle = "yellow";
	for(var i = 0,cur = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++,cur++) {
			if(tile[cur].selected) ctx.fillRect(tile[cur].absCoord.x,tile[cur].absCoord.y,tile[cur].size,tile[cur].size);
			if(tile[cur].type != -1) {
				ctx.drawImage(
					tileset,
					tile[cur].coord.x,
					tile[cur].coord.y,
					tile[cur].size,
					tile[cur].size,
					tile[cur].absCoord.x,//size*j+Viewport.x,
					tile[cur].absCoord.y,//size*i+Viewport.y,
					tile[cur].size,
					tile[cur].size
				);
			}
		}
	}
}

function Turn() {

}

//***************************run***************************

var Win = function() {
	return true;
}

var run = function() {
	Draw();
	while(!Win()) {
		if(turn) {
			
		} else {

		}
	}
}

//**************************init***************************

var init = function() {
	tileset.src = "SPRITES/memI0.png"
	tileset.addEventListener("load",run);
	for(var i = 0; i < 8; i++) {
		tile.push(new Check(0,FigureCoord[FigureSet[i]]));
	}
	for(var i = 0; i < 8; i++) {
		tile.push(new Check(0,FigureCoord["pawn"]));
	}
	for(var i = 0; i < 32; i++) {
		tile.push(new Check(-1,new Coord(0,0)));
	}
	for(var i = 8; i > 0; i--) {
		tile.push(new Check(1,new Coord(FigureCoord["pawn"].x,FigureCoord["pawn"].y+64)));
	}
	for(var i = 8; i > 0; i--) {
		tile.push(new Check(1,new Coord(FigureCoord[FigureSet[i-1]].x,FigureCoord[FigureSet[i-1]].y+64)));
	}
	for(var i = 0,cur = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++,cur++) {
			tile[cur].absCoord = new Coord(tile[cur].size*j+Viewport.x, tile[cur].size*i+Viewport.y);
		}
	}

	document.body.appendChild(canvas);
}
//Swap

var swap = function(one,two) {
	var  temp = two;
	two = one;
	one = temp;
}


//************************listeners************************

canvas.addEventListener("click",function(evt) {
	//var win = null;
	//win = Win();
	//if(win == null) {
		var mouse = getRelativeMousePosition(evt.x,evt.y);
		mouse.x += Viewport.x;
		mouse.y += Viewport.y;
		for(var i = 0; i < 64; i++) {
			if(tile[i].absCoord.contain(mouse.x,mouse.y,tile[i].size) && tile[i].type != -1) {
				tile[i].selected = !tile[i].selected;
				Draw();
				break;
			}
		}
	//}
});
window.addEventListener("DOMContentLoaded",init);