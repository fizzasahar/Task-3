var cells = document.querySelectorAll('[data-cell]');
var statusText = document.getElementById('status');
var restartButton = document.getElementById('restartButton');
var currentPlayer = 'X';
var boardState = ['', '', '', '', '', '', '', '', ''];
var gameActive = true;

var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    var cell = e.target;
    var cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== '' || !gameActive) return;

    updateCell(cell, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player${currentPlayer}`);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    var roundWon = false;

    for (var i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        switchPlayer();
    }
}

function restartGame() {
    currentPlayer = 'X';
    boardState = ['', '', '', '', '', '', '', '', ''];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
    });
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);



function checkWinner() {
    var roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        var [a, b, c] = winningCombinations[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            [cells[a], cells[b], cells[c]].forEach(cell => cell.classList.add('winning-cell'));
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        switchPlayer();
    }
}
