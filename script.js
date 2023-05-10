// Variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = '';

// Elements
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.options button:nth-of-type(1)');
const computerButton = document.querySelector('.options button:nth-of-type(2)');
const friendButton = document.querySelector('.options button:nth-of-type(3)');

// Event Listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => makeMove(index));
});

resetButton.addEventListener('click', resetGame);
computerButton.addEventListener('click', playAgainstComputer);
friendButton.addEventListener('click', playWithFriend);

// Functions
function makeMove(index) {
    if (board[index] === '' && gameMode !== '') {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(currentPlayer);
        
        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            gameMode = '';
        } else if (checkDraw()) {
            message.textContent = "It's a draw!";
            gameMode = '';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (gameMode === 'computer' && currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500);
            }
        }
    }
}

function makeComputerMove() {
    const availableMoves = getAvailableMoves();
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomIndex];
    makeMove(move);
}

function getAvailableMoves() {
    return board.reduce((moves, cell, index) => {
        if (cell === '') {
            moves.push(index);
        }
        return moves;
    }, []);
}

function checkWin() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return !board.includes('');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameMode = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winner');
    });
    message.textContent = '';
}

function playAgainstComputer() {
    resetGame();
    gameMode = 'computer';
    message.textContent = "Play against computer: You're X";
}

function playWithFriend() {
    resetGame();
    gameMode = 'friend';
    message.textContent = "Play with a friend: X's turn";
}