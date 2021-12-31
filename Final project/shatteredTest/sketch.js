let shapeData;
let shapes = [];
let img;

function preload(){
  shapeData = loadStrings("assets/shattered.badshape");
  img = loadImage("assets/arielfabiana9.jpg");
  font = loadFont("assets/SourceCodePro-LightItalic.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  parseShapes(shapeData);
  console.log("LOADED " + shapes.length + " SHAPES");
  img.resize(0,height *.7);
  console.log(img.width);
  console.log(img.height);
  resizeShapes(img.width, img.height);
  processShapes();
  textFont(font);
  textSize(12);
}

function draw() {
  push();
  background(0);
 // translate(width/2, height/2);
  imageMode(CENTER);
 // image(img,0,0);
  //translate(-img.width/2, - img.height/2);
  noFill();
  stroke(255,128,0);
 // ellipse(0,0,40,40);
  noStroke();
  for(let i = 0 ; i < shapes.length ; i ++){
    shapes[i].render(1);
    
  }
  for(let i = 0 ; i < shapes.length ; i ++){
  //  shapes[i].renderDebug(4);
    
  }

 // let index = int(map(mouseX,0,width,0,shapes.length));
//  shapes[index].render(4);
 //shapes[index].renderDebug(1);
  pop();
  renderDebugInfo();


  texture(img);
  beginShape();
  vertex(0,0,0,0);
  vertex(100,0,img.width,0);
  vertex(100,100,img.width,img.height);
  vertex(0,100,0,img.height);

  endShape();

}

function parseShapes(data){
  let points = [];
  let fill = "";
  for(let i = 0 ; i < data.length ; i++){
    if(data[i] === "---"){
      if(points.length > 0){
        createShape(fill, points);
      }
      points = [];
      i++;
      fill = '#'+data[i];
     // console.log(fill);
    }else if(data[i].includes(',')){
      let coords = data[i].split(',');
      let x = parseFloat(coords[0]);
      let y = parseFloat(coords[1]);
      points.push(createVector(x,y));
    }
  }
  if(points.length > 0){
    createShape(fill, points);
  }
}

function createShape(fill, points){
  shapes.push(new Shape(fill, points));
}

function renderDebugInfo(){
  push();
  let w = 150;
  let h = 30;
  translate(width-w,height-h-20);
  fill(0);
  rect(0,0,w,h);
  fill(255);
  text("SHAPE COUNT: " + shapes.length, 5, 13);
  text("FPS:         " + int(frameRate()), 5, 23);
  pop();
}

function resizeShapes(w, h){
  let west = shapes[0].vertices[0].x;
  let east = shapes[0].vertices[0].x;
  let north = shapes[0].vertices[0].y;
  let south = shapes[0].vertices[0].y;

  console.log("a");

  for(let i = 0 ; i < shapes.length ; i++){
    let shape = shapes[i];
    let vertices = shape.vertices;
    for(let j = 0 ; j < vertices.length ; j++){
      if(vertices[j].x < west){
        west = vertices[j].x;
      }else if(vertices[j].x > east){
        east = vertices[j].x;
      }

      if(vertices[j].y < north){
        north = vertices[j].y;
      }else if(vertices[j].y > south){
        south = vertices[j].y;
      }
    }
  }

  let svgWidth = east - west;
  let svgHeight = south - north;
  
  for(let i = 0 ; i < shapes.length ; i++){
    let shape = shapes[i];
    let vertices = shape.vertices;
    for(let j = 0 ; j < vertices.length ; j++){
      let x = map(vertices[j].x, west, east, 0, w);
      let y = map(vertices[j].y, north, south, 0, h);
      vertices[j].x = x - img.width/2;
      vertices[j].y = y - img.width/2;
      console.log(x);
    }
  }

}

function processShapes(){
  for(let i = 0 ; i < shapes.length ; i++){
    shapes[i].process();
  }
}