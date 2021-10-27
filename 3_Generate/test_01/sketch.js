let cam;
let canvas;
let font;

let house;

function preload(){
  font = loadFont("assets/ZenKurenaido-Regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createEasyCam();
  rectMode(CENTER);
  house = new House();
}

function draw() {
  background(255);
  renderAxis();
  house.render();
 // rect(0,0,200,200);
 // rect(0,0,50,50);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}

function keyPressed(){
  if(key === ' '){
    house.randomize();
  }
}

function renderAxis(){
  push();
  translate(0,0,1);
  textFont(font);
  textSize(10);
  let l = 80;
  strokeWeight(2);
  stroke(255,0,0);
  line(0,0,0,l,0,0);
  stroke(0,255,0);
  line(0,0,0,0,l,0);
  stroke(0,0,255);
  line(0,0,0,0,0,l);
  fill(0);
  push();
  translate(l,0,0);
  text("X",0,0);
  pop();
  push();
  translate(0,l,0);
  text("y",0,0);
  pop();
  push();
  translate(0,0,l);
  text("z",0,0);
  pop();
  pop();
}