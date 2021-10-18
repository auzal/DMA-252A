
/*
First exercise for DMA252A, recreating an untitled work by Agnes Martin (1960)

[https://www.moma.org/media/W1siZiIsIjk3MTgyIl0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDkwIC1yZXNpemUgMjAwMHgyMDAwXHUwMDNlIl1d.jpg?sha=805bfbec4f79a3ca](https://www.moma.org/media/W1siZiIsIjk3MTgyIl0sWyJwIiwiY29udmVydCIsIi1xdWFsaXR5IDkwIC1yZXNpemUgMjAwMHgyMDAwXHUwMDNlIl1d.jpg?sha=805bfbec4f79a3ca)

I'm  separating the code into two for loops:

  - one for drawing the vertical lines and the dots
  - one for drawing all horizontal lines

I've taken some proportions from the original work and I recreated them within this code. It should produce a proportional drawing despite of window dimensions. 

The horizontal lines respond to a noise function in order to determine their start and end points, with a random variation added to the noise value. The number of horizontal lines is calculated as a proportional value to the number of vertical lines. 

Every time a key is pressed, a new variation is drawn.
*/

let gridWidth;
let gridHeight;
let verticalLines;
let horizontalLines;
let dotDistance;

function setup() {

  // calculate the canvas size

  let canvasSize = windowHeight * .9;
  if(windowWidth < windowHeight){
    canvasSize = windowWidth * .9;
  }

  // center canvas in document

  let cnv = createCanvas(canvasSize, canvasSize);
  let canvasX = (windowWidth - width) / 2;
  let canvasY = (windowHeight - height) / 2;
  cnv.position(canvasX, canvasY);
  
  background(235, 227, 207);

  // set up some variables to determine proportions

  gridWidth = width * .5;
  gridHeight = height * .65
  verticalLines = 27;
  horizontalLines = verticalLines * 10;
  dotDistance =  width * .0225;

  strokeWeight(0.5);

}

function draw() {

  background(235, 227, 207);

  // move to the center of the canvas 
  translate(width/2, height/2);

  // variables for line opacity control
  let minAlpha = 100;
  let maxAlpha = 200;

  // vertical lines and dots

  for(let i = 0 ; i <= verticalLines ; i++){

    let x = map(i, 0, verticalLines, -gridWidth/2, gridWidth/2) + random(-2,2);
    stroke(110,100,88, random(minAlpha,maxAlpha));
    let yStart =  -gridHeight/2 - random(dotDistance*.2, dotDistance*.8);
    let yEnd = gridHeight/2 + random(dotDistance*.2, dotDistance*.8);
    line(x, yStart, x, yEnd);
    createPoint(x, -gridHeight/2 - dotDistance);
    createPoint(x, +gridHeight/2 + dotDistance);

  }

  // horizontal lines
  let noiseScale = 0.04;

  let offset = gridWidth * .11;
  for(let i = 0 ; i <= horizontalLines ; i++){

    stroke(110,100,88, random(minAlpha,maxAlpha));
    let y = map(i, 0, horizontalLines, -gridHeight/2, gridHeight/2) + random(-1,1);
    // start point in x
    let xStart = -gridWidth/2 - offset;
    xStart -= noise((y+height) * noiseScale) * offset * 1.2;
   // xStart += random(-offset * .05, offset * .05);
    // end point in x
    let xEnd = gridWidth/2 + offset;
    xEnd += noise((y+(height*2))  * noiseScale) * offset * 1.2;
   // xEnd += random(-offset * .05, offset * .05);

    line( xStart, y,  xEnd , y);
    
  }

  // draw everything once, then stop looping

  noLoop();
  
}

// function for creating the points at the ends of vertical lines
// which aren't really points, but small rotated lines

function createPoint(x, y){
  push();
  translate(x,y);
  let lineLength = random(dotDistance * .02, dotDistance * .1);
  rotate(random(TWO_PI));
  line(0,0,lineLength,0);
  pop();
}

// every time a key is pressed, set a new random seed for noise()
// turn loop on, which gets turned off at the end of draw()

function keyPressed(){
  noiseSeed(random(500));
  loop();
}
