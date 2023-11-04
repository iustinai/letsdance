import { random } from 'p5';

let currentScene = 0;
let reference = 0;
let song;
const interval1 = 4500;
const interval2 = 8000;
const interval3 = 10000;
//const interval4 = 12000;
//const interval5 = 16000;
//const interval6 = 32000;
//const interval7 = 35000;

let size = 10;
let growing = true;
let r = random(0, 200);
let g = random(0, 200);
let b = random(0, 200);
let a = random(255);


function setup() {
  createCanvas(800, 800);
  background(220);
  angleMode("DEGREES");
  stroke(0);
  frameRate(5);

}

function preload() {
  song = loadSound("./assets/waterfromavineleaf.mp3");
}

function draw() {
  let angle = 0;

  currentScene = getCurrentScene();
  translate(width / 2, height / 2);
  switch (currentScene) {
    case 1:
      waveMaker();
      break;
    case 2:
      firstScene();
      break;
    case 3:
      secondScene();
      break;
      case 4:
      thirdScene();
  }

  //showTime();
}

const getCurrentScene =(ms)=> {

  
  if (ms < reference + interval1) {
    return 1;
  } else if (ms < reference + interval2) {
    return 2;
  } else if (ms < reference + interval3) {
    return 3;
  } else {
    reference = ms;
    return 1;
  }
}

//function showTime() {
 // const ms = millis();
 // push();
//}

function mouseClicked() {
  //song.play();
  if (song.isPlaying()) {
    song.stop(); // If the song is currently playing, stop it
  } else {
    song.play(); // If the song is not playing, start playing it
  }
}

const waveMaker=()=> {
    beginShape();
    for (let i = 0; i < 359; i++) {
      let r1Min=map(sin(frameCount),-1,1,50,100);
      let r1Max=map(sin(frameCount*2),-1,1,50,0);

      let r2Min=map(sin(frameCount/2),-1,1,100,50);
      let r2Max=map(sin(frameCount),-1,1,0,100);

      let r1 = map(sin(i*5), -1, 1, r1Min, r1Max);
      let r2 = map(sin(i * 5+90),-1,1, r2Min,r2Max);
      let r= r1+r2;
      let x = r*cos(i);
      let y = r*sin(i);
      vertex(x, y);
      endShape(CLOSE);
    
  }
}
const firstScene =(xPos,yPos,h)=>{
  
  push();
  translate(xPos, yPos);
  stroke("#FFEB3B");
  strokeWeight(3);
  fill("#FF5722");
  beginShape();
  vertex(-h / 2, -h / 2); // Adjust vertices relative to the center
  vertex(h / 2, -h / 2);
  vertex(h / 2, h / 2);
  vertex(-h / 2, h / 2);
  endShape(CLOSE);
  pop();
  if (growing) {
    size += 2
  } else {
    size -= 2;}

}
const secondScene =()=>{

  translate(200, 200);
  strokeWeight(16);
  stroke(252, 238, 33);
  let x = r * cos(angle);
  let y = r * sin(angle);
  point(x, y);

  angle += 0.04;
  r -= 0.2;
}
const thirdScene =()=>{
    /*let r = random(0, 200);
    let g = random(0, 200);
    let b = random(0, 200);
    let a = random(255);*/
    noFill();
    xoff = xoff + 0.02;
    let n = noise(xoff) * width;

    stroke(200, 10, b, 70);
    strokeWeight(1);

    push(); // Save the current transformation matrix
    translate(n, 30);
    rotate(angle);
    quad(-n / 2, -30 / 2, n / 2, -30 / 2, n / 2, 30 / 2, -n / 2, 30 / 2);
    pop(); // Restore the original transformation matrix

    stroke(0, 0, 240, 70);

    push();
    translate(n, 700);
    rotate(angle);
    quad(-n / 2, -30 / 2, n / 2, -30 / 2, n / 2, 30 / 2, -n / 2, 30 / 2);
    pop();

    stroke(0, 200, 250, 50);

    push();
    translate(0, n);
    rotate(angle);
    quad(-30 / 2, -n / 2, 30 / 2, -n / 2, 30 / 2, n / 2, -30 / 2, n / 2);
    pop();

    angle += 1; // Rotate the quads
  };
//const fourthScene =()=>{
  
//};
