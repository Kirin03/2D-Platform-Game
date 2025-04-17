function Platform(x, y, length) {
    this.x = x;
    this.y = y;
    this.length = length;

    this.draw = function () {
        //Shadow
        fill(0, 0, 0, 160);
        noStroke();
        rect(this.x + 4, this.y + 4, this.length + 40, 12, 8, 8, 0, 0);//Top
        rect(this.x + 4, this.y + 16, this.length + 40, 20, 0, 0, 8, 8);//Bottom

        //Platform
        noStroke();
        fill(60, 180, 60);
        rect(this.x, this.y, this.length + 40, 12, 8, 8, 0, 0);
        fill(150, 90, 50);
        rect(this.x, this.y + 12, this.length + 40, 20, 0, 0, 8, 8);
    }

    this.checkContact = function (gc_x, gc_y) {
        //Check for x-axis
        if (gc_x + 20 > this.x && gc_x < this.x + 20 + this.length) {
            //Check for y-axis - when game character is on platform
            var d = this.y - gc_y;
            if (d >= 0 && d < 1) {
                return true
            }
        }
        return false;
    }
}