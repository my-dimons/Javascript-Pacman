// -- BOARD --
let board;
let context;

// SIZES
const rowCount = 21;
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

const walls = new Set();
const foods = new Set();
const ghosts = new Set();

let pacman;

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
                    foods.add(new Block(null, x + 14, y + 14, tileSize, tileSize));
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

function update() {
    draw();

    setTimeout(update, 50) // Update every 50ms for 20fps: 1000(MILLISECONDS)/20(FPS) = 50 (MILLISECONDS)
}

function draw() {
    // Draw pacman
    context.drawImage(pacman.image, pacman.x, pacman.y, pacman.width, pacman.height);
}

window.onload = function() {
    board = this.document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;

    context = board.getContext("2d"); // Used for drawing on the board

    loadImages();
    loadMap();

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
    }
}