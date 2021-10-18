class Road{

    constructor(brushIndex){
        this.vertices = [];
        this.resampledVertices = [];
        this.brushes = [];
        this.brushes.push('road');
        this.brushes.push('street');
        this.brushes.push('highway');
        this.currentBrush = brushIndex;
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
                buffer.fill(roadColor);
                buffer.stroke(roadColor);
                // asphalt
                buffer.beginShape();
                buffer.vertex(rightMargin[i].x, rightMargin[i].y);
                buffer.vertex(rightMargin[i+1].x, rightMargin[i+1].y);
                buffer.vertex(leftMargin[i+1].x, leftMargin[i+1].y);
                buffer.vertex(leftMargin[i].x, leftMargin[i].y);
                buffer.endShape();
                buffer.stroke(lineColor);
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

    renderStreet(buffer){
       
       let lines = [];

       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -1.3));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -1.0));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -0.53));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -0.47));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -0.03));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 0.03));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 0.47));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 0.53));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 1.0));
       lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 1.3));


    //    buffer.strokeWeight(3);

        buffer.noStroke();
        if(this.resampledVertices != null){
            
            for (let i = 0; i < this.resampledVertices.length-1; i++) {
                buffer.fill(roadColor);
                buffer.stroke(roadColor);
                // asphalt
                buffer.beginShape();
                buffer.vertex(lines[0][i].x, lines[0][i].y);
                buffer.vertex(lines[0][i+1].x, lines[0][i+1].y);
                buffer.vertex(lines[9][i+1].x, lines[9][i+1].y);
                buffer.vertex(lines[9][i].x, lines[9][i].y);
                buffer.endShape();
                buffer.stroke(lineColor);
                // exterior borders
                buffer.line(lines[0][i].x, lines[0][i].y,lines[0][i+1].x, lines[0][i+1].y); 
                buffer.line(lines[9][i].x, lines[9][i].y,lines[9][i+1].x, lines[9][i+1].y);
                // sidewalk borders
                buffer.line(lines[1][i].x, lines[1][i].y,lines[1][i+1].x, lines[1][i+1].y); 
                buffer.line(lines[8][i].x, lines[8][i].y,lines[8][i+1].x, lines[8][i+1].y);
                // center lines 
                buffer.line(lines[4][i].x, lines[4][i].y,lines[4][i+1].x, lines[4][i+1].y); 
                buffer.line(lines[5][i].x, lines[5][i].y,lines[5][i+1].x, lines[5][i+1].y);
                // dashed lines
                if(i%2==0 && i < this.resampledVertices.length - 1){
                    buffer.beginShape();
                    buffer.vertex(lines[2][i].x, lines[2][i].y);
                    buffer.vertex(lines[2][i+1].x, lines[2][i+1].y);
                    buffer.vertex(lines[3][i+1].x, lines[3][i+1].y);
                    buffer.vertex(lines[3][i].x, lines[3][i].y);
                    buffer.endShape(CLOSE);

                    buffer.beginShape();
                    buffer.vertex(lines[6][i].x, lines[6][i].y);
                    buffer.vertex(lines[6][i+1].x, lines[6][i+1].y);
                    buffer.vertex(lines[7][i+1].x, lines[7][i+1].y);
                    buffer.vertex(lines[7][i].x, lines[7][i].y);
                    buffer.endShape(CLOSE);
                 }

                 //sidewalk tiles

                 if(random(100) < 70){
                    buffer.line(lines[0][i].x, lines[0][i].y,lines[1][i].x, lines[1][i].y);
                 }

                 if(random(100) < 70){
                    buffer.line(lines[8][i].x, lines[8][i].y,lines[9][i].x, lines[9][i].y);
                 }

            }
            
        }

    }

    renderHighway(buffer){
       

        let lines = [];
 
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -2.25));              // 0
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-1.75 - 0.03)));     // 1
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-1.75 + 0.03)));     // 2
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-1.25 - 0.03)));     // 3
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-1.25 + 0.03)));     // 4
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-0.75 - 0.03)));     // 5
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (-0.75 + 0.03)));     // 6
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -0.25));              // 7
        // CENTER   
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 0.25));               // 8
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (0.75 - 0.03)));      // 9
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (0.75 + 0.03)));      // 10
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (1.25 - 0.03)));      // 11
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (1.25 + 0.03)));      // 12
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (1.75 - 0.03)));      // 13
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * (1.75 + 0.03)));      // 14
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 2.25));               // 15

        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * -2.30));              // 16 // left border
        lines.push(getOffsetPath(this.resampledVertices, -roadWidth * 2.30));               // 17 // right border

 
 
     //    buffer.strokeWeight(3);
 
         buffer.noStroke();
         if(this.resampledVertices != null){
             
             for (let i = 0; i < this.resampledVertices.length-1; i++) {
                 buffer.fill(roadColor);
                 buffer.stroke(roadColor);
                 // asphalt
                 buffer.beginShape();
                 buffer.vertex(lines[16][i].x, lines[16][i].y);
                 buffer.vertex(lines[16][i+1].x, lines[16][i+1].y);
                 buffer.vertex(lines[7][i+1].x, lines[7][i+1].y);
                 buffer.vertex(lines[7][i].x, lines[7][i].y);
                 buffer.endShape();
                 buffer.beginShape();
                 buffer.vertex(lines[8][i].x, lines[8][i].y);
                 buffer.vertex(lines[8][i+1].x, lines[8][i+1].y);
                 buffer.vertex(lines[17][i+1].x, lines[17][i+1].y);
                 buffer.vertex(lines[17][i].x, lines[17][i].y);
                 buffer.endShape();
                 buffer.stroke(lineColor);
                 // exterior borders
                 buffer.line(lines[0][i].x, lines[0][i].y,lines[0][i+1].x, lines[0][i+1].y); 
                 buffer.line(lines[15][i].x, lines[15][i].y,lines[15][i+1].x, lines[15][i+1].y);
                 buffer.line(lines[7][i].x, lines[7][i].y,lines[7][i+1].x, lines[7][i+1].y); 
                 buffer.line(lines[8][i].x, lines[8][i].y,lines[8][i+1].x, lines[8][i+1].y);
                 buffer.line(lines[16][i].x, lines[16][i].y,lines[16][i+1].x, lines[16][i+1].y); 
                 buffer.line(lines[17][i].x, lines[17][i].y,lines[17][i+1].x, lines[17][i+1].y);
                
                 // dashed lines
                 if(i%2==0 && i < this.resampledVertices.length - 1){
                     for(let j = 1 ; j < 7 ; j += 2){
                        buffer.beginShape();
                        buffer.vertex(lines[j][i].x, lines[j][i].y);
                        buffer.vertex(lines[j][i+1].x, lines[j][i+1].y);
                        buffer.vertex(lines[j+1][i+1].x, lines[j+1][i+1].y);
                        buffer.vertex(lines[j+1 ][i].x, lines[j+1][i].y);
                        buffer.endShape(CLOSE);
                     }

                     for(let j = 9 ; j < 14 ; j += 2){
                        buffer.beginShape();
                        buffer.vertex(lines[j][i].x, lines[j][i].y);
                        buffer.vertex(lines[j][i+1].x, lines[j][i+1].y);
                        buffer.vertex(lines[j+1][i+1].x, lines[j+1][i+1].y);
                        buffer.vertex(lines[j+1 ][i].x, lines[j+1][i].y);
                        buffer.endShape(CLOSE);
                     }
 
                  }
               
 
             }
             
         }
 
     }





}