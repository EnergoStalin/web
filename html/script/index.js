var UI = {
	menu: {
		e: null,
		set: function(e) {
			this.e = e;
			element(this.e.querySelector("#menu-bar-trigger"),{listen: {event: "click",funct: this.h}});
		},
		h: function(evt) {
			switch(evt.target.id) {
				case "menu-bar-trigger": UI.MessageBox("Debug","Menu trigger working");
			}
		}
	},
	MessageBox: function(caption, text, type=1, h1, h2) {
		var temp = element("div",{
			add: [
				element("p",{textContent: caption,class: "caption"}),
				element("p",{textContent: text,class: "subtext"})
			],
			class: "message-box",
			to: document.body
		});
		switch(type) {
			case 1:
				setTimeout(function() {
					document.body.removeChild(temp);
				},2000);	
			break;
			case 2:
				element(temp,{
					add: element("div",{
						add: [
								element("div",{class: "MButton", textContent: "ok",style: "margin-right: 5px;", listen: [{event: "click", funct: h1},{event: "click", funct: function() {temp.parentNode.removeChild(temp)}}]}),
								element("div",{class: "MButton", textContent: "no", listen: [{event: "click", funct: h2},{event: "click", funct: function() {temp.parentNode.removeChild(temp)}}]})
						],
					class: "MBContainer"
					})
				});
		}
	}
}
function foo(evt) {
	if(evt.target.textContent == "ok") {
		UI.MessageBox("Alert","Ok button pressed");
	} else {
		UI.MessageBox("Alert","No button pressed");
	}
}
var init = function() {
	UI.menu.set(document.getElementById("menu-bar"));
	UI.MessageBox("System","Initiation Success",1);
		UI.MessageBox("System","show hidden content",2,foo,foo);
}

document.addEventListener("DOMContentLoaded", init);
