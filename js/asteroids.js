
var score = 0;
var player;
var playerColor = 255;
var qtdAsteroids = 10;
var asteroids = [];
var bullets = [];

function reset(){
	player = new Player(windowWidth/2, windowHeight/2, 30);
	for(var i = 0; i < 10; i++){
		asteroids[i] = new Asteroid(40, 35);
	}
	bullets = [];

	score = 0;
	//frameRate(30);
}

function setup(){
	createCanvas(windowWidth, windowHeight);

	button = createButton('Restart');
	button.position(10,10);
	button.mousePressed(reset);

	textAlign(LEFT);
	textSize(30);

	reset();
}

function draw(){
	background(0);
	for(i in asteroids){
		asteroids[i].update();
		asteroids[i].draw();
	}

	for(i in bullets){
		bullets[i].update();
		if(bullets[i].isOutOfBound()){
			bullets.splice(i, 1);
			i--;
		}
		else{
			var canContiune = true;
			for(var auxAsteroid = 0; auxAsteroid < asteroids.length && canContiune; auxAsteroid++){
				if(asteroids[auxAsteroid].hits(bullets[i].pos.x, bullets[i].pos.y, 1)){
					newAsteroids = asteroids[auxAsteroid].split();
					score += asteroids[auxAsteroid].getEstimatedRadius();
					asteroids.splice(auxAsteroid, 1);
					for(tmp in newAsteroids){
						asteroids.push(newAsteroids[tmp]);
					}
					bullets.splice(i, 1);
					i--;
					canContiune = false;
				}
			}
			if(canContiune == true){
				bullets[i].draw();
			}

		}
	}

	player.draw();
	player.turn();
	player.update();


	if(asteroids.length == 0){
		reset();
	}

	showScore();
}

function showScore(){
	push();
		fill(255, 0, 0);
		text('Score: ' + score, 10, 70);
	pop();
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
};

function keyReleased(){
	player.setRotation(0);
	player.setAcceleration(false);
}

function keyPressed(){
	if(key == ' '){
		bullets[bullets.length] = new Bullet(player.pos.x, player.pos.y, player.getAngle());
	}
	else if(keyCode === LEFT_ARROW){
		player.setRotation(-0.1);
	}
	else if(keyCode === RIGHT_ARROW){
		player.setRotation(0.1);
	}
	else if(keyCode === UP_ARROW){
		player.setAcceleration(true);
	}
}

function Particles(x, y, lifeTime){
	this.pos = createVector(x, y);
	this.lifeTime = lifeTime;
	this.movement = createVector(random(0,2), random(0,2));


}
