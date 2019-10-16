/*
Avalible settings:
time - delay between each iteration.
min - min width of target element.
decreace - change width per iteration.
style - additonal style params in css string format.
flag - flag for dispaly element width in pixels by inner text content.
*/
var AnimateElement = function(node, param) { //function declared with 2 params node link fo DOM element and param boject of settings
	if(node.anim && node.anim.isAnim) {
		if(node.anim.handler != null) {
			clearInterval(node.anim.handler);
			node.anim.isAnim = false;
			node.anim.handler = null;
			if(!node.anim.defstyle) { //Removing if it dosent exist
				node.removeAttribute("style");
			} else { //Change to default
				node.style = node.anim.defstyle;
			}
		}
	} else {
		node.anim = { //inner element animation object
			isAnim: true, //animation flag
			handler: null, //setInterval Handler
			defW: node.width | node.clientWidth, //default width of element
			style: param.style, //additional style params
			defstyle: node.style.cssText //default element style
		};
		var animFlag = true; //a flag that changes - to +
		var maxw = node.anim.defW; //maxw of element
		var minw = (param && param.min) ? (maxw - param.min) : (maxw - 20); //minw of element
		var change = (param && param.decreace && (param.decreace != 0)) ? param.decreace : 1; //change speed
		var dec = 1; //decreace param
		node.style = node.anim.style + node.anim.defstyle; //style adding
		node.anim.handler = setInterval(function() { //animation handler
			if(dec <= 1) animFlag = false; //loop of changes
			else if(dec >= minw) animFlag = true;
			if(animFlag) dec-=change;
			else dec+=change;
			if(param && param.flag) node.textContent = maxw - dec; //flag work
			node.style.width = (maxw - dec) + "px"; //style addition
		}, (param && param.time) ? param.time : 10); //time setting
	}
}