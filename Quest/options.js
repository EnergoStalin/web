var SimulateOptions = {
	speed: 1,
	maxSpeed: 5,
	minSpeed: 1,
	humans: 0
}
var EnvironmentOptions = {
	assets_url: [
		/*{
			name: ,
			url: 
}*/
	],
	findAsset: function(name) {
		for(var i = 0; i < this.assets.length; i++) {
			if(this.assets[i].name == name) return i;
		}
		return -1; 
	},
	assets: []
}

var DrawRef = {
	ctx: null,
	width: 0,
	height: 0
};