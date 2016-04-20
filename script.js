/**
 * DW Softdev 20 April 2016
 * Shi Shu, Dalton Wu
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function rand_range(foo, bar) {
    /**
     * Returns random integer in interval [foo, bar)
     */
    
    if(bar < foo) {
        return rand_range(bar, foo);
    }
    
    var range = bar - foo;
    return Math.floor(Math.random() * range + foo + 1);
}

function Ball() {
    this.r = rand_range(50, 100);
    this.x = rand_range(0, canvas.width);
    this.y = rand_range(0, canvas.width);
    this.v_x = rand_range(10, 50);
    this.v_y = rand_range(10, 50);
    
    // random color (hex)
    this.color = "#";
    for(i = 0; i < 3; i++) {
        this.color += rand_range(0, 256).toString(16);
    }
    
    this.draw = function {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
    };
}

function toggleMovement() {
}
