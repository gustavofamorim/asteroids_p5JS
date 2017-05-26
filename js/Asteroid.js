function Asteroid(minRadius, maxVariation){

	this.pos = createVector(random(0, windowWidth), random(0, windowHeight));
	this.vertex = [];
	this.vertexQtd = int(random(5, 15));
	this.minimumRadius = minRadius;
	this.radiusVariation = maxVariation;
	this.movement = p5.Vector.fromAngle(radians(random(0, 360)));

	this.setup = function(){
		//Calculates the variation in radians of the angle in between each vertex
		var angleVariantion = (2*PI)/this.vertexQtd;
		var tmpAngle = angleVariantion;

		for(var i = 0; i < this.vertexQtd; i++){
			//Using polar to cartesian convertion system
			//Read more in:
			//https://en.wikipedia.org/wiki/List_of_common_coordinate_transformations
			x = cos(tmpAngle) * (this.minimumRadius + random(0, this.radiusVariation));
			y = sin(tmpAngle) * (this.minimumRadius + random(0, this.radiusVariation));
			this.vertex[i] = createVector(x, y);
			tmpAngle += angleVariantion;
		}
	}

	this.setup();

	this.update = function(){
		this.pos.add(this.movement);
		this.verifyBound();
	}

	this.draw = function(){
		push();
			noFill();
			stroke(255);
			strokeWeight(4);
			translate(this.pos.x, this.pos.y);
			beginShape();
				for(i in this.vertex){
					vertex(this.vertex[i].x, this.vertex[i].y);
				}
			endShape(CLOSE);
		pop();
	}

	this.getEstimatedRadius = function(){
		return this.minimumRadius + this.radiusVariation;
	}

	this.verifyBound = function(){
		var radiusEstimation = this.getEstimatedRadius();
		if(this.pos.x > windowWidth + radiusEstimation / 2){
			this.pos.x = 0;
		}
		else if(this.pos.x < -radiusEstimation / 2){
			this.pos.x = windowWidth;
		}

		if(this.pos.y > windowHeight + radiusEstimation / 2){
			this.pos.y = 0;
		}
		else if(this.pos.y < -radiusEstimation / 2){
			this.pos.y = windowHeight;
		}
	}

	this.hits = function(x, y, radius){
		//if the distance between the pois is less then the sum of the estimated
		//radius od the objects, probrably a hit has occured
		//this is a tooooooooooooo simple way to detect collisions
		if(dist(this.pos.x, this.pos.y, x, y) < (this.getEstimatedRadius() + radius)){
			return true;
		}
		return false;
	}

	this.split = function(){

		if(this.minimumRadius/2 < 10){
			return null;
		}

		var asteroids = [new Asteroid(this.minimumRadius/2, this.radiusVariation/2),
			 			 new Asteroid(this.minimumRadius/2, this.radiusVariation/2)];

		for(asteroid in asteroids){
			asteroids[asteroid].setPosition(this.pos.x, this.pos.y);
		}

		return asteroids;
	}

	this.setPosition = function(x, y){
		this.pos = createVector(x, y);
	}
}
