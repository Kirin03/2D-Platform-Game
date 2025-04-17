function drawGameCharIsLeftAndIsFalling() {
    fill(250, 220, 172);
    ellipse(gameChar_x - 5, gameChar_y - 70, 38, 38);
    //Eyes
    fill(0);
    ellipse(gameChar_x - 9.5, gameChar_y - 72, 8, 8);
    //Body
    fill(152, 82, 176);
    rect(gameChar_x - 20, gameChar_y - 50, 30, 50, 8, 8, 0, 0);
}

function drawGameCharIsRightAndIsFalling() {
    fill(250, 220, 172);
    ellipse(gameChar_x + 5, gameChar_y - 70, 38, 38);
    fill(0);
    ellipse(gameChar_x + 9.5, gameChar_y - 72, 8, 8);
    fill(152, 82, 176);
    rect(gameChar_x - 10, gameChar_y - 50, 30, 50, 8, 8, 0, 0);
}

function drawGameCharIsLeft() {
    fill(250, 220, 172);
    ellipse(gameChar_x - 10, gameChar_y - 70, 38, 38);
    fill(0);
    ellipse(gameChar_x - 14.5, gameChar_y - 72, 8, 8);
    fill(152, 82, 176);
    rect(gameChar_x - 25, gameChar_y - 50, 30, 50, 8, 8, 0, 0);
}

function drawGameCharIsRight() {
    fill(250, 220, 172);
    ellipse(gameChar_x + 10, gameChar_y - 70, 38, 38);
    fill(0);
    ellipse(gameChar_x + 14.5, gameChar_y - 72, 8, 8);
    fill(152, 82, 176);
    rect(gameChar_x - 5, gameChar_y - 50, 30, 50, 8, 8, 0, 0);
}

function drawGameCharIsFallingOrIsPlummeting() {
    fill(250, 220, 172);
    ellipse(gameChar_x, gameChar_y - 70, 38, 38);
    fill(0);
    ellipse(gameChar_x - 6.5, gameChar_y - 72, 8, 8);
    ellipse(gameChar_x + 6.5, gameChar_y - 72, 8, 8);
    fill(152, 82, 176);
    rect(gameChar_x - 20, gameChar_y - 50, 40, 50, 8, 8, 0, 0);
}

function drawGameCharStandingFront() {
    fill(250, 220, 172);
    ellipse(gameChar_x, gameChar_y - 70, 38, 38);
    fill(0);
    ellipse(gameChar_x - 6.5, gameChar_y - 72, 8, 8);
    ellipse(gameChar_x + 6.5, gameChar_y - 72, 8, 8);
    fill(152, 82, 176);
    rect(gameChar_x - 20, gameChar_y - 50, 40, 50, 8, 8, 0, 0);
}