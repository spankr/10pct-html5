// using rulers.js
// using point.js
main();

function main() {
    var canvas = document.querySelector('canvas');

    // setting dimensions
    canvas.width = window.innerWidth>>1;
    canvas.height = window.innerHeight>>1;
    
    // Context
    var gl = canvas.getContext('webgl');

    var ruler = new VerticalRuler(canvas.height);

//    var ptA = new Point3D(1,2,3);
//    var ptB = new Point3D(1,1,1);
    // Only continue if WebGL is available and working
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    console.log(gl);

    // Set clear color to grey, fully opaque
    gl.clearColor(0.6, 0.6, 0.6, 1);

    function animate() {
        requestAnimationFrame(animate); // sets up the animation loop
        
        // Clear the color buffer with specified clear color
        gl.clear(gl.COLOR_BUFFER_BIT);

        //console.log(ptA.x+' '+ ptA.y+' '+ptA.z);
        //ptA.incr(ptB);
    }
    
    console.log('Animation started');
    animate();
}

