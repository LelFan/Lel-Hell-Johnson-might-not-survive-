// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// setting up variables
let gameState = "menuSetup";
let plays;
let controls;
let player, ground;
let jumpCount = 0;
let playerFacing = "right";
let dash = 0, time0;
let level;
let noJumpLevel;
let levelExit;
let collided = true;
let currentLevel = 1;
let colliderTest;
let enemies;
let shots;
let bob, job, gob, lob, pob;
let playerLife = 3;

//setting up classes with a basic structure of having movement and reacting to projectiles
class walker {
  constructor(x,y){
    this.sprite = new enemies.Sprite(x,y,25,"d");
  }

  move() {
  if (this.sprite.x > player.x) {
      this.sprite.vel.x = -2;
  }
  else {
    this.sprite.vel.x =2;
    }
  }

  checkCollisions() {
    if (this.sprite.collided(shots)){
      this.sprite.remove();
    }
  } 
}

class spikey {
  constructor(x,y,width){
    this.sprite = new enemies.Sprite(x,y,width,15,"d");
  } 
  checkCollisions() {
    if (this.sprite.collided(shots)){
      this.sprite.remove();
    }
  } 
}

class floater {
  constructor(x,y){
    this.sprite = new enemies.Sprite(x,y,25,"d");
    this.sprite.gravity = 0;
  }

  move() {
  if (this.sprite.x > player.x) {
      this.sprite.vel.x = -2;
  }
  else {
    this.sprite.vel.x =2;
    }
  
  if (this.sprite.y > player.y) {
      this.sprite.vel.y = -2;
  }
  else {
    this.sprite.vel.y =2;
    }
  }

  checkCollisions() {
    if (this.sprite.collided(shots)){
      this.sprite.remove();
    }
  } 
}

class boss {
  constructor(x,y){
    this.sprite = new enemies.Sprite(x,y,100,"d");
    this.sprite.gravity = 0;
    this.hp = 500
  }

  move() {
  if (this.sprite.x > player.x) {
      this.sprite.vel.x = -2;
  }
  else {
    this.sprite.vel.x =2;
    }
  if (this.sprite.y > player.y) {
      this.sprite.vel.y = -2;
  }
  else {
    this.sprite.vel.y =2;
    }
  }

  checkCollisions() {
    if (this.sprite.collided(shots)){
      this.hp -= 10; //boss uniquely has hp
    }
    if (this.hp === 0) {
      this.sprite.remove();
    }
  } 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  levelSetup(); //setting up the level
  menuSetup(); //setting up the menu
  world.gravity.y = 10; // setting gravity
}

function draw() {
  background(255);

  //looking at the game state
  if (gameState === "menu") {
    menu();
  }
  if (gameState ==="play") {
    gamePlay();
  } 

}

function menu() {
  camera.off(); // making sure camera isn't on player
  text("Johnson's Final Stand",width/2,height*0.25); //title
  if (plays.mouse.hovering()) { // changing sprite if you're above a button
    plays.color = "black"; 
  }
  else {
    plays.color = "white";
  }
  if (plays.mouse.presses()){
    gameState = "play"; //starting the game
    menuToggle();
  }
}

function menuSetup(){ //basic set up
  textSize(40);
  plays = new Sprite(width/2,height/2,200,100,"s");
  plays.color = "white";
  plays.text = "Play";
  gameState = "menu";
}

function menuToggle(){ //toggles visibility of buttons
  plays.visible = !plays.visible;
  if (plays.collider === "static"){
    plays.visible = false;
    plays.collider = "n";
  }
  else{
    plays.visible = true;
    plays.collider = "s";
  }
}

function levelSetup() {
  if (currentLevel === 1) { //creates level and enemy groups aswell as the player if starting the first level
    player = new Sprite(400,618,50,"d"); 
    level = new Group();
    noJumpLevel = new Group();
    levelExit = new Sprite();

    enemies = new Group();
    enemies.color = "red";

    shots = new Group();
    shots.color = "blue";
    let shot = new shots.Sprite(-10000,-10000)
  }

  level.remove(); //all removes create a blank group so the next level can load
  noJumpLevel.remove();
  enemies.remove();



  levels(currentLevel); //both functions simply create the current level
  noJump(currentLevel);

}

function gamePlay() {
  camera.on();   // camera follows player
  camera.x = player.x;
  camera.y = player.y; 
  movement(); //player movement
  if (currentLevel === 1){ //enemy functions
    bob.checkCollisions();
    job.move();
    job.checkCollisions();
  }

  if (currentLevel === 2){ //enemy functions
    bob.checkCollisions();

    job.move();
    job.checkCollisions();

    pob.move();
    pob.checkCollisions();

    gob.move();
    gob.checkCollisions();

    lob.move();
    lob.checkCollisions()
    
  }

  if (currentLevel ===3){ //enemy functions
    job.move();
    job.checkCollisions();
  }
}

