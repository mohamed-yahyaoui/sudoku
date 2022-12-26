function draw(game) {
  if (game.isStarted) {
    document.querySelector(".matrice-jeu").remove();
    let matriceDiv = document.createElement("div");
    matriceDiv.classList.add("matrice-jeu");
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let cell = document.createElement("div");
        cell.classList.add("small-case");
        cell.id = `n${i}${j}`;
        if (!game.isPaused && game.sudoku[i][j].value != 0) {
          cell.innerText = game.sudoku[i][j].value;
        }
        if (
          !game.isPaused &&
          i == game.playerPosition.i &&
          j == game.playerPosition.j
        ) {
          cell.classList.add("blinking");
        }
        matriceDiv.appendChild(cell);
      }
    }
    document.body.appendChild(matriceDiv);
  }
}
