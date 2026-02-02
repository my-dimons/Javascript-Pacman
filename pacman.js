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