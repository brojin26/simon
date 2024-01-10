class SimonGame {
  constructor() {
    this.pattern = [];
    this.userPattern = [];
    this.score = 0;
    this.colors = ["red", "green", "blue", "yellow"];
    this.speed = 1000; // Speed of pattern display in milliseconds
  }

  startGame() {
    this.pattern = [];
    this.userPattern = [];
    this.score = 0;
    this.nextRound();
  }

  nextRound() {
    this.addToPattern();
    this.displayPattern();
  }

  addToPattern() {
    const randomColor =
      this.colors[Math.floor(Math.random() * this.colors.length)];
    this.pattern.push(randomColor);
    this.score++;
  }

  displayPattern() {
    let index = 0;
    const interval = setInterval(() => {
      this.lightUpButton(this.pattern[index]);
      index++;

      if (index >= this.pattern.length) {
        clearInterval(interval);
        setTimeout(() => this.clearButtons(), 500);
      }
    }, this.speed);
  }

  lightUpButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = "1";
    setTimeout(() => {
      button.style.opacity = "0.7";
    }, this.speed / 2);
  }

  clearButtons() {
    this.userPattern = [];
    this.enableButtons();
  }

  enableButtons() {
    document.querySelectorAll(".btn").forEach((btn) => (btn.disabled = false));
  }

  disableButtons() {
    document.querySelectorAll(".btn").forEach((btn) => (btn.disabled = true));
  }

  handleButtonClick(color) {
    this.lightUpButton(color);
    this.userPattern.push(color);

    if (
      this.userPattern[this.userPattern.length - 1] !==
      this.pattern[this.userPattern.length - 1]
    ) {
      this.endGame();
    } else if (this.userPattern.length === this.pattern.length) {
      this.disableButtons();
      setTimeout(() => {
        this.nextRound();
      }, 1000);
    }
  }

  endGame() {
    alert(`Game Over! Your score: ${this.score}`);
    this.updateHighScores();
    this.startGame();
  }

  updateHighScores() {
    // This is a simple example. In a real application, you would persist the scores.
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(this.score);
    highScores.sort((a, b) => b - a);
    highScores.splice(10); // Keep only the top 10 scores
    localStorage.setItem("highScores", JSON.stringify(highScores));
    this.displayHighScores(highScores);
  }

  displayHighScores(highScores) {
    const scoresContainer = document.getElementById("score");
    scoresContainer.innerHTML = `<div>Top 10 Scores:</div>`;
    highScores.forEach((score, index) => {
      scoresContainer.innerHTML += `<div>${index + 1}. ${score}</div>`;
    });
  }
}

const simonGame = new SimonGame();

function handleButtonClick(color) {
  simonGame.handleButtonClick(color);
}

// Start the game when the page loads
window.onload = () => {
  simonGame.startGame();
};
