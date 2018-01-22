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

function VerticalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "rgba(255, 245, 245, 1.0)";

    this.draw = function() {
        c.beginPath();
        for (var i=0; i < this.maxLen; i+= this.step) {
            c.moveTo(0, i);
            c.lineTo(5, i);

            if (i % 100 === 0  && i > 0) {
                c.strokeText(i, 10, i);
            }
        }
        c.strokeStyle = this.strokeStyle;
        c.stroke();          
    }
}

function HorizontalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "rgba(255, 245, 245, 1.0)";

    this.draw = function() {
        c.beginPath();
        for (var i=0; i < this.maxLen; i+= this.step) {
            c.moveTo(i, 0);
            c.lineTo(i, 5);

            if (i % 100 === 0 && i > 0) {
                c.strokeText(i, i, 15);
            }

        }
        c.strokeStyle = this.strokeStyle;
        c.stroke();          
    }
}

function Inventory() {
 this.x = 0;
 this.y = 0;
}

function Buffer() {
 this.x = 0;
 this.y = 0;
}

function Elevator() {
    this.x = 0;
    this.y = 0;
}
function ModuleSection() {
    this.x = 0;
    this.y = 0;
}

function Stack() {
    this.inventory = [];
    this.buffers = [];
    this.elevators = [];

    this.draw = function(){};
    this.update = function(){};
}

var stacks = [];

stacks.push(new Stack());

var rulers = [new VerticalRuler(innerHeight), new HorizontalRuler(innerWidth)];

function animate() {
    requestAnimationFrame(animate);
    //console.log('Animation called');
    c.clearRect(0,0, innerWidth, innerHeight);

    // draw rulers
    rulers.forEach(function(c){c.draw()});

    stacks.forEach(function(c){c.draw()});
    stacks.forEach(function(c){c.update()});
}

animate();