var mountains;
var trees;
var clouds;

function drawBackground() {
    background(98, 192, 250);

    // Sun
    fill(255, 255, 120);
    ellipse(62, 62, 240, 240);

    // Distant Mountains
    fill(72, 110, 144);
    ellipse(1140, 620, 380, 600);
    fill(78, 132, 118);
    ellipse(1040, 640, 300, 500);
    fill(78, 154, 174);
    ellipse(480, 520, 580, 240);
    fill(88, 166, 70);
    ellipse(760, 600, 600, 300);
    fill(102, 148, 60);
    ellipse(240, 600, 400, 400);
}

function drawGround() {
    noStroke();
    fill(60, 180, 60);
    rect(0, floorPos_y, width, 600 - floorPos_y);
    fill(150, 90, 50);
    rect(0, 20 + floorPos_y, width, height - floorPos_y);
}

function setupScene() {
    var tree1 = { pos_x: width / 8, pos_y: floorPos_y - 50 };
    trees = [tree1,
        { pos_x: width / 4, pos_y: floorPos_y - 50 }, //2
        { pos_x: width - 50, pos_y: floorPos_y - 50 }, //3,
        { pos_x: width + 1820, pos_y: floorPos_y - 50 }, //3
        { pos_x: width + 1700, pos_y: floorPos_y - 50 },];

    clouds = [{ pos_x: random(10, width), pos_y: random(60, 120), size: random(80, 100) },
    { pos_x: random(10, width), pos_y: random(80, 250), size: random(50, 90) },
    { pos_x: random(10, width), pos_y: random(80, 250), size: random(40, 70) },
    { pos_x: random(10, width), pos_y: random(120, 250), size: random(50, 70) }
    ];


    mountains = [{ pos_x: 50, pos_y: floorPos_y - 175, height: 350, width: 200 },
    { pos_x: 150, pos_y: floorPos_y - 75, height: 150, width: 50 },
    { pos_x: 300, pos_y: floorPos_y - 125, height: 250, width: 100 },
    { pos_x: 1540, pos_y: floorPos_y - 210, height: 420, width: 180 },
    { pos_x: 1430, pos_y: floorPos_y - 155, height: 310, width: 180 },
    { pos_x: 3000, pos_y: floorPos_y - 220, height: 440, width: 260 },];
}

function animateClouds() {
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].pos_x = clouds[i].pos_x + 0.8;
    }
}

function drawClouds() {
    for (var i = 0; i < clouds.length; i++) {
        drawCloud(clouds[i]);
    }
}

function drawCloud(t_cloud) {
    fill(255);
    var cloudWidth = t_cloud.size * 0.8;

    ellipse(t_cloud.pos_x, t_cloud.pos_y - 4, t_cloud.size * 1.2, t_cloud.size * 1.2);
    ellipse(t_cloud.pos_x + cloudWidth, t_cloud.pos_y, t_cloud.size, t_cloud.size);
    ellipse(t_cloud.pos_x - cloudWidth, t_cloud.pos_y, t_cloud.size, t_cloud.size);
    ellipse(t_cloud.pos_x - cloudWidth * 1.8, t_cloud.pos_y, t_cloud.size * 0.8, t_cloud.size * 0.8);
}

function drawTrees() {
    for (var i = 0; i < trees.length; i++) {
        drawTree(trees[i]);
    }
}

function drawTree(t_tree) {
    noStroke();
    //Shadow
    fill(0, 0, 0, 160);
    rectMode(CENTER);
    rect(t_tree.pos_x + 4, t_tree.pos_y, 36, 100);
    rectMode(CORNER);
    ellipse(t_tree.pos_x + 4, t_tree.pos_y - 61, 70, 85);
    ellipse(t_tree.pos_x + 44, t_tree.pos_y - 51, 60, 60);

    //Tree trunk
    fill(100, 70, 30);
    rectMode(CENTER);
    rect(t_tree.pos_x, t_tree.pos_y, 36, 100);
    rectMode(CORNER);

    //Tree leaves
    fill(40, 140, 40);
    ellipse(t_tree.pos_x - 40, t_tree.pos_y - 55, 60, 60);
    ellipse(t_tree.pos_x, t_tree.pos_y - 65, 70, 85);
    ellipse(t_tree.pos_x + 40, t_tree.pos_y - 55, 60, 60);
}

function drawMountains() {
    for (var i = 0; i < mountains.length; i++) {
        drawMountain(mountains[i]);
    }
}

function drawMountain(t_mountain) {
    noStroke();
    //Shadow
    fill(0, 0, 0, 160);
    triangle(
        t_mountain.pos_x - t_mountain.width / 2, t_mountain.pos_y + t_mountain.height / 2,
        t_mountain.pos_x + 4, t_mountain.pos_y - t_mountain.height / 2,
        t_mountain.pos_x + t_mountain.width / 2 + 4, t_mountain.pos_y + t_mountain.height / 2);

    fill(120, 120, 120);
    triangle(
        t_mountain.pos_x - t_mountain.width / 2, t_mountain.pos_y + t_mountain.height / 2,
        t_mountain.pos_x, t_mountain.pos_y - t_mountain.height / 2,
        t_mountain.pos_x + t_mountain.width / 2, t_mountain.pos_y + t_mountain.height / 2);
}

function createPlatform(x, y, length) {
    return new Platform(x, y, length);
}

function drawPLatforms() {
    for (var i = 0; i < platforms.length; i++) {
        platforms[i].draw();
    }
}

function createEnemy(x, y, range) {
    return new Enemy(x, y, range);
}

function drawEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}