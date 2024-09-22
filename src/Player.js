class Player {
  constructor(type, board) {
    this.type = type;
    this.board = board;
  }

  static players = [];

  // Static property to hold the current player
  static currentPlayer = null;

  static setPlayers(players) {
    this.players = players;
  }

  static setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  static togglePlayer() {
    const currentIndex = this.players.indexOf(this.currentPlayer);
    if (currentIndex == 0) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
    console.log(this.currentPlayer);
  }

  placeShips(ships) {
    this.board.randomlyPlaceShips(ships);
  }
}

module.exports = Player;
