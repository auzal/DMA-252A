let cnv;

function setup() {
  createCanvas(400, 400);
  cnv = createGraphics(400, 400);
}

function draw() {
  background(255,0,0);
  textSize(50);
  fill(255,255,0);
  cnv.clear(); // 
  cnv.background(0,255,0);
  cnv.push();
  cnv.noFill();
  cnv.stroke(0);
  cnv.translate(0,0,200);
 // cnv.rotateZ(frameCount * 0.001);
 // cnv.rotateX(frameCount * 0.005);
  cnv.rotate(frameCount * 0.001);
  cnv.rect(0,0,50,50);
  cnv.pop();
 // text("HELLO", 70, 300);
  image(cnv, 0, 0);
 // text("HELLO", 20, 250);

}
