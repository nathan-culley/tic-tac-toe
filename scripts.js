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
    function _displayBoard(board) {
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
                    _addMove(board.indexOf(row),col);
                });
    
            }
        }
    }
    function _addMove(row,col) {
        if (_detectWin(currentBoard) != false) {
            return;
        }
        
        if (_detectFill(row, col) == true) {
            alert("Square already taken");
            return;
        }
    
        currentBoard[row][col] = currentGame.getTurn();
    
        _updateDisplay(row, col, currentGame.getTurn());
        currentGame.newTurn();
    
        if (_detectWin(currentBoard) != false) {
            _endGame();
        }
        
        console.table(currentBoard);
    }
    function _endGame() {
        
        if (_detectWin(currentBoard) == 'X') {
            console.log(victoryMessage);
            victoryMessage.textContent = "Victory! " + playerX + " wins.";
        }
        if (_detectWin(currentBoard) == 'O') {
            console.log(victoryMessage);
            victoryMessage.textContent = "Victory! " + playerO + " wins.";
        }
        if (_detectWin(currentBoard) == 'draw') {
            console.log(victoryMessage);
            victoryMessage.textContent = "Game is a draw. Play again?";
            // const resetButton = document.getElementById("reset-button");
            //_insertAfter(resetButton, victoryMessage);
        }

        
    }

    // function _insertAfter(referenceNode, newNode) {
    //     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    // }
    
    
    function _updateDisplay(row, col, turn) {
        const selection = document.querySelector(`[rownum='${row}'] [colnum='${col}']`);
        console.log(selection);
        selection.innerHTML = turn;
    }
    function _detectFill(row,col) {
        if (currentBoard[row][col] == "X" | currentBoard[row][col] == "O") {
            return true;
        }
        else {
            return false;
        }
    }

    function _detectWin(currentBoard) {
        //check if a player has three in a row
    
        if (_detectWinRow(currentBoard) != false) {
            return _detectWinRow(currentBoard);
        }
    
        //check if a player has three in a column
    
        if (_detectWinCol(currentBoard) != false) {
            return _detectWinCol(currentBoard);
        }
    
        //check if a player has three in a diagonal
    
        if (_detectWinDiag(currentBoard) != false) {
            return _detectWinDiag(currentBoard);
        }
        if (detectDraw(currentBoard) != false) {
            return detectDraw(currentBoard);
        }
        return false;
    }
    
    function _detectWinRow(currentBoard) {
        //loop through rows of currentBoard
         for (let currentRow of currentBoard) {
    
            if (currentRow[0] == currentRow[1] & currentRow[0] == currentRow[2]) {
                console.log("row equal");
                if (currentRow[0,1,2] == 'X' | currentRow[0,1,2] == 'O') {
                    console.log("Win by row");
                    return currentRow[0];
                }           
            }
         }
        return false;
    }
    
    function _detectWinCol(currentBoard) {
        for (let i = 0; i <= 2; i++) {
            
            if (currentBoard[0][i] == currentBoard[1][i] & currentBoard[0][i] == currentBoard[2][i]) {
                if (currentBoard[0][i] == 'X' | currentBoard[0][i] == 'O') {
                    console.log("Win by column");
                    return currentBoard[0][i];
                }
            }
        }
        return false;
    }
    
    function _detectWinDiag(currentBoard) {
        //check down and right
        if (currentBoard[0][0] == currentBoard[1][1] & currentBoard[0][0] == currentBoard[2][2]) {
            if (currentBoard [0][0] == 'X' | currentBoard [0][0] == 'O') {
                console.log("Win by diagonal");
                return currentBoard [0][0];
            }
        }
    
        //check down and left
        if (currentBoard[0][2] == currentBoard[1][1] & currentBoard [0][2] == currentBoard[2][0]) {
            if (currentBoard [0][2] == 'X' | currentBoard [0][2] == 'O') {
            console.log("Win by diagonal");
            return currentBoard[0][2];
            }
        }
        return false;
    }
    
    function detectDraw(currentBoard) {
        for (let currentRow of currentBoard) {
            for (let currentSquare of currentRow) {
                if (currentSquare == 'X' | currentSquare == 'O') {
                    continue;
                }
                else {
                    return false;
                }
            }
        }
        return 'draw';
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
        },
        displayBoard: function(board) {
            return _displayBoard(board);
        }
    }
})();

newGame();

let playerX;
let playerO;

const nameButtonX = document.getElementById("submit-x");
const nameButtonO = document.getElementById("submit-o");

nameButtonX.addEventListener("click", () => {
    playerX = document.getElementById("player-x").value;
    console.log(playerX);
});

nameButtonO.addEventListener("click", () => {
    playerO = document.getElementById("player-o").value;
    console.log(playerO);
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
    newGame();
});

const victoryMessage = document.getElementById("victory-message");

function newGame() {
    //remove currently-displayed table on page
    const boardTable = document.getElementById("board");
    const victoryMessage = document.getElementById("victory-message");
    while (boardTable.firstChild) {
        boardTable.removeChild(boardTable.firstChild);
    }
    victoryMessage.textContent = "Send your opponent to Valhalla!"
    //create new board
    currentGame = Object.create(gameObject);
    currentBoard = currentGame.newBoard();
    currentGame.displayBoard(currentBoard);
    console.log(currentGame.getTurn());
    console.table(currentBoard);
}