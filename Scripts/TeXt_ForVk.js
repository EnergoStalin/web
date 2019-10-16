var options = {
    dotted: {
        v: false,
        toggle: function() {
            if(this.v) {
                this.v = false;
                console.log("Dotted mod disabled.");
            } else {
                this.v = true;
                console.log("Dotted mod enabled.");
            }
        }
    }
};
var sel = ""; //Selectio buffer
var SymbolsToIgnore = {
    list: [' ', '.', '-', ',', '_'],
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
        if(options.dotted.v) {
            if(text[i] != '.') {
                buff += '.';
            }
        }
    }
    return buff;
}

document.addEventListener("keydown", function(evt) { //add handle
    if(evt.keyCode == 78) { //key code key small n
        sel = window.getSelection().toString(); //getting selection
        if(sel != "") { //checking on null
            var temp = Transform(sel); //transforming
            var input = document.querySelector(".im_editable, .im-chat-input--text, ._im_text"); //get vk input field by classes
            if(input != null) { //checking for null
                evt.preventDefault(); //aborting double n
                input.textContent = temp; //fill input by selection
            } else {
                console.log("Vk standart input not detected."); //if vk def input not detected
            }
        }
    } else if(evt.keyCode == 113) {
        options.dotted.toggle();
    }
});

/*
https://freedore-2003.000webhostapp.com/TeXt.js

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://freedore-2003.000webhostapp.com/TeXt_ForVk.js";
document.body.appendChild(script);

<script type = "text/javascript" src = "https://freedore-2003.000webhostapp.com/TeXt.js"></script>

Maded by EnergoStalin or AlexVip
*/