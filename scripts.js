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
    //loop through each row of currentBoard

        //loop through each column of currentRow

            //check if the current square matches the one to its right

                //if it does, check if that right-hand square matches the one to its right.

                    //if it does, declare victory for whichever player owns those squares

            //check if the current square matches the one to its bottom left

                //if it does, check if that bottom-left square matches the one to its bottom left.

                    //if it does, declare victory for whichever player owns those squares

            //check if the current square matches the one to its bottom
            
                //if it does, check if that bottom square matches the one to its bottom.

                    //if it does, declare victory for whichever player owns those squares

            //check if the current square matches the one to its bottom right
            
                //if it does, check if that bottom-right square matches the one to its bottom right.

                    //if it does, declare victory for whichever player owns those squares
}

//YOU'RE GETTING TYPEERRORS. CONSIDER MAKING SURE THAT YOUR ROW AND COL VALUES ARE ACTUALLY NUMBERS. THIS MAY BE WHY YOU'RE HAVING TROUBLE WHENEVER CHECKDOWNLEFT REFERS TO [COL - 1];