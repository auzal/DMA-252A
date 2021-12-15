class Shape{

    constructor(fill, vertices){
        this.x = 0 ;
        this.y = 0 ;
        this.z = 0 ;
        this.deltaX = 0;
        this.deltaY = 0;
        this.deltaZ = 0;
        this.deltaRotX = 0;
        this.deltaRotY = 0;
        this.deltaRotZ = 0;
        this.width = 0;
        this.height = 0;
        this.vertices = vertices;
        this.fill = fill;
        this.process();
        this.setDeltas();

        this.state = "EXPANDING";

        this.transitionTime = 3000;
        this.holdTime = 1000;
        this.transitionStart = millis();
        this.growing = true;
        this.lerpValue = 0;
    }

    addVertex(x,y){
        this.vertices.push(createVector(x,y));
     //   this.process();
    }

    setFill(f){
        this.fill = f;
    }

    update(){
        let currentTime = millis() - this.transitionStart;
        if(this.state === "EXPANDING"){
           
            this.lerpValue = map(currentTime, 0, this.transitionTime, 0, 1);
            this.lerpValue = constrain(this.lerpValue, 0, 1);
            if(currentTime > this.transitionTime){
                this.state = "HOLDING";
                this.lerpValue = 1;
                this.transitionStart = millis();
            }
        }else if(this.state === "HOLDING"){
            if(currentTime > this.holdTime){
                this.transitionStart = millis();
                if(this.lerpValue == 0){
                    this.state = "EXPANDING";
                }else if(this.lerpValue == 1){
                    this.state = "COLLAPSING";
                }
            }
        }else if (this.state === "COLLAPSING"){
            this.lerpValue = map(currentTime, 0, this.transitionTime, 1, 0);
            this.lerpValue = constrain(this.lerpValue, 0, 1);
            if(currentTime > this.transitionTime){
                this.state = "HOLDING";
                this.lerpValue = 0;
                this.transitionStart = millis();
                this.setDeltas();
            }
        }
    }

    render(scale){
       // console.log(this.z);
        push();

        let lerpEased = sinBoth(this.lerpValue);
        let displace = 200 * lerpEased;
        let noiseScale = 0.01;


        let x = lerp(this.x, this.deltaX, lerpEased);
        let y = lerp(this.y, this.deltaY, lerpEased);
        let z = lerp(this.z, this.deltaZ, lerpEased);
        let rotX = lerp(0, this.deltaRotX, lerpEased);
        let rotY = lerp(0, this.deltaRotY, lerpEased);
        let rotZ = lerp(0, this.deltaRotZ, lerpEased);
        
        translate(x * scale, y *scale, z * scale);
        rotateX(rotX);
        rotateY(rotY);
        rotateZ(rotZ);
        fill(this.fill);
        beginShape(TESS);
        
        for(let i = 0 ; i < this.vertices.length ; i++){
            vertex(this.vertices[i].x* scale +  (noise((frameCount + this.x*10)*noiseScale)*displace), this.vertices[i].y*scale + (noise((frameCount + this.y*10)*noiseScale)*displace));
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

    setDeltas(){
       // console.log("here");
        this.deltaX = random(-this.z - 200, this.z + 200);
        this.deltaY = random(-this.z - 200, this.z + 200);
        this.deltaZ = random(-this.z - 200, this.z + 200);
        let maxRot = 1;
        this.deltaRotX = random(-radians(maxRot), radians(maxRot));
        this.deltaRotY = random(-radians(maxRot), radians(maxRot));
        this.deltaRotZ = random(-PI, PI);
    }


}