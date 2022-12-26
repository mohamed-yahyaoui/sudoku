let game = new Game();
let counter;

document.addEventListener("keydown", (ev) => {
  if (!game.verify()) {
    switch (ev.key) {
      case "Backspace":
        break;
      case "ArrowDown":
        game.playerPosition.moveDown();
        break;
      case "ArrowUp":
        game.playerPosition.moveUp();
        break;
      case "ArrowLeft":
        game.playerPosition.moveLeft();
        break;
      case "ArrowRight":
        game.playerPosition.moveRight();
        break;
      default:
        break;
    }
    draw(game);
  }
});

document.addEventListener("keypress", (ev) => {
  if (!game.verify()) {
    let key = ev.key;
    if (!isNaN(key) && key > 0 && key <= 9) {
      game.changeValue(key);
    }
    if (key == "s") {
      console.log(game.sudoku[0][0]);
      game.cheat();
      console.log(game.sudoku[0][0]);
    }
    draw(game);
    endGame(game);
  }
});

function startGame() {
  document.querySelector(".timer-board").classList.remove("cached");
  document.querySelector(".bienvenu-container").classList.add("cached");
  gameSound.currentTime = 0;
  game.isStarted = true;
  gameSound.play();
  counter = setInterval(() => {
    if (game.verify() != 0) {
      clearInterval(counter);
    } else if (!game.isPaused) {
      game.timer += 1000;
      let minutes = Math.floor((game.timer % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((game.timer % (1000 * 60)) / 1000);

      document.querySelector(".timer").innerHTML = `${
        minutes < 10 ? "0" : ""
      }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
  }, 1000);
  draw(game);
}

function pauseGame(ev) {
  game.isPaused = !game.isPaused;
  ev.target.innerText = game.isPaused ? "⏺" : "⏸";
  game.isPaused ? gameSound.pause() : gameSound.play();
  draw(game);
}

function endGame(game) {
  if (game.verify()) {
    gameSound.pause();
    clearInterval(counter);
    document.querySelector(
      "#steps"
    ).innerText = `Finished in ${game.steps} steps`;
    document.querySelector("#time").innerText = `Time:  ${
      game.timer / 1000
    } seconds`;
    document.querySelector(".result").classList.remove("cached");
    winSound.play();
    document.querySelector(".timer-board").classList.add("cached");
    document.querySelector(".matrice-jeu").classList.add("cached");
  }
}

function replayGame() {
  game = new Game();
  endGame(game);
  clearInterval(counter);
  startGame();
  document.querySelector(".matrice-jeu").classList.remove("cached");
  document.querySelector(".result").classList.add("cached");
}
