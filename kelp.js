class Kelp {
    constructor() {
        this.x;
        this.y;
        this.densityX = tileWidth * 0.4; // More frequent (was 0.8)
        this.densityY = tileHeight * 0.4; // More frequent (was 0.8)
        this.offsetX = [];
        this.offsetY = [];
        this.wavePhase = [];
        
        for(let i = 0; i < worldWidth; i += this.densityX) {
            kelpType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            this.wavePhase[i] = [];
            for(let j = 0; j < worldHeight; j += this.densityY){
                kelpType[i][j] = random(kelpTypes);
                this.offsetX[i][j] = int(random(-400, 400));
                this.offsetY[i][j] = int(random(-200, 200));
                this.wavePhase[i][j] = random(TWO_PI);
            }
        }
    }
    
    show() {
        for(let i = 0; i < worldWidth; i += this.densityX) {
            for(let j = 0; j < worldHeight; j += this.densityY){
                let kelpX = i + this.offsetX[i][j];
                let kelpY = j + this.offsetY[i][j];
                
                // Update wave animation
                this.wavePhase[i][j] += 0.02;
                
                if(kelpType[i][j] == 'A') {
                    drawSeaweedA(kelpX, kelpY, this.wavePhase[i][j]);
                } else if(kelpType[i][j] == 'B') {
                    drawSeaweedB(kelpX, kelpY, this.wavePhase[i][j]);
                } else if(kelpType[i][j] == 'C') {
                    drawSeaweedC(kelpX, kelpY, this.wavePhase[i][j]);
                }
            }
        }
    }
}

// Type A: Tall wavy seaweed
function drawSeaweedA(_x, _y, phase) {
    push();
    translate(_x, _y);
    
    // Dark green seaweed color
    fill(40, 100, 80, 200);
    noStroke();
    
    // Draw wavy seaweed strand
    beginShape();
    for (let i = 0; i <= 15; i++) {
        let t = i / 15;
        let height = -200 * t;
        let wave = sin(phase + i * 0.5) * (20 * t); // More wave at top
        vertex(wave, height);
    }
    // Return down the other side
    for (let i = 15; i >= 0; i--) {
        let t = i / 15;
        let height = -200 * t;
        let wave = sin(phase + i * 0.5) * (20 * t);
        vertex(wave + 8, height);
    }
    endShape(CLOSE);
    
    // Add small leaf details
    fill(50, 120, 90, 180);
    for (let i = 3; i < 15; i += 3) {
        let t = i / 15;
        let height = -200 * t;
        let wave = sin(phase + i * 0.5) * (20 * t);
        ellipse(wave + 10, height, 6, 12);
        ellipse(wave - 10, height - 5, 6, 12);
    }
    
    pop();
}

// Type B: Medium bushy seaweed
function drawSeaweedB(_x, _y, phase) {
    push();
    translate(_x, _y);
    
    fill(35, 90, 70, 200);
    noStroke();
    
    // Multiple shorter strands
    for (let strand = 0; strand < 5; strand++) {
        let offsetX = (strand - 2) * 15;
        
        beginShape();
        for (let i = 0; i <= 10; i++) {
            let t = i / 10;
            let height = -120 * t;
            let wave = sin(phase + strand + i * 0.4) * (12 * t);
            vertex(offsetX + wave, height);
        }
        for (let i = 10; i >= 0; i--) {
            let t = i / 10;
            let height = -120 * t;
            let wave = sin(phase + strand + i * 0.4) * (12 * t);
            vertex(offsetX + wave + 5, height);
        }
        endShape(CLOSE);
    }
    
    pop();
}

// Type C: Wide flowing seaweed
function drawSeaweedC(_x, _y, phase) {
    push();
    translate(_x, _y);
    
    fill(45, 110, 85, 180);
    stroke(35, 90, 70);
    strokeWeight(1);
    
    // Wide ribbon-like seaweed
    beginShape();
    for (let i = 0; i <= 20; i++) {
        let t = i / 20;
        let height = -250 * t;
        let wave = sin(phase + i * 0.3) * (25 * t);
        let width = 20 - (t * 10); // Gets narrower at top
        vertex(wave - width/2, height);
    }
    // Return on other side
    for (let i = 20; i >= 0; i--) {
        let t = i / 20;
        let height = -250 * t;
        let wave = sin(phase + i * 0.3) * (25 * t);
        let width = 20 - (t * 10);
        vertex(wave + width/2, height);
    }
    endShape(CLOSE);
    
    // Add vein details
    stroke(30, 80, 60, 100);
    strokeWeight(1);
    for (let i = 2; i < 20; i += 2) {
        let t = i / 20;
        let height = -250 * t;
        let wave = sin(phase + i * 0.3) * (25 * t);
        line(wave, height, wave, height - 10);
    }
    
    pop();
}