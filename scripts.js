const gameObject = (() => {
    const newGame = (rows, columns) => {
        const gameArray= [];
        return createBoard(gameArray, rows, columns);
        // return gameArray;
    }
    return {
        newGame,
    }
})();

// gameObject.newGame(3, 3);

// let gameArray = [];
// let rows = 3;
// let columns = 3;

function createRow(columns) {
    let rowArray = [];
    for (let i = 0; i <= columns - 1; i++) {
        rowArray[i] = new Object();
    }
    return rowArray;
}

function createBoard(gameArray, rows, columns) {
    for (let i = 0; i <= rows - 1; i++) {
        gameArray[i] = createRow(columns);
    }
    return gameArray;
}
// createBoard(gameArray, rows);
// console.log(createBoard(gameArray, rows));