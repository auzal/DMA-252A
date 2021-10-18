
// https://stackoverflow.com/questions/1109536/an-algorithm-for-inflating-deflating-offsetting-buffering-polygons
// http://fcacciola.50webs.com/Offseting%20Methods.htm
// https://stackoverflow.com/questions/41811554/processing-3-pvector-path-offset-inward-outward-polygon-offsetting


let roadWidth = 80;
let maxAngularVariance = 90;
let backgroundTexture;
let temporaryTexture;

let road;

function setup() {
  createCanvas(windowWidth, windowHeight);
  backgroundTexture = createGraphics(width, height);
  temporaryTexture = createGraphics(width, height);

}

function draw() {

  background(0);
  if(road != null){
    temporaryTexture.clear();
    road.renderToBuffer(temporaryTexture);
  }

  image(backgroundTexture,0,0);
  image(temporaryTexture,0,0);

}

function mousePressed(){
  road = new Road();
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


