var choice;
var stats;

function Computer(strategy) {
    this.strategy = strategy;
    stats = new Stats();
}

Computer.prototype.makeMove = function() {
    var game;

    if (this.strategy === 'minimax') {
        game = new Game(undefined, turn);
        minimax(game);
        drawChoice();
        stats.increaseMoves();
    } else if (this.strategy === 'minimaxpoda') {
        minimaxpoda();
    }
}

function minimax(game) {
    stats.increaseIterations();
    if (game.gameOver()) {
        return score(game);
    }

    var scores = [];
    var moves = game.getAvailableMoves();

    for (var i = 0; i < moves.length; i++) {
        var cp = new Game(_.clone(moves[i].rows), theOther(moves[i].turn));
        scores.push(minimax(cp));
    }

    if (game.turn === computer) {
        var max = scores[0];
        var index = 0;

        for (var i = 1; i < scores.length; i++) {
            if (scores[i] > max) {
                index = i;
                max = scores[i];
            }
        }

        choice = moves[index]
        return scores[index];
    } else {
        var min = scores[0];
        var index = 0;

        for (var i = 1; i < scores.length; i++) {
            if (scores[i] < min) {
                index = i;
                min = scores[i];
            }
        }

        choice = moves[index]
        return scores[index];
    }
}

function score(game) {
    if (game.win(computer)) {
        return 10;
    } else if (game.win(player)) {
        return -10;
    }

    return 0;
}

function Game(rows, turn) {
    this.turn = turn;

    if (rows) {
        this.rows = rows;
    } else {
        this.rows = [[], [], []];

        for (var i = 0; i < row1.sticks.length; i++) {
            this.rows[0].push(row1.sticks[i].removed ? 0 : 1);
        }

        for (var i = 0; i < row2.sticks.length; i++) {
            this.rows[1].push(row2.sticks[i].removed ? 0 : 1);
        }

        for (var i = 0; i < row3.sticks.length; i++) {
            this.rows[2].push(row3.sticks[i].removed ? 0 : 1);
        }
    }
}

Game.prototype.gameOver = function() {
    var availables = 0;

    for (var i = 0; i < this.rows.length; i++) {
        for (var j = 0; j < this.rows[i].length; j++) {
            if (this.rows[i][j] === 1) {
                return false;
            }
        }
    }

    return true;
};

Game.prototype.win = function(who) {
    if (who !== this.turn) {
        return false;
    }

    return true;
};

Game.prototype.getAvailableMoves = function() {
    var moves = [];

    var available1 = getAvailableSticksCount(this.rows[0]);
    for (var i = 0; i < available1; i++) {
        var cp = _.clone(this.rows);
        cp[0] = Array(3);
        cp[0].fill(0)
        for (var c = 0; c < i; c++) {
            cp[0][c] = 1;
        }

        moves.push(new Game(cp, this.turn));
    }

    var available2 = getAvailableSticksCount(this.rows[1]);
    for (var i = 0; i < available2; i++) {
        var cp = _.clone(this.rows);
        cp[1] = Array(4);
        cp[1].fill(0)
        for (var c = 0; c < i; c++) {
            cp[1][c] = 1;
        }

        moves.push(new Game(cp, this.turn));
    }

    var available3 = getAvailableSticksCount(this.rows[2]);
    for (var i = 0; i < available3; i++) {
        var cp = _.clone(this.rows);
        cp[2] = Array(5);
        cp[2].fill(0)
        for (var c = 0; c < i; c++) {
            cp[2][c] = 1;
        }

        moves.push(new Game(cp, this.turn));
    }

    return moves;
};

function getAvailableSticksCount(row) {
    var count = 0;

    for (var i = 0; i < row.length; i++) {
        if (row[i] === 1) {
            count++;
        }
    }

    return count;
}

function theOther(theOne) {
    if (theOne === player) {
        return computer;
    }

    return player;
}

function drawChoice() {
    for (var i = 0; i < choice.rows[0].length; i++) {
        if (choice.rows[0][i] === 1) {
            row1.sticks[i].revive();
        } else {
            row1.sticks[i].remove();
        }
    }
    row1.attEmpty();

    for (var i = 0; i < choice.rows[1].length; i++) {
        if (choice.rows[1][i] === 1) {
            row2.sticks[i].revive();
        } else {
            row2.sticks[i].remove();
        }
    }
    row2.attEmpty();

    for (var i = 0; i < choice.rows[2].length; i++) {
        if (choice.rows[2][i] === 1) {
            row3.sticks[i].revive();
        } else {
            row3.sticks[i].remove();
        }
    }
    row3.attEmpty();
}
