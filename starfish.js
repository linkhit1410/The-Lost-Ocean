class Identity {
    constructor() {
        this.px = [];
        this.py = [];
        this.offX = [];
        this.offY = [];
        this.rotation = [];
        this.xStep = [];
        this.yStep = [];
        this.rStep = [];
        this.xNoise = [];
        this.yNoise = [];
        this.rNoise = [];
        this.c = [];
        
        // Vibrant starfish colors
        this.c[0] = color(255, 100, 50);   // Coral orange
        this.c[1] = color(255, 230, 100);  // Bright yellow
        this.c[2] = color(150, 100, 255);  // Purple
        this.c[3] = color(255, 80, 150);   // Pink
        this.c[4] = color(100, 255, 180);  // Cyan-green
        
        this.collided = [];
        this.pulsePhase = [];
        this.breathePhase = [];
        
        for (let i = 0; i < 5; i++) {
            this.collided[i] = false;
            this.pulsePhase[i] = random(0, TWO_PI);
            this.breathePhase[i] = random(0, TWO_PI);
        }

        // Spawn closer to center and to each other for better visibility
        for (let i = 0; i < 5; i++) {
            this.px[i] = worldWidth / 2;
            this.py[i] = worldHeight / 2;
            this.rotation[i] = random(-360, 360);
            this.xStep[i] = 0;
            this.yStep[i] = 0;
            this.rStep[i] = 0;
            // Reduced spawn radius so they're closer to starting area
            this.offX[i] = random(-worldWidth / 4, worldWidth / 4);
            this.offY[i] = random(-worldHeight / 4, worldHeight / 4);
        }
    }

    show() {
        // Draw each uncollected starfish
        if (this.collided[0] === false) {
            this.drawStarfish(0, this.px[0] + this.offX[0], this.py[0] + this.offY[0], this.rotation[0]);
        }
        if (this.collided[1] === false) {
            this.drawStarfish(1, this.px[1] + this.offX[1], this.py[1] + this.offY[1], this.rotation[1]);
        }
        if (this.collided[2] === false) {
            this.drawStarfish(2, this.px[2] + this.offX[2], this.py[2] + this.offY[2], this.rotation[2]);
        }
        if (this.collided[3] === false) {
            this.drawStarfish(3, this.px[3] + this.offX[3], this.py[3] + this.offY[3], this.rotation[3]);
        }
        if (this.collided[4] === false) {
            this.drawStarfish(4, this.px[4] + this.offX[4], this.py[4] + this.offY[4], this.rotation[4]);
        }

        // Update positions and animations
        for (let i = 0; i < 5; i++) {
            this.xNoise[i] = noise(this.xStep[i]);
            this.yNoise[i] = noise(this.yStep[i]);
            this.rNoise[i] = noise(this.rStep[i]);
            this.px[i] = map(this.xNoise[i], 0, 1, 0, worldWidth - this.offX[i]);
            this.py[i] = map(this.yNoise[i], 0, 1, 0, worldHeight - this.offY[i]);
            this.rotation[i] = map(this.rNoise[i], 0, 1, -360, 360);
            
            // Slower movement so they're easier to track
            this.xStep[i] += 0.001 + (i * 0.0003);
            this.yStep[i] += 0.002 + (i * 0.0006);
            this.rStep[i] += 0.008 + (i * 0.0008);
            
            // Update animation phases
            this.pulsePhase[i] += 0.04;
            this.breathePhase[i] += 0.02;
        }
    }
    
    drawStarfish(index, _x, _y, offsetAngle) {
        let dim = min(width, height);
        let r0 = dim * mult;
        let r1 = r0 * 0.5; // Match player's actual circle radius
        
        // Pulsing glow effect (subtle so it doesn't make starfish bigger)
        let pulse = sin(this.pulsePhase[index]) * 0.05 + 1;
        let breathe = sin(this.breathePhase[index]) * 2;
        let size = r1 * pulse + breathe; // Use r1 so total size matches player
        
        push();
        scale(1, persp);
        translate(0, ((height / 2) * persp) / 2);
        translate(_x, _y);
        rotate(radians(offsetAngle));
        
        // MASSIVE OUTER GLOW for visibility from far away
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 50;
        drawingContext.shadowColor = `rgba(${red(this.c[index])}, ${green(this.c[index])}, ${blue(this.c[index])}, 0.9)`;
        
        // Glow circle for visibility (but not too huge)
        noStroke();
        fill(red(this.c[index]), green(this.c[index]), blue(this.c[index]), 30);
        ellipse(0, 0, size * 2, size * 2);
        
        // Draw 5-pointed starfish
        fill(red(this.c[index]), green(this.c[index]), blue(this.c[index]), 200);
        stroke(red(this.c[index]) * 0.7, green(this.c[index]) * 0.7, blue(this.c[index]) * 0.7, 255);
        strokeWeight(2);
        
        beginShape();
        for (let i = 0; i < 5; i++) {
            // Outer points of star
            let angle = (TWO_PI / 5) * i - PI / 2;
            let outerX = cos(angle) * size;
            let outerY = sin(angle) * size;
            vertex(outerX, outerY);
            
            // Inner points (between arms)
            let innerAngle = angle + (TWO_PI / 10);
            let innerRadius = size * 0.4;
            let innerX = cos(innerAngle) * innerRadius;
            let innerY = sin(innerAngle) * innerRadius;
            vertex(innerX, innerY);
        }
        endShape(CLOSE);
        
        // Brighter center
        fill(red(this.c[index]) * 1.2, green(this.c[index]) * 1.2, blue(this.c[index]) * 1.2, 255);
        noStroke();
        ellipse(0, 0, size * 0.5, size * 0.5);
        
        // Bright core
        fill(255, 255, 255, 180);
        ellipse(0, 0, size * 0.25, size * 0.25);
        
        // Add texture dots on arms (starfish bumps)
        fill(red(this.c[index]) * 0.8, green(this.c[index]) * 0.8, blue(this.c[index]) * 0.8, 200);
        for (let i = 0; i < 5; i++) {
            let angle = (TWO_PI / 5) * i - PI / 2;
            
            // Dots along each arm
            for (let d = 0.3; d < 1; d += 0.2) {
                let dotX = cos(angle) * size * d;
                let dotY = sin(angle) * size * d;
                ellipse(dotX, dotY, size * 0.08, size * 0.08);
            }
        }
        
        // Pulsing outline for extra visibility
        noFill();
        stroke(255, 255, 255, 100 * pulse);
        strokeWeight(2);
        beginShape();
        for (let i = 0; i < 5; i++) {
            let angle = (TWO_PI / 5) * i - PI / 2;
            let outerX = cos(angle) * size * 1.1;
            let outerY = sin(angle) * size * 1.1;
            vertex(outerX, outerY);
            
            let innerAngle = angle + (TWO_PI / 10);
            let innerRadius = size * 0.4 * 1.1;
            let innerX = cos(innerAngle) * innerRadius;
            let innerY = sin(innerAngle) * innerRadius;
            vertex(innerX, innerY);
        }
        endShape(CLOSE);
        
        pop();
    }
}