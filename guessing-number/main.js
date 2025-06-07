let randomNumber = Math.floor(Math.random() * 100) + 1;

const submitBtn = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessDisplay = document.querySelector('.guesses');
const remainingGuesses = document.querySelector('.lastResult');
const feedbackMessage = document.querySelector('.lowOrHi');
const resultArea = document.querySelector('.resultParas');

let guesses = [];
let guessCount = 1;
let isGameActive = true;

// Handle guess submission
if (isGameActive) {
  submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

// Validate the user input
function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number.');
  } else if (guess < 1 || guess > 100) {
    alert('Please enter a number between 1 and 100.');
  } else {
    guesses.push(guess);
    if (guessCount === 11) {
      displayGuess(guess);
      showMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

// Check if guess is correct, too high, or too low
function checkGuess(guess) {
  if (guess === randomNumber) {
    showMessage(`Congratulations! You guessed it right.`);
    endGame();
  } else if (guess < randomNumber) {
    showMessage(` Too low! Try again.`);
  } else {
    showMessage(` Too high! Try again.`);
  }
}

// Display the current guess and remaining attempts
function displayGuess(guess) {
  userInput.value = '';
  guessDisplay.innerHTML += `${guess}, `;
  guessCount++;
  remainingGuesses.textContent = `${11 - guessCount}`;
}

// Show feedback message
function showMessage(msg) {
  feedbackMessage.innerHTML = `<h3>${msg}</h3>`;
}

// End the game and show the restart option
function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', true);

  const restart = document.createElement('p');
  restart.classList.add('button');
  restart.innerHTML = `<h2 id="newGame"> Start New Game</h2>`;
  resultArea.appendChild(restart);

  isGameActive = false;
  startNewGame();
}

// Restart the game from scratch
function startNewGame() {
  const newGameBtn = document.querySelector('#newGame');
  newGameBtn.addEventListener('click', function () {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    guesses = [];
    guessCount = 1;
    guessDisplay.innerHTML = '';
    remainingGuesses.textContent = `${11 - guessCount}`;
    feedbackMessage.innerHTML = '';
    userInput.removeAttribute('disabled');
    resultArea.removeChild(document.querySelector('.button'));
    isGameActive = true;
  });
}


