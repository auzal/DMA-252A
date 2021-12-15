class Stain {

    constructor(x, y, control){
      this.x = x; // x y coordinates for stain center
      this.y = y;
      this.diam = 0; // current general diameter of stain
      this.max_diam = 400; // maximum diameter for stain
      this.diam_increment = 1.5; // growth per frame for stain diameter
      this.max_variance = 0.4; // how much smaller is the smallest circle? (normalized)
      this.steps = 200; // detail variable for deformed circles (number of steps in the circumference)
      this.layers = 1; // number of circles or "layers" stacked in each frame
      this.noise_scale;
      this.growing = true;
      this.x_displace = random(-500, 500);;
      this.y_displace = random(-500, 500);;
      let min = map(control, 0, 1, 3, 20);
      let max = map(control, 0, 1, 17, 100);
      this.life = random(min,max);
    //  this.life = random(15,30);;
      let a = color(230, 128, 74, 5);
      let b = color(56, 232, 192, 5);
      let lerp = random(1);
     // this.imgColor = img.get(int(this.x), int(this.y));
      this.opacity = 5;
      //this.paintColor = color(red(this.imgColor), green(this.imgColor), blue(this.imgColor), this.opacity) 
      this.paintColor = color(255,0,0,15);
        
    }
  
      update() { 
  
        if (this.growing) {
        this.diam += this.diam_increment;
        }
  
        //  this.noise_scale = map(mouseX, 0, width, 0, 0.1); // deformation amount
        this.noise_scale = map(mouseY, 0, height, 0, 0.1); // deformation amount
  
        this.noise_scale =0.03; // deformation amount
        
        this.life -- ;
        if(this.life <= 0){
            this.stop();
        }
    }
  
    render() {
   //   if (this.growing) {
        push();
        noStroke();
      //  fill(img.get(int(this.x/2), int(this.y/2)), this.opacity);
     //   fill(this.paintColor);
     noFill();
     stroke(255,0,0);
     tint(255,5);
          for (let c = 0; c < this.layers; c++) {
            texture(img);
            beginShape();
          
              for (let i = 0; i < this.steps; i ++) {
                  // calculation of each point in circumference
                  let ang =  i * (TWO_PI/this.steps);
                  //  float radius = diam/2;
                  // calculation of radius including diameter variance
                  let radius = this.diam/2 - ((this.diam/2) * map(c, 0, this.layers, 0, this.max_variance));
                  let point_x = this.x + cos(ang) * radius;
                  let point_y = this.y + sin(ang) * radius;
                  // calculation of new radius based on noise. this is messy
                  radius = radius +  (noise((point_x + this.x_displace) * this.noise_scale, (point_y + this.y_displace)*this.noise_scale) * radius);
                  // calculation of new coordinates incorporating displacement
                  point_x = this.x + cos(ang) * radius;
                  point_y = this.y + sin(ang) * radius;
  
                  vertex(point_x, point_y, point_x, point_y);
               //   console.log(point_x);
              }
              endShape();
          }
          pop();
     //   }
    }
  
    stop() {
      this.growing = false;
    }
  }