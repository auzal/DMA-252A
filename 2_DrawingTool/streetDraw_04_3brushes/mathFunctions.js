

function getOffsetPath( points,  offset) {

    if(points.length > 1){
  
      let new_lines = [];
  
      for (let i = 0; i < points.length -1; i++) {
        let start = points[i].copy();
        let end = points[i+1].copy();
  
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
  
        push();
        stroke(255,0,0);
       // circle(a.x, a.y, 5);
       // circle(b.x, b.y, 5);
        pop();
  
        let l = new Line(a, b);
  
        new_lines.push(l);
      }
      
      let offset_points = [];
  
      offset_points.push(new_lines[0].p1);
  
      for (let i = 0; i < new_lines.length -1; i++) {
       // new_lines[i].render();
        let a = new_lines[i];
        let b = new_lines[(i+1)];
        let p = getLineIntersection(a.p1, a.p2, b.p1, b.p2);
        let v = createVector(p.x, p.y);
        offset_points.push(v);
      }
  
      offset_points.push(new_lines[new_lines.length-1].p2);
  
      return offset_points;
    }
  }
  
  
  class Line {
    //----------------------------------
  
    constructor(  p1_,  p2_ ) {
      this.p1 = p1_;
      this.p2 = p2_;
    }
  
    //----------------------------------
  
    render(){
      stroke(255,0,0);
      line( this.p1.x, this.p1.y, this.p2.x, this.p2.y );
    }
  
    //----------------------------------
  }
  
  
  
  function getLineIntersection( p1, p2, p3, p4 ) {
    let aux = createVector(p2.x,p2.y); //new Punto();
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
        intersects = true;
      }
    } 
    else {
      if ( b == 0 && d != 0 ) {
        x = p1.x;
        y = map( x, p3.x, p4.x, p3.y, p4.y );
        intersects = true;
      } 
      else if ( b != 0 && d == 0 ) {
        x = p3.x;
        y = map( x, p1.x, p2.x, p1.y, p2.y );
        intersects = true;
      }
    }
  
    if ( intersects ) {
      aux = createVector(x, y);
    }
    return aux;
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