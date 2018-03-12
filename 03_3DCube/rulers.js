// Ruler definitions
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
