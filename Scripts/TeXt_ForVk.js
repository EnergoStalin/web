//Created by EnergoStalin
//Ctrl+q paste transformed text to vk input box
//Ctrl+k toggle enable caps processing
//Ctrl+d toggle enable dot processing
// Here You can type your custom JavaScript...

// TODO: Hide Iterface

var element = function(tag,option) {
	var elem = null;
	if(tag instanceof Node) elem = tag;
	else elem = document.createElement(tag);
	for(var o in option) {
		switch(o) {
			case "remove":
				tag.parentNode.removeChild(tag);
			break;
			case "class":
				if(option[o] instanceof Array) {
					for(var k = 0; k < option[o].length; k++) {
						if(hasClass(elem,option[o][k])) {
							elem.classList.remove(option[o][k]);
							if(elem.classList.length == 0) elem.removeAttribute("class");
						} else elem.classList.add(option[o][k]);
					}
				} else {
					if(hasClass(elem,option[o])) {
						elem.classList.remove(option[o]);
						if(elem.classList.length === 0) elem.removeAttribute("class");
					}
					else elem.classList.add(option[o]);
				}
			break;
			case "add":
				if(option[o] instanceof Array) for(var j = 0; j < option[o].length; j++) elem.appendChild(option[o][j]);
				else elem.appendChild(option[o]);
			break;
			case "to":
				option[o].appendChild(elem);
			break;
			case "handler":
				if(option[o] instanceof Array) {
					for (var i = 0; i < option[o].length; i++) {
						elem.addEventListener(option[o][i].event,option[o][i].handler);
					}
				} else {
					elem.addEventListener(option[o].event,option[o].handler);
				}
			break;
			case "module":
				if(option[o] instanceof Array)
				{
					for(var j in option[o])
					{
						elem[j] = option[o][j];
						for(var i in option[o][j])
							elem[j][i] = option[o][j][i]
					}
				}
				else
				{
					for(var i in option[o])
							elem[i] = option[o][i]
				}

			break;
			default:
				elem[o] = option[o];
		}
	}
	return elem;
}

