 let video;
 let objects = []
 let yolo;
 let button;
 let startButton;

function setup (){
    createCanvas(500, 400);
    video = createCapture(VIDEO);
    video.size(320, 240);
    video.hide();
    yolo = ml5.YOLO(video, modelLoaded);
    button = createButton('StopDetection')
    startButton = createButton('StartDetection')
    button.mousePressed(stopDetection)
    startButton.mousePressed(showDetection)
    
}

 function draw() {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
      fill(255, 255, 255);
      strokeWeight(2);
      noStroke();
      text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
      noFill();
      stroke(0, 0, 255);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }

 

  function modelLoaded(){
    console.log("Model Is Ready!");
    startDetection()
}

function startDetection(){
    yolo.detect((err,result) => {
        result ? objects = result : console.error(err);
        startDetection()
    })
}

function stopDetection(){
    noLoop()
    createCanvas(0,0)
    
}

function showDetection(){
    loop()
    createCanvas(500,400)
}




