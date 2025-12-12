/* References: https://p5-demos.glitch.me/, https://compform.net/tiles/, https://editor.p5js.org/ambikajo/sketches/cKu3Gn0Po, 
https://hazzzaa.itch.io/forest, https://www.youtube.com/watch?v=OTNpiLUSiB4, https://pikuma.com/blog/isometric-projection-in-games,
https://www.youtube.com/watch?v=KkyIDI6rQJI, https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur */

/* References: https://p5-demos.glitch.me/, https://compform.net/tiles/, https://editor.p5js.org/ambikajo/sketches/cKu3Gn0Po, 
https://hazzzaa.itch.io/forest, https://www.youtube.com/watch?v=OTNpiLUSiB4, https://pikuma.com/blog/isometric-projection-in-games,
https://www.youtube.com/watch?v=KkyIDI6rQJI, https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur */

let scene1, scene2, winState, scene3;
let gameoverState = false;
let sceneCounter = 0;
let intro, introText, startButton, homeButton, refreshButton;
let ground, coral, player, bubbles, rocks, identity, kelp, fish, ripples, hole;
let depthGradient;
let bgImg;
let moveX = 0;
let moveY = 0;
let camX = 0;
let camY = 0;
let moveSpeedX, moveSpeedY;
let easeMove = 0.2;
let magX = 0;
let magY = 0;
let persp = 0.75;
let pg;
let mapSize = 25;
let tileWidth = 1000;
let tileHeight = 500;
let worldWidth = mapSize * (tileWidth / 2);
let worldHeight = mapSize * (tileHeight / 2);
let x_screen = [];
let y_screen = [];
let x_start = -tileWidth / 2;
let y_start = -tileHeight / 2;
let tileTypes = ['A', 'B', 'C'];
let tileType = [];
let rockTypes = ['A', 'B', 'C'];
let rockType = [];
let kelpTypes = ['A', 'B', 'C'];
let kelpType = [];
let coralTypes = ['A', 'B', 'C'];
let coralType = [];
let tiles;
let tilesList1;
let threshold = 0.4;
let blendThreshold = 0.05;
let vignette;
let vignetteSize = 400;
let darkest = 200;
let bubbleSound, scoreSound, winSound, gameoverSound, fishSound;
let sampleIsLooping = false;
let winIsLooping = false;
let fishIsLooping = false;
let gameoverSoundIsLooping = false;
let soundOff, soundOn;
let margin;
let dx, dy, targetX, targetY;
let d = [];
let d2 = [];
let score = 0;
let karla, karlaBold;
let mult = 0.25;
let koifish;


function preload() {
  bubbleSound = loadSound('data/bubbles.wav');
  scoreSound = loadSound('data/score.wav');
  winSound = loadSound('data/win.wav');
  gameoverSound = loadSound('data/gameover.wav');
  fishSound = loadSound('data/birds.wav'); // You can keep this or replace with ocean/fish sounds later
  karla = loadFont('data/Karla-Regular.ttf');
  karlaBold = loadFont('data/Karla-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  scene1 = new Scene1();
  scene2 = new Scene2();
  scene3 = new Scene3();
  soundOn = createImg("data/sound-off.png", "Sound on button",
  '',
  () => {
    soundOn.size(50, AUTO);
  });
  soundOff = createImg("data/sound-on.png", "Sound off button",
    '',
    () => {
      soundOff.size(50, AUTO);
    });
}

function draw() {
  switch (sceneCounter) {
    case 0:
      scene1.show();
      break;
    case 1:
      scene2.show();
      break;
    case 2:
      scene3.show();
      break;
    default:
      scene1.show();
      break;
  }
}

// Homepage
class Scene1 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    depthGradient = new DepthGradient();
    hole = new Hole();
    coral = new Coral();
    kelp = new Kelp();
    rocks = new Rocks();
    bubbles = new Bubbles();
    ripples = new Ripples();
    koifish = new Koifish();
    intro = new Intro();
    homeButton = new HomeButton();
    startButton = new StartButton();

    // Dims light
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, 100), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {
    background(0);
    noStroke();
    ground.show();
    depthGradient.show();
    hole.show();
    rocks.show();
    coral.show();
    ripples.show();
    kelp.show();
    bubbles.show();
    koifish.show();
    push();
    imageMode(CENTER)
    image(this.vignette, width / 2, height / 2, width * 3, height * 3);
    pop();
    intro.show();
    startButton.show();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
  }
}

// Game Scene
class Scene2 {

