let gameBoard = [];

let rows = 3;
let columns = 3;

function createRow(gameBoard, columns) {
    let rowArray = [];
    for (let i = 0; i <= columns - 1; i++) {
        rowArray[i] = new Object();
    }
    return rowArray;
}

function createBoard(gameBoard, rows) {
    for (let i = 0; i <= rows - 1; i++) {
        gameBoard[i] = createRow(gameBoard, columns);
    }
    return gameBoard;
}