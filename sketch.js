// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let gameState = "menu";



function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}

function draw() {
  background(255);
  if (gameState === "menu") {
    menu();
  } 
}

function menu() {
  let pause, controls;
  menuText();
  pause = new Sprite();
}

function menuText() {
  textSize(40);
  text("Johnson's Final Stand",width/2,height*0.25);
  text("Play",width/2,height/2);
  text("Controls",width/2,height*0.7);
}