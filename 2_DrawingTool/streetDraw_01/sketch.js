
let roadWidth = 30;
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
  road.addVertex();
}

function mouseDragged(){
  road.addVertex();
}

function mouseReleased(){
  road.renderToBuffer(backgroundTexture);
  road = null;
  temporaryTexture.clear();
}


