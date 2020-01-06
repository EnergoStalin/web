var desk = create("div","desk","desk");
var row = ['a','b','c','d','e','f','g','h'];
var rowDecode = {"a": 1,"b": 2,"c": 3,"d": 4,"e": 5,"f": 6,"g": 7,"h": 8};
var set = [4,2,3,5,6,3,2,4];
var figureAssoc = {1: "Пешка",2: "Конь",3: "Слон",4: "Ладья",5: "Ферзь",6: "Король"};
var playSide = 0;
var selected = {s: false};
var toolbar = create("div","toolbar");
var sideDraw = create("div","side");
var turnCount = 1;
function random(m) {
	var r = Math.ceil(Math.random() * m);
		return r;
}
function toolbarInit(e,a) {
	var span = create("p","turns","turn");
	var wrap = create("div","list","list-wrap")
	var list = create("ul","listing","list");
	var text = create("p","side-text");
	var p = create("p","side-first");
	text.textContent = (playSide == 0) ? "White" : "Black";
	wrap.appendChild(list);
	span.textContent = "Ход " + turnCount;
	e.appendChild(span);
	e.appendChild(wrap);
	p.appendChild(document.createTextNode("Сторона"));
	a.appendChild(p);
	a.appendChild(text);
}
function listing(e,i,val) {
	if(playSide == 0) turnCount++;
	var l = create("li","list-li");
	l.textContent = i + " : " + val + " " + ((playSide == 1) ? "White" : "Black");
	e.appendChild(l);
	e.parentNode.parentNode.firstChild.textContent = "Ход : " + turnCount;
	sideDraw.lastChild.textContent = (playSide == 0) ? "White" : "Black";
}
function create(e,style,id) {
	if (e) {
		var elem = document.createElement(e);
		if(style)
			elem.classList.add(style);
		if(id)
			elem.id = id;
		return elem;
	} else {
		return 0;
	}
}
function move(elem,target,isF) {
	var e = document.getElementById(target);
	if(e != "null") {
		if(isF) {
			e.removeChild(e.lastChild);
		}
		elem.parentNode.removeChild(elem);
		e.appendChild(elem);
		elem.id = e.id + elem.id.slice(3);
	} else {
		console.log("Not found: " + target);
	}
}
function parseId(id) {
	var parseId = {};
	var arr = id.split("-");
	parseId.id = id;
	parseId.col = parseInt(arr[0]);
	parseId.row = arr[1];
	if(arr[2]) {
		parseId.isFigure = true;
		parseId.figureId = parseInt(arr[2],10);
		parseId.figureName = figureAssoc[arr[2]];
		parseId.figureSide = (arr[3] == 1) ? "White" : "Black";
		parseId.figureSideId = parseInt(arr[3],10);
		parseId.figureParam = parseInt(arr[4],10);
	} else parseId.isFigure = false;
	
	return parseId;
}
function makePoly(toAppend) {
	function putContent(e) {
		e.id = i +"-"+ row[j - 1];
		var d = create("span");
		if(j === 1) {
			d.textContent = i;
			e.appendChild(d);
		}	
		if(i === 1) {
			d.textContent = row[j-1];
			e.appendChild(d);
		}
		if(i === 1 && j === 1) {
			d.textContent = i+row[j-1];
			e.appendChild(d);
		}
	}
		for(var j = 1; j <= 8; j++)
	for(var  i = 1; i <= 8; i++) {
		var e = (function() {
				if(j % 2 == 0) {
					if(i % 2 == 0) {
						var e = create("div","white");
						putContent(e);
						return e;
					} else {
						var e = create("div","black");
						putContent(e);
						return e;
					}
				} else {
					if(i % 2 == 0) {
						var e = create("div","black");
						putContent(e);
						return e;
					} else {
						var e = create("div","white");
						putContent(e);
						return e;
					}
			}
			})();
		toAppend.appendChild(e);
	}
}
function gameSet(append) {
	var cur = append.firstChild;
 	for(var j = 1; j <= 8; j++)
		for(var  i = 1; i <= 8; i++) {
			var img = create("img","figure");
			if(cur.nextSibling || (j == 8 && i == 8)) {
			if((j -1) < 1) {
				img.id = i+"-"+row[j-1]+"-"+set[i-1]+"-"+1;
				img.src = "sprites/"+figureAssoc[set[i-1]]+"-white.png";
				cur.appendChild(img);
			} else if(j-1 === 1) {
				img.id = i+"-"+row[j-1]+"-"+1+"-"+1+"-"+0;
				img.src = "sprites/"+figureAssoc[1]+"-white.png";
				cur.appendChild(img);
			} else if(j	-1 === 6) {
				img.id = i+"-"+row[j-1]+"-"+1+"-"+0+"-"+0;
				img.src = "sprites/"+figureAssoc[1]+"-black.png";
				cur.appendChild(img);
			} else if(j-1 === 7) {
				img.id = i+"-"+row[j-1]+"-"+set[i-1]+"-"+0;
				img.src = "sprites/"+figureAssoc[set[i-1]]+"-black.png";
				cur.appendChild(img);
			} else {
				
			}
			cur = cur.nextSibling;
		}
	}
}
function unselect() {
	selected.e.classList.remove("selected");
	selected.s = false;
}
function makeError(e) {
	e.classList.add("selecting-error");
	setTimeout(function(){
		e.classList.remove("selecting-error");
	},100);
}
desk.addEventListener("click",function(evt) {
	var parse = parseId(evt.target.id);
	if(selected.s) {
		var prev = parseId(selected.e.id);
		if(prev.id == parse.id) {unselect(); return;}
		if((parse.figureSideId != prev.figureSideId) || !parse.isFigure) {
			var flag = false;
			switch(prev.figureId) {
				case 1:
					var ParR = rowDecode[parse.row]
					var PreR = rowDecode[prev.row];
					if(prev.col == parse.col) {
						if(prev.figureParam == 0) {
							if(prev.figureSideId == 0) {
								var frontElement = document.getElementById(prev.col+"-"+row[rowDecode[prev.row]-2]);
								if((ParR / PreR) >= 0.7 && ((frontElement.lastChild) ? (frontElement.lastChild.nodeType == "IMG") ? false : true : true)) {
									selected.e.id = prev.id.slice(0,-1) + "1";
									flag = true;
								} else {
									makeError(evt.target);
								}
							} else {
								var frontElement = document.getElementById(prev.col+"-"+row[rowDecode[prev.row]+2]);
								if((PreR / ParR) >= 0.5 && ((frontElement.lastChild) ? (frontElement.lastChild.nodeType == "IMG") ? false : true : true)) {
									selected.e.id = prev.id.slice(0,-1) + "1";
									flag = true;
							}
							}
						} else {
							if((prev.figureSideId == 0) && (rowDecode[parse.row]  == (rowDecode[prev.row] - 1)) && !parse.isFigure) {
								flag = true;
							} else {
								if(rowDecode[parse.row]  == (rowDecode[prev.row] + 1)  && !parse.isFigure) {
									flag = true;
								}
							}
						}
				} else if(parse.isFigure) {
					if(prev.figureSideId == 0) {
						if((ParR % PreR == 1) && (PreR % ParR == 1) || (rowDecode[parse.row]  == (rowDecode[prev.row] - 1))) {
							flag = true;
						} else {}
					} else {
						if((ParR % PreR == 1) && (PreR % ParR == 1) || (rowDecode[parse.row]  == (rowDecode[prev.row] + 1))) {
							flag = true;
						} else {}
					}
				}
					break;
				case 2: alert("Конь");
					flag = true;
					break;
				case 3: alert("Слон");
					flag = true;
					break;
				case 4: alert("Ладья");
					flag = true;
					break;
				case 5: alert("Король");
					flag = true;
					break;
				case 6: alert("Ферзь");
					flag = true;
					break;
			}
			if(flag) {
				move(selected.e,(evt.target.parentNode==desk) ? event.target.id : event.target.parentNode.id,parse.isFigure);
				unselect();
				playSide = (playSide == 0) ? 1 : 0;
				listing(toolbar.lastChild.firstChild,turnCount,prev.col+prev.row+" - "+parse.col+parse.row);		
			} else {
				makeError(evt.target);
			}
			return;
		} else {
			makeError(evt.target);
		}
	} else {
		if(parse.isFigure && parse.figureSideId == playSide) {
			selected.e = evt.target;
			selected.id = evt.target.id;
			evt.target.classList.add("selected");
			selected.s = true;
		} else {
			makeError(evt.target);
		}
	}
});
window.onload = function() {
	toolbarInit(toolbar,sideDraw);
	makePoly(desk);
	gameSet(desk);
	document.body.appendChild(desk);
	var div = create("div","about");
	var span = create("span");
	span.textContent = "Поле для шахмат графический релиз 1.2";
	div.appendChild(span);
	document.body.appendChild(div);
	document.body.appendChild(toolbar);
	document.body.appendChild(sideDraw);
};