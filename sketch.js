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
let level1;
let collided = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  gamePlaySetup();
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

function gamePlaySetup() {
  player = new Sprite(width/4,height*0.8,50,"d"); //will change to an actual player later
  level1 = new Group();
  levelOne();
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
  if (player.collides(level1)){
    collided = true;
    player.velocity.x = 0;
  }
  if (collided === true) {
    if (player.velocity.x === 0){
      jumpCount = 0;
      collided = false;
    }
  }
}

function levelOne() {
  // have platforms generally 130 spaces away vertically as max jump is around 143 and about 500 horizontal 
  level1.collider = "static";
  level1.x = 50;
  level1.y = 20;
  level1.width = 100;
  level1.height = 100;

  for (let x = 0; x < 3; x++) {
    new level1.Sprite();
  }

  level1[0].x = 800;
  level1[0].y= 681;
  level1[0].width = 1600;
  level1[0].height = 75;

  level1[1].x = 550;
  level1[1].y= 500;
  level1[1].width = 100;
  level1[1].height = 25;

  level1[2].x = 0;
  level1[2].y= 275;
  level1[2].width = 10;
  level1[2].height = 890;

}



