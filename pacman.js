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

const walls = new Set();
const food = new Set();
const ghosts = new Set();

let pacman;

function loadMap() {
    walls.clear();
    food.clear();
    ghosts.clear();
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
}