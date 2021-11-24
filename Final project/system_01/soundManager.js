class SoundManager{
    constructor(file){
        this.soundFile = file;
        this.amplitude;
        this.mic;
        this.micStarted = false;
        this.soundFileSignal;
        this.micSignal;
    }

    init(){
        this.amplitude = new p5.Amplitude();
        this.soundFileSignal = new SignalAnalyzer(300, 100, "SOUND FILE");
        this.micSignal = new SignalAnalyzer(300, 100, "MIC");
    }

    update(){
        if(this.micStarted){
            this.micSignal.update(this.mic.getLevel());    
        }
        if(this.soundFile.isPlaying()){
            this.soundFileSignal.update(this.amplitude.getLevel());
        }
    }

    startFilePlayback(){
        if(!this.soundFile.isPlaying()){
            this.soundFile.play();
            this.soundFile.setLoop(true);
            this.amplitude = new p5.Amplitude();
            this.amplitude.setInput(this.soundFile);
        }
    }

    startMic(){        
        if(!this.micStarted){
            userStartAudio();
            this.mic = new p5.AudioIn();
            this.mic.start();
            this.mic.amp(3.0);
            this.micStarted = true;
        }
    }

    renderSignals(){
        this.soundFileSignal.render(20, height-120);
        this.micSignal.render(20,height-230);
    }

    click(){
        if(!this.soundFile.isPlaying()){     
            this.startFilePlayback();
        }else{
            this.soundFile.pause();
        }
        this.startMic();
    }
}