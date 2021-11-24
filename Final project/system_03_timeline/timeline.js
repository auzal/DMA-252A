class Timeline{

    constructor(file){
        this.timeCodes = [];
        this.keyFrames = [];
        this.data = file;
        this.duration;
        this.position = 0;
        this.currentValue = 0;
        this.width;
        this.height;
        this.margin = 20;
        this.transitionTime = CONFIG.timelineTransitionTime;
        this.textSize = 14;
        
    }

    init(duration){
        this.duration = duration;
        this.parseData();
        this.createKeyFrames();
        this.width = width - this.margin * 2;
        this.height = 100;
    }

    render(){
        push();
        textSize(this.textSize);
        translate(this.margin, this.margin);
        fill(10,128);
        noStroke();
        rect(0,0,this.width, this.height);
        noStroke();
        fill(255);
        textAlign(LEFT, TOP);
        text("TIMELINE", 0, 0);
        stroke(255,255,100);
        let playHeadX = map(this.position, 0, this.duration, 0, this.width);
        line(playHeadX, 0, playHeadX, this.height);
        let valueY = map(this.currentValue, 0, 1, this.height, this.height * 0.4);
        noFill();
        ellipse(playHeadX, valueY, 7, 7);
        line(playHeadX - 5, valueY, playHeadX + 5, valueY);
        
        noStroke();
        textAlign(CENTER, CENTER);
        let textW = textWidth(nfc(this.position,2));
        fill(0,128);
        rectMode(CENTER);
        rect(playHeadX, this.textSize * 1.5 + this.textSize*0.2, textW, this.textSize*1);
        fill(255);
        text(nfc(this.position,2), playHeadX, this.textSize * 1.5);
        fill(0,128);
        textW = textWidth(nfc(this.position,2));
        rect(playHeadX, this.textSize * 3.5 + this.textSize*0.2, textW, this.textSize*1);
        fill(255,100,100);
        text(nfc(this.currentValue,2), playHeadX, this.textSize * 3.5);
        this.renderCurve();
        pop();
    }

    renderCurve(){
        stroke(255);
        noFill();
        beginShape();
        let yPeak = this.height * 0.4;
        for(let i = 0 ; i < this.keyFrames.length ; i++){
            let x = map(this.keyFrames[i].time, 0, this.duration, 0, this.width);
            let y = 0;
            if(this.keyFrames[i].val === 1){
               y = yPeak;
               // console.log(i);
            }else if(this.keyFrames[i].val === 0){
               y = this.height;
               // console.log(i);  
            }
            vertex(x, y);
            ellipse(x,y,4,4);

        }
        endShape();
    }
    

    update(position){
        this.position = position;
        let currentNode = 0;
        for(let i = 0 ; i < this.keyFrames.length -1 ; i++){
            if(this.position > this.keyFrames[i].time && this.position < this.keyFrames[i+1].time){
                currentNode = i;
                break;
            }
        }
        let innerTime = this.position - this.keyFrames[currentNode].time;
        let interval = this.keyFrames[currentNode + 1].time - this.keyFrames[currentNode].time;
        this.currentValue = lerp(this.keyFrames[currentNode].val, this.keyFrames[currentNode+1].val, innerTime/interval);
                
    }

    parseData(){
       // console.log(file[0]);
        for(let i = 0 ; i < this.data.length ; i++){
            let row = this.data[i];
         //   console.log(row);
            let values = row.split(', ');
            let timeCode =  values[0];
            let type = values[1];
            let times = timeCode.split(':');
            //console.log(times);
            let timeInSecs = (int(times[0]) * 60) + int(times[1]) + (int(times[2]) / 100 );
            //console.log(timeInSecs); 
            this.addTimeCode(timeInSecs, type, i); 
        }

        this.checkLast();
        console.log(this.timeCodes);
    }

    addTimeCode(time, type, i){
        if(type === 'ON'){
            if(this.timeCodes.length > 0){
                if(this.timeCodes[this.timeCodes.length-1].val === 0){
                   
                    this.timeCodes.push({time : time, val : 1});
                }
            }else{
                this.timeCodes.push({time : time, val : 1});
            }
        }else if(type === 'OFF'){
            if(this.timeCodes.length > 0){
                if(this.timeCodes[this.timeCodes.length-1].val === 1){
                    this.timeCodes.push({time : time, val : 0});
                }
            }
        }
    }

    checkLast(){
        if(this.timeCodes[this.timeCodes.length-1].type === 1){
            this.timeCodes.push({time : this.duration, val : 0});
        }
    }

    createKeyFrames(){
        this.keyFrames.push({time : 0, val : 0});
        for(let i = 0 ; i < this.timeCodes.length -1 ; i++){
            if(this.timeCodes[i].val === 1){ // createFadeIn
                let time = this.timeCodes[i].time;
                let nextTime = this.timeCodes[i+1].time;
                let transitionTime = this.transitionTime;
                transitionTime = constrain(transitionTime, 0, (nextTime - time)/2);
                this.keyFrames.push({time : time, val : 0});
                this.keyFrames.push({time : time + transitionTime, val : 1});
                this.keyFrames.push({time : nextTime - transitionTime, val : 1});
                this.keyFrames.push({time : nextTime, val : 0});
                i++;
            }

        }
        this.keyFrames.push({time : this.duration, val : 0});
    }

}