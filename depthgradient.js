class DepthGradient {
    constructor() {
        // Colors from shallow water to deep water
        this.shallowColor = color(60, 120, 180);  // Light blue (top)
        this.deepColor = color(10, 25, 50);       // Dark blue (bottom)
    }
    
    show() {
        push();
        noStroke();
        
        // Draw gradient covering entire world map
        let steps = 50; // Number of color bands
        let bandHeight = worldHeight / steps;
        
        // Start from negative coordinates to cover the whole world
        let startX = -worldWidth / 2;
        let startY = -worldHeight / 2;
        let totalWidth = worldWidth * 2; // Make it extra wide to cover everything
        
        for (let i = 0; i < steps; i++) {
            // Calculate color for this band
            let inter = i / steps; // 0 to 1
            let c = lerpColor(this.shallowColor, this.deepColor, inter);
            
            fill(c);
            rect(startX, startY + (i * bandHeight), totalWidth, bandHeight);
        }
        
        pop();
    }
}