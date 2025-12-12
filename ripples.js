class Ripples {
    constructor() {
        this.plankton = [];
        this.density = 500; // Lots of tiny organisms
        for (let i = 0; i < this.density; i++) {
            this.plankton[i] = new Plankton();
        }
    }
    
    show() {
        for (let j = 0; j < this.density; j++) {
            this.plankton[j].update();
            this.plankton[j].show();
        }
    }
}

function Plankton() {
    // Random position in world
    this.px = random(0, worldWidth);
    this.py = random(0, worldHeight);
    
    // Size variation - most are tiny, some slightly bigger
    this.size = random(1, 4);
    
    // Glow intensity pulses
    this.glowPhase = random(0, TWO_PI);
    this.glowSpeed = random(0.02, 0.05);
    
    // Drift movement
    this.driftX = random(-0.2, 0.2);
    this.driftY = random(-0.3, 0.1); // Slight upward tendency
    this.wobble = random(0, 100);
    this.wobbleSpeed = random(0.01, 0.03);
    
    // Color variation - bioluminescent blues, greens, and teals
    this.colorChoice = random(['blue', 'cyan', 'green', 'teal']);
    
    switch(this.colorChoice) {
        case 'blue':
            this.col = color(100, 150, 255);
            break;
        case 'cyan':
            this.col = color(0, 255, 255);
            break;
        case 'green':
            this.col = color(150, 255, 150);
            break;
        case 'teal':
            this.col = color(64, 224, 208);
            break;
    }
    
    this.show = function() {
        // Pulsing glow effect
        this.glowPhase += this.glowSpeed;
        let glowIntensity = (sin(this.glowPhase) + 1) / 2; // 0 to 1
        let currentAlpha = map(glowIntensity, 0, 1, 50, 200);
        
        push();
        // Outer glow
        noStroke();
        fill(red(this.col), green(this.col), blue(this.col), currentAlpha * 0.3);
        ellipse(this.px, this.py, this.size * 4, this.size * 4);
        
        // Middle glow
        fill(red(this.col), green(this.col), blue(this.col), currentAlpha * 0.6);
        ellipse(this.px, this.py, this.size * 2, this.size * 2);
        
        // Bright center
        fill(red(this.col), green(this.col), blue(this.col), currentAlpha);
        ellipse(this.px, this.py, this.size, this.size);
        
        // Extra bright core for larger plankton
        if (this.size > 2.5) {
            fill(255, currentAlpha);
            ellipse(this.px, this.py, this.size * 0.4, this.size * 0.4);
        }
        pop();
    }
    
    this.update = function() {
        // Gentle drifting motion
        this.wobble += this.wobbleSpeed;
        this.px += this.driftX + sin(this.wobble) * 0.3;
        this.py += this.driftY + cos(this.wobble) * 0.2;
        
        // Wrap around the world edges
        if (this.px < 0) this.px = worldWidth;
        if (this.px > worldWidth) this.px = 0;
        if (this.py < 0) this.py = worldHeight;
        if (this.py > worldHeight) this.py = 0;
    }
}
