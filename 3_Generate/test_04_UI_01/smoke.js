class Smoke{
    constructor(pos){
        this.position = pos.copy();
        this.position.x += random(-5,5);
        this.position.y += random(-5,5);
        this.position.z += 3;
        this.maxDiam = random(10,30);
        this.diam = 5;
        this.velocity = random(0.3,1.2);
        this.opacity = 255;
        this.remove = false;
    }

    render(){
        push();
            translate(this.position);
            //noFill();
            fill(255, this.opacity);
            sphere(this.diam);
        pop();

    }

    update(){
        this.position.z += this.velocity;
        if(this.diam < this.maxDiam){
            this.diam += 0.1;
        }else if(this.opacity > 0){
            this.opacity -= 5;
        }else{
            this.remove = true;
        }
    }


}