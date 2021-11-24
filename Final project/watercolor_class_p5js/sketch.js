let img;
let font;
let bgColor;
let stains = [];

let targetStainCount = 100;

function preload(){
  img = loadImage("assets/arielfabiana4.jpg");
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  img.resize(0, height*.9);
  bg = color(0);
  background(bg);
  textFont(font);
  textSize(12); 
}

function draw() {
  
  if(frameCount % 60 === 0){
  //  background(0,20);
  }
  push();
  translate(width/2 - img.width/2, height/2 - img.height/2);

  for (let i = 0; i < stains.length; i++) {
    stains[i].update();
    stains[i].render();
  }

  if(stains.length < targetStainCount){
    let difference = targetStainCount - stains.length;
    for (let i = 0; i < difference; i++) {
        let aux = new Stain(random(img.width), random(img.height));
          stains.push(aux);
        }
  }

  // if (frameCount % int(random(5, 15)) ==0) {
  //   for (let i = 0; i < 5; i++) {
  //     let aux = new Stain(random(width), random(height));
  //     stains.push(aux);
  //   }
  // }

  for(let i = stains.length-1 ; i > 0 ; i--){

    if(!stains[i].growing){
      stains.splice(i,1);
    }
  }

  pop();

  renderInfo();
}

function mouseReleased() {
  for (let i = 0; i < stains.length; i++) {
    stains[i].stop();
  }
}

function keyPressed() {
  stains = [];
  background(bg);
}

function renderInfo(){
  push();
  let w = 150;
  let h = 30;
  translate(width-w,height-h);
  fill(0);
  rect(0,0,w,h);
  fill(255);
  text("STAIN COUNT: " + stains.length, 5, 13);
  text("FPS:         " + int(frameRate()), 5, 23);
  
  pop();
}