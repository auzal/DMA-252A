
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
let brushCount = 1;
let renderGuide = true;

let road;
let brushScaleFactors = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTexture = createGraphics(width, height);
  temporaryTexture = createGraphics(width, height);

  brushScaleFactors.push(1);
  brushScaleFactors.push(2.6);
  brushScaleFactors.push(4.6);

}

function draw() {

  randomSeed(0);

  background('#181716');
  if(road != null){
    temporaryTexture.clear();
    road.renderToBuffer(temporaryTexture);
  }

  image(backgroundTexture,0,0);
  image(temporaryTexture,0,0);

  if(renderGuide){
    push();
    stroke(255,255,200);
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
    }
    else if(keyCode === BACKSPACE){
      backgroundTexture.clear();
      temporaryTexture.clear();
    }
  }

}
