//ITP1 Game Project
var gameChar_x;
var gameChar_y;
var gameChar_width;
var floorPos_y;
var cameraPosX;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;

var canyons;
var platforms;
var onPlatform;

var enemies;
var hitByEnemy;

var game_score;
var lives;
var flagpole;
var gameOver;

function setup() {
	createCanvas(1400, 700);
	lives = 3;
	gameOver = false;
	init(); //Initialising the game
}

function init() {
	floorPos_y = height * 4 / 5;
	gameChar_x = 450;
	gameChar_y = floorPos_y;
	gameChar_width = 40;
	setupScene();

	game_score = 0;

	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	onPlatform = false;
	hitByEnemy = false;

	cameraPosX = 0;

	var collectable1 = { x_pos: 200, y_pos: floorPos_y - 24, size: 40, isFound: false };
	var collectable2 = { x_pos: 995, y_pos: floorPos_y - 24, size: 40, isFound: false };
	var collectable3 = { x_pos: 2180, y_pos: floorPos_y - 84, size: 40, isFound: false };
	var collectable4 = { x_pos: 1970, y_pos: floorPos_y - 354, size: 40, isFound: false };
	var collectable5 = { x_pos: 3400, y_pos: floorPos_y - 24, size: 40, isFound: false };
	collectables = [collectable1, collectable2, collectable3, collectable4, collectable5];

	var canyon1 = { x_pos: 680, width: 250 };
	var canyon2 = { x_pos: 1060, width: 140 };
	var canyon3 = { x_pos: 1700, width: 1000 };
	canyons = [canyon1, canyon2, canyon3];

	flagpole = { x_pos: 3600, isReached: false };

	//Platforms
	platforms = [];
	//Platforms over 2 canyons
	platforms.push(createPlatform(520, floorPos_y - 100, 160));
	platforms.push(createPlatform(720, floorPos_y - 200, 180));
	//Platforms over large canyon
	platforms.push(createPlatform(1740, floorPos_y - 90, 140));
	platforms.push(createPlatform(1940, floorPos_y - 180, 220));
	platforms.push(createPlatform(2140, floorPos_y - 60, 440));
	platforms.push(createPlatform(2220, floorPos_y - 280, 200));
	platforms.push(createPlatform(1900, floorPos_y - 330, 100));

	//Enemies
	enemies = [];
	enemies.push(createEnemy(100, floorPos_y - 10, 220));
	enemies.push(createEnemy(1220, floorPos_y - 10, 220));
	enemies.push(createEnemy(1960, floorPos_y - 190, 220));
	enemies.push(createEnemy(2300, floorPos_y - 70, 220));
}

function draw() {
	cameraPosX = gameChar_x - width / 2;
	drawBackground();
	drawGround();

	push();
	translate(-cameraPosX, 0);

	//Elements
	drawMountains();

	drawClouds();
	animateClouds();

	drawTrees();

	drawCanyons();

	drawGameScore();

	drawCollectables();

	drawPLatforms();

	drawFlagpole();

	drawLifePoints();

	drawEnemies();

	//The game character's state
	if (onPlatform && isLeft) {
		drawGameCharIsLeft();

	}
	else if (onPlatform && isRight) {
		drawGameCharIsRight();

	}
	else if (onPlatform) {
		drawGameCharStandingFront();

	}
	else if (isLeft && isFalling) {
		drawGameCharIsLeftAndIsFalling();

	}
	else if (isRight && isFalling) {
		drawGameCharIsRightAndIsFalling();
	}
	else if (isLeft) {
		drawGameCharIsLeft();

	}
	else if (isRight) {
		drawGameCharIsRight();

	}
	else if (isFalling || isPlummeting) {
		drawGameCharIsFallingOrIsPlummeting();

	}
	else if (isLeft && isFalling) {
		drawGameCharIsLeftAndIsFalling();

	}
	else {
		drawGameCharStandingFront();
	}

	if (gameOver) {
		drawGameOver();
		if (lives > 0) {
			gameChar_x = 3600;
			gameChar_y = floorPos_y;
			gameChar_width = 40;
			text("You won!", 250, height / 2);
			return; //Exit draw function

		} else {
			gameChar_x = 450;
			gameChar_y = floorPos_y;
			gameChar_width = 40;
			return;
		}
	}

	pop();

	//Character Interaction Logic
	if (isPlummeting == true) {
		gameChar_y += 10;
		if (gameChar_y > 800) {
			respawnChar();
		}
		return;
	}
	//Gravity
	if (gameChar_y < floorPos_y) {
		isFalling = true;

	}
	else {
		isFalling = false;

	}
	if (isLeft == true) {
		gameChar_x -= 5;

	}
	else if (isRight == true) {
		gameChar_x += 5;

	}
	if (hitByEnemy) {
		lives--;
		if (lives > 0) {
			init(); //Re-initialize the game if lives are remaining
		} else {
			gameOver = true; //End game, if no lives are left
		}
		return;
	}

	//Check for character interaction with variables
	checkIfGameCharInAnyCollectableRange();

	checkIfGameCharIsOverAnyCanyons();

	checkIfCharIsOnAnyPlatforms();

	checkIfGameCharReachedFlagpole();

	checkIfGameCharHitByAnyEnemy();
}

