let img;
let font;
let bgColor;
let stains = [];
let stainTexture;
let blurShader;
let soundManager;
let timeline;


function preload(){
  img = loadImage("assets/arielfabiana7.jpg");
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");
  let blurHorizontalShader = loadShader('base.vert', 'blur.frag');
  let blurVerticalShader = loadShader('base.vert', 'blur.frag');
  let soundFile = loadSound('assets/ariel_intro.mp3');
  soundManager = new SoundManager(soundFile);
  blurShader = new Blur(blurHorizontalShader, blurVerticalShader);
  let timecodes = loadStrings('assets/timecodes.txt');
  let subs = loadStrings('assets/ariel_intro.srt');
  timeline = new Timeline(timecodes, subs);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  stainTexture = createGraphics(width, height);
  bg = color(0);
  stainTexture.background(bg);
  img.resize(0, height);
  blurShader.init();
  soundManager.init();
  timeline.init(soundManager.soundFile.duration());
  textFont(font);
  textSize(12); 
}

function draw() {
  timeline.update(soundManager.currentTime());
  soundManager.update(timeline.currentValue);

  handleStains(timeline.currentValue);

  let currentAmp = soundManager.soundFileSignal.getValueDampened()
  if(currentAmp > CONFIG.blurAmplitudeThreshold){
    blurShader.setBlurAmount(0);
  }else{
    blurShader.setBlurAmount(map(currentAmp, 0, CONFIG.blurAmplitudeThreshold, 1, 0));
  }
  
  blurShader.apply(stainTexture);
  image(blurShader.texturePass2, 0,0, width, height);
  
  renderDebug();
  if(CONFIG.renderSubtitles){
    timeline.renderSubs();
  }
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

