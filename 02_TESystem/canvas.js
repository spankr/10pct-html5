console.log('/r/place');
var canvas = document.querySelector('canvas');

console.log(canvas);

//setting dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Context
var c = canvas.getContext('2d');


// Object definitions
function VerticalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "rgba(255, 245, 245, 1.0)";

    this.draw = function() {
        c.beginPath();
        for (var i=0; i < this.maxLen; i+= this.step) {
            c.moveTo(0, i);
            c.lineTo(5, i);

            // Line numbers
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

            // Line numbers
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

// Animation
var stacks = [];

stacks.push(new Stack());

var rulers = [new VerticalRuler(innerHeight), new HorizontalRuler(innerWidth)];

function animate() {
    requestAnimationFrame(animate); // sets up the animation loop

    // erases the canvas
    c.clearRect(0,0, innerWidth, innerHeight);

    // draw rulers
    rulers.forEach(function(c){c.draw()});

    // draw & update stacks
    stacks.forEach(function(c){c.draw()});
    stacks.forEach(function(c){c.update()});
}

animate();