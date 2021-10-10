

// https://www.moma.org/media/W1siZiIsIjk3MTgyIl0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDkwIC1yZXNpemUgMjAwMHgyMDAwXHUwMDNlIl1d.jpg?sha=805bfbec4f79a3ca


let gridWidth;
let gridHeight;
let verticalLines;
let horizontalLines;
let dotDistance;

function setup() {
  let canvasSize = windowHeight * .9;
  if(windowWidth < windowHeight){
    canvasSize = windowWidth *.9;
  }

  let cnv = createCanvas(canvasSize, canvasSize);
  let canvasX = (windowWidth - width) / 2;
  let canvasY = (windowHeight - height) / 2;
  cnv.position(canvasX, canvasY);
  
  background(235, 227, 207);

  gridWidth = width*.5;
  gridHeight = height *.65
  verticalLines = 27;
  horizontalLines = verticalLines * 6;
  dotDistance =  width*.0225;

  
  strokeWeight(0.5);

}

function draw() {
  background(235, 227, 207);
  rectMode(CENTER);
  noFill();
  
  translate(width/2, height/2);


  let minAlpha = 100;
  let maxAlpha = 200;

 // vertical lines and dots

  for(let i = 0 ; i <= verticalLines ; i++){
    let x = map(i, 0, verticalLines, -gridWidth/2, gridWidth/2) + random(-2,2);
    stroke(110,100,88, random(minAlpha,maxAlpha));
    line(x, -gridHeight/2 - random(dotDistance*.2, dotDistance*.8), x, gridHeight/2 + random(dotDistance*.2, dotDistance*.8));
    createPoint(x, -gridHeight/2 - dotDistance);
    createPoint(x, +gridHeight/2 + dotDistance);
  }

   // vertical lines and dots

   let noiseScale = 0.04;

  let offset = gridWidth * .09;
  for(let i = 0 ; i <= horizontalLines ; i++){
    stroke(110,100,88, random(minAlpha,maxAlpha));
    let y = map(i, 0, horizontalLines, -gridHeight/2, gridHeight/2) + random(-1,1);
    line(-gridWidth/2 - offset -noise((y+height) * noiseScale) * offset , y,  gridWidth/2 + offset + noise((y+(height*2))  * noiseScale) * offset , y);
    
  }

  noLoop();

  
}

function createPoint(x, y){
  push();
  translate(x,y);
  let lineLength = random(dotDistance * .02, dotDistance * .1);
  rotate(random(TWO_PI));
  line(0,0,lineLength,0);
  pop();
}

function keyPressed(){
  noiseSeed(random(500));
  loop();
}
