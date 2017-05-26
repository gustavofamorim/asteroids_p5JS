function Bullet(x, y, angle){
	this.pos = createVector(x, y);
	this.movement = p5.Vector.fromAngle(angle).mult(5);

	this.update = function(){
		this.pos.add(this.movement);
	}

	this.draw = function(){
		this.pos.add(this.movement);
		tmp = createVector(this.pos.x, this.pos.y);
		tmp1 = createVector(this.movement.x, this.movement.y).mult(4);
		tmp.add(tmp1);
		push();
			stroke(255);
			strokeWeight(4);
			line(this.pos.x, this.pos.y, tmp.x, tmp.y);
		pop();
	}

	this.isOutOfBound = function(){
		if(this.pos.x > windowWidth		||
		   this.pos.x < 0				||
		   this.pos.y > windowHeight	||
		   this.pos.y < 0){
			   return true;
	   }
		return false;
	}
}
