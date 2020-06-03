var fnt;
var curkey;
var snake;
var snake_word;
var dir;
var fruit_pos;
var mode;
var score;

function preload(){
	fnt = loadFont('SourceCodePro.ttf');
}

function setup(){
	createCanvas(1024, 640);
	colorMode(HSB, 255);

	mode = "menu";
	snake = [];
	snake.push([0, 0]);
	snake_word = 'a';
	dir = 0;

	fruit_pos = [floor(random(0, 32)), floor(random(0, 20))];
	score = 0;

	curkey = 'a';
}

function draw(){
	background(80);
	textFont(fnt);

	if(mode == "game"){
		textSize(32);
		fill(255);

		if(frameCount % 6 == 0){
			let head = snake[snake.length-1];
			for(let i = 0; i < snake.length-1; i++){
				if(head[0] == snake[i][0] && head[1] == snake[i][1]){
					mode = "loss";
					break;
				}
			}
			if(head[0] < 0 || head[0] > 32 || head[1] < 0 || head[1] > 20){
				mode = "loss";
			}
			switch(dir){
				case 0:
					snake.push([head[0]+1, head[1]]);
					break;
				case 1:
					snake.push([head[0], head[1]+1]);
					break;
				case 2:
					snake.push([head[0]-1, head[1]]);
					break;
				case 3:
					snake.push([head[0], head[1]-1]);
					break;
			}
			if(head[0] == fruit_pos[0] && head[1] == fruit_pos[1]){
				let found = true;
				while(found){
					found = false;
					fruit_pos = [floor(random(0, 32)), floor(random(0, 20))];
					for(let i = 0; i < snake.length; i++){
						if(snake[i][0] == fruit_pos[0] && snake[i][1] == fruit_pos[1]){
							found = true;
							break;
						}
					}
				}

				snake_word += curkey;
				score++;
			}
			else
				snake.shift();
		}

		fill(map(snake.length%5, 0, 5, 0, 255), 255*0.7, 255);
		text(curkey, fruit_pos[0]*32 + 6, fruit_pos[1]*32 + 24);

		for(let i = 0; i < snake.length; i++){
			fill(map(i%5, 0, 5, 0, 255), 255*0.7, 255);
			text(snake_word.substr(i, 1), snake[i][0]*32 +6, snake[i][1]*32 + 24);
		}

		fill(0);
		textAlign(CENTER);
		text("score: " + score, 80, 24);
	}
	else if(mode == "menu"){
		fill(0);
		textAlign(CENTER);
		textSize(50);
		text("press any letter to start", width/2, height/2);
	}
	else if(mode == "loss"){
		fill(0);
		textAlign(CENTER);
		textSize(50);
		text("game over!", width/2, height/2);
		text("score: " + score, width/2, height/2+120);
		textSize(30);
		text("press any letter to start", width/2, height/2+30);
	}
}

function keyPressed(){
	if(mode == "game"){
		if(keyCode === LEFT_ARROW && dir != 0)
			dir = 2;
		if(keyCode === RIGHT_ARROW && dir != 2)
			dir = 0;
		if(keyCode === UP_ARROW && dir != 1)
			dir = 3;
		if(keyCode === DOWN_ARROW && dir != 3)
			dir = 1;
	}
}

function keyTyped(){
	curkey = key;
	if(mode == "menu" || mode == "loss"){
		mode = "game";

		snake_word = key;
		snake = [];
		snake.push([0, 0]);
		dir = 0;

		fruit_pos = [floor(random(0, 32)), floor(random(0, 20))];
		score = 0;
	}
}












