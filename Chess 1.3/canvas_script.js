var tileset = new Image();
var turn = true;
var tile = [];
var Viewport = {x: 140,y: 40};

var Check = function(type) {
	this.size = 64;
	this.type = type | 0;
	this.coord = {x: 0,y: 0};
};

var canvas = document.createElement("canvas");
canvas.width = 800;
canvas.height = 600;
canvas.style = "position: absolute; top: 0px; left: 0px; background: #fff; border: 2px solid black; border-radius: 5px; z-index: 99;"
var ctx = canvas.getContext("2d");

function getRelativeMousePosition(mousex,mousey) {
	var rect = canvas.getBoundingClientRect();
	return {x: mousex - rect.left, y: mousey - rect.top}
}

function Draw() {
	for(var i = 0,cur = 0; i < 8; i++) {
		for(var j = 0; j < 8; j++,cur++) {
			ctx.drawImage(tileset,tile[cur].coord.x,tile[cur].coord.y,tile[cur].size,tile[cur].size,tile[cur].size*j+Viewport.x,tile[cur].size*i+Viewport.y,tile[cur].size,tile[cur].size);
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
		for(var j = 0; j < 8; j++) {
			tile.push(new Check(((i%2==0) && (j%2!=0)) ? 1 : 0));
		}
	}

	document.body.appendChild(canvas);
}

//************************listeners************************

canvas.addEventListener("click",function(evt) {
	var win = null;
	win = Win();
	if(win == null) {
		var mouse = getRelativeMousePosition(evt.x,evt.y);
		tile[mouse]

		Draw();
	}
});
window.addEventListener("DOMContentLoaded",init);