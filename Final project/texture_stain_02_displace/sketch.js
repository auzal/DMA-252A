
let stains = [];
let img;
let g;
let font;


function preload(){
  img = loadImage('assets/arielfabiana7.jpg');
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");

}

function setup() {
 // imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  g = createGraphics(width, height, WEBGL);
  img.resize(height*.9,0);
  for(let i = 0 ; i < 150 ; i++){
    addStain();
  }
  background(0);
  setAttributes('alpha', false);
  textFont(font);
  textSize(12);
}

function draw() {
  background(0,0,0);
  g.clear();
 g.reset();
  //g.background(255,0,0)

  // push();
  // translate(-width/2, -height/2);
  // noStroke();
  // fill(0,10);
  // rect(0,0,width,height);
  // pop();
  push();
  g.translate(- img.width/2,- img.height/2);
  //image(img,0,0);
  for(let i = 0 ; i < stains.length ; i++){
    stains[i].render(g);
    stains[i].update(map(mouseX,0,width,0,1));
  }

  for(let i = stains.length-1 ; i >= 0 ; i--){
    if(!stains[i].growing){
      //  stains.splice(i,1);
    }
}

 // image(g,0,0);
  // texture(img);
  // textureMode(IMAGE);
  // let x = img.width/2;
  // let y = img.height/2;
  // let radius = 200;
  // let detail = 100;
  // let distort = 20;
  // ellipse(x,y,60,60);
  // beginShape();
  // for(let i = 0 ; i < detail ; i ++){
  //   let ang = map(i,0,detail,0,TWO_PI);
  //   let xv = x+cos(ang) * radius;
  //   let yv =  y+sin(ang) * radius;
  //   vertex( xv + random(-distort,distort), yv + random(-distort,distort), xv, yv);

  // }
  // // vertex(-50, -50, 0, 0);
  // // vertex(50, -50, img.width, 0);
  // // vertex(50, 50, img.width, img.height);
  // // vertex(mouseX, mouseY, 0, img.height);
  // endShape();
  
  pop();
  image(g,0,0);
  renderStainInfo();
}


function mousePressed(){
  for(let i = 0 ; i < 10 ; i++){
    addStain();
  }
}

function addStain(){
  let aux = new Stain(random(img.width), random(img.height), 1);
  stains.push(aux);
}

function renderStainInfo(){
//  fill(255,0,0);
//  ellipse(0,0,100,100);
  push();
  let w = 150;
  let h = 30;
  translate(width/2-w, height/2-h-20);
  fill(0);
  rect(0,0,w,h);
  fill(255);
  text("STAIN COUNT: " + stains.length, 5, 13);
  text("FPS:         " + int(frameRate()), 5, 23);
  pop();
}