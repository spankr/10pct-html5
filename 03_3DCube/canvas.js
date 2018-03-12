// using rulers.js
// using point.js

var canvas = document.querySelector('canvas');

//setting dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Context
var c = canvas.getContext('2d');

function drawPoints(points, lineColor) {
    var i;

    c.beginPath();

    c.moveTo(points[0].x, points[0].y);
    for (i=1;i != points.length;i++) {
        c.lineTo(points[i].x, points[i].y);
    }
    c.lineTo(points[0].x, points[0].y); // close the loop

    c.strokeStyle = lineColor;
    c.stroke();
}

function rotate2D(pt, deg) {
    // x' = xcosθ − ysinθ
    // y' = ycosθ + xsinθ
    var rad = deg*Math.PI / 180;
    var sinT = Math.sin(rad);
    var cosT = Math.cos(rad);

    return new Point3D(pt.x*cosT - pt.y*sinT, pt.y*cosT + pt.x*sinT);
}

// Object definitions
function Cube(x,y,z, length) {
    var _this = this;
    this.loc = new Point3D(x,y,z);
    this.length = length;
    this.rotation = 0;
    this.fillStyle = "grey";

    this.vx = 18*(Math.random() - 0.5);
    this.vy = 18*(Math.random() - 0.5);
    this.vr = 18*(Math.random() - 0.5);

    this.draw = function() {
        // draw the boundary of a box
        var hlen = this.length>>2;

        // rotate points about the origin
        var pts = new Array(
            rotate2D(new Point3D(-hlen, -hlen), this.rotation),
            rotate2D(new Point3D(-hlen, +hlen), this.rotation),
            rotate2D(new Point3D(+hlen, +hlen), this.rotation),
            rotate2D(new Point3D(+hlen, -hlen), this.rotation)
        );

        // translate points to the cube location
        for (i=0;i!=pts.length;i++){
            pts[i].x += this.loc.x;
            pts[i].y += this.loc.y;
        }

        drawPoints(pts, this.fillStyle);

        c.fillText('X', this.loc.x, this.loc.y);
    }

    this.update = function() {
        // just bounce around for now
        var hlen = this.length>>2;
        if ((this.loc.x >= 1000 - hlen && this.vx>0) || (this.loc.x <= hlen && this.vx<0)) {
            this.vx = -this.vx;
        }
    
        if ((this.loc.y >= 1000 - hlen && this.vy>0) || (this.loc.y <= hlen && this.vy<0)) {
            this.vy = -this.vy;
        }
        
        this.loc.x += this.vx;
        this.loc.y += this.vy;    

        this.rotation += this.vr;

        if (this.rotation >= 360) {
            this.rotation -= 360;
        } else if (this.rotation < 0) {
            this.rotation += 360;
        }
    }
}

// Animation
var rulers = [new VerticalRuler(innerHeight), new HorizontalRuler(innerWidth)];
var cube = new Cube(100,100,100, 200);
function animate() {
    requestAnimationFrame(animate); // sets up the animation loop

    // erases the canvas
    c.clearRect(0,0, innerWidth, innerHeight);

    // draw rulers
    rulers.forEach(function(c){c.draw()});

    // draw & update stacks
    cube.draw();
    cube.update();
}

animate();