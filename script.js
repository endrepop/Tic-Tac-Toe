
// Select all the squares on the board
const squares = document.querySelectorAll('.square');

// Set up event listener for each square
squares.forEach(square => square.addEventListener('click', handleClick));

// Track whose turn it is
let currentPlayer = 'X';

function handleClick(e) {
  const square = e.target;

  // Check if the square is already taken
  if (square.textContent !== '') {
    return;
  }

  // Add the current player's mark to the square
  square.textContent = currentPlayer;

  // Check if the current player has won
  if (checkForWin(currentPlayer)) {
    alert(currentPlayer + ' wins!');
    resetBoard();
    return;
  }

  // Check if the board is full and no one has won
  if (checkForDraw()) {
    alert('Draw!');
    resetBoard();
    return;
  }

  // Switch to the other player's turn
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  // If it's the AI's turn, make a random move
  if (currentPlayer === 'O') {
    makeAIMove();
  }
}

function checkForWin(player) {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (squares[i].textContent === player &&
        squares[i+1].textContent === player &&
        squares[i+2].textContent === player) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (squares[i].textContent === player &&
        squares[i+3].textContent === player &&
        squares[i+6].textContent === player) {
      return true;
    }
  }

  // Check diagonals
  if (squares[0].textContent === player &&
      squares[4].textContent === player &&
      squares[8].textContent === player) {
    return true;
  }
  if (squares[2].textContent === player &&
      squares[4].textContent === player &&
      squares[6].textContent === player) {
    return true;
  }

  // If no win, return false
  return false;
}

function checkForDraw() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function resetBoard() {
  squares.forEach(square => {
    square.textContent = '';
  });
  currentPlayer = 'X';
}

function makeAIMove() {
    // Generate a random index between 0 and 8
    const index = Math.floor(Math.random() * 9);
  
    // If the square is already taken, try again
    if (squares[index].textContent !== '') {
      makeAIMove();
      return;
    }
  
    // Add the AI's mark to the square after a delay
    setTimeout(() => {
      squares[index].textContent = currentPlayer;
  
      // Check if the AI has won
      if (checkForWin(currentPlayer)) {
        alert(currentPlayer + ' wins!');
        resetBoard();
        return;
      }
  
      // Check if the board is full and no one has won
      if (checkForDraw()) {
        alert('Draw!');
        resetBoard();
        return;
      }
  
      // Switch to the other player's turn
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }, 500);
  }