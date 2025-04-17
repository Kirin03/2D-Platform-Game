function Enemy(x, y, range) {

    this.x = x;
    this.y = y;
    this.range = range;

    this.currentX = x; //Current X pos of the enemy
    this.inc = 1.6; //Speed and direction

    this.update = function () {
        this.currentX += this.inc; //Move the enemy horizontally
        if (this.currentX > this.x + this.range) { //If the enemy goes beyond the right boundary
            this.inc = -1.6; //Reverse direction (move left)
        }
        else if (this.currentX < this.x) {
            this.inc = 1.6; //Reverse direction (move right)
        }
    }

    this.draw = function () {
        this.update();
        //Shadow
        fill(0, 0, 0, 160);
        ellipse(this.currentX + 4, this.y - 13, 60, 48);

        //Enemy body
        fill(250, 100, 174);
        ellipse(this.currentX, this.y - 15, 60, 50);

        //Angry eyebrows
        stroke(0);
        strokeWeight(2.5);
        line(this.currentX - 15, this.y - 25, this.currentX - 5, this.y - 20);// Left
        line(this.currentX + 5, this.y - 20, this.currentX + 15, this.y - 25);// Right

        //Eyes
        noStroke();
        fill(0);
        ellipse(this.currentX - 10, this.y - 18, 8, 8);
        ellipse(this.currentX + 10, this.y - 18, 8, 8);
    }

    this.checkContact = function (gc_x, gc_y) {
        var d = dist(gc_x, gc_y, this.currentX, this.y); //Calculate dist between the game char and the enemy
        if (d < 20) {
            return true;
        }
        return false; //No contact
    }
}