$(document).ready(function() {
    var app = null;
    app = new Game();
    console.log('app running');
    // app.selectHole(5);
    app.selectHole(12);
});
function Game() {
    var self = this;
    this.board = new Board();
    this.hand = 0;
    this.currentPlayer = 1;
    this.selectHole = function(position) {
        console.log('selecting hole');
        var stones = self.board.arrangement[position];
        if (!stones) {
            console.log('select another position with stones');
            return;
        }
        console.log('numStones for position' + position + ': ' + stones);
        self.moveStones(position);
    };
    // Grab stones, empty hole
    this.grabStones = function(position) {
        self.hand = self.board.arrangement[position];
        self.board.arrangement[position] = 0;
    };
    // Strictly move stones, place one per hole, without rule checking
    this.moveStones = function(position) {
        self.grabStones(position);
        startingPosition = position + 1;
        console.log('startingPos:', startingPosition);
        for (var i = startingPosition; i < self.board.arrangement.length; i++) {
            if (self.hand !== 0) {
                console.log('num stones left:', self.hand);
                if (self.currentPlayer === 'player1' && i === 7) {
                    continue;
                }
                if (self.currentPlayer === 'player2' && i === 0) {
                    continue;
                }
                // Remove stone from hand
                self.hand--;
                // Add stone to hole
                self.board.arrangement[i]++;
                // Check for player 1, add stones in player 1 store only
                if (self.currentPlayer === 1 && self.board.arrangement.length - 1) {
                    i = -1;
                }
                // Check for player 2, add stones in player 2 store only
                if (self.currentPlayer === 2 && self.board.arrangement.length - 1) {
                    i = 6;
                }
            }
        }
        // Showing what’s on the board after end of turn
        console.log(
            'new board arrangement after stones moved:',
            self.board.arrangement
        );
    };
    // Switch players
    this.switchPlayers = function() {
        self.currentPlayer = 2;
    };
}
function Board() {
    this.arrangement = [0, 4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4];
}