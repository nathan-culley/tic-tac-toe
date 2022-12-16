const gameObject = (() => {
    const _newBoard = (rows, columns) => {
        const gameArray= [];
        return _createBoard(gameArray, rows, columns);
    };

    function _createBoard(gameArray, rows, columns) {
        for (let i = 0; i <= rows - 1; i++) {
            gameArray[i] = _createRow(columns);
        }
        return gameArray;
    }
    function _createRow(columns) {
        let rowArray = [];
        for (let i = 0; i <= columns - 1; i++) {
            rowArray[i] = new Object();
        }
        return rowArray;
    }
    function _getSquare(row, col) {
        return "hello";
    }

    return {
        newGame: function(rows, columns) {
            return _newBoard(rows, columns);
        },
        getSquare: function(row, col) {
            return _getSquare(row, col);
        },
    }
})();

console.log(gameObject.newGame(3, 3));
console.log(gameObject.getSquare());

// let gameArray = [];
// let rows = 3;
// let columns = 3;




// createBoard(gameArray, rows);
// console.log(createBoard(gameArray, rows));