function drawCanyons() {
	for (var i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i]); //Loops through all the canyons in the canyons array.
	}
}

function drawCanyon(t_canyon) {
	fill(0, 0, 0);
	rect(t_canyon.x_pos, floorPos_y, t_canyon.width, height - floorPos_y);

	fill(255, 0, 0);
	ellipse(t_canyon.x_pos, floorPos_y, 10, 10);
}

function checkIfGameCharIsOverAnyCanyons() {
	for (var i = 0; i < canyons.length; i++) {
		checkIfGameCharIsOverCanyon(canyons[i]);
	}
}

function checkIfGameCharIsOverCanyon(t_canyon) {
	var cond1 = gameChar_y == floorPos_y; //Check if the char is on the ground
	var cond2 = gameChar_x - gameChar_width / 2 > (t_canyon.x_pos); //Check if the char is on the right of the canyon's left edge
	var cond3 = gameChar_x + gameChar_width / 2 < (t_canyon.x_pos + t_canyon.width); //Check if the char is to the left of the canyon's right edge

	if (cond1 && cond2 && cond3) {
		isPlummeting = true; //If all conditions are true, set isPlummeting to true
	}
}

function checkIfGameCharInAnyCollectableRange() {
	for (var i = 0; i < collectables.length; i++) {
		checkIfGameCharInCollectableRange(collectables[i]); //For each collectable, calls code below to check if the char is close enough to collect it.
	}
}

function checkIfGameCharInCollectableRange(t_collectable) {
	if (t_collectable.isFound == false) { //Check if the collectable hasn't been found yet
		var d = dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos); //Calculate distance between char and collectable
		if (d < 30) {
			t_collectable.isFound = true;

			game_score++;
		}
	}
}

function checkIfCharIsOnAnyPlatforms() {
	if (isFalling) { //Only check if the character is falling
		var isContact = false;
		onPlatform = false;
		for (var i = 0; i < platforms.length; i++) {
			isContact = platforms[i].checkContact(gameChar_x, gameChar_y); //Check if the character is touching the platform
			if (isContact) {
				onPlatform = true;
				break;
			}
		}

		if (!isContact) {
			gameChar_y += 2; //If no contact, make the character fall
		}
	}
}

function drawCollectables() {
	for (var i = 0; i < collectables.length; i++) {
		drawCollectable(collectables[i]);
	}
}

function drawCollectable(t_collectable) {
	if (t_collectable.isFound == false) {
		floatingCollectable = sin(frameCount * 0.06) * 2; //Make the collectable float
		//Shadow
		fill(0, 0, 0, 160);
		noStroke();
		ellipse(t_collectable.x_pos + 4, t_collectable.y_pos + floatingCollectable + 2, t_collectable.size, t_collectable.size + 1);

		//Coins
		fill(240, 240, 20);
		stroke(190, 90, 90);
		strokeWeight(2);
		ellipse(t_collectable.x_pos, t_collectable.y_pos + floatingCollectable, t_collectable.size, t_collectable.size);

		//Inner detail for coins
		fill(180, 160, 20);
		noStroke();
		ellipse(t_collectable.x_pos, t_collectable.y_pos + floatingCollectable, t_collectable.size * 0.6, t_collectable.size * 0.6);
		fill(0);
		textFont('Verdana');
		textSize(16);
		text("1", t_collectable.x_pos - 5, t_collectable.y_pos + 5 + floatingCollectable);
	}
}

