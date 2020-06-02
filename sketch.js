var fnt;
var curkey;
var snake;
var snake_word;
var dir;
var fruit_pos;

function preload(){
	fnt = loadFont('SourceCodePro.ttf');
}

function setup(){
	createCanvas(1024, 640);

	snake = [];
	snake.push([0, 0]);
	snake_word = 'a';
	dir = 0;

	fruit_pos = [5, 15];

	curkey = '';
}

function draw(){
	background(80);

	textFont(fnt);
	textSize(32);
	fill(255);

	if(frameCount % 5 == 0){
		let head = snake[snake.length-1];
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
			fruit_pos = [floor(random(0, 32)), floor(random(0, 20))];
			snake_word += curkey;
		}
		else
			snake.shift();
	}

	text(curkey, fruit_pos[0]*32 + 6, fruit_pos[1]*32 + 24);

	for(let i = 0; i < snake.length; i++){
		text(snake_word.substr(i, 1), snake[i][0]*32 +6, snake[i][1]*32 + 24);
	}
}

function keyPressed(){
	if(keyCode === LEFT_ARROW && dir != 0)
		dir = 2;
	if(keyCode === RIGHT_ARROW && dir != 2)
		dir = 0;
	if(keyCode === UP_ARROW && dir != 1)
		dir = 3;
	if(keyCode === DOWN_ARROW && dir != 3)
		dir = 1;
}

function keyTyped(){
	curkey = key;
}












