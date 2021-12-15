let shapeData;
let shapes = [];


function preload(){
  shapeData = loadStrings("assets/arielfabiana.badshape");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  parseShapes(shapeData);
  console.log("LOADED " + shapes.length + " SHAPES");
}

function draw() {
  push();
  background(0);
  //translate(width/2, height/2);
  noFill();
  stroke(255,128,0);
 // ellipse(0,0,40,40);
  noStroke();
  //rotateY(frameCount * 0.01);
  for(let i = 0 ; i < shapes.length ; i ++){
    shapes[i].update();
    shapes[i].render(4);
    
  }
  for(let i = 0 ; i < shapes.length ; i ++){
  //  shapes[i].renderDebug(4);
    
  }

  let index = int(map(mouseX,0,width,0,shapes.length));
//  shapes[index].render(4);
// shapes[index].renderDebug(4);
  pop();
  renderDebugInfo();
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

  for(let i = 0 ; i < shapes.length ; i ++){
    let z = map(i,0,shapes.length,0.0,5.0);
   // console.log(z);
    shapes[i].z = z;
   // shapes[i].process();
   // shapes[i].setDeltas();

    
  }

}

function createShape(fill, points){
  shapes.push(new Shape(fill, points));
}

function renderDebugInfo(){
  push();
  let w = 150;
  let h = 30;
  translate(width/2-w,height/2-h-20);
  fill(0);
  rect(0,0,w,h);
  fill(255);
  //text("SHAPE COUNT: " + shapes.length, 5, 13);
 // text("FPS:         " + int(frameRate()), 5, 23);
  pop();
}