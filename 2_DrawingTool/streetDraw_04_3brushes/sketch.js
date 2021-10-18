
// https://stackoverflow.com/questions/1109536/an-algorithm-for-inflating-deflating-offsetting-buffering-polygons
// http://fcacciola.50webs.com/Offseting%20Methods.htm
// https://stackoverflow.com/questions/41811554/processing-3-pvector-path-offset-inward-outward-polygon-offsetting


let roadWidth = 40;
let maxRoadWidth = 80;
let minRoadWidth = 20;
let maxAngularVariance = 90;
let backgroundTexture;
let temporaryTexture;
let brushIndex = 0;
let brushCount = 3;
let renderGuide = true;

let road;
let brushScaleFactors = [];

let backgroundColor;
let roadColor;
let lineColor;
let cursorColor;
let colorA;
let colorB;
let cursorColorA;
let cursorColorB;
let defaultColors = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTexture = createGraphics(width, height);
  temporaryTexture = createGraphics(width, height);

  setDefaultColors();

  brushScaleFactors.push(1);
  brushScaleFactors.push(2.6);
  brushScaleFactors.push(4.6);

}

function draw() {

  randomSeed(0);

  background(backgroundColor);
  if(road != null){
    temporaryTexture.clear();
    road.renderToBuffer(temporaryTexture);
  }

  image(backgroundTexture,0,0);
  image(temporaryTexture,0,0);

  if(renderGuide){
    push();
    stroke(cursorColor);
    noFill();
    strokeWeight(1);
    let diam = roadWidth * brushScaleFactors[brushIndex];
    ellipse(mouseX,mouseY, diam, diam);
    pop();
  }

}

function mousePressed(){
  renderGuide = false;
  road = new Road(brushIndex);
  road.attemptNewVertex();
}

function mouseDragged(){
  road.attemptNewVertex();
}

function mouseReleased(){
  road.renderToBuffer(backgroundTexture);
  road = null;
  temporaryTexture.clear();
}


function keyPressed(){

  if(!mouseIsPressed){
    
    if(key == 'b'){
      brushIndex ++;
      brushIndex = brushIndex % brushCount;
      print("CURRENT BRUSH: " + brushIndex);
      renderGuide = true;
    }else if(key == '1'){
      brushIndex = 0
      print("CURRENT BRUSH: " + brushIndex);
      renderGuide = true;
    }else if(key == '2'){
      brushIndex = 1
      print("CURRENT BRUSH: " + brushIndex);
      renderGuide = true;
    }else if(key == '3'){
      brushIndex = 2
      print("CURRENT BRUSH: " + brushIndex);
      renderGuide = true;
    }else if(keyCode === UP_ARROW){
      roadWidth += 5;
      renderGuide = true;
      roadWidth = constrain(roadWidth, minRoadWidth, maxRoadWidth);
      print("CURRENT WIDTH: " + roadWidth);
    }else if(keyCode === DOWN_ARROW){
      roadWidth += -5;
      roadWidth = constrain(roadWidth, minRoadWidth, maxRoadWidth);
      renderGuide = true;
      print("CURRENT WIDTH: " + roadWidth);
    }else if(keyCode === BACKSPACE){
      eraseDrawing();
    }else if(key === 'X' || key === 'x'){
      invertColors();  
    }
  }

}

function eraseDrawing(){
  backgroundTexture.clear();
  temporaryTexture.clear();
}

function setDefaultColors(){
  colorA = color('#181716');
  colorB = color('#f8f0e3');
  cursorColorA = color(255,255,200);
  cursorColorB = color('#ed87a4');

  defaultColors = true;
  backgroundColor = colorA;
  roadColor = colorA;
  lineColor = colorB;
  cursorColor = cursorColorA;
}

function invertColors(){
  if(defaultColors){
    backgroundColor = colorB;
    roadColor = colorB;
    lineColor = colorA;
    cursorColor = cursorColorB;
  }else{
    backgroundColor = colorA;
    roadColor = colorA;
    lineColor = colorB;
    cursorColor = cursorColorA;
  }
  defaultColors = !defaultColors;
  eraseDrawing();
}
