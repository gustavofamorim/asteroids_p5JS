function Player(x, y, size){
	this.angle = 0;
	this.rotation = PI;
	this.pos = createVector(x, y);
	this.movement = createVector(0, 0);
	this.size = size;
	this.isAccelerating = false;

	this.draw = function(){
		push();
			translate(this.pos.x, this.pos.y);
			rotate(this.rotation);
			fill(0);
			stroke(playerColor);
			strokeWeight(2);
			triangle( 0		   , this.size,
					 -this.size, -this.size,
					 this.size , -this.size);
		pop();
	}

	this.setRotation = function(angle){
		this.angle = angle;
	}

	this.setAcceleration = function(boolean){
		this.isAccelerating = boolean;
	}

	this.turn = function(){
		this.rotation += this.angle;
	}

	this.getAngle = function(){
		return this.rotation + PI /2;
	}

	this.accelerate = function(){
		if(this.isAccelerating == true){
			acceleration = p5.Vector.fromAngle(this.getAngle());
			this.movement = this.movement.add(acceleration);
		}
		else{
			this.movement.mult(0.990);
		}
	}

	this.update = function(){
		this.accelerate();
		this.pos.add(this.movement);
		this.verifyBound();
	}

	this.verifyBound = function(){
		if(this.pos.x > windowWidth + this.size / 2){
			this.pos.x = 0;
		}
		else if(this.pos.x < -this.size / 2){
			this.pos.x = windowWidth;
		}

		if(this.pos.y > windowHeight + this.size / 2){
			this.pos.y = 0;
		}
		else if(this.pos.y < -this.size / 2){
			this.pos.y = windowHeight;
		}
	}
}
