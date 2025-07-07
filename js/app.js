/*  Constants  */
const helpButton = document.getElementById('helpbutton');
const playButton = document.getElementById('playbutton');
const helpPopup = document.getElementById('helpPopup');
const word = 'AHMAD';
const maxChances = 6;
const hint = 'It is a name of a person';

/*  Game State */
let guessedLetters = [];
let wrongGuesses = [];
let remainingChances = maxChances;

/*  Cached Elements */
const wordDisplay = document.getElementById('word-display');
const letterInput = document.getElementById('letter-input');
const submitBtn = document.getElementById('submitbtn');
const resetBtn = document.getElementById('resetbtn');
const message = document.getElementById('message');
const hangmanParts = document.querySelectorAll('.hangman .part');
const hintBtn = document.getElementById('hint-btn');
const hintText = document.getElementById('hint-text');

/*  Functions  */

// Draw the word display with guessed letters or "_"
function updateWordDisplay() {
  let display = "";
  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }
  wordDisplay.textContent = display.trim();
}

// Show hangman parts based on number of wrong guesses//
function updateHangmanDrawing() {
  for (let i = 0; i < hangmanParts.length; i++) {
    hangmanParts[i].style.display = i < wrongGuesses.length ? 'block' : 'none';
  }
}

// Check win/lose conditions//
function checkGameStatus() {
  let allGuessed = true;
  for (let i = 0; i < word.length; i++) {
    if (!guessedLetters.includes(word[i])) {
      allGuessed = false;
      break;
    }
  }

  if (allGuessed) {
    message.textContent = '🎉 You won!';
    submitBtn.disabled = true;
    letterInput.disabled = true;
  } else if (remainingChances <= 0) {
    message.textContent = `💀 Game Over! The word was "${word}".`;
    submitBtn.disabled = true;
    letterInput.disabled = true;
  } else {
    message.textContent = `❌ Wrong letters: ${wrongGuesses.join(', ')} | ❤️ Chances left: ${remainingChances}`;
  }
}

// Process user guess //
function handleGuess() {
  let guess = letterInput.value.toUpperCase();
  letterInput.value = "";

  if (
    guess.length !== 1 ||
    guessedLetters.includes(guess) ||
    wrongGuesses.includes(guess)
  ) {
    return; // Skip invalid or repeated guess //
  }

  if (word.includes(guess)) {
    guessedLetters.push(guess);
  } else {
    wrongGuesses.push(guess);
    remainingChances--;
  }

  updateWordDisplay();
  updateHangmanDrawing();
  checkGameStatus();

  // Debugging output //
  console.log("Guess submitted:", guess);
  console.log("Remaining chances:", remainingChances);
}

// Reset game
function resetGame() {
  guessedLetters = [];
  wrongGuesses = [];
  remainingChances = maxChances;
  submitBtn.disabled = false;
  letterInput.disabled = false;
  message.textContent = '';
  updateWordDisplay();
  updateHangmanDrawing();
}

/*  Event Listeners */

if (submitBtn && letterInput) {
  submitBtn.addEventListener('click', handleGuess);
}

if (resetBtn) {
  resetBtn.addEventListener('click', resetGame);
}

if (hintBtn) {
  hintBtn.addEventListener('click', function () {
    hintText.textContent = hint;
  });
}

if (helpButton && helpPopup) {
  helpButton.addEventListener('click', function () {
    helpPopup.style.display = helpPopup.style.display === 'none' ? 'block' : 'none';
  });
}

/* Initial Display Setup  , It shows the ----- in the game page */
if (wordDisplay) {
  updateWordDisplay();
  updateHangmanDrawing();
}

console.log("Game started");
