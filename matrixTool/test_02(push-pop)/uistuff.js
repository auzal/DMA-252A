let translateXText;
let translateYText;
let translateButton;

let rotateValueText;
let rotateButton;

let rectXText;
let rectYText;
let rectButton;

let deleteButton;
let clearButton;

let textCheckbox;
let textCheckboxState;

let pushButton;
let popButton;

function linkUi(){
    translateXText = document.getElementById('x-translate-value');
    translateYText = document.getElementById('y-translate-value');
    translateButton = document.getElementById('translate-button');
    translateButton.addEventListener('click', onTranslate);

    rotateValueText = document.getElementById('rotate-value');
    rotateButton = document.getElementById('rotate-button');
    rotateButton.addEventListener('click', onRotate);

    rectXText = document.getElementById('x-rect-value');
    rectYText = document.getElementById('y-rect-value');
    rectButton = document.getElementById('rect-button');
    rectButton.addEventListener('click', onRect);

    deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', onDelete);

    clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', onClear);

    pushButton = document.getElementById('push-button');
    pushButton.addEventListener('click', onPush);

    popButton = document.getElementById('pop-button');
    popButton.addEventListener('click', onPop);

  //  textCheckbox = document.getElementById('test-box');
}

function onTranslate(){
    // console.log("translate click");
    // console.log(translateXText.value);
    // console.log(translateYText.value);
    let xStr = translateXText.value;
    let yStr = translateYText.value;
    if(isNumeric(xStr) && isNumeric(yStr)){
        addTranslation(parseFloat(xStr), parseFloat(yStr));
    }



}

function onRotate(){
    // console.log("rotate click");
    // console.log(rotateXText.value);
    // console.log(rotateYText.value);
    let degreesStr = rotateValueText.value;
    if(isNumeric(degreesStr)){
        addRotation(parseFloat(degreesStr));
    }
}

function onRect(){
     console.log("rect click");
    // console.log(rectXText.value);
    // console.log(rectYText.value);
    // console.log(isNumeric(rectXText.value));
    // console.log(parseFloat(rectXText.value));
    let xStr = rectXText.value;
    let yStr = rectYText.value;
    if(isNumeric(xStr) && isNumeric(yStr)){
        addRectangle(parseFloat(xStr), parseFloat(yStr));
    }
}

function onDelete(){
    console.log("delete");
    
    if(actions.length>1){
    decreaseYAcum();
    actions.pop();
    }
}

function onClear(){
    console.log("clear");
    actions = [];
    yAcum = fontSize * 1;
    addInitial();

}

function onPush(){
    console.log("push");
    addPush();
}

function onPop(){
    addPop();
    console.log("pop");
}

function updateCheckBoxes(){
    
    if(textCheckbox.checked != textCheckboxState){
        textCheckboxState = textCheckbox.checked;
        console.log(textCheckboxState);
    }

}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function addInitial(){
    let aux = new Action("initial", 0,0);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
   
}

function addTranslation(x,y){
    let aux = new Action("translate", x, y);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
    translateXText.value ="0";
    translateYText.value ="0";
}

function addRotation(deg){
    let aux = new Action("rotate", deg, 0);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
    rotateValueText.value ="0";
}

function addRectangle(x,y){
    let aux = new Action("rect", x, y);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
    rectXText.value = "0";
    rectYText.value = "0";
    
}

function addPush(){
    let aux = new Action("push", 0, 0);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
}

function addPop(){
    let aux = new Action("pop", 0, 0);
    aux.setPosition(xAcum,yAcum);
    actions.push(aux);
    updateYAcum();
}

function updateYAcum(){
    yAcum += actionHeight;
}

function decreaseYAcum(){
    yAcum -= actionHeight;
}
