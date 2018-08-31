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

function Rooms(floor, x, y) {
 this.floor = floor;
 this.x = x;
 this.y = y;
 this.height = 10;
 this.width = 200;
 this.fillStyle = "grey";
 this.used = false;

 this.draw = function() {
    c.fillStyle = this.used ? "green": "grey";
    c.fillText(this.floor, this.x-10, this.y+this.height);
    c.fillRect(this.x, this.y, this.width, this.height);
 }
}

function Holder(x, y) {
    this.x = x;
    this.y = y;
}

function Elevator(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.fillStyle = "grey";
    this.floor = 0;

    this.draw = function() {
        // draw the vertical line
        c.beginPath();
        c.moveTo(this.x+this.width+1, this.y);
        c.lineTo(this.x+this.width+1, this.y + 9*(this.width+2)); // 2px for space
        c.strokeStyle = "grey";
        c.stroke();          

        // draw the box
        c.fillStyle = "blue";
        c.fillRect(this.x, this.y + (this.width+2) * this.floor, this.width, this.width); // 2px for space
        c.fillStyle = "grey";
        c.fillText('X', this.x+this.width+5, this.y + (this.width+2) * this.floor+10);
    }
}
function ModuleSection(x, y) {
    this.x = x;
    this.y = y;
    this.usedFloor = 0;

    this.width = 10;

    this.draw = function() {
        // draw the vertical line
        c.beginPath();
        c.moveTo(this.x+this.width+1, this.y);
        c.lineTo(this.x+this.width+1, this.y + 9*(this.width+2)); // 2px for space
        c.strokeStyle = "grey";
        c.stroke();          

        // floors are 0-based
        // draw the modules
        c.fillStyle = this.usedFloor==5 ? "red":"blue";
        c.fillRect(this.x, this.y + (this.width+2) * 5, this.width, this.width); // 2px for space
        c.fillStyle = this.usedFloor==4 ? "red":"blue";
        c.fillRect(this.x, this.y + (this.width+2) * 4, this.width, this.width); // 2px for space
        c.fillStyle = this.usedFloor==3 ? "red":"blue";
        c.fillRect(this.x, this.y + (this.width+2) * 3, this.width, this.width); // 2px for space
    }
}

function Building(x,y) {
    var _this = this;
    this.x = x;
    this.y = y;
    this.dt = 0;
   
    this.rooms = [];
    for (var i=0;i<9;i++){
        this.rooms.push(new Rooms(i, this.x + 500, this.y + 12*i)); // 2px for space
    }

    this.holders = [];
    this.elevators = [];
    this.elevators.push(new Elevator(this.x + 400, this.y));
    this.elevators.push(new Elevator(this.x + 420, this.y));

    this.modules = [];
    this.modules.push(new ModuleSection(this.x + 360, this.y));
    this.modules.push(new ModuleSection(this.x + 380, this.y));
    
    this.draw = function() {
        this.rooms.forEach(function(c){c.draw()});
        this.elevators.forEach(function(c){c.draw()});
        this.modules.forEach(function(c){c.draw()});
    };
    this.update = function() {
        this.dt++;
        let maxFloors = 8;

        this.elevators.forEach(function(c){ _this.rooms[c.floor].used = false });

        // move elevators on every 10th time step
        if (this.dt%10 == 0) {
            let dL = Math.random()>0.5 ? 1 : -1;
            if ((dL>0 && this.elevators[0].floor === maxFloors) || (dL<0 && this.elevators[0].floor === 0)) {
                dL = 0;
            }
            this.elevators[0].floor = (this.elevators[0].floor + dL+maxFloors) % maxFloors;
            this.modules[0].usedFloor = this.elevators[0].floor;

            dL = Math.random()>0.5 ? 1 : -1;
            if ((dL>0 && this.elevators[1].floor === maxFloors) || (dL<0 && this.elevators[1].floor === 0)) {
                dL = 0;
            }
            this.elevators[1].floor = (this.elevators[1].floor + dL+maxFloors) % maxFloors;
            this.modules[1].usedFloor = this.elevators[1].floor;
        }
        
        this.elevators.forEach(function(c){_this.rooms[c.floor].used = true});
    };
}

// Animation
var buildings = [];

buildings.push(new Building(100, 100));

var rulers = [new VerticalRuler(innerHeight), new HorizontalRuler(innerWidth)];

function animate() {
    requestAnimationFrame(animate); // sets up the animation loop

    // erases the canvas
    c.clearRect(0,0, innerWidth, innerHeight);

    // draw rulers
    rulers.forEach(function(c){c.draw()});

    // draw & update buildings
    buildings.forEach(function(c){c.draw()});
    buildings.forEach(function(c){c.update()});
}

animate();