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
    //check if a player has three in a row

    if (detectWinRow(currentBoard) == true) {
        return true;
    }

    //check if a player has three in a column

    if (detectWinCol(currentBoard) == true) {
        return true;
    }

    //check if a player has three in a diagonal

    if (detectWinDiag(currentBoard) == true) {
        return true;
    }

    return false;
}

function detectWinRow(currentBoard) {
    //loop through rows of currentBoard
     for (let currentRow of currentBoard) {
        console.log(currentRow);
        console.log(currentRow[0]);
        console.log(currentRow[1]);
        console.log(currentRow[2]);
        if (currentRow[0] == currentRow[1] & currentRow[0] == currentRow[2]) {
            console.log("row equal");
            if (currentRow[0,1,2] == 'X' | currentRow[0,1,2] == 'O') {
                console.log("Win by row");
                return true;
            }           
        }
     }
}

function detectWinCol(currentBoard) {
    for (let i = 0; i < 2; i++) {
        
        if (currentBoard[0][i] == currentBoard[1][i] & currentBoard[0][i] == currentBoard[2][i]) {
            if (currentBoard[0][i] == 'X' | currentBoard[0][i] == 'O') {
                console.log("Win by column");
                return true;
            }
        }
    }
}

function detectWinDiag(currentBoard) {
    //check down and right
    if (currentBoard[0][0] == currentBoard[1][1] & currentBoard[0][0] == currentBoard[2][2]) {
        if (currentBoard [0][0] == 'X' | currentBoard [0][0] == 'O') {
            console.log("Win by diagonal");
            return true;
        }
        
    }

    //check down and left
    if (currentBoard[0][2] == currentBoard[1][1] & currentBoard [0][2] == currentBoard[2][0]) {
        if (currentBoard [0][0] == 'X' | currentBoard [0][0] == 'O') {
        console.log("Win by diagonal");
        return true;
        }
    }

}