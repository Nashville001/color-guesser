"use strict";

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorHintBox = document.querySelector('[data-testid="colorHintBox"]'); 
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreElement = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

const colors = [
  "#eb7434",
  "#5beb34",
  "#eddf13",
  "#3228ed",
  "#6508cf",
  "#ed1a2c",
];

let targetColor;
let score = 0;

// Function to generate a lighter hint color
function generateHintColor(hex) {
  let color = hex.substring(1); 
  let rgb = parseInt(color, 16); 
  let r = (rgb >> 16) + 50; 
  let g = ((rgb >> 8) & 0xff) + 50; 
  let b = (rgb & 0xff) + 50; 

  r = Math.min(255, r);
  g = Math.min(255, g);
  b = Math.min(255, b);

  return `rgb(${r}, ${g}, ${b})`;
}

// Function to display the hint color 
function displayHint() {
  colorHintBox.style.backgroundColor = generateHintColor(targetColor);
  colorHintBox.style.opacity = "1"; 
  colorHintBox.style.display = "block"; 

  setTimeout(() => {
    colorHintBox.style.transition = "opacity 1s ease-out";
    colorHintBox.style.opacity = "0";
  }, 1500);
}

// Function to start a new round 
function nextRound() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  colorBox.style.backgroundColor = targetColor;

  // Reset hint box before showing a new hint
  colorHintBox.style.transition = "none"; 
  colorHintBox.style.opacity = "1"; 
  displayHint(); 

  colorOptions.forEach((div, index) => {
    div.style.backgroundColor = colors[index];
  });

  gameStatus.textContent = "Guess the color!";
}

// Function to start the game (resets everything)
function startGame() {
  score = 0;
  scoreElement.textContent = score;
  nextRound();
}

// Function to check the player's guess
function checkGuess(event) {
  const guessedColor = event.target.style.backgroundColor;
  const targetRGB = getComputedStyle(colorBox).backgroundColor; 

  // Convert guessed color to RGB format to ensure comparison works
  const guessedRGB = getComputedStyle(event.target).backgroundColor;

  if (guessedRGB === targetRGB) {
    // Keep playing after guessing correctly
    gameStatus.textContent = "Correct!";
    score++;
    scoreElement.textContent = score;
    setTimeout(nextRound, 1000); 
  } else {
    // Restarts after guessing wrong
    gameStatus.textContent = "Wrong! Restarting...";
    setTimeout(startGame, 1500); 
  }
}


colorOptions.forEach((div) => {
  div.addEventListener("click", checkGuess);
});


newGameButton.addEventListener("click", startGame);

// Initialize game
startGame();
