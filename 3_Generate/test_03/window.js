class Window{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h; 
        // console.log("X = " + x);
        // console.log("y = " + y);
        // console.log("w = " + w);
        // console.log("h = " + h);
    }

    render(night){
        push();
        rectMode(CENTER);
        if(night){
            fill(222, 193, 149, 200);
        }else{
            noFill();
        }
        translate(0,0,1);
        rect(this.x, this.y, this.width, this.height);
        // stroke(255,0,0);
        // line(this.x,-60,this.x,60);
       // console.log(this.y);
        pop();
    }

    renderGlow(){
        push();
        translate(0,0,1);
        fill(255,0,0);
        let offset = 5;
        let depth = 10;
        let lightColorNear = color(255,220,0,40);
        let lightColorFar = color(255,128,0,0);
        noStroke();
        //LEFT
        beginShape();
        fill(lightColorNear);
        vertex(this.x - this.width/2, this.y + this.height/2,0);
        fill(lightColorNear);
        vertex(this.x - this.width/2, this.y - this.height/2,0);
        fill(lightColorFar);
        vertex(this.x - this.width/2 - offset, this.y - this.height/2 - offset, 0 + depth);
        fill(lightColorFar);
        vertex(this.x - this.width/2 - offset, this.y + this.height/2 + offset, 0 + depth);
        endShape();
        
        //TOP
        beginShape();
        fill(lightColorNear);
        vertex(this.x - this.width/2, this.y - this.height/2,0);
        fill(lightColorNear);
        vertex(this.x + this.width/2, this.y - this.height/2,0);
        fill(lightColorFar);
        vertex(this.x + this.width/2 + offset, this.y - this.height/2 - offset, 0 + depth);
        fill(lightColorFar);
        vertex(this.x - this.width/2 - offset, this.y - this.height/2 - offset, 0 + depth);
        endShape();
        
        //RIGHT
        beginShape();
        fill(lightColorNear);
        vertex(this.x + this.width/2, this.y + this.height/2,0);
        fill(lightColorNear);
        vertex(this.x + this.width/2, this.y - this.height/2,0);
        fill(lightColorFar);
        vertex(this.x + this.width/2 + offset, this.y - this.height/2 - offset, 0 + depth);
        fill(lightColorFar);
        vertex(this.x + this.width/2 + offset, this.y + this.height/2 + offset, 0 + depth);
        endShape();

        //BOTTOM
        beginShape();
        fill(lightColorNear);
        vertex(this.x - this.width/2, this.y + this.height/2,0);
        fill(lightColorNear);
        vertex(this.x + this.width/2, this.y + this.height/2,0);
        fill(lightColorFar);
        vertex(this.x + this.width/2 + offset, this.y + this.height/2 + offset, 0 + depth);
        fill(lightColorFar);
        vertex(this.x - this.width/2 - offset, this.y + this.height/2 + offset, 0 + depth);
        endShape();

        pop();
    }

}