var options = function() {
		var self = this;
    this.dotted = function() {
        this.v = false;
        this.dc = 1;
        this.toggle = function() {
            this.v = !this.v;
        }

        return this;
    };
    this.dotted = new this.dotted();
    this.toggleCaps = false;
    this.caps = function() {
        this.toggleCaps = !this.toggleCaps;
    }
    this.display = function() {
        let state_base_style = "\
            width: 40px;\
            height: 40px;\
            padding: 10px;\
            margin: 5px;\
            border-radius: 5px;\
            border: 2x solid;\
            border-color: black;\
						user-select: none;\
        ";
				this.help = element("div",{
					style: "\
						background: rgba(0,0,0,0.5);\
						position: fixed;\
						top: 0px;\
						left: 0px;\
						width: 100%;\
						height: 100%;\
						display: none;\
						align-items: center;\
						justify-content: center;\
						z-index: 999999;\
					",
					module: {
						toggle: function()
						{
								if(this.style.display === "none")
								{
										this.style.display = "flex";
								}
								else
								{
										this.style.display = "none";
								}
						}
					},
					to: document.body
				});

				var helpText = element("div",{style: "\
					display: block;\
					background: white;\
					border: 2px solid black;\
					padding: 10px;\
				", to: this.help});

				element("h1",{textContent: "Help", style: "text-align: center; width: 100%;", to: helpText});
				element("p",{textContent: "Ctrl+d toggle dotted mode.", to: helpText});
				element("p",{textContent: "Ctrl+p ask dot count.", to: helpText});
				element("p",{textContent: "Ctrl+k toggle caps mode.", to: helpText});
				element("p",{textContent: "Ctrl+q run text transform.", to: helpText});
				element("p",{textContent: "Ctrl+h help.", to: helpText});

        this.root = element("div",{
					style: "\
	            font-size: 18px;\
	            font-family: arial;\
	            position: fixed;\
	            left: 0px;\
	            bottom: 15px;\
	            z-index: 999998;\
	            float: left;\
	        ",
					to: document.body
				});
        this.dotcounth = element("span",{
					style: state_base_style + "background: green;",
					id: "dcount",
					module: {
						update: function(that)
		        {
		            this.textContent = that.dotted.dc;
		        }
					},
					to: this.root
				});
        this.dotted = element("span",{
					style: state_base_style + "background: red; cursor: pointer;",
					module: {
						update: function(that)
			      {
			        (that.dotted.v) ?
			        	this.style.background = "green" :
			         	this.style.background = "red";
			      }
					},
					handler: {event: "click", handler: function() { self.dotted.toggle(); self.display.update(self); return false;}},
					textContent: "Is Dotted?",
					id: "is_dotted",
					to: this.root
				});
        this.caps = element("span",{
					style: state_base_style + "background: red; cursor: pointer;",
					id: "is_caps",
					textContent: "Is Caps?",
					module: {
						update: function(that)
		        {
		            (that.toggleCaps) ?
		                this.style.background = "green" :
		                this.style.background = "red";
		        }
					},
					handler: {event: "click", handler: function() { self.caps(); self.display.update(self); return false;}},
					to: this.root
				});
        let info = element("span",{
					style: state_base_style + "clear: both;",
					textContent: "Text Transformer VK1.0",
					to: this.root
				});
        info.style.background = "white";

        this.update = function(that)
        {
            this.dotcounth.update(that);
            this.dotted.update(that);
            this.caps.update(that);
        }

        return this;
    }

    this.display = new this.display();

    return this;
};
options = new options();
options.display.update(options);
var sel = ""; //Selection buffer
var SymbolsToIgnore = {
    list: [
        '@','#','$','%',' ','.','-',',','_',
        '!','?','/','\\','<','>',':','0','1',
        '2','3','4','5','6','7','8','9','(',')',
        '+','-','~',';'
    ],
    Compare: function(char) {
        for(var i = 0; i < this.list.length; i++) {
            if(char === this.list[i]) return true;
        } return false;
    }
};

var Transform = function(text) { //text ransform function
    var buff = ""; // text buffer
    var flag = true; // switch flag

    for(var i = 0; i < text.length; i++) {
        if(options.toggleCaps)
        {
            if(SymbolsToIgnore.Compare(text[i])) { //ignored symbols
                buff += text[i];
            } else {
                if(flag) {
                    buff += text[i].toUpperCase(); //upper
                    flag = false;
                } else {
                    buff += text[i].toLowerCase(); //lower
                    flag = true;
                }
            }
        } else buff += text[i];
        if(options.dotted.v) {
            if(text[i] != '.') {
                for(var j = 0; j < options.dotted.dc; j++)
                    buff += '.';
            }
        }
    }
    return buff;
}

document.addEventListener("keydown", function(evt) { //add handle
    if(evt.key == 'q' && evt.ctrlKey) { //key code key small n
        sel = window.getSelection().toString(); //getting selection
        if(sel !== "") { //checking on null
            sel = Transform(sel); //transforming
            var input = document.querySelector(".im_editable, .im-chat-input--text, ._im_text"); //get vk input field by classes
            if(input !== null) { //checking for null
                evt.preventDefault(); //aborting double n
            input.textContent = sel; //fill input by selection
            } else {
                alert("vk standart input not detected please update query options."); //if vk def input not detected
            }
        }
    }
		else if(evt.key == 'd' && evt.ctrlKey)
		{
        options.dotted.toggle();
        options.display.update(options);
        evt.preventDefault();
    }
		else if(evt.key == 'p' && evt.ctrlKey)
    {
        options.dotted.dc = prompt("Dot count.");
        options.display.update(options);
        evt.preventDefault();
    }
		else if(evt.key == 'k' && evt.ctrlKey)
    {
        options.caps();
        options.display.update(options);
        evt.preventDefault();
    }
		else if(evt.key == 'h' && evt.altKey)
		{
				options.display.help.toggle();
		}
});
