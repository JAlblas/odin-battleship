class ViewController {
  constructor(computerBoardModel, playerBoardModel) {
    // You could initialize some variables here if needed
    this.computerBoard = null;
    this.playerBoard = null;
    this.startButton = null;

    this.computerBoardModel = computerBoardModel;
    this.playerBoardModel = playerBoardModel;
  }

  setupUI() {
    this.startButton = document.querySelector("#start-button");

    this.startButton.addEventListener("click", () => {
      console.log("restarting");
    });

    this.computerBoard = document.querySelector("#pc-board");
    this.playerBoard = document.querySelector("#player-board");

    this.updateBoard(this.computerBoardModel, this.computerBoard);
    this.updateBoard(this.playerBoardModel, this.playerBoard);
  }

  updateBoard(boardModel, boardUI) {
    boardUI.innerHTML = "";

    console.log(boardModel);
    boardModel.board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const playerCell = document.createElement("div");
        playerCell.className = "cell";
        playerCell.dataset.row = rowIndex;
        playerCell.dataset.column = cellIndex;

        if (cell != null) {
          playerCell.innerHTML = "S";
        } else {
          playerCell.innerHTML = "";
        }
        boardUI.appendChild(playerCell);
      });
    });
  }
}

export default ViewController;