  constructor() {
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    depthGradient = new DepthGradient();
    hole = new Hole();
    coral = new Coral();
    kelp = new Kelp();
    rocks = new Rocks();
    identity = new Identity();
    player = new Player();
    bubbles = new Bubbles();
    ripples = new Ripples();
    koifish = new Koifish();
    winState = new WinState();
    hole = new Hole();

    // Setup torchlight
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, vignetteSize), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {

    background(0);
    noStroke();
    depthGradient.show();
    push();
    translate(camX, camY);
    ground.show();
    hole.show();
    rocks.show();
    coral.show();
    if (score < 5) {
      ripples.show();
    }
    identity.show();
    pop();
    player.show();
    push();
    translate(camX, camY);
    kelp.show();
    pop();
    bubbles.show();
    koifish.show();
    moveCamera();
    homeButton.show();

    // Update torchlight
    push();
    imageMode(CENTER)
    image(this.vignette, mouseX, mouseY, width * 3 * (score + 1), height * 3 * (score + 1));
    pop();

    checkCollision();
    showScore();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
    vignetteSize = 400 - (score * 100);
    winState.show();

  }
}

// Game Over Scene
class Scene3 {
  constructor() {
    cursor(ARROW);
    margin = width * 0.15;
    moveX = -worldWidth / 2;
    moveY = -worldHeight / 2;
    ground = new Ground();
    depthGradient = new DepthGradient();
    hole = new Hole();
    coral = new Coral();
    kelp = new Kelp();
    rocks = new Rocks();
    bubbles = new Bubbles();
    ripples = new Ripples();
    koifish = new Koifish();
    refreshButton = new RefreshButton();

    // Dims light
    this.vignette = createImage(550, 400);
    this.vignette.loadPixels();
    for (let ii = 0; ii < this.vignette.width; ii++) {
      for (let jj = 0; jj < this.vignette.height; jj++) {
        this.vignette.set(ii, jj, [0, 0, 0, constrain(map(dist(this.vignette.width / 2, this.vignette.height / 2, ii, jj), 20, 50, 0, 100), 0, darkest)]);
      }
    }
    this.vignette.updatePixels();
  }

  show() {
    background(0, 100);
    depthGradient.show();
    ground.show();
    hole.show();
    rocks.show();
    coral.show();
    ripples.show();
    kelp.show();
    bubbles.show();
    koifish
    push();
    imageMode(CENTER)
    image(this.vignette, width / 2, height / 2, width * 3, height * 3);
    pop();
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
    push();
    fill(255);
    textAlign(CENTER);
    textSize(60);
    textFont(karlaBold);
    text("Game Over", width / 2, height / 2 - 100);
    pop();

    if (!gameoverSoundIsLooping) {
      gameoverSound.play();
      gameoverSoundIsLooping = true;
    }
    refreshButton.show();
  }
}

class Intro {
  constructor() {
    this.waveOffset = 0;
    this.bubbles = [];
    
    // Create floating bubbles for decoration
    for (let i = 0; i < 15; i++) {
      this.bubbles.push({
        x: random(width * 0.15, width * 0.85),
        y: random(150, 700),
        size: random(5, 20),
        speed: random(0.5, 1.5),
        wobble: random(0, TWO_PI)
      });
    }
  }

