class Road{

    constructor(){
        this.vertices = [];
        this.verticesSideA = [];
        this.verticesSideB = [];
        this.resampledVertices = [];
    }

    update(){

        let poly = new ofPolyline;

        for(let i = 0 ; i < this.vertices.length ;i ++){
            poly.add(this.vertices[i].x, this.vertices[i].y);
        }

       

        poly = poly.getSmoothed3();
        poly = poly.getResampledBySpacing(roadWidth * 0.5);


        this.resampledVertices = [];

        for(let i = 0 ; i < poly.points.length ; i++){
            this.resampledVertices.push(poly.points[i]);
        }
        
        this.verticesSideA = getOffsetPath(this.resampledVertices, roadWidth/2);
        this.verticesSideB = getOffsetPath(this.resampledVertices, -roadWidth/2);

    }

    renderToBuffer(buffer){
                
        buffer.push();

        
        buffer.noStroke();
        if(this.verticesSideA != null){
            
            for (let i = 0; i < this.verticesSideA.length-1; i++) {
                buffer.fill(20);
                buffer.stroke(20);
                buffer.beginShape();
                buffer.vertex(this.verticesSideA[i].x, this.verticesSideA[i].y);
                buffer.vertex(this.verticesSideA[i+1].x, this.verticesSideA[i+1].y);
                buffer.vertex(this.verticesSideB[i+1].x, this.verticesSideB[i+1].y);
                buffer.vertex(this.verticesSideB[i].x, this.verticesSideB[i].y);
                buffer.endShape();
                buffer.stroke(255);
                buffer.line(this.verticesSideA[i].x, this.verticesSideA[i].y,this.verticesSideA[i+1].x, this.verticesSideA[i+1].y);
                buffer.line(this.verticesSideB[i].x, this.verticesSideB[i].y,this.verticesSideB[i+1].x, this.verticesSideB  [i+1].y);
            }
            
        }


        buffer.noFill();
 

        buffer.stroke(255,255,0,128);
        buffer.beginShape();
        for(let i = 0 ; i < this.resampledVertices.length ; i++){
            buffer.vertex(this.resampledVertices[i].x, this.resampledVertices[i].y);
            buffer.ellipse(this.resampledVertices[i].x, this.resampledVertices[i].y,3,3);
        }
        buffer.endShape();
        
        buffer.stroke(255,0,0,128);
        buffer.beginShape();
        for(let i = 0 ; i < this.vertices.length ; i++){
            buffer.vertex(this.vertices[i].x, this.vertices[i].y);
            buffer.ellipse(this.vertices[i].x, this.vertices[i].y,3,3);
        }
        buffer.endShape();

        buffer.pop();

    }

    attemptNewVertex(){
        
        if(this.vertices.length === 0){
            this.addVertex(createVector(mouseX, mouseY));
        }else{
            if(dist(mouseX, mouseY, this.vertices[this.vertices.length-1].x, this.vertices[this.vertices.length-1].y) > roadWidth/2){
                if(this.vertices.length > 1){
                    this.checkBackTrack();
                }else{
                    this.addVertex(createVector(mouseX, mouseY));
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
            
            this.addVertex(createVector(mouseX, mouseY));
         }
    }

    addVertex(position){
        this.vertices.push(position);
    }


}