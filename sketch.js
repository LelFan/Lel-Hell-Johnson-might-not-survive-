// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gameState = "menu";
let plays, controls;



function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}

function draw() {
  background(255);
  if (gameState === "menu") {
    menu();
  }
  if (gameState ==="play") {
    play();
  } 
}

function menu() {
  textSize(40);
  text("Johnson's Final Stand",width/2,height*0.25);
  plays = new Sprite(width/2,height/2,200,100,"s");
  plays.color = "white";
  plays.text = "Play";
  if (plays.mouse.hovering()) {
    plays.color = "black";
    console.log("what");
  }

  controls = new Sprite(width/2,height*0.7,200,100,"s");
  controls.color = "white";
  controls.text = "Controls";
  if (controls.mouse.presses()){
    gameState = "controls";
  }
}

function play() {
  let player;
  player = new Sprite(width/4,height*0.8,50,"d"); //will change to an actual player later
}
// create a menu set up state