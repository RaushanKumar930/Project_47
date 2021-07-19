const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var holder,ball,ground;
var stand1,stand2;
var ball;
var sling;
var polygon_img;
var score = 0, turn = 10;
var colour = 255, colour2 = 0, gameState = 0;
var greetings, greetingImg, bubbles, bubble = [];
var check = 0;
var button;

function preload(){
  polygon_img=loadImage("polygon.png"); 
}
function setup() {
  createCanvas(900,400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  stand1 = new Stand(390,300,250,10);
  stand2 = new Stand(700,200,250,10);
 
  //level one
  block1 = new Block(300,275,30,40);
  block2 = new Block(330,275,30,40);
  block3 = new Block(360,275,30,40);
  block4 = new Block(390,275,30,40);
  block5 = new Block(420,275,30,40);
  block6 = new Block(450,275,30,40);
  block7 = new Block(480,275,30,40);
  //level two
  block8 = new Block(330,235,30,40);
  block9 = new Block(360,235,30,40);
  block10 = new Block(390,235,30,40);
  block11 = new Block(420,235,30,40);
  block12 = new Block(450,235,30,40);
  //level three
  block13 = new Block(360,195,30,40);
  block14 = new Block(390,195,30,40);
  block15 = new Block(420,195,30,40);
  //top
  block16 = new Block(390,156,30,40);

  //level 1
  b2 = new Block(640,175)
  b3 = new Block(670,175)
  b4 = new Block(700,175)
  b5 = new Block(730,175)
  b6 = new Block(760,175)
  //level 2
  b9 = new Block(670,135)
  b10 = new Block(700,135)
  b11 = new Block(730,135)
  //level 3
  b14 = new Block(700,95)

  ball = new Ball(100,200,20)

  sling = new SlingShot(ball.body,{x:100,y:200})

  button = createSprite(190,350,150,100);
  button.visible = false;
}
function draw() {
  background(0,0,0); 

  textSize(20);
  fill("lightyellow");
  textSize(20);
  text("Score: " + score,50,50);
  text("Turn: " + turn,50,80);

  if(colour2 <= 0){
    colour-= 5;
  }else if(colour2 >= 255){
    colour+= 5;
  }
  if(colour <= 0){
    colour2 = 260;
  }else if(colour >= 255){
    colour2 = -5;
  }

  if(gameState === 0){
    stand1.display();
    stand2.display();
  }

  ball.display();
  sling.display()
  
  strokeWeight(2);
  stroke(15);
  fill(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)));
  block1.display();
  block2.display();
  block3.display();
  block4.display();
  block5.display();
  block6.display();
  block7.display();

  b2.display()
  b3.display()
  b4.display()
  b5.display()
  b6.display()

  fill(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)));
  block8.display();
  block9.display();
  block10.display();
  block11.display();
  block12.display();

  b9.display()
  b10.display()
  b11.display()

  fill(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)));
  block13.display();
  block14.display();
  block15.display();

  b14.display()

  fill(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)));
  block16.display();

  if(gameState === 0 && turn > 0){
    if(mousePressedOver(button)){
      sling.attach(ball.body);
      Matter.Body.setPosition(ball.body,{x:100,y:200});
    }
    fill(255-colour,255-colour,colour);
    rectMode(CENTER);
    rect(190,350,150,100);
    fill(colour,colour,255-colour);
    text("Another Chance", 120, 360);
  }

  if(removeBody(block1) && removeBody(block2) && removeBody(block3) && removeBody(block4) && removeBody(block5) && removeBody(block6) && removeBody(block7) && removeBody(block8) && removeBody(block9) && removeBody(block10) && removeBody(block11) && removeBody(block12) && removeBody(block13) && removeBody(block14) && removeBody(block15) && removeBody(block16) && removeBody(b2) && removeBody(b3) && removeBody(b4) && removeBody(b5) && removeBody(b6) && removeBody(b9) && removeBody(b10) && removeBody(b11) && removeBody(b14)){
    textSize(25);
    fill(colour,255-colour,255-colour);
    text("You Won", 400, 50);
    fill(255-colour,colour,255-colour);
    text("Congratulations!!",370,200);
    text("Press Ctrl+R to play again", 320, 250)
    for(var i in bubble){
      bubble[i].display()
    }
    gameState = 1;
    spawnBubbles();
    stand1.remove();
    stand2.remove();
  }
  if(turn === 0 && score !== 1000){
    fill(Math.round(random(0,255)),Math.round(random(0,255)),Math.round(random(0,255)));
    textSize(25);
    text("You Lost", 400, 50);
    text("Press Ctrl+R to try again", 320, 350);
  }
  drawSprites();
}

function mouseDragged(){
  if(gameState === 0 && turn > 0 && check === 0 && mouseX <= ball.body.position.x){
    Matter.Body.setPosition(ball.body, {x: mouseX , y: mouseY});
  }
}

/*function mouseClicked(){
  if(gameState === 0 && turn > 0 && mouseX < 200){
    sling.attach(ball.body);
    Matter.Body.setPosition(ball.body,{x:100,y:200});
  }
}*/

function mouseReleased(){
  if(gameState === 0 && turn > 0 && mouseX <= ball.body.position.x){
    sling.fly();
    turn--;
  }
}

function keyPressed(){
  if(keyCode===32 && gameState === 0){
    sling.attach(ball.body)
    Matter.Body.setPosition(ball.body,{x:100,y:200});
  }
}

function removeBody(obj){
  if(obj.body.position.x === undefined){
    return true;
  }else{
    return false;
  }
}

function spawnBubbles(){
  if(frameCount % 0.5 === 0){
    bubbles = new Bubble(Math.round(random(0,900)), 0, 10);
    bubble.push(bubbles);
  }
  if(bubbles.x > 410){
    bubble.pop()
  }
}