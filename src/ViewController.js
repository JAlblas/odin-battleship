class ViewController {
  constructor() {
    // You could initialize some variables here if needed
    this.computerBoard = null;
    this.playerBoard = null;
    this.startButton = null;
  }

  setupUI() {
    this.startButton = document.querySelector("#start-button");

    this.startButton.addEventListener("click", () => {
      console.log("restarting");
    });

    this.computerBoard = document.querySelector("#pc-board");
    this.playerBoard = document.querySelector("#player-board");

    for (let j = 0; j < 100; j++) {
      const computerCell = document.createElement("div");
      computerCell.className = "cell";
      this.computerBoard.appendChild(computerCell);

      const playerCell = document.createElement("div");
      playerCell.className = "cell";
      this.playerBoard.appendChild(playerCell);
    }
  }

  updateBoard() {
    //this.computerBoard.innerText = "PC Board";
    //this.playerBoard.innerText = "Player Board";
  }
}

export default ViewController;
