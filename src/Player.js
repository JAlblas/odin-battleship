class Player {
  constructor(type, board) {
    this.type = type;
    this.board = board;
  }

  static players = ["player", "pc"];

  // Static property to hold the current player
  static currentPlayer = null;

  static togglePlayer() {
    const currentIndex = this.players.indexOf(this.currentPlayer);
    if (currentIndex == 0) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
    console.log(this.currentPlayer);
  }

  // Static method to set the current player
  static setCurrentPlayer(player) {
    Player.currentPlayer = player;
  }

  // Static method to get the current player
  static getCurrentPlayer() {
    return Player.currentPlayer;
  }
}

module.exports = Player;