function drawGameScore() {
	fill(240, 240, 20);
	textFont('Verdana');
	textSize(35);
	stroke(190, 90, 90);
	strokeWeight(2.5);
	text("COINS:", 1115 + cameraPosX, 155);
	text(game_score, 1310 + cameraPosX, 155);
}

function drawLifePoints() {
	var spacing = 78;
	var size = 10;
	var heart1 = 1280; //X pos of the first heart
	var heartY = 50; // Y pos of hearts

	for (var i = lives - 1; i >= 0; i--) { //Deduction of heart from right to left
		var heartX = heart1 - spacing * i;
		var heartY = heartY

		//Draw the hearts
		fill(240, 0, 0);
		noStroke();

		rect(heartX + cameraPosX, heartY, 14, size);
		rect(heartX + 29 + cameraPosX, heartY, 14, size);

		rect(heartX - 8 + cameraPosX, heartY + 10, 60, size);
		rect(heartX - 13 + cameraPosX, heartY + 20, 70, size);

		rect(heartX - 8 + cameraPosX, heartY + 30, 60, size);
		rect(heartX + cameraPosX, heartY + 40, 45, size);
		rect(heartX + 10.5 + cameraPosX, heartY + 50, 24, size);
	}
}

function checkIfGameCharHitByAnyEnemy() {
	if (hitByEnemy) {
		return;
	}

	for (var i = 0; i < enemies.length; i++) {
		var isContact = enemies[i].checkContact(gameChar_x, gameChar_y); //Check if the character is touching the enemy
		if (isContact) {
			hitByEnemy = true;
			break;
		}
	}
}

function respawnChar() {
	gameChar_x = 100;
	gameChar_y = floorPos_y;
	lives--;
	if (lives > 0) {
		init(); //Reinitialize the game if lives are remaining
	} else {
		gameOver = true; //End if no lives are left
	}
	//Reset states
	isPlummeting = false;
	isFalling = false;
}

function drawFlagpole() {
	fill(125);
	rect(flagpole.x_pos, floorPos_y - 400, 30, 400);

	fill(80);
	if (flagpole.isReached) {
		//Flag up
		rect(flagpole.x_pos, floorPos_y - 400, 120, 50);
	} else {
		//Flag down
		rect(flagpole.x_pos, floorPos_y - 50, 120, 50);
	}
}

function checkIfGameCharReachedFlagpole() {
	if (flagpole.isReached == false) {
		var d = dist(gameChar_x, gameChar_y, flagpole.x_pos, floorPos_y)
		if (d < 10) {
			flagpole.isReached = true;

			gameOver = true;
		}
	}
}

function drawGameOver() {
	fill(0);
	textSize(80);
	if (lives > 0) {
		text("Game Ended!", 3380, height / 2 - 50);
		text("You won!", 3450, height / 2 + 50);

	}
	else { //If no lives are left
		text("Game Ended!", 200, height / 2 - 50);
		text("You lost... Try again!", 140, height / 2 + 50);

	}
}

function keyPressed() {
	//If statements to control the animation of the character when keys are pressed.
	if (gameOver) {
		return;
	}

	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if (!isPlummeting) {
		if (keyCode == 37) {
			console.log("left arrow");
			isLeft = true;
		}
		else if (keyCode == 39) {
			console.log("right arrow")
			isRight = true;
		}
		else if (keyCode == 38) {
			if (gameChar_y >= floorPos_y || onPlatform) {
				console.log("up arrow");
				gameChar_y -= 140;
			}
		}
	}
}
function keyReleased() {
	if (gameOver) {
		return;
	}

	if (keyCode == 37) {
		console.log("left arrow released");
		isLeft = false;
	} else if (keyCode == 39) {
		console.log("right arrow released")
		isRight = false;
	}
}