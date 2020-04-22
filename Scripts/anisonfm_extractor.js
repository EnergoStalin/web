// Here You can type your custom JavaScript...
var user_handler = (function() {
	var obj = {};

	obj.player = {
		is_play: false,
		togglePlay: function() {
	    	(!$("#anison_start, .start").hasClass("active")) ?
				$("#anison_stop, .stop").click() :
				$("#anison_start, .start").click();
		}
	};

	obj.key = function(evt) {
		if(evt.key == 'p' && evt.ctrlKey) {
			obj.player.togglePlay();
			evt.preventDefault();
		}
		else if(evt.key == 'm' && evt.ctrlKey)
		{
			let parent = $("#on_air, .track_info").get(0);
			window.open(
				"http://www.google.ru/search?q=" +
				encodeURI(
					$(parent).find(".anime").text() +
					' ' +
					$(parent).find(".title").text()
				),
				"_blank"
			).focus();
			evt.preventDefault();
    	}
    	else if(evt.key == 'i' && evt.ctrlKey)
    	{
    		window.open($("#current_poster_img").get(0).src,"_blank").focus();
    		evt.preventDefault();
    	}
    };
    $(window).bind("keydown",obj.key);

	return obj;
})();
