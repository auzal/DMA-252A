let mySound;
let reverb;
let filter;
let delay;
function preload() {
  
  mySound = loadSound('assets/elecciones.mp3');
}

function setup() {
  let cnv = createCanvas(400, 400);
  background(220);
  text('tap here to play', 10, 20);
  reverb = new p5.Reverb();
  mySound.disconnect(); // so we'll only hear reverb...
  // connect soundFile to reverb, process w/
  // 3 second reverbTime, decayRate of 2%
 // reverb.process(mySound, 3, 2);

  filter = new p5.BandPass();
  filter.res(50);
  //mySound.connect(filter);

  //filter.disconnect();

  //filter.connect(reverb);

  delay = new p5.Delay();

  // delay.process() accepts 4 parameters:
  // source, delayTime (in seconds), feedback, filter frequency
  delay.process(mySound, 0.08, .7, 2300);

  delay.disconnect();

  delay.setType(1);

   reverb.process(delay, 3, 2);

}

function draw() {
  background(220);
  let dryWet = constrain(map(mouseY, 0, height, 0, 1), 0, 1);
  // 1 = all reverb, 0 = no reverb
  reverb.drywet(dryWet);

  // set the BandPass frequency based on mouseX
  let freq = map(mouseX, 0, width, 20, 10000);
  freq = constrain(freq, 0, 22050);
  filter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  filter.res(50);

 
  text('Frequency: ' + round(freq)+'Hz', 20, 20, width - 20);

  
  text('tap to play', 10, 20);
  //text('dry/wet: ' + round(dryWet * 100) + '%', 10, height - 20);
}


function mousePressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  if(!mySound.isPlaying()){
    mySound.play();
  }else{
    mySound.pause();
  }
}



  

  