  show() {
    push();
    
    // Animated wave effect background
    this.waveOffset += 0.02;
    
    // Main container with ocean gradient
    noStroke();
    
    // Draw wavy background shape
    fill(20, 60, 100, 200); // Deep ocean blue
    beginShape();
    for (let x = width * 0.1; x <= width * 0.9; x += 20) {
      let y = 200 + sin(x * 0.01 + this.waveOffset) * 15;
      if (x === width * 0.1) {
        vertex(x, y);
      } else {
        curveVertex(x, y);
      }
    }
    vertex(width * 0.9, 750);
    vertex(width * 0.1, 750);
    endShape(CLOSE);
    
    // Lighter overlay with gradient effect
    fill(40, 100, 140, 180); // Lighter ocean blue
    beginShape();
    let startX = width * 0.12;
    for (let x = startX; x <= width * 0.88; x += 20) {
      let y = 220 + sin(x * 0.01 + this.waveOffset + 1) * 12;
      if (x === startX) {
        vertex(x, y);
      } else {
        curveVertex(x, y);
      }
    }
    vertex(width * 0.88, 730);
    vertex(startX, 730);
    endShape(CLOSE);
    
    // Animated bubbles decoration
    for (let bubble of this.bubbles) {
      bubble.y -= bubble.speed;
      bubble.wobble += 0.03;
      let wobbleX = sin(bubble.wobble) * 10;
      
      // Reset bubble when it reaches top
      if (bubble.y < 150) {
        bubble.y = 700;
        bubble.x = random(width * 0.15, width * 0.85);
      }
      
      // Draw bubble
      noStroke();
      fill(255, 255, 255, 50);
      ellipse(bubble.x + wobbleX, bubble.y, bubble.size);
      fill(255, 255, 255, 100);
      ellipse(bubble.x + wobbleX - bubble.size * 0.2, bubble.y - bubble.size * 0.2, bubble.size * 0.3);
    }
    
    // Decorative starfish (top left)
    push();
    translate(width * 0.15, 240);
    rotate(frameCount * 0.005);
    this.drawStarfish(25, color(255, 180, 100));
    pop();
    
    // Decorative starfish (top right)
    push();
    translate(width * 0.85, 260);
    rotate(-frameCount * 0.005);
    this.drawStarfish(20, color(255, 150, 150));
    pop();
    
    // Decorative seaweed/kelp (left side)
    fill(60, 140, 120, 150);
    noStroke();
    for (let i = 0; i < 3; i++) {
      let kelpX = width * 0.13 + i * 8;
      let waveAmt = sin(this.waveOffset + i) * 5;
      beginShape();
      vertex(kelpX, 700);
      vertex(kelpX + waveAmt, 600);
      vertex(kelpX + waveAmt * 2, 500);
      vertex(kelpX + waveAmt, 400);
      vertex(kelpX + waveAmt * 2, 300);
      vertex(kelpX + waveAmt * 2 + 5, 300);
      vertex(kelpX + waveAmt + 5, 400);
      vertex(kelpX + waveAmt * 2 + 5, 500);
      vertex(kelpX + waveAmt + 5, 600);
      vertex(kelpX + 5, 700);
      endShape(CLOSE);
    }
    
    // Decorative seaweed (right side)
    for (let i = 0; i < 3; i++) {
      let kelpX = width * 0.87 - i * 8;
      let waveAmt = sin(this.waveOffset + i + PI) * 5;
      beginShape();
      vertex(kelpX, 700);
      vertex(kelpX + waveAmt, 600);
      vertex(kelpX + waveAmt * 2, 500);
      vertex(kelpX + waveAmt, 400);
      vertex(kelpX + waveAmt * 2, 300);
      vertex(kelpX + waveAmt * 2 + 5, 300);
      vertex(kelpX + waveAmt + 5, 400);
      vertex(kelpX + waveAmt * 2 + 5, 500);
      vertex(kelpX + waveAmt + 5, 600);
      vertex(kelpX + 5, 700);
      endShape(CLOSE);
    }
    
    // === TITLE ===
    fill(255, 255, 255);
    textFont(karlaBold);
    textSize(42);
    textAlign(CENTER);
    
    // Title with glow effect
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = 'rgba(100, 200, 255, 0.8)';
    text("The Lost Ocean", width / 2, 280);
    drawingContext.shadowBlur = 0;
    
    // Subtitle wave decoration
    stroke(100, 200, 255, 150);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let x = width * 0.35; x < width * 0.65; x += 5) {
      let y = 295 + sin(x * 0.1 + this.waveOffset * 3) * 3;
      vertex(x, y);
    }
    endShape();
    
    // === STORY TEXT ===
    fill(220, 240, 255);
    textFont(karla);
    textSize(17);
    textAlign(CENTER);
    textLeading(26);
    
    let storyText = "An interactive p5.js game that explores the metaphor of learning programming journey.\n" +
                    "Lin must dive into a procedurally-generated ocean to collect five glowing starfish,\n" +
                    "each representing a core CS course he needs to take to become a programmer.\n" +
                    "In the vast ocean of programming and in the depths of his own mind.\n" +
                    "But even in the deepest waters, there is light.\n" +
                    "Can you help Lin find the parts of himself hidden deep within his coding journey?";
    
    text(storyText, width / 2, 320);
    
