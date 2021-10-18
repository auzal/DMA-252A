class Road{

    constructor(){
        this.vertices = [];
        this.verticesSideA = [];
        this.verticesSideB = [];
    }

    update(){
        this.verticesSideA = getOffsetPath(this.vertices, roadWidth/2);
        this.verticesSideB = getOffsetPath(this.vertices, -roadWidth/2);

    }

    renderToBuffer(buffer){
                
        buffer.push();
        buffer.noFill();
        buffer.stroke(255);
        buffer.beginShape();
        for (let i = 0; i < this.vertices.length; i++) {
            buffer.vertex(this.vertices[i].x, this.vertices[i].y);
            
        }
        buffer.endShape();

        // fill(255, 255, 0, 90);
        buffer.stroke(255,255,0, 128);
        
        if(this.verticesSideA != null){
            buffer.beginShape();
            for (let i = 0; i < this.verticesSideA.length; i++) {
                buffer.vertex(this.verticesSideA[i].x, this.verticesSideA[i].y);
            }
            buffer.endShape();
        }

        if(this.verticesSideB != null){
            buffer.beginShape();
            for (let i = 0; i < this.verticesSideB.length; i++) {
                buffer.vertex(this.verticesSideB[i].x, this.verticesSideB[i].y);
            }
            buffer.endShape();
        }
        buffer.pop();

    }

    addVertex(){
        if(this.vertices.length === 0){
            this.vertices.push(createVector(mouseX, mouseY));
        }else{
            if(dist(mouseX, mouseY, this.vertices[this.vertices.length-1].x, this.vertices[this.vertices.length-1].y) > roadWidth){
                if(this.vertices.length > 1){
                    this.checkBackTrack();
                }else{
                    this.vertices.push(createVector(mouseX, mouseY));
                }
            }
        }

        this.update();
    }

    checkBackTrack(){
        let prevAngle = atan2(this.vertices[this.vertices.length-1].y - this.vertices[this.vertices.length-2].y, this.vertices[this.vertices.length-1].x - this.vertices[this.vertices.length-2].x);
        let currAngle = atan2(mouseY - this.vertices[this.vertices.length-1].y, mouseX - this.vertices[this.vertices.length-1].x);
        let  angularDistance = abs(menorDistAngulos(prevAngle, currAngle));

        if(degrees(angularDistance) < maxAngularVariance){
            
            this.vertices.push(createVector(mouseX, mouseY));
         }
    }


}