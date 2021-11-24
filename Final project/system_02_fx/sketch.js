let img;
let font;
let bgColor;
let stains = [];
let stainTexture;
let blurShader;
let soundManager;


function preload(){
  img = loadImage("assets/arielfabiana4.jpg");
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");
  let blurHorizontalShader = loadShader('base.vert', 'blur.frag');
  let blurVerticalShader = loadShader('base.vert', 'blur.frag');
  let soundFile = loadSound('assets/elecciones.mp3');
  soundManager = new SoundManager(soundFile);
  blurShader = new Blur(blurHorizontalShader, blurVerticalShader);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stainTexture = createGraphics(width, height);
  bg = color(0);
  stainTexture.background(bg);
  img.resize(0, height*.9);
  blurShader.init();
  soundManager.init();
  textFont(font);
  textSize(12); 
}

function draw() {

  soundManager.update();

  handleStains();

  let currentAmp = soundManager.soundFileSignal.getValueDampened()
  if(currentAmp > CONFIG.blurAmplitudeThreshold){
    blurShader.setBlurAmount(0);
  }else{
    blurShader.setBlurAmount(map(currentAmp, 0, CONFIG.blurAmplitudeThreshold, 1, 0));
  }
  
  blurShader.apply(stainTexture);
  image(blurShader.texturePass2, 0,0, width, height);
  
  renderDebug();
}

function mouseReleased() {
}

function mousePressed(){
  soundManager.click();
}

function keyPressed() {
  if(key === 'D' || key === 'd'){
    CONFIG.renderDebug = ! CONFIG.renderDebug;
  }
}

