function protectNumber(n, changement) {
  let nApresChangement = n + changement;
  return nApresChangement >= 0 && nApresChangement <= 8;
}

class Position {
  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  moveUp() {
    if (protectNumber(this.i, -1)) {
      this.i -= 1;
    }
  }

  moveDown() {
    if (protectNumber(this.i, 1)) {
      this.i += 1;
    }
  }

  moveRight() {
    if (protectNumber(this.j, 1)) {
      this.j += 1;
    }
  }

  moveLeft() {
    if (protectNumber(this.j, -1)) {
      this.j -= 1;
    }
  }
}

class GameCell {
  constructor(value = 0) {
    this.value = value;
    this.predefined = value != 0;
  }
}

class Game {
  sudoku = [
    [
      new GameCell(),
      new GameCell(),
      new GameCell(),
      new GameCell(2),
      new GameCell(6),
      new GameCell(),
      new GameCell(7),
      new GameCell(),
      new GameCell(1),
    ],
    [
      new GameCell(6),
      new GameCell(8),
      new GameCell(),
      new GameCell(),
      new GameCell(7),
      new GameCell(),
      new GameCell(),
      new GameCell(9),
      new GameCell(),
    ],
    [
      new GameCell(1),
      new GameCell(9),
      new GameCell(),
      new GameCell(),
      new GameCell(),
      new GameCell(4),
      new GameCell(5),
      new GameCell(),
      new GameCell(),
    ],
    [
      new GameCell(8),
      new GameCell(2),
      new GameCell(),
      new GameCell(1),
      new GameCell(),
      new GameCell(),
      new GameCell(),
      new GameCell(4),
      new GameCell(),
    ],
    [
      new GameCell(),
      new GameCell(),
      new GameCell(4),
      new GameCell(6),
      new GameCell(),
      new GameCell(2),
      new GameCell(9),
      new GameCell(),
      new GameCell(),
    ],
    [
      new GameCell(),
      new GameCell(5),
      new GameCell(),
      new GameCell(),
      new GameCell(),
      new GameCell(3),
      new GameCell(),
      new GameCell(2),
      new GameCell(8),
    ],
    [
      new GameCell(),
      new GameCell(),
      new GameCell(9),
      new GameCell(3),
      new GameCell(),
      new GameCell(),
      new GameCell(),
      new GameCell(7),
      new GameCell(4),
    ],
    [
      new GameCell(),
      new GameCell(4),
      new GameCell(),
      new GameCell(),
      new GameCell(5),
      new GameCell(),
      new GameCell(),
      new GameCell(3),
      new GameCell(6),
    ],
    [
      new GameCell(7),
      new GameCell(),
      new GameCell(3),
      new GameCell(),
      new GameCell(1),
      new GameCell(8),
      new GameCell(),
      new GameCell(),
      new GameCell(),
    ],
  ];

  playerPosition = new Position(0, 0);
  isPaused = false;
  isStarted = false;
  timer = 0;
  steps = 0;

  changeValue(value) {
    let cell = this.sudoku[this.playerPosition.i][this.playerPosition.j];
    if (!cell.predefined) {
      cell.value = value;
      this.steps++;
      this.verify();
    }
  }

  getSousMatrice(i1, i2, j1, j2) {
    return this.sudoku.slice(i1, i2 + 1).map((e) => e.slice(j1, j2 + 1));
  }

  verifyMatriceGroupes() {
    let groupes = [
      this.getSousMatrice(0, 2, 0, 2),
      this.getSousMatrice(0, 2, 3, 5),
      this.getSousMatrice(0, 2, 6, 8),
      this.getSousMatrice(3, 5, 0, 2),
      this.getSousMatrice(3, 5, 3, 5),
      this.getSousMatrice(3, 5, 6, 8),
      this.getSousMatrice(6, 8, 0, 2),
      this.getSousMatrice(6, 8, 3, 5),
      this.getSousMatrice(6, 8, 6, 8),
    ];
    return groupes
      .map((e) => e.flat())
      .every((e) => new Set(e.filter((e) => e.value != 0)).size == 9);
  }

  verifierLignes() {
    return this.sudoku.every(
      (ligne) => new Set(ligne.filter((e) => e.value != 0)).size == 9
    );
  }

  verifierColonnes() {
    return this.sudoku
      .map((_, indice) => this.sudoku.map((ligne) => ligne[indice]))
      .every((ligne) => new Set(ligne.filter((e) => e.value != 0)).size == 9);
  }

  verify() {
    return (
      this.verifierLignes() &&
      this.verifierColonnes() &&
      this.verifyMatriceGroupes()
    );
  }

  cheat() {
    this.sudoku = solution;
  }
}

let solution = [
  [
    new GameCell(),
    new GameCell(3),
    new GameCell(5),
    new GameCell(2),
    new GameCell(6),
    new GameCell(9),
    new GameCell(7),
    new GameCell(8),
    new GameCell(1),
  ],
  [
    new GameCell(6),
    new GameCell(8),
    new GameCell(2),
    new GameCell(5),
    new GameCell(7),
    new GameCell(1),
    new GameCell(4),
    new GameCell(9),
    new GameCell(3),
  ],
  [
    new GameCell(1),
    new GameCell(9),
    new GameCell(7),
    new GameCell(8),
    new GameCell(2),
    new GameCell(4),
    new GameCell(5),
    new GameCell(6),
    new GameCell(2),
  ],
  [
    new GameCell(8),
    new GameCell(2),
    new GameCell(6),
    new GameCell(1),
    new GameCell(9),
    new GameCell(5),
    new GameCell(3),
    new GameCell(4),
    new GameCell(7),
  ],
  [
    new GameCell(3),
    new GameCell(7),
    new GameCell(4),
    new GameCell(6),
    new GameCell(8),
    new GameCell(2),
    new GameCell(9),
    new GameCell(1),
    new GameCell(5),
  ],
  [
    new GameCell(9),
    new GameCell(5),
    new GameCell(1),
    new GameCell(7),
    new GameCell(4),
    new GameCell(3),
    new GameCell(6),
    new GameCell(2),
    new GameCell(8),
  ],
  [
    new GameCell(5),
    new GameCell(1),
    new GameCell(9),
    new GameCell(3),
    new GameCell(2),
    new GameCell(6),
    new GameCell(8),
    new GameCell(7),
    new GameCell(4),
  ],
  [
    new GameCell(2),
    new GameCell(4),
    new GameCell(8),
    new GameCell(9),
    new GameCell(5),
    new GameCell(7),
    new GameCell(1),
    new GameCell(3),
    new GameCell(6),
  ],
  [
    new GameCell(7),
    new GameCell(6),
    new GameCell(3),
    new GameCell(4),
    new GameCell(1),
    new GameCell(8),
    new GameCell(2),
    new GameCell(5),
    new GameCell(9),
  ],
];
