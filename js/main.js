window.onload = function() {
    var stick11 = new Stick(11);
    var stick12 = new Stick(12);
    var stick13 = new Stick(13);

    var stick21 = new Stick(21);
    var stick22 = new Stick(22);
    var stick23 = new Stick(23);
    var stick24 = new Stick(24);

    var stick31 = new Stick(31);
    var stick32 = new Stick(32);
    var stick33 = new Stick(33);
    var stick34 = new Stick(34);
    var stick35 = new Stick(35);

    var row1 = new Row([stick11, stick12, stick13]);
    var row2 = new Row([stick21, stick22, stick23, stick24]);
    var row3 = new Row([stick31, stick32, stick33, stick34, stick35]);

    var remove1 = document.getElementById('remove-button-1');
    var remove2 = document.getElementById('remove-button-2');
    var remove3 = document.getElementById('remove-button-3');
    var nextTurn = document.getElementById('next-turn');

    var rButton1 = new RemoveButton(remove1, row1);
    var rButton2 = new RemoveButton(remove2, row2);
    var rButton3 = new RemoveButton(remove3, row3);

    var currentPlayer = document.getElementById('current-player');

    var player = 0, computer = 1;
    var players = [player, computer];
    var turn = player; //players[Math.floor(Math.random() * players.length)];

    if (turn === player) {
        currentPlayer.innerHTML = 'jogador humano';
    } else {
        currentPlayer.innerHTML = 'computador';
    }

    remove1.onclick = clickFunction(1);
    remove2.onclick = clickFunction(2);
    remove3.onclick = clickFunction(3);
    nextTurn.onclick = passToComputer;

    function clickFunction(id) {
        return function() {
            nextTurn.removeAttribute('disabled');
            var nextPlayer;
            switch (id) {
            case 1:
                rButton2.disable();
                rButton3.disable();

                nextPlayer = rButton1.click();
                break;
            case 2:
                rButton1.disable();
                rButton3.disable();

                nextPlayer = rButton2.click();
                break;
            case 3:
                rButton1.disable();
                rButton2.disable();

                nextPlayer = rButton3.click();
                break;
            }

            if (nextPlayer) {
            }
        };
    }

    function disableButtons() {
        [rButton1, rButton2, rButton3].forEach(function(r) {
            r.disable();
        });

        nextTurn.setAttribute('disabled', true);
    }

    function passToComputer() {
        turn = computer;
        disableButtons();
        currentPlayer.innerHTML = 'computador';
    }
};