    // === INSTRUCTIONS BOX ===
    fill(30, 80, 120, 180);
    stroke(100, 180, 220, 200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(width / 2, 560, 600, 200, 15);
    
    // Instructions title
    fill(150, 220, 255);
    textFont(karlaBold);
    textSize(24);
    noStroke();
    text("🎮  How to Play", width / 2, 490);
    
    // Instructions list
    fill(255, 255, 255);
    textFont(karla);
    textSize(16);
    textAlign(LEFT);
    textLeading(28);
    
    let instructionsText = 
      "🖱️   Move your cursor to guide your diver through the ocean\n" +
      "🖱️   Click and drag to explore deeper into the underwater world\n" +
      "⭐   Discover and collect all 5 glowing starfish to improve Lin Khit\n" +
      "⚠️   Stay away from the dark trenches—they pull you into darkness";
    
    text(instructionsText, width / 2 - 280, 520);
    
    // === CREDITS ===
    fill(180, 220, 255, 200);
    textFont(karla);
    textSize(14);
    textAlign(CENTER);
    
    text("Created by Lin Khit Lu  •  Instructor: John Keston  •  University of St. Thomas", 
         width / 2, 670);
    
    // Decorative coral (bottom left)
    fill(200, 100, 150, 150);
    noStroke();
    ellipse(width * 0.15, 680, 30, 40);
    ellipse(width * 0.17, 675, 25, 35);
    ellipse(width * 0.13, 675, 20, 30);
    
    // Decorative coral (bottom right)
    fill(150, 100, 200, 150);
    ellipse(width * 0.85, 680, 28, 38);
    ellipse(width * 0.87, 675, 22, 32);
    ellipse(width * 0.83, 675, 25, 35);
    
    pop();
  }
  
  drawStarfish(size, col) {
    fill(col);
    stroke(red(col) * 0.8, green(col) * 0.8, blue(col) * 0.8);
    strokeWeight(1.5);
    
    beginShape();
    for (let i = 0; i < 5; i++) {
      let angle = (TWO_PI / 5) * i - PI / 2;
      let outerX = cos(angle) * size;
      let outerY = sin(angle) * size;
      vertex(outerX, outerY);
      
      let innerAngle = angle + (TWO_PI / 10);
      let innerRadius = size * 0.4;
      let innerX = cos(innerAngle) * innerRadius;
      let innerY = sin(innerAngle) * innerRadius;
      vertex(innerX, innerY);
    }
    endShape(CLOSE);
    
    // Center dot
    fill(red(col) * 1.2, green(col) * 1.2, blue(col) * 1.2);
    noStroke();
    ellipse(0, 0, size * 0.3);
  }
}

class StartButton {
  constructor() {
    this.label = "Start";
    this.leading = 30;
    this.py = 220;
    this.fill1 = 255;
    this.fill2 = 0;
  }

  show() {
    push();
    fill(255, this.fill2);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, this.py + this.leading * 15 + 24, 155, 50, 15);
    fill(this.fill1);
    noStroke();
    textFont(karlaBold);
    textSize(18);
    textAlign(CENTER);
    text(this.label, width / 2, this.py + this.leading * 16);
    pop();

    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py + this.leading * 15 && mouseY < this.py + this.leading * 15 + 50) {
      cursor(HAND);
      this.fill1 = 0;
      this.fill2 = 255;
    } else {
      cursor(ARROW);
      this.fill1 = 255;
      this.fill2 = 0;

    }
  }

  startClicked() {
    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py + this.leading * 15 && mouseY < this.py + this.leading * 15 + 50) {
      return true;
    } else {
      return false;
    }
  }
}

class HomeButton {
  constructor() {
    this.label = "< Home";
  }

  show() {
    push();
    fill(255);
    textFont(karlaBold);
    textSize(24);
    text(this.label, 70, 120);
    pop();

    if (mouseX >= 70 && mouseX <= 70 + textWidth(this.label) * 2 && mouseY >= 120 - 36 && mouseY <= 130) {
      cursor(HAND);
    } else {
      cursor(ARROW);
    }
  }

  homeClicked() {
    if (mouseX >= 70 && mouseX <= 70 + textWidth(this.label) * 2 && mouseY >= 120 - 36 && mouseY <= 130) {
      return true;
    } else {
      return false;
    }
  }
}

class RefreshButton {
  constructor() {

    this.label = "Restart";
    this.leading = 30;
    this.py = height / 2;
    this.fill1 = 255;
    this.fill2 = 0;

  }

  show() {
    push();
    fill(255, this.fill2);
    stroke(255);
    rectMode(CENTER);
    rect(width / 2, this.py, 155, 50, 15);
    fill(this.fill1);
    noStroke();
    textFont(karlaBold);
    textSize(18);
    textAlign(CENTER);
    text(this.label, width / 2, this.py + 5);
    pop();

    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py - 25 && mouseY < this.py + 25) {
      cursor(HAND);
      this.fill1 = 0;
      this.fill2 = 255;
    } else {
      cursor(ARROW);
      this.fill1 = 255;
      this.fill2 = 0;

    }
  }

  refreshClicked() {
    if (mouseX > (width / 2 - 80) && mouseX < (width / 2 + 80) && mouseY > this.py - 25 && mouseY < this.py + 25) {
      return true;
    } else {
      return false;
    }
  }
}

