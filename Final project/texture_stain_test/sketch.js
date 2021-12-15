
let stains = [];
let img;

function preload(){
  img = loadImage('assets/arielfabiana7.jpg');
}

function setup() {
 // imageMode(CENTER);
  createCanvas(windowWidth, windowHeight, WEBGL);
  img.resize(height*.9,0);
  let aux = new Stain(random(img.width/2), random(img.height), 1);
  stains.push(aux);
  background(0);
}

function draw() {
  //background(0,0,0);

  // push();
  // translate(-width/2, -height/2);
  // noStroke();
  // fill(0,10);
  // rect(0,0,width,height);
  // pop();

  translate(- img.width/2,- img.height/2);
  //image(img,0,0);
  for(let i = 0 ; i < stains.length ; i++){
    stains[i].render();
    stains[i].update();
  }

  for(let i = stains.length-1 ; i >= 0 ; i--){
    if(!stains[i].growing){
        stains.splice(i,1);
    }
}


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
}


function mousePressed(){
  for(let i = 0 ; i < 10 ; i++){
    let aux = new Stain(random(img.width), random(img.height), 1);
    stains.push(aux);
  }
}