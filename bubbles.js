class Bubbles {
    constructor() {
        this.bubble = [];
        for (var i = 0; i < 500; i++) {
            this.bubble[i] = new Bubble();
        }
    }

    show() {
        push();
        for (var i = 0; i < this.bubble.length - (score * 100); i++) {
            this.bubble[i].rise();
            this.bubble[i].show();
        }
        pop();
    }
}

function Bubble() {
    this.x = random(-width / 6, width);
    this.y = random(height, height + 500); // Start from bottom
    this.z = random(0, 150);
    this.size = map(this.z, 0, 20, 3, 12); // Bubble size based on depth
    this.yspeed = map(this.z, 0, 20, -1, -3); // Negative speed to go up
    this.wobble = random(0, 100); // For side-to-side motion
    this.wobbleSpeed = random(0.02, 0.05);
    
    this.rise = function() {
        // Bubbles rise up
        this.y = this.y + this.yspeed;
        
        // Add wobble/drift effect
        this.wobble += this.wobbleSpeed;
        this.x += sin(this.wobble) * 0.5;
        
        // Reset when bubble reaches top
        if (this.y < -50) {
            this.y = random(height, height + 200);
            this.x = random(-width / 6, width);
            this.yspeed = map(this.z, 0, 20, -1, -3);
        }
    }
    
    this.show = function() {
        var alpha = map(this.z, 0, 150, 50, 150);
        
        // Bubble outline
        stroke(255, alpha);
        strokeWeight(1);
        
        // Bubble fill - slight blue tint
        fill(200, 220, 255, alpha * 0.3);
        
        // Draw bubble
        ellipse(this.x, this.y, this.size, this.size);
        
        // Add small highlight for realism
        noStroke();
        fill(255, alpha * 0.8);
        ellipse(this.x - this.size * 0.2, this.y - this.size * 0.2, this.size * 0.3, this.size * 0.3);
    }
}