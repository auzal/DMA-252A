
let points = [];

let currAngle;
let prevAngle;
let minDistance = 20;
let maxAngularVariance = 90;
let angularDistance;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  noFill();

 // draw Current Line

  beginShape();
  stroke(0,60);
  for(let i = 0 ; i < points.length ; i++){
    vertex(points[i].x, points[i].y);
    ellipse(points[i].x, points[i].y,3,3);
  }
  endShape();

  // calculate Last Angle

  if(points.length > 1){
    prevAngle = atan2(points[points.length-1].y - points[points.length-2].y, points[points.length-1].x - points[points.length-2].x);
    push();
    translate(points[points.length-1].x, points[points.length-1].y);
    rotate(prevAngle);
    stroke(255,0,0,150);
    strokeWeight(4);
    line(0,0,20,0);
    strokeWeight(1);
    stroke(255,255,0);
    push();
    rotate(radians(maxAngularVariance));
    fill(255,255,0,90);
    noStroke();
    arc(0,0,minDistance*2,minDistance*2,0,radians(360-(maxAngularVariance*2)));
    stroke(255,255,0);
    line(0,0,minDistance*2,0);
    pop();
    push();
    rotate(radians(-maxAngularVariance));
    line(0,0,minDistance*2,0);
    pop();

    pop();
  

   // calculate Current Angle

    currAngle = atan2(mouseY - points[points.length-1].y, mouseX - points[points.length-1].x);
    push();
    translate(points[points.length-1].x, points[points.length-1].y);
    rotate(currAngle);
    stroke(0,255,0,150);
    strokeWeight(4);
    line(0,0,20,0);
    stroke(255,255,0);
    strokeWeight(1);
    ellipse(0,0,minDistance*2,minDistance*2);
    pop();

    angularDistance = abs(menorDistAngulos(prevAngle, currAngle));


  

    fill(0);
    push();
    translate(20,20);
    text("PREV ANGLE:",0,0);
    text("CURR ANGLE:",0,25);
    text("ANGULAR DIST:",0,50);
    pop();
    push();
    translate(120,20);
    text(int(degrees(prevAngle)),0,0);
    text(int(degrees(currAngle)),0,25);
    text(int(degrees(angularDistance)),0,50);
    pop();
}

}

function mouseDragged(){
  if(points.length === 0 || dist(mouseX,mouseY,points[points.length-1].x, points[points.length-1].y)  >  minDistance){
    if(points.length > 1){
      if(degrees(angularDistance) < maxAngularVariance){
        points.push(createVector(mouseX,mouseY));
      }
    }else{
      points.push(createVector(mouseX,mouseY));
    }

  }
   
}


function menorDistAngulos(  origen,  destino ) {
  let distancia = destino - origen;
  return anguloRangoPI( distancia );
}


function anguloRangoPI(  angulo ) {
  let este = angulo;
  for ( let i=0; i<100; i++ ) {
    if ( este > PI ) {
      este -= TWO_PI;
    } 
    else if ( este <= -PI ) {
      este += TWO_PI;
    }
    if ( este >= -PI && este <= PI ) {
      break;
    }
  }
  return este;
}