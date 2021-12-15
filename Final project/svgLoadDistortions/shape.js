class Shape{

    constructor(fill, vertices){
        this.x = 0 ;
        this.y = 0 ;
        this.z = 0 ;
        this.width = 0;
        this.height = 0;
        this.vertices = vertices;
        this.fill = fill;
        this.process();
    }

    addVertex(x,y){
        this.vertices.push(createVector(x,y));
    //   this.process();
    }

    setFill(f){
        this.fill = f;
    }
    
    render(scale){
      //  console.log(scale);
        let displace = map(sin(frameCount*0.01),-1,1,0,200);
        let mult = 0;
       // displace = constrain(displace,,3);
        push();
        translate(this.x * scale*mult, this.y*scale*mult);
       // rotate(map(sin(frameCount*0.01),-1,1,0,3));
        fill(this.fill);
        stroke(255,0,0);
        beginShape();
        let noiseScale = 0.05;
        for(let i = 0 ; i < this.vertices.length ; i++){
          //  vertex(this.vertices[i].x* scale +  (noise((frameCount + this.x*10)*noiseScale)*displace), this.vertices[i].y*scale + (noise((frameCount + this.y*10)*noiseScale)*displace));
          vertex(this.vertices[i].x* scale, this.vertices[i].y*scale);
        }
       //  vertex(this.vertices[0].x* scale, this.vertices[0].y*scale);
        
        endShape();

        pop();
    }

    renderDebug(scale){
        push();
        rectMode(CENTER);
        stroke(255,128,0);
        noFill();
        translate(this.x * scale, this.y * scale);
        ellipse(0,0,2,2);
        rect(0,0,this.width*scale,this.height*scale);
        pop();
    }

    process(){
        
        let west = this.vertices[0].x;
        let east = this.vertices[0].x;
        let north = this.vertices[0].y;
        let south = this.vertices[0].y;
        for(let i = 0 ; i < this.vertices.length ; i++){
            let x = this.vertices[i].x;
            let y = this.vertices[i].y;
            if(x <= west){
                west = x;
            }else if(x > east){
                east = x;
            }

            if(y <= north){
                north = y;
            }else if(y > south){
                south = y;
            }
        }
        this.width = east - west;
        this.height = south - north;
        this.x = east-  (this.width/2);
        this.y = south - (this.height/2);
        console.log(this.x);

        for(let i = 0 ; i < this.vertices.length ; i++){
            this.vertices[i].x -= this.x;
            this.vertices[i].y -= this.y;
        }

    }


}