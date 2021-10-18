let vertices =[];

function setup() {
  createCanvas(800, 800);

  vertices.push(createVector(300, 250));
  vertices.push(createVector(600, 300));
  vertices.push(createVector(380, 550));
}

function draw() {
  background(220);


  background(0);

  let offset = map(mouseX,0,width,-50,50);

  let offset_points = getOffsetPath(vertices, offset);

  fill(255, 0, 0, 90);
  noStroke();
  beginShape();
  for (let i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape();

  fill(255, 255, 0, 90);
  noStroke();
  beginShape();
  for (let i = 0; i < offset_points.length; i++) {
    vertex(offset_points[i].x, offset_points[i].y);
  }
  endShape();
}



function getOffsetPath( points,  offset) {

  let new_lines = [];

  for (let i = 0; i < points.length; i++) {
    let start = points[i].copy();
    let end = points[(i+1)%points.length].copy();

    let ang = atan2(start.y - end.y, start.x - end.x);
    ang += HALF_PI;
    let dx = cos(ang) * offset;
    let dy = sin(ang) * offset;
    start.x += dx;
    start.y += dy;
    end.x += dx;
    end.y += dy;
    let a = createVector(start.x, start.y);
    let b = createVector(end.x, end.y);

    let l = new Linea(a, b);

    new_lines.push(l);
  }
  
  let offset_points = [];

  for (let i = 0; i < new_lines.length; i++) {
    let a = new_lines[i];
    let b = new_lines[(i+1)%new_lines.length];
    let p = getLineIntersection(a.p1, a.p2, b.p1, b.p2);
    let v = createVector(p.x, p.y);
    offset_points.push(v);
  }

  return offset_points;
}


class Linea {

  

  //----------------------------------

  constructor(  p1_,  p2_ ) {
    this.p1 = p1_;
    this.p2 = p2_;
  }
  //----------------------------------

  render(){
    line( p1.x, p1.y, p2.x, p2.y );
  }
  
  //----------------------------------
}



function getLineIntersection( p1, p2, p3, p4 ) {
  let aux = null; //new Punto();
  let intersects = false;

  let x = 0;
  let y = 0;

  let a = p2.y - p1.y;
  let b = p2.x - p1.x;
  let c = p4.y - p3.y;
  let d = p4.x - p3.x;

  if ( b != 0 && d != 0 ) {

    let ab = a/b;
    let cd = c/d;

    let e = p3.y - p1.y + p1.x*ab - p3.x*cd;

    let p = ab-cd;

    if ( p != 0) {
      x = e / p;
      y = map( x, p1.x, p2.x, p1.y, p2.y );
      existe = true;
    }
  } 
  else {
    if ( b == 0 && d != 0 ) {
      x = p1.x;
      y = map( x, p3.x, p4.x, p3.y, p4.y );
      existe = true;
    } 
    else if ( b != 0 && d == 0 ) {
      x = p3.x;
      y = map( x, p1.x, p2.x, p1.y, p2.y );
      existe = true;
    }
  }

  if ( existe ) {
    aux = createVector(x, y);
  }
  return aux;
}