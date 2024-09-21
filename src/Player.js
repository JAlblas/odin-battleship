class Player {
  constructor(type, board) {
    this.type = type;
    this.board = board;
  }

  // Static property to hold the current player
  static currentPlayer = null;

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
