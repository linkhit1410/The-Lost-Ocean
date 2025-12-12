class Coral {
    constructor() {
        this.x;
        this.y;
        this.densityX = tileWidth * 0.7;
        this.densityY = tileHeight * 0.7;
        this.offsetX = [];
        this.offsetY = [];
        this.cpX1 = -5;
        this.cpY = -15;
        this.cpX2 = 0;
        this.tip = 5;
        this.speed = 0.15; // Slower sway for underwater effect

        for (let i = 0; i < worldWidth; i += this.densityX) {
            coralType[i] = [];
            this.offsetX[i] = [];
            this.offsetY[i] = [];
            for (let j = 0; j < worldHeight; j += this.densityY) {
                coralType[i][j] = random(coralTypes);
                this.offsetX[i][j] = int(random(-400, 400));
                this.offsetY[i][j] = int(random(-200, 200));
            }
        }
    }

    show() {
        for (let i = 0; i < worldWidth; i += this.densityX) {
            for (let j = 0; j < worldHeight; j += this.densityY) {
                if (coralType[i][j] == 'A') {
                    drawCoralA(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (coralType[i][j] == 'B') {
                    drawCoralB(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                } else if (coralType[i][j] == 'C') {
                    drawCoralC(i + this.offsetX[i][j], j + this.offsetY[i][j]);
                }
            }
        }
        
        // Gentle swaying motion for underwater effect
        this.cpX1 = this.cpX1 + this.speed;
        this.cpX2 = this.cpX2 + this.speed;
        this.tip = this.tip - this.speed;

        if (this.cpX1 > 5) {
            this.speed *= -1;
        } else if (this.cpX1 < -5) {
            this.speed *= -1;
        }
    }
}

// Type A: Tall swaying seaweed (green/teal)
function drawCoralA(_x, _y) {
    push();
    translate(_x, _y);
    fill(52, 138, 167); // Ocean teal/blue seaweed
    
    // Taller seaweed blades
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    // Shorter seaweed
    translate(10, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 15, coral.tip, -25);
    vertex(coral.tip, -25)
    quadraticVertex(coral.cpX2, coral.cpY + 15, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 15, coral.tip, -25);
    vertex(coral.tip, -25)
    quadraticVertex(coral.cpX2, coral.cpY + 15, 6, 0);
    endShape();

    // Small seaweed on the left
    translate(-33, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();
    pop();
}

// Type B: Coral with seaweed (purple/blue coral base)
function drawCoralB(_x, _y) {
    push();
    translate(_x, _y);
    
    // Coral base - purple/pink tones
    fill(147, 90, 165); // Purple coral
    beginShape();
    vertex(-70, 0);
    vertex(75, 0);
    quadraticVertex(75, -30, 40, -30);
    vertex(40, -30);
    quadraticVertex(0, -75, -40, -20);
    vertex(-40, -20);
    quadraticVertex(-55, -15, -50, 0);
    endShape();

    // Seaweed growing from coral
    fill(52, 138, 167); // Teal seaweed
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY, coral.tip, -40);
    vertex(coral.tip, -40)
    quadraticVertex(coral.cpX2, coral.cpY, 6, 0);
    endShape();

    translate(10, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 15, coral.tip, -25);
    vertex(coral.tip, -25)
    quadraticVertex(coral.cpX2, coral.cpY + 15, 6, 0);
    endShape();

    translate(5, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 15, coral.tip, -25);
    vertex(coral.tip, -25)
    quadraticVertex(coral.cpX2, coral.cpY + 15, 6, 0);
    endShape();

    translate(-33, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();

    translate(-3, 0);
    beginShape();
    vertex(0, 0);
    quadraticVertex(coral.cpX1, coral.cpY + 10, coral.tip, -15);
    vertex(coral.tip, -15)
    quadraticVertex(coral.cpX2, coral.cpY + 10, 6, 0);
    endShape();
    pop();
}

// Type C: Low coral formation (orange/red coral)
function drawCoralC(_x, _y) {
    push();
    translate(_x, _y);
    fill(214, 115, 83); // Orange-red coral
    beginShape();
    vertex(-70, 0);
    vertex(75, 0);
    quadraticVertex(75, -30, 40, -30);
    vertex(40, -30);
    quadraticVertex(0, -75, -40, -20);
    vertex(-40, -20);
    quadraticVertex(-55, -15, -50, 0);
    endShape();
    pop();
}