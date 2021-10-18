class Road{

    constructor(brushIndex){
        this.vertices = [];
        this.resampledVertices = [];
        this.brushes = [];
        this.brushes.push('road');
        this.brushes.push('street');
        this.brushes.push('highway');
        this.currentBrush = brushIndex;
        this.roadColor = color('#181716');
        this.lineColor = color('#f8f0e3');
        this.resampleFactor = 0.5;
    }

    update(){

        let poly = new ofPolyline;
        for(let i = 0 ; i < this.vertices.length ;i ++){
            poly.add(this.vertices[i].x, this.vertices[i].y);
        }
        poly = poly.getSmoothed3();
        poly = poly.getResampledBySpacing(roadWidth * this.resampleFactor);
        this.resampledVertices = [];
        for(let i = 0 ; i < poly.points.length ; i++){
            this.resampledVertices.push(poly.points[i]);
        }

    }

    renderToBuffer(buffer){
                
        buffer.push();

            if(this.brushes[this.currentBrush] === 'road'){
               
                this.renderRoad(buffer);
            }else if(this.brushes[this.currentBrush] === 'street'){
               
                this.renderStreet(buffer);
            }else if(this.brushes[this.currentBrush] === 'highway'){
               
                this.renderHighway(buffer);
            }

        buffer.pop();

    }

    attemptNewVertex(){
        
        if(this.vertices.length === 0){
            this.addVertex(createVector(mouseX, mouseY));
        }else{
            let minDist = (roadWidth) * .5 ;
            if(dist(mouseX, mouseY, this.vertices[this.vertices.length-1].x, this.vertices[this.vertices.length-1].y) > minDist){
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


    renderRoad(buffer){
       

        let rightMargin = getOffsetPath(this.resampledVertices, roadWidth * 0.5);
        let leftMargin = getOffsetPath(this.resampledVertices, -roadWidth * 0.5);

        let rightLine = getOffsetPath(this.resampledVertices, roadWidth * 0.03);
        let leftLine = getOffsetPath(this.resampledVertices, -roadWidth * 0.03);

    //    buffer.strokeWeight(3);

        buffer.noStroke();
        if(rightMargin != null){
            
            for (let i = 0; i < rightMargin.length-1; i++) {
                buffer.fill(this.roadColor);
                buffer.stroke(this.roadColor);
                // asphalt
                buffer.beginShape();
                buffer.vertex(rightMargin[i].x, rightMargin[i].y);
                buffer.vertex(rightMargin[i+1].x, rightMargin[i+1].y);
                buffer.vertex(leftMargin[i+1].x, leftMargin[i+1].y);
                buffer.vertex(leftMargin[i].x, leftMargin[i].y);
                buffer.endShape();
                buffer.stroke(this.lineColor);
                // exterior borders
                buffer.line(rightMargin[i].x, rightMargin[i].y,rightMargin[i+1].x, rightMargin[i+1].y);
                buffer.line(leftMargin[i].x, leftMargin[i].y,leftMargin[i+1].x, leftMargin[i+1].y);
                // dashed lines                
                if(i%2==0 && i < rightLine.length - 1){
                //     buffer.line(this.resampledVertices[i].x, this.resampledVertices[i].y,this.resampledVertices[i+1].x, this.resampledVertices[i+1].y);
                    buffer.beginShape();
                    buffer.vertex(rightLine[i].x, rightLine[i].y);
                    buffer.vertex(rightLine[i+1].x, rightLine[i+1].y);
                    buffer.vertex(leftLine[i+1].x, leftLine[i+1].y);
                    buffer.vertex(leftLine[i].x, leftLine[i].y);
                    buffer.endShape(CLOSE);
                }
            }
            
        }

    }




}