let mic;
let started = false;

let history = [];
let historyDamp = [];

let font;

function preload(){
  font = loadFont("assets/SourceCodePro-BoldItalic.ttf");
}


function setup(){
  let cnv = createCanvas(800, 400);
  //cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  textFont(font);
  textSize(14);
}

function draw(){
  background(0);
  fill(255);
  

  if(started){
    micLevel = mic.getLevel();
    //console.log(micLevel);

    history.push(micLevel);
    let newValue = 0;
    if(history.length > 1){
      let f = 0.5;
      newValue = (f*micLevel) + ((1-f) * historyDamp[historyDamp.length-1]);  
    }

    historyDamp.push(newValue);

    if(history.length > width/2){
      history.splice(0,1);
      historyDamp.splice(0,1);
    }

    push();
    
    translate(width, height-50);  
    stroke(255,40);
    line(0,0,-width,0);
    stroke(255,0,0);
    push();
    translate(- history.length * 2, 0);
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
    pop();

    let s = nfc(historyDamp[historyDamp.length-1],3);
    text(s, width-200, height-100);



  }else{
    text('tap to start', width/2, 20);
  }
}

function mousePressed() {
  userStartAudio();
  mic = new p5.AudioIn();
  mic.start();
  started = true;
}