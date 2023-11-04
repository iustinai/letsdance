let currentScene = 0;
let reference = 0;
let song;
const interval1 = 10000;
const interval2 = 20000;
const interval3 = 30000;
const interval4 = 45000;

let size = 10;
let growing = true;

// first Scene 
let firstSpiralAngle = 0;
let firstSpiralR = 0;
let secondSpiralAngle = 0;
let secondSpiralR = 150;
let thirdSpiralAngle = 0;
let thirdSpiralR = -150;
const rRatio = 0.5;
const angleRatio = 0.07;

// second Scene
let a = 0;
let numb = 150;

// third Scene
let angle = 0;
let xoff = 0.0;
let clearBackground = false; // Variable to control background clearing

//forth Scene
let angle4 = 0;
let xoff4 = 0.0;
let clearBackground4 = false; // Variable to control background clearing


function setup() {
  createCanvas(800, 800);
  background(220);
  angleMode("DEGREES");
  stroke(0);
}

function preload() {
  song = loadSound("./assets/waterfromavineleaf.mp3");
}

const waveMaker=()=> {
  beginShape();
  for (let i = 0; i < 359; i++) {
    let r1Min=map(sin(frameCount/10),-1,1,50,100);
    let r1Max=map(sin(frameCount*2/10),-1,1,50,0);

    let r2Min=map(sin(frameCount/20),-1,1,100,50);
    let r2Max=map(sin(frameCount/10),-1,1,0,100);

    let r1 = map(sin(i*5), -1, 1, r1Min, r1Max);
    let r2 = map(sin(i * 5+90),-1,1, r2Min,r2Max);
    let r= r1+r2;
    let x = r*cos(i);
    let y = r*sin(i);
    vertex(x, y);
    endShape(CLOSE);
  }
}

const getCurrentScene = (ms) => {
  if (ms < reference + interval1) {
    return 1;
  } else if (ms < reference + interval2) {
    return 2;
  } else if (ms < reference + interval3) {
    return 3;
  } else if (ms < reference + interval4) {
    return 4;
  } else {
    reference = ms;
    return 1;
  }
}

function draw() {
  const ms = millis();
  currentScene = getCurrentScene(ms);
  switch (currentScene) {
    case 1:
      translate(width / 2, height / 2);
      frameRate(144);
      firstScene(ms);
      break;
    case 2:
      translate(0,0);
      frameRate(8);
      background(0);
      secondScene();
      break;
    case 3:
      translate(0,0);
      frameRate(144);
      if (clearBackground) {
        background(255);
      }
      thirdScene();
      break;
    case 4:
      if (clearBackground) {
        r = random(0, 200);
        g = random(0);
        b = random(3, 200);
        a = random(255); // Fixed typo in random range
        background(color(r,g,b));
      }
      forthScene();
      break;
  }
}

function mouseClicked() {
  //song.play();
  if (song.isPlaying()) {
    song.stop(); // If the song is currently playing, stop it
  } else {
    song.play(); // If the song is not playing, start playing it
  }
}


const spiral1 = () => {
  strokeWeight(16);
  stroke(124, 165, 222);
  let x = firstSpiralR * cos(firstSpiralAngle);
  let y = firstSpiralR * sin(firstSpiralAngle);
  point(x, y);

  firstSpiralAngle -= angleRatio;
  firstSpiralR += rRatio;
}

const spiral2 = () => {
  strokeWeight(16);
  stroke(40, 94, 168);
  let x = secondSpiralR * cos(secondSpiralAngle);
  let y = secondSpiralR * sin(secondSpiralAngle);
  point(x, y);

  secondSpiralAngle += angleRatio;
  secondSpiralR += rRatio;
}

const spiral3 = () => {
  strokeWeight(16);
  stroke(252, 238, 40);
  let x = thirdSpiralR * cos(thirdSpiralAngle);
  let y = thirdSpiralR * sin(thirdSpiralAngle);
  point(x, y);

  thirdSpiralAngle += angleRatio;
  thirdSpiralR += rRatio;
}

const firstScene = (ms) =>{
  spiral1();
  if(ms > reference + interval1/7)
  {
    spiral2();
    spiral3();
  }
}


