// Ruler definitions
function VerticalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "white";

    this.draw = function() {
        c2d.beginPath();
        c2d.strokeStyle = this.strokeStyle;
        for (var i=0; i < this.maxLen; i+= this.step) {
            c2d.moveTo(0, i);
            c2d.lineTo(5, i);

            // Line numbers
            if (i % 100 === 0  && i > 0) {
                c2d.strokeText(i, 10, i);
            }
        }
        c2d.stroke();          
    }
}

function HorizontalRuler(length) {
    this.maxLen = length;
    this.step = 10;
    this.strokeStyle = "grey";

    this.draw = function() {
        c2d.beginPath();
        c2d.strokeStyle = this.strokeStyle;
        for (var i=0; i < this.maxLen; i+= this.step) {
            c2d.moveTo(i, 0);
            c2d.lineTo(i, 5);

            // Line numbers
            if (i % 100 === 0 && i > 0) {
                c2d.strokeText(i, i, 15);
            }
        }
        c2d.stroke();          
    }
}
