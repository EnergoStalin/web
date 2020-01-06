var tileset = new Image();

//***************************run***************************

var run = function() {
	
}

//**************************init***************************

var init = function() {
	tileset.src = "SPRITES/meml0.png"
	tileset.addEventListener("load",run);
}

//************************listeners************************

document.addEventListener("DOMContentLoaded",init);