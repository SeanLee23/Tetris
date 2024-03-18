const gameBoard = document.getElementById('gameBoard');
const scoreElement = document.getElementById('score');
const linesElement = document.getElementById('lines');

const ROWS = 20;
const COLUMNS = 10;
const BLOCK_SIZE = 30;
const EMPTY_BLOCK_COLOR = '#f3f3f3';
const TETROMINOS = [
  [[1, 1, 1, 1]], // I
  [[1, 1, 1], [0, 1, 0]], // T
  [[1, 1, 0], [0, 1, 1]], // Z
  [[0, 1, 1], [1, 1, 0]], // S
  [[1, 1, 1], [1, 0, 0]], // L
  [[1, 1, 1], [0, 0, 1]], // J
  [[1, 1], [1, 1]], // O
];
const COLORS = ['#00FFFF', '#FFA500', '#FFFF00', '#00FF00', '#800080', '#FF0000', '#0000FF'];

let board = [];
let currentTetromino;
let currentTetrominoColor;
let currentTetrominoPosition;
let score = 0;
let lines = 0;
let gameInterval;
let isPaused = false;

function createBoard() {
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLUMNS; col++) {
      board[row][col] = EMPTY_BLOCK_COLOR;
    }
  }
}

function drawBoard() {
  gameBoard.innerHTML = '';
  board.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      const block = document.createElement('div');
      block.style.backgroundColor = color;
      block.style.gridColumn = colIndex + 1;
      block.style.gridRow = rowIndex + 1;
      gameBoard.appendChild(block);
    });
  });
}

function getRandomTetromino() {
  const index = Math.floor(Math.random() * TETROMINOS.length);
  return {
    shape: TETROMINOS[index],
    color: COLORS[index],
    position: {
      x: Math.floor(COLUMNS / 2) - 1,
      y: 0
    }
  };
}

function drawTetromino() {
  currentTetromino.shape.forEach((row, rowIndex) => {
    row.forEach((block, colIndex) => {
      if (block === 1) {
        const x = currentTetromino.position.x + colIndex;
        const y = currentTetromino.position.y + rowIndex;
        board[y][x] = currentTetromino.color;
      }
    });
  });
}

function clearTetromino() {
  currentTetromino.shape.forEach((row, rowIndex) => {
    row.forEach((block, colIndex) => {
      if (block === 1) {
        const x = currentTetromino.position.x + colIndex;
        const y = currentTetromino.position.y + rowIndex;
        board[y][x] = EMPTY_BLOCK_COLOR;
      }
    });
  });
}

function moveTetrominoDown() {
  clearTetromino();
  currentTetromino.position.y++;
  if (isCollision()) {
    currentTetromino.position.y--;
    mergeTetromino();
    clearLines();
    spawnTetromino();
  }
  drawTetromino();
  drawBoard();
}

function moveTetrominoRight() {
  clearTetromino();
  currentTetromino.position.x++;
  if (isCollision()) {
    currentTetromino.position.x--;
  }
  drawTetromino();
  drawBoard();
}

function moveTetrominoLeft() {
  clearTetromino();
  currentTetromino.position.x--;
  if (isCollision()) {
    currentTetromino.position.x++;
  }
  drawTetromino();
  drawBoard();
}

function rotateTetromino() {
  clearTetromino();
  const originalShape = currentTetromino.shape;
  const rotatedShape = [];
  for (let i = 0; i < originalShape[0].length; i++) {
    rotatedShape.push(originalShape.map(row => row[i]).reverse());
  }
  currentTetromino.shape = rotatedShape;
  if (isCollision()) {
    currentTetromino.shape = originalShape;
  }
  drawTetromino();
  drawBoard();
}

function isCollision() {
  const { shape, position } = currentTetromino;
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      if (shape[row][col] === 1) {
        const x = position.x + col;
      }
    }
  }
}
