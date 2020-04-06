Math.nod = (a,b) => {
    var tempa = a, tempb = b;
    while(a != 0 && b != 0)
    {
        if(a > b)
        {
            a %= b;
        }
        else
        {
            b %= a;
        }
    }
    var nod = a + b;

    return { a: tempa / nod, b: tempb / nod, res: nod };
}

Math.rad = (angle) => {
    return angle * (Math.PI / 180);
}

Math.arad = (rads) => {
    return rads * (180/Math.PI);
}

Math.radm = (angle) => {
    return angle * (180 / Math.PI);
}
