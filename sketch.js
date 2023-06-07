// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
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


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  levelSetup();
  menuSetup();
  world.gravity.y = 10;
  time0 = millis();
}

function draw() {
  background(255);

  if (gameState === "menu") {
    menu();
  }
  if (gameState ==="play") {
    gamePlay();
  } 
}

function menu() {
  camera.off();
  text("Johnson's Final Stand",width/2,height*0.25);
  if (plays.mouse.hovering()) {
    plays.color = "black";
  }
  else {
    plays.color = "white";
  }
  if (plays.mouse.presses()){
    gameState = "play";
    menuToggle();
  }
  if (controls.mouse.presses()){
    gameState = "controls";
    plays.visible = false;
    controls.visible = false;
  }
  if (controls.mouse.hovering()) {
    controls.color = "black";
  }
  else {
    controls.color = "white";
  }
}

function menuSetup(){
  textSize(40);
  plays = new Sprite(width/2,height/2,200,100,"s");
  plays.color = "white";
  plays.text = "Play";
  controls = new Sprite(width/2,height*0.7,200,100,"s");
  controls.color = "white";
  controls.text = "Controls";
  gameState = "menu";
}

function menuToggle(){
  plays.visible = !plays.visible;
  controls.visible = !controls.visible;
  if (plays.collider === "static"){
    plays.visible = false;
    plays.collider = "n";
    controls.visible = false;
    controls.collider = "n";
  }
  else{
    plays.visible = true;
    plays.collider = "s";
    controls.visible = true;
    controls.collider = "s";
  }
}

function levelSetup() {
  if (currentLevel === 1) {
    player = new Sprite(400,618,50,"d"); //will change to an actual player later
    level = new Group();
    noJumpLevel = new Group();
  }
  level.remove();
  noJumpLevel.remove();
  levelExit = new Sprite();
  levels(currentLevel);
  noJump(currentLevel);
}

function gamePlayToggle() {

}

function gamePlay() {
  camera.on();
  camera.x = player.x;
  camera.y = player.y;
  movement();
}

function movement() {
  if (kb.presses("p")){ // for testing
    currentLevel++;
    levelSetup();
  }
  
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
}
//   if (collided === true) {
//     if (player.velocity.x === 0){
//       jumpCount = 0;
//       collided = false;
//     }
//   }


function levels(levelNumber) {
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
  }

  if (levelNumber === 2) {
    for (let x = 0; x < 6; x++) {
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

    // levelExit.x = 1590;
    // levelExit.y= 70;
    // levelExit.width = 25;
    // levelExit.height = 120;
    // levelExit.collider = "s";
  }
}

function noJump(levelNumber) {
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
    noJumpLevel[3].y= 680;
    noJumpLevel[3].width = 10;
    noJumpLevel[3].height = 1700;
  }
}