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
    this.strokeStyle = "grey";

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.strokeStyle;
        for (var i=0; i < this.maxLen; i+= this.step) {
            c.moveTo(0, i);
            c.lineTo(5, i);

            // Line numbers
            if (i % 100 === 0  && i > 0) {
                c.strokeText(i, 10, i);
            }
        }
        c.stroke();          
    }
}

function HorizontalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "grey";

    this.draw = function() {
        c.beginPath();
        c.strokeStyle = this.strokeStyle;
        for (var i=0; i < this.maxLen; i+= this.step) {
            c.moveTo(i, 0);
            c.lineTo(i, 5);

            // Line numbers
            if (i % 100 === 0 && i > 0) {
                c.strokeText(i, i, 15);
            }

        }
        c.stroke();          
    }
}

function Inventory(x, y) {
 this.x = x;
 this.y = y;
 this.height = 10;
 this.width = 200;
 this.fillStyle = "grey";
 this.used = false;

 this.draw = function() {
    c.fillStyle = this.used ? "green": "grey";
    c.fillRect(this.x, this.y, this.width, this.height);
 }
}

function Buffer(x, y) {
    this.x = x;
    this.y = y;
}

function Elevator(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.fillStyle = "grey";
    this.layer = 0;

    this.draw = function() {
        // draw the vertical line
        c.beginPath();
        c.moveTo(this.x+this.width+1, this.y);
        c.lineTo(this.x+this.width+1, this.y + 9*(this.width+2)); // 2px for space
        c.strokeStyle = "grey";
        c.stroke();          

        // draw the box
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y + (this.width+2) * this.layer, this.width, this.width); // 2px for space
    }
}
function ModuleSection(x, y) {
    this.x = x;
    this.y = y;
}

function Stack(x,y) {
    var _this = this;
    this.x = x;
    this.y = y;
    this.dt = 0;
   
    this.inventory = [];
    for (var i=0;i<9;i++){
        this.inventory.push(new Inventory(this.x + 500, this.y + 12*i)); // 2px for space
    }

    this.buffers = [];
    this.elevators = [];
    this.elevators.push(new Elevator(this.x + 400, this.y));
    this.elevators.push(new Elevator(this.x + 420, this.y));

    this.draw = function() {
        this.inventory.forEach(function(c){c.draw()});
        this.elevators.forEach(function(c){c.draw()});
    };
    this.update = function() {
        this.dt++;
        let maxLayers = 8;

        this.elevators.forEach(function(c){ _this.inventory[c.layer].used = false });

        // move elevators on every 10th time step
        if (this.dt%10 == 0) {
            let dL = Math.random()>0.5 ? 1 : -1;
            if ((dL>0 && this.elevators[0].layer === maxLayers) || (dL<0 && this.elevators[0].layer === 0)) {
                dL = 0;
            }
            this.elevators[0].layer = (this.elevators[0].layer + dL+maxLayers) % maxLayers;

            dL = Math.random()>0.5 ? 1 : -1;
            if ((dL>0 && this.elevators[1].layer === maxLayers) || (dL<0 && this.elevators[1].layer === 0)) {
                dL = 0;
            }
            this.elevators[1].layer = (this.elevators[1].layer + dL+maxLayers) % maxLayers;
        }
        
        this.elevators.forEach(function(c){_this.inventory[c.layer].used = true});
    };
}

// Animation
var stacks = [];

stacks.push(new Stack(100, 100));

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