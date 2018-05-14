
var alpha, numberofsides, vertices = [];
var sections = 10;
var points = [];
var white = "#FFFFFF";
var red = "#FF0000";

var elem = document.getElementById('draw-shapes');
var params = { width: 500, height: 400 };
var two = new Two(params).appendTo(elem);

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function myJsFunction() {
    two.clear();
    points = [];
    alpha = document.getElementById('input1').value;
    numberofsides = document.getElementById('input2').value;
    if(!document.getElementById('input3').value)
        vertices = [24, 45, 102, 30, 150, 60, 155, 117, 30, 120];
    else
        vertices = ((document.getElementById('input3').value).split(" "));
    
    console.dir(vertices);
    console.log(alpha,numberofsides,vertices.length,vertices,document.getElementById('input3').value);
    if (drawusershape()) {
        console.log("shape draw called");
    }
}



var usershape = [];
function drawusershape() {
    for (var i = 0, y = 0; i <= vertices.length-3; i += 2, y++) {
        var x1 = vertices[i] * 2;
        var y1 = vertices[i + 1] * 2;
        var x2 = vertices[i + 2] * 2;
        var y2 = vertices[i + 3] * 2;
        console.log(x1, y1, x2, y2);
        var line = two.makeLine(x1, y1, x2, y2);
        line.linewidth = 8;
        line.stroke = '#1C75BC';
        two.update();
        makepoints(x1, y1, x2, y2);

    }

    var finalline = two.makeLine(vertices[vertices.length - 2] * 2, vertices[vertices.length - 1] * 2, vertices[0] * 2, vertices[1] * 2);
    finalline.linewidth = 8;
    finalline.stroke = '#1C75BC';
    two.update();
    makepoints( vertices[0] * 2, vertices[1] * 2,vertices[vertices.length - 2] * 2, vertices[vertices.length - 1] * 2);
    console.log(points);
    two.update();
    drawpoints();
    runcalc();
    return 1;

}

console.log(red);
function makepoints(x1, y1, x2, y2) {
    for (var e = 1; e < sections; e++) {
        var gradient = (y2 - y1) / (x2 - x1);
        console.log(y2," - ",y1,") / (",x2," - ",x1," ", -gradient);
        var angle = Math.tan(-1/gradient);
        points.push([x1 + ((x2 - x1) / sections) * e, y1 + ((y2 - y1) / sections) * e, red, - gradient]); //x coord, y coord, colour, gradient
    }
}

function drawpoints() {
    for (var i = 0; i < points.length; i++) {
        //console.log(points[i],points[i][0],1,points[1][0][0])
        var thispoint = two.makeCircle(points[i][0], points[i][1], 4);
        thispoint.fill = points[i][2];
    }
    two.update();
}

function updatepoint(thepoint) {
    var thispoint = two.makeCircle(points[thepoint][0], points[thepoint][1], 4);
    thispoint.fill = points[thepoint][2];
    two.update();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function runcalc() {
    var selectedpoint = getRandomInt(0, points.length-1);
    console.log(selectedpoint);
    points[selectedpoint][2] = "#9932CC";
    updatepoint(selectedpoint);
    //var perpofpoint = -1/points[selectedpoint][3]; //perpendicular to the given point
    for(var i = 0; i<points.length; i++)
    {
        if(i!=selectedpoint)
            selectedtwopoints(selectedpoint,i);
    }



}

function selectedtwopoints(apoint,bpoint) {
    var p1 = apoint, p2 = bpoint;
    var cond1 = false;
    var cond2 = false;
    // if(points[apoint][3]points[bpoint][3]){
    //     p1 = apoint;
    //     p2 = bpoint;
    // }
    // else{
    //     p1 = bpoint;
    //     p2 = apoint;
    // }

    var aa = two.makeCircle(points[p1][0],points[p1][1],5);
    var alpha1gradient = (Math.tan(Math.atan(-1/(points[p1][3]))+Math.atan(alpha)));
    var alpha2gradient = (Math.tan(Math.atan(-1/points[p1][3])-Math.atan(alpha)));
    var gradientbetween = -(points[p2][1]-points[p1][1])/(points[p2][0]-points[p1][0]);
    //console.log(Math.tan(-1/(points[p1][3])),Math.tan(alpha));
    console.log(points[p2][1],"-",points[p1][1],")/(",points[p2][0],"-",points[p1][0],gradientbetween,alpha1gradient,alpha2gradient);
    if(Math.sign(alpha1gradient)==Math.sign(gradientbetween)){
        if(Math.abs(gradientbetween)>Math.abs(alpha1gradient)){
            console.log("conditon 1 satisfied");
            cond1 = true;
        }
    }
    if(Math.sign(alpha2gradient)==Math.sign(gradientbetween)){
        if(Math.abs(gradientbetween)>Math.abs(alpha2gradient)){
            console.log("conditon 1 satisfied");
            cond1 = true;
        }
    }

    var alpha1gradient1 = (Math.tan(Math.atan(-1/(points[p2][3]))+Math.atan(alpha)));
    var alpha2gradient1 = (Math.tan(Math.atan(-1/points[p2][3])-Math.atan(alpha)));
    console.log(points[p2][1],"-",points[p1][1],")/(",points[p2][0],"-",points[p1][0],gradientbetween,alpha1gradient1,alpha2gradient1);
    if(Math.sign(alpha1gradient1)==Math.sign(gradientbetween)){
        if(Math.abs(gradientbetween)>Math.abs(alpha1gradient1)){
            console.log("conditon 2 satisfied");
            cond2 = true;
        }
    }
    if(Math.sign(alpha2gradient1)==Math.sign(gradientbetween)){
        if(Math.abs(gradientbetween)>Math.abs(alpha2gradient1)){
            console.log("conditon 2 satisfied");
            cond2 = true;
        }
    }
    
    if(cond1&cond2){
        var linebetween = two.makeLine(points[apoint][0],points[apoint][1],points[bpoint][0],points[bpoint][1]);
        two.update();
    }

    
}

function TestPrimalSimplex() {
    var test = new Object();
    test.A = [[-1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, -1]];
    test.b = [-1,-1,-1,-1];
    test.c = [[0,0,-1,2], [-1,0,1,0], [0,-1,0,1]];
    test.m = 4;
    test.n = 3;
    test.xLB = [2, 0, 0, 0];
    test.xUB = [3, Infinity, Infinity, Infinity];
    SimplexJS.PrimalSimplex(test);
    console.log(test.x, test.z);
    // Should be 3, 34, 0, 6
}

function TestPrimalSimplex() {
    var test = new Object();
    test.A = [[-1, 0, 0, 0],
            [0, -1, 0, 0],
            [0, 0, -1, 0],
            [0, 0, 0, -1]];
    test.b = [-1,-1,-1,-1];
    test.c = [[0,0,-1,2], [-1,0,1,0], [0,-1,0,1]];
    test.m = 4;
    test.n = 3;
    test.xLB = [2, 0, 0, 0];
    test.xUB = [3, Infinity, Infinity, Infinity];
    SimplexJS.PrimalSimplex(test);
    console.log(test.x, test.z);
    // Should be 3, 34, 0, 6
}

TestPrimalSimplex();


two.update();