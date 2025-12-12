class Player {
    constructor() {
        this.px = width / 2;
        this.py = height / 2;
        this.c = 20;
        this.kickPhase = 0; // For flipper animation
        this.armPhase = 0; // For arm swimming motion
        this.bubbleTimer = 0; // For air bubbles from tank
        this.tiltAngle = 0;
        this.targetTilt = 0;
    }
    
    show() {
        let dim = min(width, height);
        let dt = deltaTime / 1000;
        let power = 1.5;
        
        // Store previous position for tilt calculation
        let prevX = this.px;
        
        this.px = spring(constrain(this.px, margin, width - margin), 
                         constrain(mouseX, margin, width - margin), power, dt);
        this.py = spring(constrain(this.py, 0, height - margin * persp), 
                         constrain(mouseY, 0, height - margin * persp), power, dt);
        
        // Calculate tilt based on movement
        let deltaX = this.px - prevX;
        this.targetTilt = deltaX * 1.5;
        this.tiltAngle = lerp(this.tiltAngle, this.targetTilt, 0.1);
        
        // Animate limbs
        this.kickPhase += 0.12;
        this.armPhase += 0.1;
        this.bubbleTimer += deltaTime;
        
        // Calculate size
        let r0 = dim * mult;
        let size = r0 * 0.5;
        
        push();
        scale(1, persp);
        translate(0, ((height / 2) * persp) / 2);
        
        // Add glow effect from headlamp
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
        drawingContext.shadowBlur = 50;
        drawingContext.shadowColor = 'rgba(255, 255, 200, 0.8)';
        
        translate(this.px, this.py);
        rotate(radians(this.tiltAngle));
        
        // Draw diver
        this.drawDiver(size);
        
        // Draw air bubbles occasionally
        if (this.bubbleTimer > 1000) {
            this.drawAirBubble(size);
            this.bubbleTimer = 0;
        }
        
        pop();
    }
    
    drawDiver(size) {
        // Color changes based on collected starfish
        let suitColor = this.c;
        
        // === FLIPPERS (draw first, behind body) ===
        fill(50, 50, 60);
        stroke(30, 30, 40);
        strokeWeight(1);
        
        // Left flipper
        push();
        translate(-size * 0.15, size * 0.8);
        rotate(sin(this.kickPhase) * 0.4);
        ellipse(0, size * 0.3, size * 0.25, size * 0.5);
        pop();
        
        // Right flipper
        push();
        translate(size * 0.15, size * 0.8);
        rotate(sin(this.kickPhase + PI) * 0.4);
        ellipse(0, size * 0.3, size * 0.25, size * 0.5);
        pop();
        
        // === LEGS ===
        fill(suitColor);
        stroke(red(suitColor) * 0.7, green(suitColor) * 0.7, blue(suitColor) * 0.7);
        strokeWeight(1.5);
        
        // Left leg
        push();
        translate(-size * 0.12, size * 0.3);
        rotate(sin(this.kickPhase) * 0.2);
        rect(-size * 0.08, 0, size * 0.16, size * 0.5, 5);
        pop();
        
        // Right leg
        push();
        translate(size * 0.12, size * 0.3);
        rotate(sin(this.kickPhase + PI) * 0.2);
        rect(-size * 0.08, 0, size * 0.16, size * 0.5, 5);
        pop();
        
        // === AIR TANK (on back) ===
        fill(80, 80, 90);
        stroke(60, 60, 70);
        strokeWeight(2);
        rect(-size * 0.2, -size * 0.1, size * 0.4, size * 0.5, 5);
        
        // Tank details (straps)
        stroke(100, 100, 110);
        strokeWeight(3);
        line(-size * 0.1, -size * 0.05, -size * 0.1, size * 0.35);
        line(size * 0.1, -size * 0.05, size * 0.1, size * 0.35);
        
        // === TORSO (wetsuit body) ===
        fill(suitColor);
        stroke(red(suitColor) * 0.7, green(suitColor) * 0.7, blue(suitColor) * 0.7);
        strokeWeight(2);
        
        // Main body
        beginShape();
        vertex(-size * 0.25, -size * 0.2);
        vertex(size * 0.25, -size * 0.2);
        vertex(size * 0.3, size * 0.4);
        vertex(-size * 0.3, size * 0.4);
        endShape(CLOSE);
        
        // Suit detail line
        noFill();
        stroke(red(suitColor) * 0.5, green(suitColor) * 0.5, blue(suitColor) * 0.5);
        strokeWeight(2);
        line(-size * 0.25, 0, size * 0.25, 0);
        
        // Name "Lin" on chest
        fill(255, 255, 255, 220);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(size * 0.25);
        textStyle(BOLD);
        text("LIN", 0, 0.05);
        
        // === ARMS ===
        fill(suitColor);
        stroke(red(suitColor) * 0.7, green(suitColor) * 0.7, blue(suitColor) * 0.7);
        strokeWeight(1.5);
        
        let armSwing = sin(this.armPhase) * 0.3;
        
        // Left arm
        push();
        translate(-size * 0.25, -size * 0.1);
        rotate(-0.5 + armSwing);
        rect(-size * 0.08, 0, size * 0.16, size * 0.4, 5);
        
        // Hand/glove
        fill(40, 40, 50);
        ellipse(0, size * 0.45, size * 0.18, size * 0.18);
        pop();
        
        // Right arm
        push();
        translate(size * 0.25, -size * 0.1);
        rotate(-0.5 - armSwing);
        rect(-size * 0.08, 0, size * 0.16, size * 0.4, 5);
        
        // Hand/glove
        fill(40, 40, 50);
        ellipse(0, size * 0.45, size * 0.18, size * 0.18);
        pop();
        
        // === DIVING HELMET ===
        // Helmet body
        fill(80, 85, 95);
        stroke(60, 65, 75);
        strokeWeight(2);
        ellipse(0, -size * 0.4, size * 0.6, size * 0.6);
        
        // Visor (glass front)
        fill(100, 150, 200, 150);
        stroke(150, 180, 220);
        strokeWeight(1);
        ellipse(0, -size * 0.4, size * 0.45, size * 0.45);
        
        // Visor reflection
        noStroke();
        fill(200, 220, 255, 100);
        ellipse(-size * 0.08, -size * 0.48, size * 0.15, size * 0.15);
        
        // Face visible through visor
        fill(200, 170, 150, 180);
        ellipse(0, -size * 0.4, size * 0.35, size * 0.35);
        
        // Eyes
        fill(50, 50, 60);
        ellipse(-size * 0.08, -size * 0.42, size * 0.08, size * 0.08);
        ellipse(size * 0.08, -size * 0.42, size * 0.08, size * 0.08);
        
        // === HEADLAMP on helmet ===
        fill(255, 255, 200);
        stroke(200, 200, 150);
        strokeWeight(1);
        
        // Lamp housing
        rect(-size * 0.08, -size * 0.7, size * 0.16, size * 0.12, 3);
        
        // Bright light beam indicator
        noStroke();
        fill(255, 255, 150, 200);
        ellipse(0, -size * 0.64, size * 0.1, size * 0.1);
        
        // Light glow
        fill(255, 255, 200, 50);
        ellipse(0, -size * 0.64, size * 0.25, size * 0.25);
        
        // === HELMET DETAILS ===
        // Air hose connector
        fill(70, 75, 85);
        stroke(50, 55, 65);
        strokeWeight(1);
        rect(size * 0.25, -size * 0.5, size * 0.1, size * 0.15, 2);
        
        // Hose to tank
        noFill();
        stroke(60, 65, 75);
        strokeWeight(3);
        bezierVertex(size * 0.3, -size * 0.45, 
                     size * 0.25, -size * 0.2,
                     size * 0.15, 0);
    }
    
    drawAirBubble(size) {
        // Small air bubble from tank
        push();
        translate(size * 0.15, -size * 0.3);
        
        noStroke();
        fill(200, 220, 255, 150);
        ellipse(0, 0, size * 0.1, size * 0.1);
        
        // Bubble highlight
        fill(255, 255, 255, 200);
        ellipse(-size * 0.02, -size * 0.02, size * 0.03, size * 0.03);
        pop();
    }
}

// Keep the spring function (needed for smooth movement)
function spring(a, b, power, dt) {
    return lerp(a, b, 1 - exp(-power * dt));
}