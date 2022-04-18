var canvas=document.getElementById('canvas1');
var ctx=canvas.getContext('2d');

var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;

var paddleHeight=10;
var paddleWidth=100;
var paddleX=(canvas.width-paddleWidth)/2;

var ballRadius=7;

var rightPressed=false;
var leftPressed=false;

var brickWidth=75;
var brickHeight=20;
var brickRowCount=20;
var brickColumnCount=8;
var brickPadding=10;
var brickOffSetTop=30;
var brickOffSetLeft=30;

var lives=5;
var score=0;

var bricks=[];
for(let i=0;i<brickColumnCount;i++){
	bricks[i]=[];
	for(let j=0;j<brickRowCount;j++){
		bricks[i][j]={x:0,y:0,status:1};
	}
}

document.addEventListener('keydown',keyDownHandler);
document.addEventListener('keyup',keyUpHandler);

function drawBricks(){
	for(let i=0;i<brickColumnCount;i++){
		for(let j=0;j<brickRowCount;j++){
			if(bricks[i][j].status==1){
			let brickX=(i*(brickWidth+brickPadding)+brickOffSetLeft);
			let brickY=(j*(brickHeight+brickPadding)+brickOffSetTop);
			bricks[i][j].x=brickX;
			bricks[i][j].y=brickY;
			
			ctx.beginPath();
			ctx.rect(brickX,brickY,brickWidth,brickHeight);
			ctx.fillStyle="#757575";
			ctx.fill();
			ctx.strokeStyle='rgba(0,0,255,0.5)';
			ctx.stroke();
			ctx.closePath();
			}
		}
	}
}

function keyDownHandler(movement){
	if(movement.keyCode==39){
		rightPressed=true;
	}else if(movement.keyCode==37){
		leftPressed=true;
	}
}

function keyUpHandler(movement){
	if(movement.keyCode==39){
		rightPressed=false;
	}else if(movement.keyCode==37){
		leftPressed=false;
	}
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,Math.PI*2);
	ctx.fillStyle="#FFFFFF";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-(paddleHeight),paddleWidth,paddleHeight);
	ctx.fillStyle="#00FBFF";
	ctx.fill();
	ctx.closePath();
}

function collisonDetection(){
	for(var i=0;i<brickColumnCount;i++){
		for(var j=0;j<brickRowCount;j++){
			var b=bricks[i][j];
			if(b.status==1){
				if(x>b.x && x< b.x+brickWidth && y>b.y && y< b.y+brickHeight ){
					dy=-dy;
					b.status=0;
					++score;
					if(brickColumnCount*brickRowCount==score){
						alert("YOU WIN");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawScore(){
	ctx.font="18px Arial";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("Score: "+score,8,20);
}

function drawLives(){
	ctx.font="18px Arial";
	ctx.fillStyle="#FFFFFF";
	ctx.fillText("Lives: "+lives,canvas.width-65,20);
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height)
	drawBricks();
	drawLives();
	drawBall();
	drawPaddle();
	drawScore();
	collisonDetection();

	if(y+dy < ballRadius){
		dy=-dy;

	}else if(y+dy > canvas.height-2*ballRadius){

		if(x>paddleX && x<paddleX +paddleWidth){
			dy=-dy;

		}else{
			lives=lives-1;
			if(!lives){
				alert("GAME OVER");
		    	document.location.reload();

			}else{
				x=canvas.width/2;
				y=canvas.height-30;
				dx=2;
				dy=-2;
				paddleX=(canvas.width-paddleWidth)/2;
			}
	    }
	}
	if((x+dx < ballRadius || (x+dx > canvas.width-ballRadius)) ){
			dx=-dx;
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX+=7;

	}else if(leftPressed && paddleX>0){
		paddleX-=7;
	}
	x += dx;
	y += dy;
}
// [CONFIDENTIAL] SECRET DISCORD SERVER INVITATION CODE LoYUInWAFzf5FbKb5yjc6iRtTzY6LWLE2YWMzmq DO NOT SHARE!
setInterval(draw,7);
