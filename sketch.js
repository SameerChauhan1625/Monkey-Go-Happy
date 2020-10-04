var PLAY = 1
var END = 0
gameState = PLAY

var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup
var score
var ground

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey_collide = loadImage("sprite_0.png");
 
}



function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(100,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(310,330,600,5);
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
  score = 0;
}


function draw() {
  
  background ("white");
  
  text("Survival Time : " + score,280,100);
  
  if(gameState === PLAY){
    
    if(keyDown("space") && monkey.y>=296.8){
      monkey.velocityY = -17;
    }
    
    spawnobstacle();
    
    spawnbanana();
    
    score = score + Math.round(getFrameRate()/60);
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  
  if(gameState === END){
    
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
  }
  monkey.velocityY = monkey.velocityY + 0.8;

  monkey.collide(ground);
  
  drawSprites();
}

function spawnobstacle() {
  if(frameCount % 300 === 0 ){
    var obstacle = createSprite(300,309,10,10);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -4;
     obstacle.lifetime = 200;
     obstaclesGroup.add(obstacle);
  }
}

function spawnbanana() {
  if(frameCount % 80 === 0 ){
    var banana = createSprite(200,200,10,10);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -3;
     FoodGroup.add(banana);
  }
}