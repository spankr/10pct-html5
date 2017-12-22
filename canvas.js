console.log('/r/place');
var canvas = document.querySelector('canvas');

console.log(canvas);

//setting dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// context
var c = canvas.getContext('2d');
/*
var x = 100;
var y = 100;
var width = 100;
var height = 100;
c.fillStyle = 'rgba(255, 0, 0, 0.3)';
c.fillRect(x, y, width, height);
c.fillStyle = 'rgba(0, 255, 0, 0.3)';
c.fillRect(x*4, y, width, height);
c.fillStyle = 'rgba(0, 0, 255, 0.3)';
c.fillRect(x*3, y*3, width, height);
*/

// Lines
/*
c.beginPath();
c.moveTo(50, 300); // starting point
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa34a3";
c.stroke();
*/

// Arc
/*
c.beginPath();
c.arc(300,300, 30, 0.0, Math.PI*2, false);
c.strokeStyle = "rgba(255, 245, 245, 1.0)";
c.stroke();
*/
/*
for(var i=0; i<3; i++) {
    c.beginPath();
    c.arc(Math.random()*window.innerWidth, Math.random()*window.innerHeight, 30, 0.0, Math.PI*2, false);
    c.strokeStyle = "rgba(255, 245, 245, 1.0)";
    c.stroke();        
}
*/


// Animation
function Circle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;

    this.vx = 18*(Math.random() - 0.5);
    this.vy = 18*(Math.random() - 0.5);

    this.r = (255* Math.random()).toFixed(0);
    this.g = (255* Math.random()).toFixed(0);
    this.b = (255* Math.random()).toFixed(0);
    this.a = Math.random();


    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0.0, Math.PI*2, false);
        //c.strokeStyle = "rgba(255, 245, 245, 1.0)";
        c.strokeStyle = "rgba("+this.r+ ","+this.g+","+this.b+","+this.a+")";
        c.fillStyle = "rgba("+this.r+ ","+this.g+","+this.b+","+this.a+")";
        c.fill();
        c.stroke();          
    }

    this.update = function() {
        if ((this.x >= innerWidth - this.radius && this.vx>0) || (this.x <= this.radius && this.vx<0)) {
            this.vx = -this.vx;
        }
    
        if ((this.y >= innerHeight - this.radius && this.vy>0) || (this.y <= this.radius && this.vy<0)) {
            this.vy = -this.vy;
        }
    
        this.x += this.vx;
        this.y += this.vy;    
    }
}

var circles = [];

for (var i=0;i<100;i++) {
    circles.push(new Circle(Math.random() * innerWidth, Math.random() * innerHeight, Math.random() * 30));
}

function animate() {
    requestAnimationFrame(animate);
    //console.log('Animation called');
    c.clearRect(0,0, innerWidth, innerHeight);

    circles.forEach(function(c){c.draw()});
    circles.forEach(function(c){c.update()});
}

animate();