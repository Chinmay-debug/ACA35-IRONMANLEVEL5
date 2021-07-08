
var  coinScore=0, coinsGroup, stoneGroup, bg, backgroundImg , ironImg , iron , ground ,stoneImg,diaImg;
//In This Function We load basic things i.e. images,sound.
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironmanImg = loadImage("images/iron.png");
  stoneImg=loadImage("images/stone.png");
  diaImg=loadImage("images/diamond.png");
  coinSound = loadSound("sounds/coinSound.mp3");
  obsImg=loadImage("images/spikes.png");
  dieSound=loadSound("sounds/dieSound.mp3");
  jumpSound=loadSound("sounds/jump.mp3");
}

// In This Function We can Draw Sprite Means a Place Where We Have To put The Things.
function setup() {
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale =3;

  iron = createSprite(200,505,20,50);
  iron.addImage(ironmanImg);
  iron.scale=0.3;
  

  stoneGroup= new Group ();
  coinsGroup= new Group();
  obsGroup= new Group();

  ground = createSprite(500,585,1000,10 );
  ground.visible = false;

 
}
// In This Function We Specify the work of buttons. 

function draw() {
  
  bg.velocityY = 4;
  if(bg.y > 600){
    bg.y = 300;
  } 

  if (bg.y > 600){
    bg.y=bg.width/4;
  }
  if(iron.y<200){
    iron.y=200;
  }

  // if(iron.x<500){
    // iron.x=500;
  // }


if(keyDown("up")){
  iron.y=iron.y-20;
  
}

if(keyDown("down")){
  iron.y=iron.y+3;
}

if(keyDown("left")){
  iron.x=iron.x-3;
}

if(keyDown("right")){
  iron.x=iron.x+3;
}

generateStones();
for(var i=0; i<(stoneGroup).length;i++){
  var temp = (stoneGroup).get(i);

  if (temp.isTouching(iron)){
    iron.collide(temp);
  }
}

generateObs();
for(var i = 0 ; i< (obsGroup).length ;i++){
  var temp = (obsGroup).get(i) ;
  
  if (temp.isTouching(iron)) {
    dieSound.play();
    coinScore=coinScore-5;
  
   
    }
      
  }
         
generateCoins();
    for(var i = 0 ; i< (coinsGroup).length ;i++){
      var temp = (coinsGroup).get(i) ;
      
      if (temp.isTouching(iron)) {
        coinSound.play();
        coinScore++;
        temp.destroy();
        temp=null;
        }
          
      }

iron.collide(ground);
iron.velocityY=iron.velocityY+0.5;
    
    drawSprites();
    textSize(50);
    fill("red");
    text("Diamonds :   "  +coinScore, 750,50 )  ;
   
}

// In This Function We Generate Stones On Which iron man can stand.
function generateStones(){
  if(frameCount%30===0) {
    var stone = createSprite(500,120,40,10);
    stone.x = random(50,900);
    stone.y = random(50,600);
    stone.addImage(stoneImg);
    stone.scale=0.5;
    stone.velocityY=-3;

    stone.lifetime=250;
    stoneGroup.add(stone);
  }
}

//In This Function We Generate coin If iron man collect it then score is increase by 1 .
function generateCoins() {
  if (frameCount % 70 === 0) {
    var coin = createSprite(random(100, 800), 10, 40, 10);
    coin.addImage(diaImg);
    coin.x = random(100,800);
    coin.scale = 0.5;
    coin.velocityY = 3;
    coin.lifetime = 1200;
    coinsGroup.add(coin);
  }
}

//In This Function We Generate obstacles If Iron Man Touch It The Score Is Reduced By -5.
function generateObs(){
  if(frameCount%100===0){
    var obstacle= createSprite(random(100,800),10,40,10);
    obstacle.addImage(obsImg);
    obstacle.x = random(200,700);
    obstacle.scale=0.5;
    obstacle.velocityY=3;
    obstacle.lifetime=1200;
    obsGroup.add(obstacle);
  }
}