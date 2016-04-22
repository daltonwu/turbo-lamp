/**
 * DW Softdev 20 April 2016
 * Shi Shu, Dalton Wu
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var balls = [new Ball()];
var frameId = 0;
var isMoving = false;
var movementButton = document.getElementById("movement");

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
    this.r = rand_range(24, 64);
    this.m = this.r * this.r; // mass proportional to area
    this.x = rand_range(this.r, canvas.width-this.r);
    this.y = rand_range(this.r, canvas.height-this.r);
    this.v_x = rand_range(-4, 4);
    this.v_y = rand_range(-4, 4);
    
    // random color (rgb)
    this.color = "rgb(";
    for(i = 0; i < 3; i++) {
        this.color += rand_range(0, 256) + (i != 2 ? ", " : ")");
    }
    
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        // tbh, border around the balls looks ugly
        /*ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.stroke();*/
    };
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function(ball) {
        ball.draw();
    });
};

function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    balls.forEach(function(foo) {
    	if(foo.x <= foo.r || foo.x >= canvas.width - foo.r) {
    	    foo.v_x *= -1;
    	}
    	if(foo.y <= foo.r || foo.y >= canvas.height - foo.r) {
    	    foo.v_y *= -1;
    	}
    	foo.x += foo.v_x;
    	foo.y += foo.v_y;
    	foo.draw();
    });
    
    if(isMoving){
    	frameId = window.requestAnimationFrame(tick);
    }
}

function addBall(){
    balls.push(new Ball());
    drawAll();
}

function removeBall(){
    balls.pop();
    drawAll();
}

function toggleMovement() {
    isMoving = !isMoving;
    movementButton.innerHTML = isMoving ? "<u>S</u>top" : "<u>S</u>tart";
    tick();
}

function key(event) {
    switch(event.keyCode || event.which) {
        case 65: case 97: // A
            addBall();
            break;
        case 82: case 114: // R
            removeBall();
            break;
        case 83: case 115: // S
            toggleMovement();
            break;
    }
}
