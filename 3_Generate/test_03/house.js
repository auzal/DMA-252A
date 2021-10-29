class House{
    constructor(){ 
        this.walls = [];
        this.width = 300;
        this.height = 200;
        this.depth = 150;
        this.roofAngle = radians(15);
        this.windowCoverage = 0.5;  // 0 to 1
        this.pillarsOffset = 0.8;
        this.pillarSize = 5;
        this.doorPosition = 0.2;
        this.xCoords = [];
        this.xCoords[0] = -1;
        this.xCoords[1] = 1;
        this.xCoords[2] = 1;
        this.xCoords[3] = -1;
        this.yCoords = [];
        this.yCoords[0] = -1;
        this.yCoords[1] = -1;
        this.yCoords[2] = 1;
        this.yCoords[3] = 1;
        this.doorWidth = 40;
        this.doorHeight = 100;
        this.rampToWater = 5;
        this.rampAngle = 35;
        this.roofScale = 1.1;
        this.chimneyMargin = 0.7;
        this.xChimney = 0;
        this.yChimney = 0;
        this.randomize();

       
    }

    randomize(){
        this.width = random(100,350);
        this.height = random(100,350);
        this.depth = random(120,250);
        this.roofAngle = radians(random(0,20));
        this.roofScale = random(1.05,1.2);
        this.windowCoverage = random(0.1,1);  // 0 to 1
       // this.windowCoverage = 0.8;
        this.pillarsOffset = random(0.8,0.5);
        this.pillarSize = random(3,8);
        this.doorPosition = random(0,1);
        this.rampAngle = random(25,60);
        this.calculate();
    }

    calculate(){
        this.deltaDepth = tan(this.roofAngle) * this.width;
        this.pillarLength = this.depth * 0.8;
        this.distanceToWater = this.pillarLength * 0.6;
        this.doorY = map(this.doorPosition,0,1,(-this.height/2) + this.doorWidth*.7, (this.height/2) - this.doorWidth*.7);
        this.rampDistance = (this.distanceToWater - this.rampToWater) / tan(radians(this.rampAngle));
        this.xChimney = random(-this.width/2 *  this.chimneyMargin, this.width/2 *  this.chimneyMargin);
        this.yChimney = random(-this.height/2 *  this.chimneyMargin, this.height/2 *  this.chimneyMargin);
        this.createWalls();
    }

    render(night){
        push();
       // fill(255);
      //  stroke(0);
        strokeWeight(1);
        this.renderFloor();
        this.renderRoof();
        this.renderRamp();
        this.renderPillars();
        this.renderWalls(night);
        this.renderWater();
        this.renderRipples();
        if(night){
            this.renderGlow();
        }
       
        pop();
    }

    renderRoof(){
        let roofWidth = this.width * this.roofScale;
        let roofHeight = this.height * this.roofScale;
        //chimney
        push();
        translate(this.xChimney, this.yChimney, map(this.xChimney, -this.width/2, this.width/2, this.depth - this.deltaDepth, this.depth));
        box(10,10,40);
        translate(0,0,25);
        box(12,12,10);
        pop();
        push();
        translate(0,0,this.depth - (this.deltaDepth/2) + 1);
        rotateY(-this.roofAngle);
       // rect(0,0,roofWidth, roofHeight);
        this.renderTiles(roofWidth, roofHeight);
        pop();
    }

    renderTiles(w,h){
        let tileW = w/15;
        let tileH = h/25;
        for(let i = - w/2 ; i < w/2 ; i+= tileW){
            for(let j = - h/2 ; j < h/2 ; j+= tileH){ 
                push();
                translate(i + tileW/2,j+tileH/2);
                rotateY(radians(5));
                rect(0,0,tileW * 1.2,tileH);
                pop();
                
            }
        }
    }

    renderGlow(){
        
        //EAST
        push();
        translate(this.width/2,0);
        rotateZ(-HALF_PI);
        rotateX(-HALF_PI);
        this.walls[0].renderGlow();
        pop();

        //SOUTH
        push();
        translate(0,this.height/2);
        rotateX(-HALF_PI);
        this.walls[1].renderGlow();
            pop();

        //WEST
        push();
        translate(-this.width/2,0);
        rotateZ(-HALF_PI);
        rotateX(-HALF_PI);
        rotateY(PI);
        this.walls[2].renderGlow();
        pop();
        
        //NORTH
        push();
        translate(0,-this.height/2);
        rotateX(-HALF_PI);
        rotateY(PI);
        this.walls[3].renderGlow();
        pop();

    }

    renderWalls(night){
        
        //EAST
        push();
        translate(this.width/2,0);
        rotateZ(-HALF_PI);
        rotateX(-HALF_PI);
        this.walls[0].render(night);
        pop();

        //SOUTH
        push();
        translate(0,this.height/2);
        rotateX(-HALF_PI);
        this.walls[1].render(night);
         pop();

        //WEST
        push();
        translate(-this.width/2,0);
        rotateZ(-HALF_PI);
        rotateX(-HALF_PI);
        rotateY(PI);
        this.walls[2].render(night);
        pop();
        
        //NORTH
        push();
        translate(0,-this.height/2);
        rotateX(-HALF_PI);
        rotateY(PI);
        this.walls[3].render(night);
        pop();
    }
    
    renderRamp(){
        push();
        translate(this.width/2,  this.doorY);
        // beginShape();
        // vertex(0,-this.doorWidth/2,0);
        // vertex(this.rampDistance,-this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        // vertex(this.rampDistance,this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        // vertex(0,this.doorWidth/2,0);
        // endShape(CLOSE);
        beginShape();
        vertex(this.rampDistance,-this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        vertex(this.rampDistance + this.doorWidth,-this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        vertex(this.rampDistance + this.doorWidth,this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        vertex(this.rampDistance,this.doorWidth/2,-this.distanceToWater+this.rampToWater);
        endShape(CLOSE);
        this.renderSteps();
        pop();
    }

    renderSteps(){
        let stepWidth = 10;
        push();
        for(let i = 0 + stepWidth * .5; i < this.rampDistance - stepWidth * .5; i+= stepWidth ){
            push();
            translate(i,0,-map(i,0,this.rampDistance,0,this.distanceToWater-this.rampToWater));
            rect(0,0,stepWidth,this.doorWidth);
            pop();
        }

        pop();
    }

    renderFloor(){
        beginShape();
        for(let i = 0 ; i < this.xCoords.length ; i++){
            vertex(this.width/2 * this.xCoords[i], -this.height/2 * this.yCoords[i]);
        }
        endShape(CLOSE);
    }

    renderPillars(){
        push();
        translate(0,0,-this.pillarLength/2 - 1);
        let x = []
        for(let i = 0 ; i < this.xCoords.length ; i++){
            push();
            translate(-this.width/2 * this.xCoords[i] *  this.pillarsOffset, -this.height/2 * this.yCoords[i] * this.pillarsOffset);
            box(this.pillarSize,this.pillarSize,this.pillarLength);
            pop();
        }
        pop();
        push();
        translate(this.width/2,this.doorY);
        translate(this.rampDistance + this.doorWidth/2,0);
        let shortPillarLength = this.pillarLength - (this.distanceToWater - this.rampToWater);
        translate(0,0,-(this.distanceToWater - this.rampToWater) - shortPillarLength/2-1);
        box(this.pillarSize,this.pillarSize,shortPillarLength);
        pop();
    }

    renderRipples(){
        push();
        noFill();
        translate(0,0,-this.distanceToWater);
        let x = []
        let num = 5;
        let spacing = this.pillarSize * 5;
        for(let i = 0 ; i < this.xCoords.length ; i++){
            push();
            translate(-this.width/2 * this.xCoords[i] *  this.pillarsOffset, -this.height/2 * this.yCoords[i] * this.pillarsOffset);
            
            for(let i = 0 ; i < num ; i ++){
                let diam = (this.pillarSize * 1.1) + (spacing*i);
                diam += (frameCount*0.2) % spacing;
                stroke(0,map(diam, 0,  (this.pillarSize * 1.1) + (spacing*num), 255 ,0));
                ellipse(0,0,diam, diam);
            }
            pop();
        }

        translate(this.width/2,this.doorY);
        translate(this.rampDistance + this.doorWidth/2,0);
       
        for(let i = 0 ; i < num ; i ++){
            let diam = (this.pillarSize * 1.1) + (spacing*i);
            diam += (frameCount*0.2) % spacing;
            stroke(0,map(diam, 0,  (this.pillarSize * 1.1) + (spacing*num), 255 ,0));
            ellipse(0,0,diam, diam);
        }
        pop();
    }

    renderWater(){
        push();
        let diam = this.width;
        if(this.height > this.diam){
            diam = this.height;
        }
        diam *= 5;
        noStroke();
        fill(31,165,176,40);
        translate(0,0,-this.distanceToWater);
        circle(0,0,diam);
        pop();
    }

    update(){

    }

    createWalls(){
        
        this.walls = [];
        // EAST
        let points = [];
        points.push(createVector(-this.height/2,0));
        points.push(createVector(-this.height/2,-this.depth));
        points.push(createVector(this.height/2, -this.depth));
        points.push(createVector(this.height/2, 0));
        let aux = new Wall(points, this.height, this.depth, this.windowCoverage);
        aux.setDoor(-this.doorY, this.doorWidth, this.doorHeight);
        this.walls.push(aux);
        // door
        //   vertex(0,this.doorY + this.doorWidth/2);
        //   vertex(this.doorHeight,this.doorY + this.doorWidth/2);
        //   vertex(this.doorHeight,this.doorY - this.doorWidth/2);
        //   vertex(0,this.doorY - this.doorWidth/2);

        //SOUTH

        points = [];
        points.push(createVector(-this.width/2,0));
        points.push(createVector(-this.width/2,-(this.depth-this.deltaDepth)));
        points.push(createVector(this.width/2,-(this.depth)));
        points.push(createVector(this.width/2,0));
        aux = new Wall(points, this.width, this.depth-this.deltaDepth, this.windowCoverage);
        this.walls.push(aux);
    
        //WEST

        points = [];
        points.push(createVector(-this.height/2, 0));
        points.push(createVector( -this.height/2, - (this.depth - this.deltaDepth)));
        points.push(createVector( this.height/2, - (this.depth - this.deltaDepth)));
        points.push(createVector(this.height/2,0));
        aux = new Wall(points, this.height, this.depth-this.deltaDepth, this.windowCoverage);
        this.walls.push(aux);
       
        //NORTH

        points = [];
        points.push(createVector(-this.width/2,0));
        points.push(createVector(-this.width/2,-(this.depth)));
        points.push(createVector(this.width/2,-(this.depth-this.deltaDepth)));
        points.push(createVector(this.width/2,0));
        aux = new Wall(points, this.width, this.depth-this.deltaDepth, this.windowCoverage);
        this.walls.push(aux);
          
    }

    getChimneyPosition(){
        let position = createVector(this.xChimney, this.yChimney, map(this.xChimney, -this.width/2, this.width/2, this.depth - this.deltaDepth, this.depth) + 30);
        return position;
    }


    
}