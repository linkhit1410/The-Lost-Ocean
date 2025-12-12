class Ground {
    constructor() {
        for (let i = 0; i < mapSize; i++) {
            x_screen[i] = [];
            y_screen[i] = [];
            tileType[i] = [];
            for (let j = 0; j < mapSize; j++) {
                x_screen[i][j] = x_start + j * tileWidth / 2;
                y_screen[i][j] = y_start + i * tileHeight / 2;
                tileType[i][j] = random(tileTypes);
            }
        }
    }

    show() {
        for (let i = 0; i < mapSize; i++) {
            for (let j = 0; j < mapSize; j++) {
                if (tileType[i][j] == 'A') {
                    drawtilesA(x_screen[i][j], y_screen[i][j]);
                } else if (tileType[i][j] == 'B') {
                    drawtilesB(x_screen[i][j], y_screen[i][j]);
                } else if (tileType[i][j] == 'C') {
                    drawtilesC(x_screen[i][j], y_screen[i][j]);
                }
            }
        }
    }
}

// Sandy ocean floor - light tan/beige
function drawtilesA(_x, _y) {
    push();
    fill(194, 178, 128); // Sandy color
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();
}

// Rocky ocean floor - darker grey-blue
function drawtilesB(_x, _y) {
    push();
    fill(89, 111, 126); // Rocky blue-grey
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();
}

// Coral patches - teal/aqua
function drawtilesC(_x, _y) {
    push();
    fill(64, 122, 114); // Darker teal for coral
    translate(_x, _y);
    beginShape();
    vertex(tileWidth / 2, 0);
    vertex(tileWidth, tileHeight / 2);
    vertex(tileWidth / 2, tileHeight);
    vertex(0, tileHeight / 2);
    endShape();
    pop();
}