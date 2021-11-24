let img;
let font;
let bgColor;
let stains = [];

let targetStainCount = 100;

let cnv;


let mic;
let audioStarted = false;
let history = [];
let historyDamp = [];
let historyLength = 400;
let currentAmp = 0;

// the shader variables
// we will have one shader that blurs horizontally, and one that blurs vertically
let blurH, blurV;

// we need two createGraphics layers for our blur algorithm
let pass1, pass2;


let blurAmount = 0;

function preload(){
  img = loadImage("assets/arielfabiana4.jpg");
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");
  blurH = loadShader('base.vert', 'blur.frag');
  blurV = loadShader('base.vert', 'blur.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  cnv = createGraphics(windowWidth, windowHeight);
  pass1 = createGraphics(windowWidth, windowHeight, WEBGL);
  pass2 = createGraphics(windowWidth, windowHeight, WEBGL);
    // turn off the cg layers stroke
    pass1.noStroke();
    pass2.noStroke();
  img.resize(0, height*.9);
  bg = color(0);
  cnv.background(bg);
  textFont(font);
  textSize(12); 
}

function draw() {

  if(audioStarted){
    micLevel = mic.getLevel();
    //console.log(micLevel);

    history.push(micLevel);
    let newValue = 0;
    if(history.length > 1){
      let f = 0.01;
      newValue = (f*micLevel) + ((1-f) * historyDamp[historyDamp.length-1]);  
    }

    historyDamp.push(newValue);

    currentAmp = newValue;

    if(history.length > historyLength){
      history.splice(0,1);
      historyDamp.splice(0,1);
    }
  }

 

  cnv.push();
  cnv.translate(width/2- img.width/2, height/2 - img.height/2);
  
  for (let i = 0; i < stains.length; i++) {
    
    stains[i].update();
    
    stains[i].render(cnv);
    
  
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

  cnv.pop();
  
  //let n = noise(frameCount*0.01) * .5;

  let ampThresh = 0.015;

  if(currentAmp > ampThresh){
    blurAmount = 0;
  }else{
    blurAmount = map(currentAmp, 0, ampThresh, 1, 0);
  }
  

  let texelVertical = map(blurAmount, 0, 1, 0, (1.0/height)*4);
  let texelHorizontal = map(blurAmount, 0, 1, 0, (1.0/width)*4);
    // set the shader for our first pass
    pass1.shader(blurH);

    // send the camera texture to the horizontal blur shader
    // send the size of the texels
    // send the blur direction that we want to use [1.0, 0.0] is horizontal
    blurH.setUniform('tex0', cnv);
    blurH.setUniform('texelSize', [texelHorizontal, texelVertical]);
    blurH.setUniform('direction', [1.0, 0.0]);
  
    // we need to make sure that we draw the rect inside of pass1
    pass1.rect(0,0,width, height);
    
    // set the shader for our second pass
    pass2.shader(blurV);
  
    // instead of sending the webcam, we will send our first pass to the vertical blur shader
    // texelSize remains the same as above
    // direction changes to [0.0, 1.0] to do a vertical pass
    blurV.setUniform('tex0', pass1);
    blurV.setUniform('texelSize', [texelHorizontal, texelVertical]);
    blurV.setUniform('direction', [0.0, 1.0]);
  
    // again, make sure we have some geometry to draw on in our 2nd pass
    pass2.rect(0,0,width, height);
  
    // draw the second pass to the screen
    image(pass2, 0,0, width, height);

 // shader(shade);

  // lets just send the cam to our shader as a uniform
 //shade.setUniform('tex0', cnv);

  // also send the size of 1 texel on the screen
  //shade.setUniform('texelSize', [1.0/width, 1.0/height]);

  // rect gives us some geometry on the screen
 // rect(0,0,width, height);

 // image(cnv, -width/2, - height/2);

  renderInfo();
}

function mouseReleased() {
  for (let i = 0; i < stains.length; i++) {
    stains[i].stop();
  }
  console.log(frameRate());
}

function mousePressed(){
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  audioStarted = true;
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
  if(audioStarted){
    //console.log("aaa");
    renderMic();
  }
}

function renderMic(){
  push();
  textFont(font);
  textSize(14);
  stroke(255,0,0);
  //ellipse(0,0,300,300);
  translate(historyLength*2, height-50);  
  stroke(255,40);
  line(0,0,-historyLength*2,0);
  stroke(255,0,0);
  push();
  translate(-history.length * 2, 0);
  for(let i = 0 ; i < history.length - 1 ; i++){
    

    let x = i*2;
    let y = - history[i] * height;

    let x2 = (i + 1) * 2;
    let y2 = - history[i+1] * height;
    line(x,y,x2,y2);
  }
  pop();

  push();
  stroke(255,255,0);
  translate(- historyDamp.length * 2, 0);
  for(let i = 0 ; i < historyDamp.length - 1 ; i++){
    

    let x = i*2;
    let y = - historyDamp[i] * height;

    let x2 = (i + 1) * 2;
    let y2 = - historyDamp[i+1] * height;
    line(x,y,x2,y2);
  }
  pop();
 
  fill(255);
  noStroke();
  let s = nfc(historyDamp[historyDamp.length-1],3);
  //console.log(s);
  text(s, 0, 0);

  pop();
}