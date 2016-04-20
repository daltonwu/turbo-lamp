/**
 * DW Softdev, Term 2, Spring 2016
 * Shi Shu, Dalton Wu
 */

function random_range(foo, bar) {
    /**
     * Returns random integer in interval [foo, bar)
     */
    if(bar < foo) {
        return random_range(bar, foo);
    }
    
    var range = bar - foo;
    return Math.floor(Math.random() * range + foo + 1);
}

function Ball() {
    this.radius = random_range(50, 100);
    this.x = random_range(canvas.;
    this.y = Math.floor(Math.random() *
}
