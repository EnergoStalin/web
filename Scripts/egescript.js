(function() {var list = null;
var total = 0;
var update = function() {
	var bar = document.getElementById("totalA");
	var length = list.length - 5;
	if(bar != null) {
		if(total >= 1000 || list.length >= 1000) {
			bar.textContent = "Total "+(total / 1000).toFixed(2) + "k / " + (length / 1000).toFixed(2) + "k";
			window.document.title = "Total "+(total / 1000).toFixed(2) + "k / " + (length / 1000).toFixed(2) + "k";
		} else { 
			bar.textContent = "Total " + total + " / " + length;
			window.document.title = "Total " + total + " / " + length;
		}
	} else {
		var e = document.createElement("div"); 
		document.body.appendChild(e);
		e.textContent = "Total " + total + " / " + length;
		window.document.title = "Total " + total + " / " + length;
		e.id = "totalA"; 
		e.style = "position: fixed; bottom: 0px; color: blue; right: 0px;width: 70px; height: 12px; font-family: arial;font-size: 10px; background: #cce; border-left: 2px solid #eec; border-radius: 2px 0px 0px 0px; border-top: 2px solid #eec; text-align: center; justify-content: center;";
	}
}
var Check = function(flag) {
	if(this.value != "") {
		if(!this.confirm) {
			this.style = "box-shadow: 2px 3px 10px green; border: 2px solid green;"; 
			++total; update();
			this.confirm = true;
		}
	} else {
		if(flag != true) {
			if(total == 0) {} else {
				this.removeAttribute("style"); 
				total--;
			} this.confirm = false; update();
		}
	}
}
list = document.querySelectorAll(".test_inp");
for(var i = 5; i < list.length; i++) {
	list[i].confirm = false;
	list[i].addEventListener("input", Check);
	Check.call(list[i],true);
} update();
})();
//comment line