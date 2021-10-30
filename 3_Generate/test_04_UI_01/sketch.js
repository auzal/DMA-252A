let cam;
let canvas;
let font;
let house;
let smokeOrigin;
let smoke  = [];

let colorA;
let colorB;
let strokeColor;
let fillColor;
let night = false;

// ----- UI -----------

let randomizeButton;
let nightButton;
let countSpan;
let widthSlider;
let heightSlider;
let depthSlider;
let windowSlider;
let roofSlider;

// --------------------

function preload(){
  font = loadFont("assets/ZenKurenaido-Regular.ttf");
}

function setup() {
  canvas = createCanvas(windowWidth - 250 , windowHeight, WEBGL);
  cam = createEasyCam();
  rectMode(CENTER);
  house = new House();
  colorA = color('#181716');
  colorB = color('#f8f0e3');
  loadColors();
  smokeOrigin = house.getChimneyPosition();
  smoke.push(new Smoke(smokeOrigin));

  // ----- UI -----------


  randomizeButton = document.getElementById('randomize-button');
  randomizeButton.onclick = randomizeHouse;

  nightButton = document.getElementById('night-button');
  nightButton.onclick = switchNight;

  countSpan = document.getElementById('count-display');

  widthSlider = document.getElementById('width-slider');
  heightSlider = document.getElementById('height-slider');
  depthSlider = document.getElementById('depth-slider');
  windowSlider = document.getElementById('window-slider');
  roofSlider = document.getElementById('roof-slider');

  // --------------------

   
}

function draw() {
  
  background(fillColor);
  fill(fillColor);
  stroke(strokeColor);
 // renderAxis();
  house.update();
  house.render(night);
  handleSmoke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  easycam.setViewport([0,0,windowWidth, windowHeight]);
}


function randomizeHouse(){
  house.randomize();
  smokeOrigin = house.getChimneyPosition();
  widthSlider.value = house.height;
  heightSlider.value = house.depth;
  depthSlider.value = house.width;
  windowSlider.value = house.windowCoverage*100;
  roofSlider.value = house.roofAngle;

}

function keyPressed(){
  if(key === ' '){
    randomizeHouse();
  }else if(key === 'x' || key == 'X'){
    switchNight();
  }
}

function switchNight(){
  night = !night;
  if(night){
    nightButton.innerText  = "day";
  }else{
    
      nightButton.innerText  = "night";
   
  }
  loadColors();
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

function handleSmoke(){
  smokeOrigin = house.getChimneyPosition();
  renderSmoke();
  if(frameCount % 5 === 0){
    smoke.push(new Smoke(smokeOrigin));
    // console.log(smoke.length);
  }

}

function renderSmoke(){
  push();
  noStroke();
  for(let i = smoke.length - 1  ; i >= 0 ; i --){
    smoke[i].update();
    smoke[i].render();
    if(smoke[i].remove){
      smoke.splice(i,1);
    }
  }
  pop();
}

function loadColors(){
  if(night){
    fillColor = colorA;
    strokeColor = colorB;
  }else{
    fillColor = colorB;
    strokeColor = colorA;
  }
}