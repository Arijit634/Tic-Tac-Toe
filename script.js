const cells = document.querySelectorAll('[data-cell]');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const tieScore = document.getElementById('tie-score');

let currentPlayer = 'X';
let moves = 0;
let gameActive = true;

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const cell = e.target;
  
  if (!gameActive || cell.textContent !== '') {
    return;
  }

  cell.textContent = currentPlayer;
  moves++;
  checkWin();

  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      endGame(cells[a].textContent);
      return;
    }
  }
  if (moves === 9) {
    endGame('Tie');
  }
}

function endGame(result) {
  gameActive = false;
  if (result === 'Tie') {
    tieScore.textContent = parseInt(tieScore.textContent) + 1;
    alert('Game tied!');
  } else {
    if (result === 'X') {
      player1Score.textContent = parseInt(player1Score.textContent) + 1;
    } else {
      player2Score.textContent = parseInt(player2Score.textContent) + 1;
    }
    alert(`Player ${result} won!`);
  }
  resetGame();
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  moves = 0;
  gameActive = true;
}