const secondScene=()=>{
  
  const side = 30;
      let xPos = 15;
      for (let i = 0; i < numb; i++) {
          a += 4;
          let yPos = map(sin(a), -1, 1, 200, 600);
          noStroke();
          fill(109, map(cos(a), -1, 1, 0, 255), map(sin(a), -1, 1, 0, 255));
  
          circle(xPos, yPos, side);
          xPos += side + 15;
      }
      textSize(40);
      text("BE",100, 300);
      text("WATER", 100, 400);
      text("MY", 500, 500);
      text("FRIEND", 500, 600);
}



const thirdScene = () => {
  r = random(0, 200);
  g = random(0);
  b = random(3, 200);
  a = random(255); // Fixed typo in random range
  let centerX = width / 2;
  let centerY = height / 2;
  noFill();
  xoff = xoff + 0.02;
  let n = noise(xoff) * width; // Use 'width' instead of 'windowWidth'

  // Draw the first quad
  quad(random(0,800), 40, n, 30, 500, 340,n , 250, 20, 100);
  stroke(r, 10, b, 70);
  strokeWeight(4);

  // Draw the second quad
  quad(
    centerX + cos(angle + 30) * 300, centerY + sin(angle + 30) * 200,
    centerX + cos(angle + 90) * 300, centerY + sin(angle + 90) * 200,
    centerX + cos(angle + 150) * 300, centerY + sin(angle + 150) * 400,
    centerX + cos(angle + 210) * 300, centerY + sin(angle + 210) * 400
  );
  stroke(0, 0, 240, 50);

  
  // Draw the third quad
  quad(random(0,200), n, n,500, 550, n, 400, n, n, 433);
  stroke(0, 200, 250, 50);
  
  push();
  scale(-1, 1);
  pop();

  rotate(angle);
  angleMode(DEGREES);
  angle++;
  
  // Set clearBackground to false after a certain number of frames
  if (frameCount % 40 == 0) {
    clearBackground = true;
  }
  else {
    clearBackground = false;
  }
}

const forthScene = () => {
  sharpCircle(width/2,height/2);
  sharpCircle(100,100);
  sharpCircle(0,height);
  sharpCircle(width,0);
  sharpCircle(width-100,height-100);
  
  text("WATER",500,300);
  text("IS LIFE",150,650)
  textSize(80);
  
  
  if (frameCount % 40 == 0) {
    clearBackground = true;
  } else {
    clearBackground = false;
  }
}

const sharpCircle = (centerX , centerY) =>
{
  r = random(0, 200);
  g = random(0);
  b = random(3, 200);
  a = random(255); // Fixed typo in random range
  noFill();
  xoff = xoff + 0.02;
  let n = noise(xoff) * width; // Use 'width' instead of 'windowWidth'

  // Draw the first quad
  quad(
    centerX + cos(angle) * 100, centerY + sin(angle) * 100,
    centerX + cos(angle + 60) * 100, centerY + sin(angle + 60) * 100,
    centerX + cos(angle + 120) * 100, centerY + sin(angle + 120) * 100,
    centerX + cos(angle + 180) * 100, centerY + sin(angle + 180) * 100
  );
  stroke(r, 10, b, 70);
  strokeWeight(4);

  // Draw the second quad
  quad(
    centerX + cos(angle + 30) * 150, centerY + sin(angle + 30) * 150,
    centerX + cos(angle + 90) * 150, centerY + sin(angle + 90) * 150,
    centerX + cos(angle + 150) * 150, centerY + sin(angle + 150) * 150,
    centerX + cos(angle + 210) * 150, centerY + sin(angle + 210) * 150
  );
  stroke(0, 0, 240, 50);

  // Draw the third quad
  quad(
    centerX + cos(angle + 45) * 200, centerY + sin(angle + 45) * 200,
    centerX + cos(angle + 105) * 200, centerY + sin(angle + 105) * 200,
    centerX + cos(angle + 165) * 200, centerY + sin(angle + 165) * 200,
    centerX + cos(angle + 225) * 200, centerY + sin(angle + 225) * 200
  );
  stroke(0, 200, 250, 50);

  push();
  scale(-1, 1);
  pop();

  angle += 1;
}