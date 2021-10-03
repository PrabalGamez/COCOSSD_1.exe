img="";
status = "";
object = [];

//id="status"

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(690, 420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw(){
    image(img, 0, 0, 690, 420);
    if (status != ""){
        for (i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status : Object(s) Detected";
            fill("#FFe000");
            percentage = floor(object[i].confidence * 100);
            text(object[i].label+" "+percentage+"%",object[i].x + 25,object[i].y + 25);
            textSize(20);
            noFill();
            stroke("#FFe000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}

function modelLoaded(){
    console.log("ModelLoaded +");
    status = true;
    objectDetector.detect(img, gotDetection);
}

function gotDetection(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        object = result;
    }
}