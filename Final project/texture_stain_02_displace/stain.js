class Stain {

    constructor(x, y, control){
      this.x = x; // x y coordinates for stain center
      this.y = y;
      this.renderX;
      this.renderY;
      this.diam = 0; // current general diameter of stain
      this.max_diam = 400; // maximum diameter for stain
      this.diam_increment = 1.5; // growth per frame for stain diameter
      this.max_variance = 0.4; // how much smaller is the smallest circle? (normalized)
      this.steps = 50; // detail variable for deformed circles (number of steps in the circumference)
      this.layers = 1; // number of circles or "layers" stacked in each frame
      this.noise_scale;
      this.growing = true;
      this.x_displace = random(0, 500);;
      this.y_displace = random(0, 500);;
      let min = map(control, 0, 1, 3, 20);
      let max = map(control, 0, 1, 17, 100);
      this.life = random(min,max);
    //  this.life = random(15,30);;
      let a = color(230, 128, 74, 5);
      let b = color(56, 232, 192, 5);
      let lerp = random(1);
     // this.imgColor = imget(int(this.x), int(this.y));
      this.opacity = 5;
      //this.paintColor = color(red(this.imgColor), green(this.imgColor), blue(this.imgColor), this.opacity) 
      this.paintColor = color(255,0,0,15);
      this.displaceAngle = random(TWO_PI);
      this.control = 0;
    }
  
  update(control) { 
    if (this.growing) {
    this.diam += this.diam_increment;
    }
    //  this.noise_scale = map(mouseX, 0, width, 0, 0.1); // deformation amount
    this.noise_scale = map(mouseY, 0, height, 0, 0.1); // deformation amount
    this.noise_scale = 0.03; // deformation amount
    
    this.life -- ;
    if(this.life <= 0){
        this.stop();
    }
    this.renderX = this.x;
    this.renderY = this.y;

    let displaceMax = map(control, 0, 1, 0, 200);
    let noiseScale = 0.005;
    let displaceDist = noise((this.x + frameCount + this.x_displace) * noiseScale) * displaceMax;
    this.renderX += cos(this.displaceAngle) * displaceDist;
    this.renderY += sin(this.displaceAngle) * displaceDist;
    this.control = control;
  }

  render(g) {
    //console.log("a");
  //   if (this.growing) {
      g.push();
      g.translate(this.renderX, this.renderY);
      g.noStroke();
    //  fill(imget(int(this.x/2), int(this.y/2)), this.opacity);
    //   fill(this.paintColor);
    g.noFill();
    //stroke(255,0,0);
    //tint(255,200);

    g.push();
    g.fill(0, 60);
    g.translate(5*this.control,5*this.control);
    if(this.control > 0){
    // rect(0,0,50,50);
      for (let c = 0; c < this.layers; c++) {
        g.beginShape();
      
        for (let i = 0; i < this.steps; i ++) {
            // calculation of each point in circumference
            let ang =  i * (TWO_PI/this.steps);
            //  float radius = diam/2;
            // calculation of radius including diameter variance
            let radius = this.diam/2 - ((this.diam/2) * map(c, 0, this.layers, 0, this.max_variance));
            let point_x =  cos(ang) * radius;
            let point_y =   sin(ang) * radius;
            // calculation of new radius based on noise. this is messy
            radius = radius +  (noise((point_x + frameCount/2 + this.x_displace) * this.noise_scale, (point_y + this.y_displace)*this.noise_scale) * radius);
            // calculation of new coordinates incorporating displacement
            point_x = cos(ang) * radius;
            point_y =  sin(ang) * radius;

            g.vertex(point_x, point_y);
          //   console.log(point_x);
          }
          g.endShape(CLOSE);
      }
    }
    g.pop();
    for (let c = 0; c < this.layers; c++) {
      g.texture(img);
      g.beginShape();
    
      for (let i = 0; i < this.steps; i ++) {
          // calculation of each point in circumference
          let ang =  i * (TWO_PI/this.steps);
          //  float radius = diam/2;
          // calculation of radius including diameter variance
          let radius = this.diam/2 - ((this.diam/2) * map(c, 0, this.layers, 0, this.max_variance));
          let point_x =  cos(ang) * radius;
          let point_y =   sin(ang) * radius;
          // calculation of new radius based on noise. this is messy
          radius = radius +  (noise((point_x + frameCount/2 + this.x_displace) * this.noise_scale, (point_y + this.y_displace)*this.noise_scale) * radius);
          // calculation of new coordinates incorporating displacement
          point_x = +cos(ang) * radius;
          point_y =  sin(ang) * radius;

          g.vertex(point_x, point_y, this.x+point_x, this.y+point_y);
        //   console.log(point_x);
        }
        g.endShape(CLOSE);
    }
    g.pop();
    //   }
  }

  stop() {
    this.growing = false;
  }
}