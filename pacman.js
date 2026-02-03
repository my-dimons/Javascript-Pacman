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
                case wallString:
                    const wall = new Block(wallImage, x, y, tileSize, tileSize);
                    walls.add(wall);

                    break;
                case foodString:
                    const food = new Block(null, x + 14, y + 14, tileSize, tileSize);
                    foods.add(food);

                    break;
                case pacmanString:
                    pacman = new Block(pacmanRightImage, x, y, tileSize, tileSize);

                    break;
                
                // GHOSTS
                case blueGhostString:
                    const blueGhost = new Block(blueGhostImage, x, y, tileSize, tileSize);
                    ghosts.add(blueGhost);

                    break;
                case orangeGhostString:
                    const orangeGhost = new Block(orangeGhostImage, x, y, tileSize, tileSize);
                    ghosts.add(orangeGhost);

                    break;
                case pinkGhostString:
                    const pinkGhost = new Block(pinkGhostImage, x, y, tileSize, tileSize);
                    ghosts.add(pinkGhost);

                    break;
                case redGhostString:
                    const redGhost = new Block(redGhostImage, x, y, tileSize, tileSize);
                    ghosts.add(redGhost);

                    break;
            }
        }
    }
}

function loadImages() {
    // GHOSTS
    blueGhostImage = new Image();
    blueGhostImage.src = "./Sprites/blueGhost";

    orangeGhostImage = new Image();
    orangeGhostImage.src = "./Sprites/orangeGhost";

    pinkGhostImage = new Image();
    pinkGhostImage.src = "./Sprites/pinkGhost";

    redGhostImage = new Image();
    redGhostImage.src = "./Sprites/redGhost";

    // PACMAN
    pacmanUpImage = new Image();
    pacmanUpImage.src = "./Sprites/pacmanUp";

    pacmanDownImage = new Image();
    pacmanDownImage.src = "./Sprites/pacmanDown";

    pacmanRightImage = new Image();
    pacmanRightImage.src = "./Sprites/pacmanRight";

    pacmanLeftImage = new Image();
    pacmanLeftImage.src = "./Sprites/pacmanLeft";

    // WALLS
    wallImage = new Image();
    wallImage.src = "./Sprites/wall.png";
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