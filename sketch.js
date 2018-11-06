var s;
var s2;
var sqr = 15;
var w = 30*sqr;
var h = 30*sqr;
var food;


function setup() {
  createCanvas(w,h);
  background(0);
  s = new Snake(0,0,255,255, "p1",w - sqr,15*sqr);
  food = new Food;
  food.random();
  s2 = new Snake(255,0,0,255, "p2",0, 15*sqr);
  frameRate(10);
  // noStroke();

  // rect(10,10,10,10);
}

function draw() {
	background(0);
	for (var i = 0; i < food.foods.length; i++) {
		if(s.check(food.foods[i].x,food.foods[i].y)){
			s.add(i);
			food.delete(i);
		}
		if(s2.check(food.foods[i].x,food.foods[i].y)){
			s2.add();
			food.delete(i);
		}
	}
	s.update();
	s.show();
	s.checkdeath(s2);
	s2.update();
	s2.show();
	s2.checkdeath(s);
	// console.log(food.foods.length);
	for (var i = 0; i < food.foods.length; i++) {
		if(s.check(food.foods[i].x,food.foods[i].y)){
			// console.log("GOT 1 ")
			s.add();
			food.delete(i);
		}
		if(s2.check(food.foods[i].x,food.foods[i].y)){
			// console.log("GOT 2")
			s2.add();
			food.delete(i);
		}
	}


	if(frameCount % 5 == 0){
		food.update()
	}
	// console.log(abs(20-(s.score+s2.score)));
	if(frameCount % abs(20-(s.score+s2.score)) == 0){
		food.random();
	}
	food.print();
  	
}



function Food(){
	this.x;
	this.y;
	this.foods = [];
	this.random = function(){
		this.x = floor(random(1,w/sqr)) * sqr;
		this.y = 0;
		this.foods.push(createVector(this.x,this.y));
	}
	this.update = function(){
		for (var i = 0; i < this.foods.length; i++) {
			if((this.foods[i].y + sqr) >= h){
				this.foods.splice(i,1);
			}else{
				this.foods[i].y += sqr;
			}
		}
	}
	this.checkend = function(){
		this.random();
	}
	this.print = function(){
		// console.log("F");
		for (var i = 0; i < this.foods.length; i++) {
			fill(255);
			rect(this.foods[i].x,this.foods[i].y,13,13);
		}
	}
	this.delete = function(i){
		this.foods[i].x = -100;
		this.foods[i].y = -100;
	}
}

function Snake(c,o,l,r, pla, startx,starty) {
	// console.log(color);
	this.player = pla;
	this.tail = [];
	this.x = startx;
	this.y = starty;
	this.xspeed = 0;
	this.yspeed = 0;
	this.score = 0;
	this.checkMoved = false;
	// rect(100,100,100,100);
	this.update = function(){
		this.checkMoved = false;
		for (var i = this.score; i > 0; i--) {
			this.tail[i] = this.tail[i-1];
		}
		var vec = createVector(this.x,this.y);
		this.tail[0] = vec;
		// this.score++;
		this.x = this.x + this.xspeed*sqr;
		this.y = this.y + this.yspeed*sqr;
		if(this.x >= w || this.y >= h|| this.x < 0 || this.y < 0){
			setup();
		}

	}
	this.show = function(){
		fill(c,o,l,r);
		rect(this.x,this.y,13,13);
		for (var i = 0; i < this.score; i++) {
			fill(c,o,l,r);
			rect(this.tail[i].x, this.tail[i].y, 13, 13);
		}
	}

	this.dir = function(n, k){
		if ((!((k == -(this.xspeed)) && (n == -(this.yspeed))))) {
			if(!this.checkMoved){
				this.checkMoved = true;
				this.xspeed = k;
				this.yspeed = n;
			}
		}

	}
	this.add = function(){
		this.score++;
	}
	this.check = function(fo,fu){
			var d = dist(this.x,this.y,fo,fu);
			if(d <= 14){
				return true;
			}else{
				return false;
			}
	}
	this.checkdeath = function(other){
		var d = dist(this.x,this.y,other.x,other.y);
		if(d < 3){
			console.log("TIE");
			setup();
		}
		for (var i = 0; i < this.score; i++) {
			d = dist(this.x,this.y,this.tail[i].x, this.tail[i].y);
			if(d < 3){
				console.log("TIE2");
				console.log(other.player);
				setup();
			}
		}
		for (var i = 0; i < other.score; i++) {
			d = dist(this.x,this.y,other.tail[i].x, other.tail[i].y);
			if(d < 3){
				console.log("TIE1");
				console.log(this.player)
				setup();
			}
		}

	}
}






function keyPressed(){
	if(keyCode === LEFT_ARROW){
		s.dir(0,-1);
	}else if(keyCode === RIGHT_ARROW){
		s.dir(0,1);
	}else if(keyCode === UP_ARROW){
		s.dir(-1,0);
	}else if(keyCode === DOWN_ARROW){
		s.dir(1,0);
	}
	if(key == "a"){
		// s.score++;
		s2.dir(0,-1);
	}else if(key == "d"){
		s2.dir(0,1);
	}else if(key == "w"){
		s2.dir(-1,0);
	}else if(key == "s"){
		s2.dir(1,0);
	}
}


