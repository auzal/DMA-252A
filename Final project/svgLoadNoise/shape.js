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
        this.noiseOffset = random(0,500);
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
       // let displace = map(sin(frameCount*0.01),-1,1,0,200);
       // displace = constrain(displace,,3);
        push();
        let control = map(sin(frameCount*0.01),-1,1,0,1); 
        let scaleOffset = 1.5 * control;
        translate(this.x * ( scale + scaleOffset), this.y*( scale + scaleOffset));
       // rotate(map(sin(frameCount*0.01),-1,1,0,3));
        fill(this.fill);
        beginShape();
        let noiseScale = 0.1;
        let displacement = 20 * control;
       
        for(let i = 0 ; i < this.vertices.length ; i++){

            let x = this.vertices[i].x *( scale + scaleOffset);
            let y = this.vertices[i].y *( scale + scaleOffset);
           
            let ang = atan2(y,  x);

            
            let noiseValue = noise((x + this.noiseOffset + frameCount) * noiseScale, (y + this.noiseOffset +frameCount) * noiseScale);
            let movement = noiseValue * displacement * scale;

            x += cos(ang) * movement;
            y += sin(ang) * movement;

            // push();
            // translate(x,y);
            // rotate(ang);
            // stroke(255,0,0);
            // line(0,0,10,0);    
            // pop();



           vertex(x, y);
        }
        endShape(CLOSE);

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