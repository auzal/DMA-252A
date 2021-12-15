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
        this.maxNoiseDisplace = 35;
       // this.process();
        this.setDeltas();

        this.state = "EXPANDING";

        this.transitionTime = 15000;
        this.holdTime = 2000;
        this.transitionStart = millis();
        this.growing = true;
        this.lerpValue = 0;

        this.displaceAngle = 0;
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
        push();
        let lerpEased = sinBoth(this.lerpValue);
        let displace = this.maxNoiseDisplace * lerpEased;
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
        noFill();
        stroke(255,128,0);
        texture(img);
        beginShape();
        for(let i = 0 ; i < this.vertices.length ; i++){
            let tX = this.x + this.vertices[i].x + img.width/2;
            let tY = this.y + this.vertices[i].y + img.height/2;

            let x = this.vertices[i].x* scale +  (noise((frameCount/2 + this.x*10)*noiseScale)*displace);
            let y = this.vertices[i].y*scale + (noise((frameCount/2 + this.y*10)*noiseScale)*displace);
            vertex(x, y, tX, tY);
        }
        endShape(CLOSE);
        pop();
    }

    renderDebug(scale){
        push();
        let lerpEased = sinBoth(this.lerpValue);
        let displace = this.maxNoiseDisplace * lerpEased;
        let noiseScale = 0.01;
        let x = lerp(this.x, this.deltaX, lerpEased);
        let y = lerp(this.y, this.deltaY, lerpEased);
        let z = lerp(this.z, this.deltaZ, lerpEased);
        let rotX = lerp(0, this.deltaRotX, lerpEased);
        let rotY = lerp(0, this.deltaRotY, lerpEased);
        let rotZ = lerp(0, this.deltaRotZ, lerpEased);
        translate(x * scale, y *scale, z * scale);
        push();
        stroke(255);
        noFill();
        rotate(this.displaceAngle);
        line(0,0,30,0);
        ellipse(30,0,5,5);
        pop();
        rotateX(rotX);
        rotateY(rotY);
        rotateZ(rotZ);
        noFill();
        stroke(255,128,0);
        beginShape();
        for(let i = 0 ; i < this.vertices.length ; i++){
            let tX = this.x + this.vertices[i].x + img.width/2;
            let tY = this.y + this.vertices[i].y + img.height/2;
            let x = this.vertices[i].x* scale +  (noise((frameCount/2 + this.x*10)*noiseScale)*displace);
            let y = this.vertices[i].y*scale + (noise((frameCount/2 + this.y*10)*noiseScale)*displace);
            vertex(x, y);
        }
        endShape(CLOSE);
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
//        console.log(this.x);

        for(let i = 0 ; i < this.vertices.length ; i++){
            this.vertices[i].x -= this.x;
            this.vertices[i].y -= this.y;
        }

    }

    setDeltas(){
        // console.log("here");
        // this.deltaX = random(-this.z - 200, this.z + 200);
        // this.deltaY = random(-this.z - 200, this.z + 200);
         this.deltaZ = random(-this.z - 100, this.z + 100);
        // this.deltaZ =0;
        
        this.displaceAngle = atan2(-this.y, -this.x);
        this.displaceAngle += PI;
        this.displaceAngle += radians(random(-20,20));
        let distance = random(30,130);

        this.deltaX = this.x + cos(this.displaceAngle) * distance;
        this.deltaY = this.y + sin(this.displaceAngle) * distance;

         let maxRot = 1;
         this.deltaRotX = random(-radians(maxRot), radians(maxRot));
         this.deltaRotY = random(-radians(maxRot), radians(maxRot));
         this.deltaRotZ = random(-QUARTER_PI, QUARTER_PI);
       //  this.deltaRotZ = 0;
     }


}