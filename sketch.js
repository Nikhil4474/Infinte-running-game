var road, roadImg;
var bomb, bombImg;
var coins, coinImg;
var car, carImg;
var roadblock, roadblockImg;
var carRight, carRightImg;
var carLeft, carLeftImg;
var coinInvisBlock;
var leftBoundary;
var restart, restartImg;
var score = 0;
var rdvel = 3;
localStorage["HighestScore"]=0
var gamestate = "play";
var coinsGroup
var bombsGroup
var bombframeCount = 30;
var coinframeCount = 40;

function preload() {
  roadImg = loadImage("road.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  carImg = loadImage("car.png");
  roadblockImg = loadImage("roadblock.png");
  carRightImg = loadImage("carturnRIGHT.png");
  carLeftImg = loadImage("carturnLEFT.png");
  restartImg = loadImage("restart.png");
  intensivedriving = loadSound("mission impossible sound effect.mp3");
  intensivedrivingflute = loadSound("Mission Impossible flute.mp3");
}

function setup() {
  createCanvas(600, 600);

  road = createSprite(300, 300);
  road.addImage("road", roadImg);


  car = createSprite(300, 550);
  car.addImage("car", carImg);
  car.addImage("carleft", carLeftImg);
  car.addImage("carright", carRightImg);
  car.scale = 0.3;

  // coininvisGroup = new Group()
  coinsGroup = new Group();
  bombsGroup = new Group();

  car.debug = true;
  car.setCollider("rectangle", 0, 0, 140, 250);

  leftBoundary = createSprite(160, 300, 15, 600);
  leftBoundary.visible = false;

  rightBoundary = createSprite(443, 300, 15, 600);
  rightBoundary.visible = false;

  localStorage["HighScore"] = 0;
  // intensivedrivingflute.loop()

  restart = createSprite(300, 300, 30, 30);
  restart.addImage("restart", restartImg);
  restart.scale = 0.5;
  // intensivedriving.loop()
}

function draw() {
  background("pink");

  textSize(20);
  text("Score: " + score, 20, 30);
  textSize(15);
  text("Highest Score: " + localStorage["HighestScore"], 20, 50);

  edges = createEdgeSprites();
  car.collide(edges);
  car.collide(leftBoundary);
  car.collide(rightBoundary);

  if (gamestate === "play") {


    restart.visible = false;
    if (keyDown("left")) {
      car.x = car.x - 5;
      car.changeImage("carleft", carLeftImg);
    } else if (keyWentUp("left")) {
      car.changeImage("car", carImg);
    }

    if (keyDown("right")) {
      car.x = car.x + 5;
      car.changeImage("carright", carRightImg);
    } else if (keyWentUp("right")) {
      car.changeImage("car", carImg);
    }

    if (road.y > 500) {
      road.y = 100;
    }

    if (localStorage["HighestScore"] < score) {
      localStorage["HighestScore"] = score;
    }

    road.velocityY = rdvel;
    spawnCoins();
    spawnBomb();


// Destroy Coin when collected
var i;
    for (i = 0; i < coinsGroup.length; i++) {
      if (car.isTouching(coinsGroup.get(i))) {
        score++;
        // coinsGroup.velocityY = 0
        coinsGroup.get(i).destroy()
        console.log(score);
      }
    }


    if (car.isTouching(bombsGroup)) {
      gamestate = "end";
      // restart.visible = true;
    }
  // Check score
    if (score >= 5) {
      road.velocityY = 5;
      rdvel = road.velocityY;
      bombsGroup.velocityY = 8;
      coinsGroup.velocityY = 7;
      coinframeCount -10
      bombframeCount - 10
    }
    if (score >= 10){
      road.velocityY = 8;
      rdvel = road.velocityY;
      bombsGroup.velocityY = 12;
      coinsGroup.velocityY = 12;
    }
    if (score >= 15){
      road.velocityY = 18;
      rdvel = road.velocityY;
      bombsGroup.velocityY = 20;
      coinsGroup.velocityY = 20;
    }
    if(score >= 20){
      road.velocityY = 20;
      rdvel = road.velocityY;
      bombsGroup.velocityY = 25;
      coinsGroup.velocityY = 25;
    }
    if (score == 25){
      road.velocityY = 0;
      road.velocityY = 0;
      bombsGroup.velocityY = 0;
      bombsGroup.destroyEach();
      coinsGroup.velocityY = 0;
      coinsGroup.destroyEach();
      textSize(20);
      text("You have won \n the game", 10,100);
    }
    console.log(coinframeCount, bombframeCount)
    
  } 
  else if (gamestate === "end") {
    // if (car.isTouching(bombsGroup)) {
      // score = 0
      road.velocityY = 0;
      bombsGroup.setVelocityYEach(0) 
      coinsGroup.setVelocityYEach(0) 
      restart.visible = true;
    // }
    if (mousePressedOver(restart)){
      restartGame();
    }
    intensivedriving.stop();
  }

  drawSprites();


}

function spawnCoins() {
  if (frameCount % coinframeCount === 0) {
    coins = createSprite(300, 50);
    coins.scale = 0.3;
    coins.addImage("coin", coinImg);
    coins.velocityY = 5;
    coins.x = Math.round(random(180, 400));
    coinsGroup.add(coins);
  }
}

function spawnBomb() {
  if (frameCount % bombframeCount === 0) {
    bomb = createSprite(300, 50, 10, 10);
    bomb.scale = 0.1;
    bomb.addImage("bomb", bombImg);
    bomb.velocityY = 6;
    bomb.x = Math.round(random(180, 400));
    bomb.lifetime = 90;
    bombsGroup.add(bomb);
  }
}

function restartGame() {
  gamestate = "play"
  coinsGroup.destroyEach();
  bombsGroup.destroyEach();
  road.velocityY = 3;
  bombsGroup.velocityY = 6;
  coinsGroup.velocityY = 5;
  // intensivedriving.loop();
  score = 0;
}
