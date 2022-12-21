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

let currentBoard = gameObject.newBoard();
let turn = "x";

console.table(currentBoard);


function newGame() {
    //create new board
    currentBoard = gameObject.newBoard();
    turn = "x";
    console.table(currentBoard);
    console.log(turn);
}

function addMove(row,col) {
    if (turn == "x") {
        currentBoard[row][col] = "x";
        turn = "o";
    }
    else {
        currentBoard[row][col] = "o";
        turn = "x";
    }
    console.table(currentBoard);
}