let sequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
let highScore = 0;
let clickable = false;

const tiles = document.querySelectorAll('.tile');
const startButton = document.getElementById('start-button');
const replayButton = document.getElementById('replay-button');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameOverText = document.getElementById('game-over-text');

startButton.addEventListener('click', startGame);
replayButton.addEventListener('click', () => {
    replayButton.style.display = "none"; // Hide replay button
    gameOverText.style.display = "none"; // Hide game over text
    startGame(); // Start the game
});

tiles.forEach(tile => {
    tile.addEventListener('click', handleTileClick);
});

function startGame() {
    sequence = [];
    playerSequence = [];
    level = 0;
    score = 0;
    clickable = false;
    updateScore();
    updateLevel();
    
    // Hide screens as necessary
    startScreen.classList.remove('active'); // Hide start screen
    startScreen.classList.add('hidden'); // Hide start screen
    gameOverScreen.classList.add('hidden'); // Hide game over screen
    gameOverText.classList.add('hidden'); // Hide game over text
    gameScreen.classList.remove('hidden'); // Show game screen
    gameScreen.classList.add('active'); // Show game screen
    nextLevel();
}

function nextLevel() {
    level++;
    updateLevel();
    sequence.push(generateRandomTile());
    playerSequence = [];
    clickable = false;
    playSequence();
}

function generateRandomTile() {
    const tilesArray = ['red', 'blue', 'yellow', 'green'];
    return tilesArray[Math.floor(Math.random() * tilesArray.length)];
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        const tileId = sequence[i];
        const tile = document.getElementById(tileId);
        tile.classList.add('active');
        setTimeout(() => {
            tile.classList.remove('active');
        }, 500);

        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            clickable = true;
        }
    }, 800);
}

function handleTileClick(event) {
    if (!clickable) return;

    const clickedTile = event.target.id;
    playerSequence.push(clickedTile);
    const currentStep = playerSequence.length - 1;

    // Scale and highlight the clicked tile
    const tile = event.target;
    tile.classList.add('active');
    setTimeout(() => {
        tile.classList.remove('active');
    }, 300); // Keep the effect for 300ms

    if (playerSequence[currentStep] !== sequence[currentStep]) {
        gameOver();
        return;
    }

    if (playerSequence.length === sequence.length) {
        score += 100;
        updateScore();
        nextLevel();
    }
}

function gameOver() {
    clickable = false;
    if (score > highScore) {
        highScore = score;
        updateHighScore();
    }
    gameScreen.classList.add('hidden'); // Hide game screen
    gameOverScreen.classList.remove('hidden'); // Show game over screen
    gameOverScreen.classList.add('active'); // Show game over screen
    gameOverText.classList.remove('hidden'); // Show game over text
}

function updateLevel() {
    levelDisplay.textContent = `Level: ${level}`;
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateHighScore() {
    highScoreDisplay.textContent = `High Score: ${highScore}`;
}
