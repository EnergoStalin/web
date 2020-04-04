//Created by EnergoStalin
//Ctrl+q paste transformed text to vk input box
//Ctrl+k toggle enable caps processing
//Ctrl+d toggle enable dot processing
// Here You can type your custom JavaScript...
var options = function() {
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
        var state_base_style = "\
            width: 40px;\
            height: 40px;\
            padding: 10px;\
            margin: 5px;\
            border-radius: 5px;\
            border: 2x solid;\
            border-color: black;\
        ";
        this.root = document.createElement("div");
        this.dotcounth = document.createElement("span");
        this.dotted = document.createElement("span");
        this.caps = document.createElement("span");
        var info = document.createElement("span");
        info.style = state_base_style + "clear: both;";
        info.style.background = "white";
        info.textContent = "Text Transformer VK1.0";
        this.root.style = "\
            font-size: 18px;\
            font-family: arial;\
            position: fixed;\
            left: 0px;\
            bottom: 15px;\
            z-index: 1;\
            float: left;\
        ";
        this.dotted.style = state_base_style + "background: red;";
        this.caps.style = state_base_style + "background: red;";
        this.dotcounth.style = state_base_style + "background: green;";
        this.dotcounth.id = "dcount";
        this.dotted.textContent = "Is Dotted?";
        this.dotted.id = "is_dotted";
        this.caps.id = "is_caps";
        this.caps.textContent = "Is Caps?";
        
        this.dotted.update = function(that)
        {
            (that.dotted.v) ? 
                this.style.background = "green" :
                this.style.background = "red";
        }
        this.caps.update = function(that)
        {
            (that.toggleCaps) ? 
                this.style.background = "green" :
                this.style.background = "red";
        }
        this.dotcounth.update = function(that)
        {
            this.textContent = that.dotted.dc;
        }
        
        this.root.appendChild(this.dotcounth);
        this.root.appendChild(this.dotted);
        this.root.appendChild(this.caps);
        this.root.appendChild(info);
        
        this.update = function(that)
        {
            this.dotcounth.update(that);
            this.dotted.update(that);
            this.caps.update(that);
        }
        
        document.body.appendChild(this.root);
        
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
        if(sel != "") { //checking on null
            sel = Transform(sel); //transforming
            var input = document.querySelector(".im_editable, .im-chat-input--text, ._im_text"); //get vk input field by classes
            if(input != null) { //checking for null
                evt.preventDefault(); //aborting double n
            input.textContent = sel; //fill input by selection
            } else {
                alert("vk standart input not detected please update query options."); //if vk def input not detected
            }
        }
    } else if(evt.key == 'd' && evt.ctrlKey) {
        options.dotted.toggle();
        options.display.update(options);
        evt.preventDefault();
    } else if(evt.key == 'p' && evt.ctrlKey)
    {
        options.dotted.dc = prompt("Dot count.");
        options.display.update(options);
        evt.preventDefault();
    } else if(evt.key == 'k' && evt.ctrlKey)
    {
        options.caps();
        options.display.update(options);
        evt.preventDefault();
    }
});
