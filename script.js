const boardElement = document.getElementById('board');
const moveInput = document.getElementById('moveInput');
const moveButton = document.getElementById('moveButton');
const quitButton = document.getElementById('quitButton');
const messageElement = document.getElementById('message');
let currentPlayer = 'Player 1';
let gameOver = false;

const pieces = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

const initialBoard = [
    ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

function drawBoard(board) {
    boardElement.innerHTML = '';
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const cell = document.createElement('div');
            cell.className = `cell ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
            if (board[row][col]) {
                const piece = document.createElement('div');
                piece.className = 'piece';
                piece.innerText = pieces[board[row][col]];
                cell.appendChild(piece);
            }
            boardElement.appendChild(cell);
        }
    }
}

function validateMove(move) {
    // Simplified move validation for demo purposes
    const [from, to] = move.split(' ');
    const fromRow = 8 - parseInt(from[1]);
    const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
    const toRow = 8 - parseInt(to[1]);
    const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
    if (initialBoard[fromRow][fromCol] && !initialBoard[toRow][toCol]) {
        return true;
    }
    return false;
}

function makeMove(move) {
    const [from, to] = move.split(' ');
    const fromRow = 8 - parseInt(from[1]);
    const fromCol = from.charCodeAt(0) - 'a'.charCodeAt(0);
    const toRow = 8 - parseInt(to[1]);
    const toCol = to.charCodeAt(0) - 'a'.charCodeAt(0);
    initialBoard[toRow][toCol] = initialBoard[fromRow][fromCol];
    initialBoard[fromRow][fromCol] = '';
    drawBoard(initialBoard);
}

function checkWinner() {
    // Simplified winner check for demo purposes
    const piecesLeft = initialBoard.flat().filter(piece => piece).length;
    if (piecesLeft === 2) {
        gameOver = true;
        return currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    }
    return null;
}

moveButton.addEventListener('click', () => {
    if (gameOver) return;
    const move = moveInput.value;
    if (validateMove(move)) {
        makeMove(move);
        const winner = checkWinner();
        if (winner) {
            messageElement.innerText = `${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
            messageElement.innerText = `${currentPlayer}'s turn`;
        }
    } else {
        messageElement.innerText = 'Invalid move. Try again.';
    }
    moveInput.value = '';
});

quitButton.addEventListener('click', () => {
    if (gameOver) return;
    gameOver = true;
    const winner = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    messageElement.innerText = `${winner} wins!`;
});

drawBoard(initialBoard);
messageElement.innerText = `${currentPlayer}'s turn`;
