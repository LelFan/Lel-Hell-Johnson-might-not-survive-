// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gameState = "menuSetup";
let plays;
let controls;


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  menuSetup();
  gamePlaySetup();

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
  if (play.collider === "s"){
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
  let player, floor;
  player = new Sprite(width/4,height*0.8,50,"d"); //will change to an actual player later
  floor = new Sprite(width/2,height*0.9,width,100, "d");
}

function gamePlayToggle() {

}

function gamePlay() {
  
}
// create a gameplay set up state