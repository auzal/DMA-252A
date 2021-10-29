class Wall{
    constructor(v, w, h, windowCoverage){
        this.vertices = v;
        this.doorX = 0;
        this.doorW = 0;
        this.doorH = 0;
        this.hasDoor = false;
        this.windows = [];
        this.width = w;
        this.height = h;
        this.windowCoverage = windowCoverage;
        this.windowMargin = 0.05;
        this.calculateWindows();
    }

    setDoor(x, w, h){
        this.doorX = x;
        this.doorW = w;
        this.doorH = h;
        this.hasDoor = true;
        this.calculateWindows();
    }

    render(night){
       // print("hola");
       push();
        beginShape();
        for(let i = 0 ; i < this.vertices.length ; i++){
          //  fill(random(255));
            vertex(this.vertices[i].x, this.vertices[i].y);
        }
        endShape(CLOSE);
        if(this.hasDoor){
            this.renderDoor();
        }
        for(let i = 0 ; i < this.windows.length ; i++){
            this.windows[i].render(night);
        }
      //  this.renderGuide();
        pop();
    }

    renderGlow(){
        // print("hola");
        push();
         for(let i = 0 ; i < this.windows.length ; i++){
             this.windows[i].renderGlow();
         }
       //  this.renderGuide();
         pop();
     }

    renderGuide(){
        push();
        strokeWeight(2);
        stroke(255,0,0);
        line(0,0,20,0);
        stroke(0,255,0);
        line(0,0,0, 20);
        pop();
    }

    renderDoor(){
        push();
        rectMode(CENTER);
        translate(this.doorX, -this.doorH/2);
        rect(0,0,this.doorW, this.doorH);
        pop();

    }

    calculateWindows(){
        this.windows = [];
        if(!this.hasDoor){
            let totalWindowsWidth = map(this.windowCoverage,0,1.0,0,this.width - (this.width*this.windowMargin));
           // console.log(totalWindowsWidth);
           let windowX = 0;
           let remainingSpace = (this.width/2 - this.width*this.windowMargin) - totalWindowsWidth/2;
           windowX = random(-remainingSpace, remainingSpace);
           let windowY = -this.height/2;
           let windowMaxH = this.height - (this.height * this.windowMargin) * 2; 
            if(this.windowCoverage < 0.3){
                let windowW = totalWindowsWidth;
                let windowH = random(windowMaxH * .6, windowMaxH);
                let yVariance = random(- (windowMaxH - windowH)/2 , (windowMaxH - windowH)/2);
                let aux = new Window(windowX, windowY + yVariance,  windowW, windowH);
                this.windows.push(aux);
            }else{
                let windowCount = int(random(1,5));
               // let windowW = totalWindowsWidth;
               // let  aux = new Window(windowX, windowY, windowW, windowH);
               // this.windows.push(aux);
                let individualWindowWidth = totalWindowsWidth / windowCount;
                let xStart = windowX - totalWindowsWidth/2 + individualWindowWidth/2;
                for(let i = 0 ; i < windowCount ; i++){
                    let x = xStart + (i * individualWindowWidth);
                    let windowH = random(windowMaxH * .6, windowMaxH);
                    let yVariance = random(- (windowMaxH - windowH)/2 , (windowMaxH - windowH)/2);
                    if(windowCount > 2){
                        windowH = windowMaxH * .7;
                        yVariance = 0;
                    }
                    let aux = new Window(x, windowY + yVariance, individualWindowWidth * .7, windowH);
                    this.windows.push(aux);
                }
            }
        }else{ // if it has doors
            
                let windowX = 0;
                let space = 0;

                if(this.doorX >0){
                    space = dist((this.doorX - this.doorW/2),0,-this.width/2,0);
                    windowX = (this.doorX-this.doorW/2) - space/2;
                }else{
                    space = dist((this.doorX + this.doorW/2),0,this.width/2,0);
                    windowX = (this.doorX+this.doorW/2) + space/2;
                }
                let windowMaxH = this.height - (this.height * this.windowMargin) * 2; 
                let totalWindowsWidth = map(this.windowCoverage,0,1.0,0,space);
                let windowY = -this.height/2;
                let windowW = totalWindowsWidth - space*this.windowMargin*2;
                let windowH = random(windowMaxH * .6, windowMaxH);
                let yVariance = random(- (windowMaxH - windowH)/2 , (windowMaxH - windowH)/2);
                let aux = new Window(windowX, windowY + yVariance,  windowW, windowH);
               // console.log(windowW);
                this.windows.push(aux);

            
        }
    }

}