class WinState {

  constructor() {
    this.colorChoice = 0;
    this.counter = 0;
  }
  show() {
    if (score === 5) {
      push();
      fill(255);
      textAlign(CENTER);
      textSize(60);
      textFont(karlaBold);
      text("You Win!", width / 2, height / 2 - 180);
      pop();
      refreshButton.show();

      player.c = identity.c[this.colorChoice];

      if (this.counter > 5) {
        this.colorChoice = round(random(0, 4));
        this.counter = 0;
      }
      this.counter++;

      if (sampleIsLooping) {
        bubbleSound.stop();
        sampleIsLooping = false;
        if (!fishIsLooping) {
          fishSound.loop();
          fishIsLooping = true;
        }
      }
      if (!winIsLooping) {

        winSound.play();
        winIsLooping = true;

      }
    }
  }
}

function togglePlaying() {
  if (!sampleIsLooping) {

    bubbleSound.loop();
    sampleIsLooping = true;
    removeElements();
    soundOff = createImg("data/sound-on.png", "Sound off button",
    '',
    () => {
      soundOff.size(50, AUTO);
    });
    soundOff.position(width - 100, 40);
    soundOff.mousePressed(togglePlaying);

  } else {
    bubbleSound.pause();
    sampleIsLooping = false;
    removeElements();
    soundOn = createImg("data/sound-off.png", "Sound on button",
    '',
    () => {
      soundOn.size(50, AUTO);
    });
    soundOn.position(width - 100, 40);
    soundOn.mousePressed(togglePlaying);
  }
}

// Click to move around the map
function moveCamera() {

  if (mouseIsPressed === true) {

    if (mouseX > width / 2) {
      magX = (mouseX - width / 2) / (width / 2);
      moveSpeedX = int(20 * magX);
      moveX -= moveSpeedX;
    } else {
      magX = 1 - (mouseX / (width / 2));
      moveSpeedX = int(20 * magX);
      moveX += moveSpeedX;
    }

    if (mouseY > height / 2) {
      magY = (mouseY - height / 2) / (height / 2);
      moveSpeedY = int(20 * magY);
      moveY -= moveSpeedY;
    } else {
      magY = 1 - (mouseY / (height / 2));
      moveSpeedY = int(20 * magY);
      moveY += moveSpeedY;
    }

  } else {

    if (moveSpeedX > 0) {
      if (mouseX > width / 2) {
        moveSpeedX -= easeMove;
        moveX -= moveSpeedX;
      } else {
        moveSpeedX -= easeMove;
        moveX += moveSpeedX;
      }
    }
    if (moveSpeedY > 0) {
      if (mouseY > height / 2) {
        moveSpeedY -= easeMove;
        moveY -= moveSpeedY;
      } else {
        moveSpeedY -= easeMove;
        moveY += moveSpeedY;
      }
    }
  }

  if (moveX < -10000) {
    moveX = -10000;
  }
  if (moveX > 600) {
    moveX = 600;
  }
  if (moveY < -5200) {
    moveY = -5200;
  }
  if (moveY > 400) {
    moveY = 400;
  }

  camX = constrain(moveX, -10000, 600);
  camY = constrain(moveY, -5200, 400);

}

function checkCollision() {

  for (let i = 0; i < 5; i++) {
    d[i] = dist((camX - player.px) * -1, (camY - player.py) * -1, identity.px[i] + identity.offX[i],
      (((identity.py[i] + identity.offY[i]) * persp)) + ((height / 2) * persp) / 2);
    if (d[i] < 80) {
      player.c = identity.c[i];
      identity.collided[i] = true;
      scoreSound.play();

    }
  }

  for (let j = 0; j < hole.holes.length; j++) {
    d2[j] = dist((camX - player.px) * -1, (camY - player.py) * -1, hole.holes[j].px, hole.holes[j].py);
    if (d2[j] < 50) {
      gameoverState = true;
      sceneCounter = 2;
    }
  }
}

function showScore() {
  score = identity.collided[0] + identity.collided[1] + identity.collided[2] + identity.collided[3] + identity.collided[4];
  push();
  fill(255);
  textSize(36);
  textFont(karlaBold);
  text('Starfish Collected: ' + score + '/5', 70, 80);
  pop();
}

function touchEnded() {

  if (startButton.startClicked()) {
    sceneCounter = 1;
  }
  if (homeButton.homeClicked()) {
    sceneCounter = 0;
  }
  if (refreshButton.refreshClicked()) {
    window.location.reload(true)
  }
}

function windowResized() {

  resizeCanvas(windowWidth, windowHeight);

}