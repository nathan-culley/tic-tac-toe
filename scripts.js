const gameObject = (() => {
    const _newBoard = () => {
        const boardArray= [];
        return _createBoard(boardArray, 3, 3);
    };

    function _createBoard(boardArray, rows, columns) {
        for (let i = 0; i <= rows - 1; i++) {
            boardArray[i] = _createRow(columns, i);
        }
        return boardArray;
    }
    function _createRow(columns) {
        let rowArray = [];
        for (let i = 0; i <= columns - 1; i++) {
            rowArray[i] = new String(i);
        }
        return rowArray;
    }
    let _turn = "X";
    function _newTurn() {
        if (_turn == "X") {
            _turn = "O";
        }
        else {
            _turn = "X";
        }
        return _turn;
    }

    return {
        newBoard: function() {
            return _newBoard();
        },
        getTurn: function() {
            return _turn;
        },
        newTurn: function() {
            return _newTurn();
        }
    }
})();

newGame();


function newGame() {
    //remove currently-displayed table on page
    const boardTable = document.getElementById("board");
    while (boardTable.firstChild) {
        boardTable.removeChild(boardTable.firstChild);
    }
    //create new board
    currentGame = Object.create(gameObject);
    currentBoard = currentGame.newBoard();
    displayBoard(currentBoard);
    console.log(currentGame.getTurn());
    console.table(currentBoard);
}

function addMove(row,col) {
    if (detectFill(row, col) == true) {
        alert("Square already taken");
        return;
    }
    if (currentGame.getTurn() == "X") {
        currentBoard[row][col] = "X";
        updateDisplay(row, col, currentGame.getTurn());
        currentGame.newTurn();
        
    }
    else {
        currentBoard[row][col] = "O";
        updateDisplay(row, col, currentGame.getTurn());
        currentGame.newTurn();
        
    }
    
    console.table(currentBoard);
}

function displayBoard(board) {
    const boardTable = document.getElementById("board");
    //cycle through rows
    for (let row of board) {
        //create row within board
        const tableRow = document.createElement("tr");
        tableRow.setAttribute("rownum", board.indexOf(row));
        boardTable.appendChild(tableRow);
        //cycle through columns and create td within row
        for (let col of row) {
            const tableCol = document.createElement("td");
            tableRow.appendChild(tableCol);
            tableCol.setAttribute("rownum", board.indexOf(row));
            tableCol.setAttribute("colnum", col);
            tableCol.addEventListener("click", () => {
                addMove(board.indexOf(row),col);
            });

        }
    }
}

function updateDisplay(row, col, turn) {
    const selection = document.querySelector(`[rownum='${row}'] [colnum='${col}']`);
    console.log(selection);
    selection.innerHTML = turn;
}

function detectFill(row,col) {
    if (currentBoard[row][col] == "X" | currentBoard[row][col] == "O") {
        return true;
    }
    else {
        return false;
    }
}

function detectWin(currentBoard) {
    console.table(currentBoard);
    //loop through rows of currentBoard
    for (let currentRow of currentBoard) {
        //loop through columns of currentRow
        for (let currentCol of currentRow) {
            //does the square to the right have the same value?
            if (checkRight(currentBoard.indexOf(currentRow), currentCol) == true) {
                if (checkRight(currentBoard.indexOf(currentRow), currentCol + 1) == true) {
                    return currentCol;
                }
            }
            //does the square down and left have the same value?
            if (checkDownLeft(currentBoard.indexOf(currentRow), currentCol) == true) {
                if (checkDownLeft(currentBoard.indexOf(currentRow) +1, currentCol - 1) == true) {
                    return currentCol;
                }
            }
            //does the square straight down have the same value?
            if (checkDown(currentBoard.indexOf(currentRow), currentCol) == true) {
                if (checkDown(currentBoard.indexOf(currentRow) + 1, currentCol) == true) {
                    return currentCol;
                }
            }
            //does the square down and right have the same value?
            if (checkDownRight(currentBoard.indexOf(currentRow), currentCol) == true) {
                if (checkDownRight(currentBoard.indexOf(currentRow) + 1, currentCol + 1) == true) {
                    return currentCol;
                }
            }
        }
    }
}

function checkRight(row, col) {
    if (currentBoard[row][col + 1] == undefined) {
        return false;
    }
    if (currentBoard[row][col] == currentBoard[row][col + 1]) {
        console.log("match");
        return true;
    }
    else {
        return false;
    }
}

function checkDownLeft(row, col) {
    if (currentBoard[row + 1][col - 1] == undefined) {
        return false;
    }
    if (currentBoard[row][col] == currentBoard[row + 1][col - 1]) {
        console.log("match");
        return true;
    }
    else {
        return false;
    }
}

function checkDown(row, col) {
    if (currentBoard[row + 1][col] == undefined) {
        return false;
    }
    if (currentBoard[row][col] == currentBoard[row + 1][col]) {
        console.log("match");
        return true;
    }
    else {
        return false;
    }
}

function checkDownRight(row, col) {
    if (currentBoard[row + 1][col + 1] == undefined) {
        return false;
    }
    if (currentBoard[row][col] == currentBoard[row + 1][col + 1]) {
        console.log("match");
        return true;
    }
    else {
        return false;
    }
}