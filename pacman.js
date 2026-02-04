// -- BOARD --
let board;
let context;

const fps = calculateFPS(20);

// SIZES
const rowCount = 19;
const columnCount = 19;
const tileSize = 32;

const boardWidth = rowCount * tileSize;
const boardHeight = columnCount * tileSize;

// -- Images --

// GHOSTS
let blueGhostImage;
let orangeGhostImage;
let pinkGhostImage;
let redGhostImage;

// PACMAN
let pacmanUpImage;
let pacmanDownImage;
let pacmanRightImage;
let pacmanLeftImage;

// WALLS
let wallImage;

// -- TILEMAP --
//X = wall, O = skip, P = pac man, ' ' = food
//Ghosts: b = blue, o = orange, p = pink, r = red
const tileMap = [
    "XXXXXXXXXXXXXXXXXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X                 X",
    "X XX X XXXXX X XX X",
    "X    X       X    X",
    "XXXX XXXX XXXX XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXrXX X XXXX",
    "O       bpo       O",
    "XXXX X XXXXX X XXXX",
    "OOOX X       X XOOO",
    "XXXX X XXXXX X XXXX",
    "X        X        X",
    "X XX XXX X XXX XX X",
    "X  X     P     X  X",
    "XX X X XXXXX X X XX",
    "X    X   X   X    X",
    "X XXXXXX X XXXXXX X",
    "X                 X",
    "XXXXXXXXXXXXXXXXXXX" 
];

// Tilemap strings
const wallString = "X";
const skipString = "O";
const pacmanString = "P";
const foodString = " ";
const blueGhostString = "b";
const orangeGhostString = "o";
const pinkGhostString = "p";
const redGhostString = "r";

// Tilemap objects
const walls = new Set();
const foods = new Set();
const ghosts = new Set();

let pacman;

// Food size
const foodScale = 4;
const foodOffset = (tileSize - foodScale) / 2;

// Direction
const Direction = {
    UP: "U",
    RIGHT: "R",
    LEFT: "L",
    DOWN: "D"
};

function loadMap() {
    walls.clear();
    foods.clear();
    ghosts.clear();

    // Itterate through map to place tiles
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            const rowChars = tileMap[row];
            const tileMapChar = rowChars[column];

            const x = column * tileSize;
            const y = row * tileSize;
            
            switch (tileMapChar) {
                // MSC.
                case wallString:
                    walls.add(new Block(wallImage, x, y, tileSize, tileSize));
                    break;
                case foodString:
                    foods.add(new Block(null, x + foodOffset, y + foodOffset, foodScale, foodScale));
                    break;
                case pacmanString:
                    pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);
                    break;
                
                // GHOSTS
                case blueGhostString:
                    ghosts.add(new Block(blueGhostImage, x, y, tileSize, tileSize));
                    break;
                case orangeGhostString:
                    ghosts.add(new Block(orangeGhostImage, x, y, tileSize, tileSize));
                    break;
                case pinkGhostString:
                    ghosts.add(new Block(pinkGhostImage, x, y, tileSize, tileSize));
                    break;
                case redGhostString:
                    ghosts.add(new Block(redGhostImage, x, y, tileSize, tileSize));
                    break;
            }
        }
    }
}

function loadImages() {
    // GHOSTS
    blueGhostImage = new Image();
    blueGhostImage.src = "./Sprites/blueGhost.png";

    orangeGhostImage = new Image();
    orangeGhostImage.src = "./Sprites/orangeGhost.png";

    pinkGhostImage = new Image();
    pinkGhostImage.src = "./Sprites/pinkGhost.png";

    redGhostImage = new Image();
    redGhostImage.src = "./Sprites/redGhost.png";

    // PACMAN
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./Sprites/pacmanUp.png";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./Sprites/pacmanDown.png";

    pacmanRightImage = new Image();
    pacmanRightImage.src = "./Sprites/pacmanRight.png";

    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./Sprites/pacmanLeft.png";

    // WALLS
    wallImage = new Image();
    wallImage.src = "./Sprites/wall.png";
}

function calculateFPS(fps) {
    return 1000 / fps; // 1000(MILLISECONDS)/fps = milliseconds needed to achieve fps
}

function movePacman(e) {
    if (e.code == "ArrowUp" || e.code == "keyW") {
        pacman.updateDirection(Direction.UP);
    } else if (e.code == "ArrowDown" || e.code == "keyS") {
        pacman.updateDirection(Direction.DOWN);
    } else if (e.code == "ArrowRight" || e.code == "keyD") {
        pacman.updateDirection(Direction.RIGHT);
    } else if (e.code == "ArrowLeft" || e.code == "keyA") {
        pacman.updateDirection(Direction.LEFT);
    }

    switch (pacman.direction) {
        case Direction.UP:
            pacman.image = pacmanUpImage;
            break;
        case Direction.DOWN:
            pacman.image = pacmanDownImage;
            break;
        case Direction.RIGHT:
            pacman.image = pacmanRightImage;
            break;
        case Direction.LEFT:
            pacman.image = pacmanLeftImage;
            break;
    }
}

function move() {
    pacman.x += pacman.velocityX;
    pacman.y += pacman.velocityY;

    // Check wall collisions
    for (let wall of walls.values()) {
        if (collision(pacman, wall)) {
            pacman.x -= pacman.velocityX;
            pacman.y -= pacman.velocityY;
            break;
        }
    }
}

function collision(a, b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

function update() {
    move();
    draw();

    setTimeout(update, fps);
}



function draw() {
    context.clearRect(0, 0, board.width, board.height);

    // Draw pacman
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
    
    // Draw ghosts
    for (let ghost of ghosts.values()) {
        context.drawImage(ghost.image, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    // Draw walls
    for (let wall of walls.values()) {
        context.drawImage(wall.image, wall.x, wall.y, wall.width, wall.height);
    }

    for (let food of foods.values()) {
        context.fillStyle = "#F4E344";
        context.fillRect(food.x, food.y, food.width, food.height);
    }
}

window.onload = function() {
    board = this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); // Used for drawing on the board
    context.imageSmoothingEnabled = false;

    loadImages();
    loadMap();
    this.document.addEventListener("keyup", movePacman);

    console.log("amount of walls: " + walls.size);
    console.log("amount of food: " + foods.size);
    console.log("amount of ghosts: " + ghosts.size);

    update();
}

class Block {
    constructor(image, x, y, width, height) {
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.startX = x;
        this.startY = y;

        this.direction = Direction.RIGHT;
        this.velocityX = 0;
        this.velocityY = 0;
    }

    updateDirection(direction) {
        const prevDirection = this.direction;
        this.direction = direction;

        this.updateVelocity();

        this.x += this.velocityX;
        this.y += this.velocityY;

        for (let wall of walls.values()) {
            if (collision(this, wall)) {
                this.x -= this.velocityX;
                this.y -= this.velocityY;

                this.direction = prevDirection;

                this.updateVelocity();
                return;
            }
        }
    }

    updateVelocity() {
        const adjustedTileSize = tileSize / 4;

        switch (this.direction) {
            case Direction.UP:
                this.velocityX = 0;
                this.velocityY = -adjustedTileSize;
                break;

            case Direction.DOWN:
                this.velocityX = 0;
                this.velocityY = adjustedTileSize;
                break;

            case Direction.LEFT:
                this.velocityX = -adjustedTileSize;
                this.velocityY = 0;
                break;

            case Direction.RIGHT:
                this.velocityX = adjustedTileSize;
                this.velocityY = 0;
                break;
        }
    }
}