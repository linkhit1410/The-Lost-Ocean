class Koifish {
    constructor() {
        this.fishSchool = [];
        this.numFish = 15; // Number of koi fish
        
        for (let i = 0; i < this.numFish; i++) {
            this.fishSchool[i] = new SingleKoi();
        }
    }
    
    show() {
        for (let i = 0; i < this.numFish; i++) {
            this.fishSchool[i].swim();
            this.fishSchool[i].display();
        }
    }
}

function SingleKoi() {
    // Random starting position in the world
    this.x = random(0, worldWidth);
    this.y = random(0, worldHeight);
    
    // Movement properties
    this.speedX = random(0.5, 1.5);
    this.speedY = random(-0.3, 0.3);
    this.noiseOffset = random(1000);
    
    // Visual properties
    this.size = random(40, 70); // Larger than tropical fish
    this.flip = random() > 0.5 ? 1 : -1; // Swim left or right
    
    // Koi colors - beautiful and varied
    let koiColors = [
        color(255, 100, 100),  // Red koi
        color(255, 180, 50),   // Orange koi
        color(255, 255, 255),  // White koi
        color(255, 200, 200),  // Pink koi
        color(255, 150, 100),  // Coral koi
        color(200, 200, 255),  // Blue-white koi
    ];
    
    this.bodyColor = random(koiColors);
    this.patternColor = color(255, 255, 255); // White patterns
    
    // Tail animation
    this.tailWave = 0;
    this.tailSpeed = random(0.08, 0.15);
    
    this.swim = function() {
        // Organic movement with Perlin noise
        let noiseX = noise(this.noiseOffset) - 0.5;
        let noiseY = noise(this.noiseOffset + 100) - 0.5;
        this.noiseOffset += 0.005;
        
        this.x += this.speedX * this.flip + noiseX * 2;
        this.y += this.speedY + noiseY * 2;
        
        // Tail wave animation
        this.tailWave += this.tailSpeed;
        
        // Wrap around world edges
        if (this.x < 0) this.x = worldWidth;
        if (this.x > worldWidth) this.x = 0;
        if (this.y < 0) this.y = worldHeight;
        if (this.y > worldHeight) this.y = 0;
    }
    
    this.display = function() {
        push();
        translate(this.x, this.y);
        scale(this.flip, 1); // Flip for direction
        
        // Shadow
        fill(0, 50);
        noStroke();
        ellipse(3, 3, this.size * 1.5, this.size * 0.8);
        
        // Tail (wavy)
        fill(red(this.bodyColor), green(this.bodyColor), blue(this.bodyColor), 200);
        stroke(red(this.bodyColor) * 0.8, green(this.bodyColor) * 0.8, blue(this.bodyColor) * 0.8);
        strokeWeight(2);
        
        let tailWaveAmount = sin(this.tailWave) * 15;
        beginShape();
        vertex(-this.size * 0.6, tailWaveAmount);
        vertex(-this.size * 1.2, -this.size * 0.5 + tailWaveAmount);
        vertex(-this.size * 1.4, tailWaveAmount);
        vertex(-this.size * 1.2, this.size * 0.5 + tailWaveAmount);
        endShape(CLOSE);
        
        // Body (elongated ellipse)
        fill(this.bodyColor);
        stroke(red(this.bodyColor) * 0.8, green(this.bodyColor) * 0.8, blue(this.bodyColor) * 0.8);
        strokeWeight(2);
        ellipse(0, 0, this.size * 1.5, this.size * 0.8);
        
        // Pattern spots (distinctive koi markings)
        fill(this.patternColor);
        noStroke();
        
        // Random spot pattern
        let numSpots = int(random(2, 5));
        for (let i = 0; i < numSpots; i++) {
            let spotX = random(-this.size * 0.5, this.size * 0.3);
            let spotY = random(-this.size * 0.3, this.size * 0.3);
            let spotSize = random(this.size * 0.2, this.size * 0.4);
            ellipse(spotX, spotY, spotSize, spotSize * 0.8);
        }
        
        // Head (slightly darker gradient)
        fill(red(this.bodyColor) * 0.9, green(this.bodyColor) * 0.9, blue(this.bodyColor) * 0.9);
        ellipse(this.size * 0.5, 0, this.size * 0.6, this.size * 0.5);
        
        // Eye
        fill(255);
        stroke(0);
        strokeWeight(1);
        ellipse(this.size * 0.55, -this.size * 0.15, this.size * 0.15, this.size * 0.15);
        fill(0);
        noStroke();
        ellipse(this.size * 0.58, -this.size * 0.15, this.size * 0.08, this.size * 0.08);
        
        // Eye shine
        fill(255, 200);
        ellipse(this.size * 0.56, -this.size * 0.17, this.size * 0.04, this.size * 0.04);
        
        // Mouth
        stroke(red(this.bodyColor) * 0.6, green(this.bodyColor) * 0.6, blue(this.bodyColor) * 0.6);
        strokeWeight(1);
        noFill();
        arc(this.size * 0.65, 0, this.size * 0.15, this.size * 0.1, 0, PI);
        
        // Dorsal fin (on top)
        fill(red(this.bodyColor), green(this.bodyColor), blue(this.bodyColor), 180);
        stroke(red(this.bodyColor) * 0.8, green(this.bodyColor) * 0.8, blue(this.bodyColor) * 0.8);
        strokeWeight(1);
        triangle(
            -this.size * 0.2, -this.size * 0.4,
            this.size * 0.1, -this.size * 0.6,
            this.size * 0.3, -this.size * 0.4
        );
        
        // Pectoral fins (sides) - subtle wave
        let finWave = sin(this.tailWave + PI) * 5;
        fill(red(this.bodyColor), green(this.bodyColor), blue(this.bodyColor), 150);
        ellipse(this.size * 0.1, this.size * 0.4 + finWave, this.size * 0.3, this.size * 0.15);
        ellipse(this.size * 0.1, -this.size * 0.4 - finWave, this.size * 0.3, this.size * 0.15);
        
        pop();
    }
}

// USAGE INSTRUCTIONS:
// 
// 1. At the top of main.js, add:
//    let koiFish;
//
// 2. In Scene1, Scene2, Scene3 constructors, add:
//    koiFish = new KoiFish();
//
// 3. In each scene's show() method, call it INSIDE the translate block:
//    push();
//    translate(camX, camY);
//    depthGradient.show();
//    ground.show();
//    // ... other elements ...
//    koiFish.show();  // ← Add this
//    pop();