function movement() {
  // if (kb.presses("p")){ // for testing
  //   currentLevel++;
  //   levelSetup();
  // }
  
  if (kb.presses("w")){
    if (jumpCount < 1) {
      player.vel.y = -7;
      jumpCount++;
    }
  }
  if (kb.pressing("a")){
    player.vel.x = -6;
    playerFacing = "left";
  }
  else if (kb.pressing("d")){
    player.vel.x = 6;
    playerFacing = "right";
  }
  // else if (kb.pressing("t")){
  //   console.log(player.vel.y);
  // }
  else {
    player.vel.x = 0;
  }

  // if (kb.presses("shift")) {
  //   if (dash === 0) {
  //     time0 = millis();
  //     dash = 1;
  //     if (playerFacing === "right") {
  //       player.vel.x += 220;
  //     }
  //     if (playerFacing === "left") {
  //       player.vel.x -= 220;
  //     }
  //   }
  // }
  if (player.collides(level)){
    // collided = true;
    jumpCount = 0;
  }

  if (player.collides(levelExit)){
    currentLevel++;
    levelSetup();
  }
  // if (player.collides(colliderTest)){
  //   console.log(player.x);
  // }
  if (kb.presses("space")) {
    if (playerFacing === "right"){
      shot = new shots.Sprite(player.x +25, player.y,25,"d")
      shot.vel.x = 15
      shot.life = 100;
    }
    else {
      shot =  new shots.Sprite(player.x -25, player.y,25,"d")
      shot.vel.x= -15
      if (shot.collides(level) || shot.collides(noJumpLevel) || shot.collides(enemies)) {
        shot.remove()
      }
      shot.life = 100;
      
    }

  }

  if (player.collides(enemies)){
    playerLife--;
  }
  
  if(playerLife === 0) {
    gameState = menu;
    text("Game Over",player.y,player.x);

  }
}

function levels(levelNumber) { // just setting up where enemies and jumpable platforms are
  // have platforms generally 130 spaces away vertically as max jump is around 143 and about 500 horizontal 
  level.collider = "static";
  level.x = 50;
  level.y = 20;
  level.width = 100;
  level.height = 100;
  level.color = "pink";

  if (levelNumber === 1) {
    for (let x = 0; x < 6; x++) {
      new level.Sprite();
    }

    level[0].x = 800;
    level[0].y= 681;
    level[0].width = 1600;
    level[0].height = 75;

    level[1].x = 550;
    level[1].y= 500;
    level[1].width = 100;
    level[1].height = 25;

    level[2].x = 1000;
    level[2].y= 380;
    level[2].width = 100;
    level[2].height = 25;

    level[3].x = 550;
    level[3].y= 260;
    level[3].width = 100;
    level[3].height = 25;

    level[4].x = 1000;
    level[4].y= 140;
    level[4].width = 100;
    level[4].height = 25;

    level[5].x = 1500;
    level[5].y= 140;
    level[5].width = 200;
    level[5].height = 25;

    levelExit.x = 1590;
    levelExit.y= 70;
    levelExit.width = 25;
    levelExit.height = 120;
    levelExit.collider = "s";

    bob = new spikey(1500,100,100);
    job = new walker(1500,500);
  }

  if (levelNumber === 2) {
    for (let x = 0; x < 18; x++) {
      new level.Sprite();
    }
    player.x = 1700;
    player.y = 115;

    level[0].x = 1700;
    level[0].y= 140;
    level[0].width = 200;
    level[0].height = 25;

    level[1].x = 2400;
    level[1].y= 1791.5;
    level[1].width = 1600;
    level[1].height = 75;

    level[2].x = 2300;
    level[2].y= 140;
    level[2].width = 200;
    level[2].height = 25;

    level[3].x = 2000;
    level[3].y= 300;
    level[3].width = 200;
    level[3].height = 25;

    level[4].x = 2000;
    level[4].y= 600;
    level[4].width = 400;
    level[4].height = 25;

    level[5].x = 2000;
    level[5].y= 900;
    level[5].width = 400;
    level[5].height = 25;

    level[6].x = 2000;
    level[6].y= 900;
    level[6].width = 400;
    level[6].height = 25;

    level[7].x = 2000;
    level[7].y= 1200;
    level[7].width = 400;
    level[7].height = 25;

    level[8].x = 2000;
    level[8].y= 1500;
    level[8].width = 400;
    level[8].height = 25;

    level[9].x = 3130;
    level[9].y= 1600;
    level[9].width = 140;
    level[9].height = 25;

    level[10].x = 2800;
    level[10].y= 1460;
    level[10].width = 140;
    level[10].height = 25;

    level[11].x = 2470;
    level[11].y= 1320;
    level[11].width = 140;
    level[11].height = 25;

    level[12].x = 2800;
    level[12].y= 1180;
    level[12].width = 140;
    level[12].height = 25;

    level[13].x = 3130;
    level[13].y= 1040;
    level[13].width = 140;
    level[13].height = 25;

    level[14].x = 3130;
    level[14].y= 1320;
    level[14].width = 140;
    level[14].height = 25;

    level[15].x = 2470;
    level[15].y= 1040;
    level[15].width = 140;
    level[15].height = 25;

    level[16].x = 2470;
    level[16].y= 1600;
    level[16].width = 140;
    level[16].height = 25;

    level[17].x = 2800;
    level[17].y= 900;
    level[17].width = 140;
    level[17].height = 25;


    bob = new spikey(2000,250,100);
    job = new walker(2000,1700);
    lob = new floater(2000,1350,100);
    gob = new walker(2000,1350);
    pob = new floater(2800,1000);

    levelExit.x = 2800;
    levelExit.y= 840;
    levelExit.width = 80;
    levelExit.height = 120;
    levelExit.collider = "s";
  }

  if (levelNumber === 3) {
    for (let x = 0; x < 3; x++) {
      new level.Sprite();
    }

    player.x = 618;
    player.y = 400;

    level[0].x = 800;
    level[0].y= 681;
    level[0].width = 1600;
    level[0].height = 75;

    level[1].x = 533;
    level[1].y= 500;
    level[1].width = 100;
    level[1].height = 25;

    level[2].x = 1066;
    level[2].y= 500;
    level[2].width = 100;
    level[2].height = 25;

    job = new boss(800,300);
    
  }


    
}

