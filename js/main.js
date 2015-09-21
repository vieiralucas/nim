var stick11;
var stick12;
var stick13;
var stick21;
var stick22;
var stick23;
var stick24;
var stick31;
var stick32;
var stick33;
var stick34;
var stick35;
var row1;
var row2;
var row3;
var remove1;
var remove2;
var remove3;
var nextTurn;
var rButton1;
var rButton2;
var rButton3;
var computer;
var currentPlayer;
var player = 0, computer = 1;
var players = [player, computer];
var turn = players[Math.floor(Math.random() * players.length)];

window.onload = function() {
    stick11 = new Stick(11);
    stick12 = new Stick(12);
    stick13 = new Stick(13);

    stick21 = new Stick(21);
    stick22 = new Stick(22);
    stick23 = new Stick(23);
    stick24 = new Stick(24);

    stick31 = new Stick(31);
    stick32 = new Stick(32);
    stick33 = new Stick(33);
    stick34 = new Stick(34);
    stick35 = new Stick(35);

    row1 = new Row([stick11, stick12, stick13]);
    row2 = new Row([stick21, stick22, stick23, stick24]);
    row3 = new Row([stick31, stick32, stick33, stick34, stick35]);

    remove1 = document.getElementById('remove-button-1');
    remove2 = document.getElementById('remove-button-2');
    remove3 = document.getElementById('remove-button-3');
    nextTurn = document.getElementById('next-turn');

    rButton1 = new RemoveButton(remove1, row1);
    rButton2 = new RemoveButton(remove2, row2);
    rButton3 = new RemoveButton(remove3, row3);

    computerPlayer = new Computer('minmax');

    currentPlayer = document.getElementById('current-player');

    if (turn === player) {
        currentPlayer.innerHTML = 'jogador humano';
    } else {
        currentPlayer.innerHTML = 'computador';
        setTimeout(function() {
            computerPlayer.makeMove();
            passToPlayer();
        }, 1000); // waits 1 second so the player understands what is going on
    }

    remove1.onclick = clickFunction(1);
    remove2.onclick = clickFunction(2);
    remove3.onclick = clickFunction(3);
    nextTurn.onclick = passToComputer;

    function clickFunction(id) {
        return function() {
            var nextPlayer;
            switch (id) {
            case 1:
                if (!row1.empty) {
                    nextTurn.removeAttribute('disabled');
                    rButton2.disable();
                    rButton3.disable();

                    nextPlayer = rButton1.click();
                }
                break;
            case 2:
                if (!row2.empty) {
                    nextTurn.removeAttribute('disabled');
                    rButton1.disable();
                    rButton3.disable();

                    nextPlayer = rButton2.click();
                }

                break;
            case 3:
                if (!row3.empty) {
                    nextTurn.removeAttribute('disabled');
                    rButton1.disable();
                    rButton2.disable();

                    nextPlayer = rButton3.click();
                }
                break;
            }

            if (nextPlayer) {
                passToComputer();
            }
        };
    }

    function disableButtons() {
        [rButton1, rButton2, rButton3].forEach(function(r) {
            r.disable();
        });

        nextTurn.setAttribute('disabled', true);
    }

    function enableButtons() {
        [rButton1, rButton2, rButton3].forEach(function(r) {
            r.enable();
        });
    }

    function passToComputer() {
        if (!checkEnd()) {
            turn = computer;
            disableButtons();
            currentPlayer.innerHTML = 'computador';
            setTimeout(function() {
                computerPlayer.makeMove();
                passToPlayer();
            }, 1000); // waits 1 second so the player understands what is going on
        }
    }

    function passToPlayer() {
        if (!checkEnd()) {
            turn = player;
            enableButtons();
            currentPlayer.innerHTML = 'jogador humano'
        }
    }

    function checkEnd() {
        if (row1.empty && row2.empty && row3.empty) {
            var msg = document.getElementById('message');

            if (turn === player) {
                msg.innerHTML = 'O computador venceu!';
            } else {
                msg.innerHTML = 'O jogador humano venceu!';
            }

            disableButtons();
            return true;
        }

        return false;
    }
};
