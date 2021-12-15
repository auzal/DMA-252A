class Shape{

    constructor(fill, vertices){
        this.x = 0 ;
        this.y = 0 ;
        this.width = 0;
        this.height = 0;
        this.vertices = vertices;
        this.fill = fill;
       // this.process();
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
        push();
     //   translate(this.x * scale, this.y * scale);
        let control = map(mouseX, 0, width, 1, 20);
        translate(this.x * control, this.y * control)
       // fill(this.fill);
        noFill();
        stroke(255,0,0);
        texture(img);
        beginShape();
        for(let i = 0 ; i < this.vertices.length ; i++){
            let tX = this.x + this.vertices[i].x + img.width/2;
            let tY = this.y + this.vertices[i].y + img.height/2;
            vertex(this.vertices[i].x*scale, this.vertices[i].y*scale, tX , tY );
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
//        console.log(this.x);

        for(let i = 0 ; i < this.vertices.length ; i++){
            this.vertices[i].x -= this.x;
            this.vertices[i].y -= this.y;
        }

    }


}