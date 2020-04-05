var load_sprites = function(urls,callback) {
	var total = urls.length;
	var res = [];

	for(let url of urls)
	{
		let img = new Image();
		img.addEventListener("load",function() {
			if(--total == 0) callback(res);
		});

		img.src = url;
		res.push(img);
	}
}