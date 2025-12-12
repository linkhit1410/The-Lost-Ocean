class Rocks {
    constructor() {
        this.x;
        this.y;
        this.densityX = tileWidth * 1.5;
        this.densityY = tileHeight * 1.5;
        this.offsetX = [];
        this.offsetY = [];
        for(let i = 0; i < worldWidth; i += this.densityX) {
            rockType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                rockType[i][j] = random(rockTypes);
                this.offsetX[i][j] = int(random(-400,400));
                this.offsetY[i][j] = int(random(-200,200));
            }
        }
    }

    show() {
        for(let i = 0; i < worldWidth; i += this.densityX) {
            for(let j = 0; j < worldHeight; j += this.densityY){
                if(rockType[i][j] == 'A') {
                    drawRocksA(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (rockType[i][j] == 'B') {
                    drawRocksB(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (rockType[i][j] == 'C') {
                    drawRocksC(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                }
            }
        }
    }
}

// Type A: Large underwater rock formation - blue-grey
function drawRocksA(_x, _y) {
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = 'black';
    translate(_x, _y);
    
    // Dark side - deeper blue-grey
    fill(70, 90, 105);
    beginShape();
    vertex(65, -28);
    vertex(80, -58);
    vertex(95, -63);
    vertex(105, -53);
    vertex(120, -23);
    vertex(105, -13);
    vertex(75, -10);
    endShape();
    
    // Light side - lighter blue-grey with slight green tint
    fill(110, 130, 140);
    beginShape();
    vertex(0, 0);
    vertex(25,-65);
    vertex(50, -73);
    vertex(85, -50);
    vertex(100, 0);
    vertex(70, 18);
    vertex(25, 14);
    endShape();
    pop();
}

// Type B: Medium rock with coral growth - teal accents
function drawRocksB(_x, _y) {
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = 'black';
    translate(_x, _y);
    
    // Main rock - grey-blue
    fill(80, 100, 115);
    beginShape();
    vertex(0, 0);
    vertex(-5,-30);
    vertex(10, -50);
    vertex(40, -70);
    vertex(60, -60);
    vertex(68, -35);
    vertex(75, -15);
    vertex(45, 5);
    endShape();
    
    // Coral/algae growth on rock - teal-green
    fill(65, 120, 110);
    beginShape();
    curveVertex(10, 10);
    curveVertex(10, 10);
    curveVertex(25, -15);
    curveVertex(50, 12);
    curveVertex(30, 15);
    curveVertex(20, 14);
    curveVertex(20, 14);
    endShape();
    pop();
}

// Type C: Small rock formation - darker
function drawRocksC(_x, _y) {
    push();
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 10;
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = 'black';
    translate(_x, _y);
    
    // Small dark rock
    fill(60, 80, 95);
    beginShape();
    vertex(0, 0);
    vertex(8,-20);
    vertex(30, -22);
    vertex(35, -3);
    vertex(32, 2);
    vertex(15, 5);
    endShape();
    pop();
}