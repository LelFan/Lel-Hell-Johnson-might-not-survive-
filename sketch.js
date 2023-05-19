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

function setup() {
  createCanvas(windowWidth, windowHeight);
  // new Canvas(windowWidth, windowHeight);
  textAlign(CENTER);
  menuSetup();
  gamePlaySetup();
  world.gravity.y = 10;
}

function draw() {
  background(255);

  if (gameState === "menu") {
    menu();
  }
  if (gameState ==="play") {
    // world.gravity.y = -10;
    gamePlay();
  } 
  // clear();
}

function menu() {
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
  ground = new Sprite(width/2,height*0.9,width,100, "s");
}

function gamePlayToggle() {

}

function gamePlay() {
  movement();
  
}

function movement(){
  if (kb.presses("w")){
    if (jumpCount < 2) {
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
  if (kb.presses("shift")) {
    if (dash === 0) {
      time0 = millis();
      dash = 1;
      if (playerFacing === "right") {
        player.vel.x += 12;
      }
      if (playerFacing === "left") {
        player.vel.x -= 12;
      }
    }
  }
  if (player.collides(ground)){
    jumpCount = 0;
  }
  if (millis() - time0 > 1000) {
    dash = 0;
  }
}

time0 = millis();

function dashCooldown() {
  
}

