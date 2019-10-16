var Discr = function(a,b,c) {
    return (b*b) - 4 * a * c;
}
var QuadraticEquation = function(a,b,c) {
    a = (a | 1);
    b = (b | 1);
    var d = Discr(a,b,c);
    var x1 = 0;
    var x2 = 0;


    if(d > 0) {
        x1 = (-b - Math.sqrt(d)) / (2 * a);
        x2 = (-b + Math.sqrt(d)) / (2 * a);
    } else if(d == 0) {
        x1 = (-b - Math.sqrt(d)) / (2 * a);
        x2 = "Null";
    } else {
        console.log("Descriminant lower than zero.");
        x1 = "Null";
        x2 = "Null";
    }
return {x1: x1, x2: x2/*, d: d, rootD: Math.sqrt(d), a: a, b: b, c: c*/}; //result or debug object configure if need
}