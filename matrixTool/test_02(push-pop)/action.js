class Action{

    constructor(type, x, y){
        this.type = type;
        this.x = x;
        this.y = y;
        this.w = 0;
        this.h = actionHeight;
        this.xRender = 0;
        this.yRender = 0;
        this.size = 20;
        this.margin;
        this.active = true;
        if(this.type === "translate"){
            this.text = type + "(" + this.x + ", " + this.y + ");";
            console.log("added: " + this.text);
        }else if(this.type === "rotate"){
            this.text = type + "(" + this.x + ");";
            console.log("added: " + this.text);
        }else if(this.type === "rect"){
            this.text = type + "(" + this.x + ", " + this.y + ", " +this.size + " ," + this.size + ");";
            console.log("added: " + this.text);
        }else if(this.type === "initial"){
            this.text = type + " state";
            console.log("added: " + this.text);
        }else if(this.type === "push"){
            this.text = type + "();";
            console.log("added: " + this.text);
            this.active = false;
        }else if(this.type === "pop"){
            this.text = type + "();";
            console.log("added: " + this.text);
            this.active = false;
        }
        

        push();
        textFont(font);
        textSize(fontSize);
        this.w = textWidth(this.text);
        this.h = actionHeight;
        this.margin = this.h * 0.1;
        this.w += this.margin*2;
       // this.h += this.margin*2;
        pop();
    }

    setPosition(x,y){
        this.xRender = x;
        this.yRender = y;
    }

    render(opacity){
        push();
        noStroke();
        textAlign(CENTER, CENTER);
        rectMode(CENTER);
        translate(this.xRender + this.w/2, this.yRender + this.h/2);
        fill(0,128 * opacity);
        rect(0, 0, this.w, this.h/2 +  this.margin*2);
        fill(255,128,0,255*opacity);
        textFont(font);
        textSize(fontSize);
        text(this.text,0,-this.h*0.1);
        if(!this.active){
            stroke(255,0,0,255*opacity);
            line(-this.w/2, 0, this.w/2, 0);
        }
        pop();
        // stroke(255,0,0);
        // line(0,this.yRender, this.w, this.yRender);
        // line(0,this.yRender + this.h, this.w, this.yRender + this.h);


    }

    isMouseOver(){
        let result = false;
       
        if(mouseX >= this.xRender && mouseX <= this.xRender + this.w){
            if(mouseY >= this.yRender && mouseY <= this.yRender + this.h){
                result = true;
            }
        }
        return result;

    }

}