function noJump(levelNumber) { // just setting up where non jumpable platforms are
  // have platforms generally 130 spaces away vertically as max jump is around 143 and about 500 horizontal 
  noJumpLevel.collider = "static";
  noJumpLevel.x = 50;
  noJumpLevel.y = 20;
  noJumpLevel.width = 100;
  noJumpLevel.height = 100;
  noJumpLevel.color = "pink";

  if (levelNumber ===1) {
    for (let x = 0; x < 3; x++) {
      new noJumpLevel.Sprite();
    }
    noJumpLevel[0].x = 0;
    noJumpLevel[0].y= 275;
    noJumpLevel[0].width = 10;
    noJumpLevel[0].height = 890;

    noJumpLevel[1].x = 1600;
    noJumpLevel[1].y= 275;
    noJumpLevel[1].width = 10;
    noJumpLevel[1].height = 890;

    noJumpLevel[2].x = 800;
    noJumpLevel[2].y= -157.5;
    noJumpLevel[2].width = 1600;
    noJumpLevel[2].height = 25;
  }
  
  if (levelNumber ===2) {
    for (let x = 0; x < 4; x++) {
      new noJumpLevel.Sprite();
    }
    noJumpLevel[0].x = 1600;
    noJumpLevel[0].y= 830;
    noJumpLevel[0].width = 10;
    noJumpLevel[0].height = 2000;

    noJumpLevel[1].x = 3200;
    noJumpLevel[1].y= 830;
    noJumpLevel[1].width = 10;
    noJumpLevel[1].height = 2000;

    noJumpLevel[2].x = 2400;
    noJumpLevel[2].y= -157.5;
    noJumpLevel[2].width = 1600;
    noJumpLevel[2].height = 25;

    noJumpLevel[3].x = 2400;
    noJumpLevel[3].y= 721.25;
    noJumpLevel[3].width = 10;
    noJumpLevel[3].height = 1782.5;
  }

  if (levelNumber === 3) {
    for (let x = 0; x < 3; x++) {
      new noJumpLevel.Sprite();
    }
    noJumpLevel[0].x = 0;
    noJumpLevel[0].y= 275;
    noJumpLevel[0].width = 10;
    noJumpLevel[0].height = 890;

    noJumpLevel[1].x = 1600;
    noJumpLevel[1].y= 275;
    noJumpLevel[1].width = 10;
    noJumpLevel[1].height = 890;

    noJumpLevel[2].x = 800;
    noJumpLevel[2].y= -157.5;
    noJumpLevel[2].width = 1600;
    noJumpLevel[2].height = 25;
  }
  
}


