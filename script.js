/**
 * DW Softdev 20 April 2016
 * Shi Shu, Dalton Wu
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var balls = [new Ball()];
var frameId = 0;
var isMoving = true;
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
    this.r = rand_range(50, 100);
    this.x = rand_range(0, canvas.width);
    this.y = rand_range(0, canvas.width);
    this.v_x = rand_range(1, 30);
    this.v_y = rand_range(1, 30);
    
    // random color (hex)
    this.color = "#";
    for(i = 0; i < 3; i++) {
        this.color += rand_range(0, 256).toString(16);
    }
    
    this.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5;
        ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        ctx.fill();
    };
}

function tick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(function(foo){
	if(foo.x - foo.r <= 0 || foo.x + foo.r >= canvas.width){
	    foo.v_x *= -1;
	}
	if(foo.y - foo.r <= 0 || foo.y + foo.r >= canvas.height){
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
}

function removeBall(){
    balls.pop();
}

function toggleMovement() {
    isMoving = !isMoving;
    movementButton.innerHTML = isMoving ? "Stop" : "Start";
    tick();
}

