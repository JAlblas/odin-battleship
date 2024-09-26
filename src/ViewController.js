import Player from "./Player";

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
      this.computerBoardModel.resetBoard();
      this.playerBoardModel.resetBoard();
      this.updateBoard(this.computerBoardModel, this.computerBoard);
      this.updateBoard(this.playerBoardModel, this.playerBoard);
    });

    this.computerBoard = document.querySelector("#pc-board");
    this.playerBoard = document.querySelector("#player-board");

    this.updateBoard(this.computerBoardModel, this.computerBoard);
    this.updateBoard(this.playerBoardModel, this.playerBoard);
  }

  updateBoard(boardModel, boardUI) {
    boardUI.innerHTML = "";
    boardModel.board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const playerCell = document.createElement("div");
        playerCell.className = "cell";
        playerCell.dataset.row = rowIndex;
        playerCell.dataset.column = cellIndex;

        if (cell != null) {
          if (cell == "miss") {
            playerCell.innerHTML = "X";
          } else if (cell == "hit") {
            playerCell.innerHTML = "Hit";
          } else {
            if (boardModel.playerType == "human") {
              playerCell.innerHTML = "S";
            }
          }
        } else {
          playerCell.innerHTML = "";
        }

        if (boardModel.playerType === "pc") {
          playerCell.addEventListener("click", (e) => {
            const row = playerCell.dataset.row;
            const column = playerCell.dataset.column;
            console.log(row, column);
            if (boardModel.receiveAttack([row, column])) {
              Player.togglePlayer();

              setTimeout(
                function () {
                  // Make PC Move
                  this.computerBoardModel.makeEnemyMove(this.playerBoardModel);
                  this.updateBoard(this.playerBoardModel, this.playerBoard);
                  Player.togglePlayer();
                }.bind(this),
                1000,
              );
            }

            if (boardModel.isGameOver()) {
              alert("DONE!");
              // Restart game
              this.computerBoardModel.resetBoard();
              this.playerBoardModel.resetBoard();
              this.updateBoard(this.computerBoardModel, this.computerBoard);
              this.updateBoard(this.playerBoardModel, this.playerBoard);
            }
            this.updateBoard(boardModel, boardUI);
          });
        }
        boardUI.appendChild(playerCell);
      });
    });
  }
}

export default ViewController;
