let areaWidth = 400;
let areaHeight = 400;
let gridSpacing = 10;


let font;
let fontSize = 12;
let yAcum = fontSize * 1;
let actionHeight = fontSize * 2;
let xAcum = 10;

let actions = [];
let actionsIndex = 0;


function preload(){
  font = loadFont("assets/FiraCode-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth - 300, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  linkUi();
  addInitial();
}

function draw() {
  checkActionsHover();
  checkPushPop();
 // updateCheckBoxes();
  background(248, 238, 203);
  push();
  translate(width/2, height/2);
  translate(-areaWidth/2, -areaHeight/2);
  push();
  applyActions();
  renderMatrixGrid();
  pop();
  renderCanvasGrid();
  pop();

  renderFrame();
  renderActionsList();

}

function renderFrame(){
  push();
  noStroke();
  fill(0,150);
  beginShape();
  vertex(0,0,);
  vertex(width,0);
  vertex(width,height);
  vertex(0,height);
  beginContour();
  vertex(width/2 + areaWidth/2, height/2 + areaHeight/2);
  vertex(width/2 + areaWidth/2, height/2 - areaHeight/2);
  vertex(width/2 - areaWidth/2, height/2 - areaHeight/2);
  vertex(width/2 - areaWidth/2, height/2 + areaHeight/2);
  endContour();
  endShape();
  translate(width/2, height/2);
  noFill();
  stroke(0,128);
  strokeWeight(3);
  rect(0,0, areaWidth, areaHeight);
  pop();

}

function renderCanvasGrid(){
  push();
  stroke(0, 20);
  for(let i = 0 ; i <= areaWidth ; i += gridSpacing){
    line(i,0,i,areaHeight);
  }
  for(let i = 0 ; i <= areaHeight ; i += gridSpacing){
    line(0,i,areaWidth,i);
  }
  pop();
}

function renderMatrixGrid(){
  push();
  strokeWeight(1);
  stroke(0, 255, 0, 50 );
  for(let i = -areaWidth ; i <= areaWidth ; i += gridSpacing){
    line(i,-areaHeight,i,areaHeight);
  }
  stroke(255,0, 0, 50 );
  for(let i = -areaHeight ; i <= areaHeight ; i += gridSpacing){
    line(-areaWidth,i,areaWidth,i);
  }

  stroke(255,0,0);
  strokeWeight(2);
  for(let i = -areaWidth ; i <= areaWidth ; i += gridSpacing*10){
   line(i,-gridSpacing/2,i,gridSpacing/2);
  }
  stroke(0,180,0);
  for(let i = -areaHeight ; i <= areaHeight ; i += gridSpacing*10){
    line(-gridSpacing/2,i,gridSpacing/2,i);
  }


  let axisScale = 1.05;
  strokeWeight(2);
  stroke(255,0,0);
  line(-areaWidth  * axisScale,0,areaWidth  * axisScale,0);
  stroke(0,180,0);
  line(0,-areaHeight  * axisScale,0,areaHeight  * axisScale);
  push();
  translate(areaWidth  * axisScale, 0);
  noFill();
  stroke(255,0,0);
  triangle(0,-areaWidth*.05,areaWidth*.1,0,0,areaWidth*.05);
  fill(255, 0,0);
  noStroke();
  textFont(font);
  textSize(18);
  text('X', 4, 6);
  pop();
  push();
  translate(0, areaHeight  * axisScale);
  rotate(90);
  noFill();
  stroke(0,180,0);
  triangle(0,-areaWidth*.05,areaWidth*.1,0,0,areaWidth*.05);
  fill(0,180,0);
  noStroke();
  textFont(font);
  textSize(18);
  text('Y', 4, 6);
  pop();
  triangle()
  pop();
}


function renderActionsList(){
  //console.log(actionsIndex);
  for(let i = 0 ; i < actions.length ; i++){
    let opacity = 1;
    if(i > actionsIndex){
      opacity = 0.2;
    }
    actions[i].render(opacity);
  }
}


function applyActions(){
  rectMode(CENTER);
//  console.log(actionsIndex);
  if(actions.length > 0){
    for(let i = 0 ; i <= actionsIndex ; i++){
      let action = actions[i];
      if(action.type === "translate"){
        translate(action.x, action.y);
      }else if(action.type === "rotate"){
        rotate(action.x);
      }else if(action.type === "rect"){
        push();
        stroke(0,0,255,128);
        noFill();
        strokeWeight(2);
        rect(action.x, action.y, action.size, action.size);
        pop();
      }else if(action.type === "push"){
        if(action.active){
          push();
        }
      }else if(action.type === "pop"){
        if(action.active){
          pop();
        }
      }
    }
  }
}

function checkActionsHover(){
  let found = false;
  actionsIndex = 0;
  for(let i = 0 ; i < actions.length ; i++){
    if(actions[i].isMouseOver()){
      actionsIndex = i;
      found = true;
      break;
    }
  }
  if(!found && actions.length > 0){
    actionsIndex = actions.length-1;
  }
 // console.log(actionsIndex);
}


function checkPushPop(){
  let firstPush = -1;

  //let pushIndexes = [];

  for(let i = 0 ; i < actions.length ; i ++){
    if(actions[i].type === 'push'){
   //   pushIndexes.push[i];
      actions[i].active = false;
      actions[i].connectionOffset = 0;
    }else if(actions[i].type === 'pop'){
      actions[i].active = false;
    }

  }

  for(let i = 0 ; i <= actionsIndex ; i ++){
    if(actions[i].type === 'pop'){
      if(i>1){ // 0 is always initial state
        for(let j = i ; j >= 0 ; j-- ){
          if(actions[j].type === 'push' && !actions[j].active){
            actions[i].active = true; // activate pop
            actions[j].active = true; // activate push
            actions[j].pairPosition = createVector(actions[i].xRender, actions[i].yRender);
            actions[j].pairIndex = i;
            break;
          }
        }
      }
    }

  }

  for(let i = 0 ; i < actions.length ; i ++){
    if(actions[i].type === 'push' && actions[i].active){
      for(let j = i+1 ; j < actions[i].pairIndex ; j++){
        if(actions[j].type === 'push' && actions[j].active){
          actions[i].connectionOffset += 10;
        }
      }
    }

  }

}