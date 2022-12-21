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
    // function _getRow(row) {
    //     console.log(_newBoard(row));
    //     return "hello";
    // }

    return {
        newBoard: function() {
            return _newBoard();
        },
        // getRow: function(row) {
        //     return _getRow(row);
        // },
    }
})();

// let currentBoard = gameObject.newBoard();
// let turn = "x";

// console.table(currentBoard);

newGame();


function newGame() {
    //create new board
    currentGame = Object.create(gameObject);
    currentBoard = currentGame.newBoard();
    displayBoard(currentBoard);
    turn = "x";
    console.table(currentBoard);
}

function addMove(row,col) {
    if (detectFill(row, col) == true) {
        alert("Square already taken");
        return;
    }
    if (turn == "x") {
        currentBoard[row][col] = "x";
        updateDisplay(row, col, turn);
        turn = "o";
    }
    else {
        currentBoard[row][col] = "o";
        updateDisplay(row, col, turn);
        turn = "x";
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
        }
    }
}

function updateDisplay(row, col, turn) {
    const selection = document.querySelector(`[rownum='${row}'] [colnum='${col}']`);
    console.log(selection);
    selection.innerHTML = turn;
}

function detectFill(row,col) {
    if (currentBoard[row][col] == "x" | currentBoard[row][col] == "o") {
        return true;
    }
    else {
        return false;
    }
}