const newGame = new Game();

$("#begin-game").click(function() {
    newGame.startGame();
    this.style.display = 'none';
    document.getElementById("play-area").style.opacity = '1';
});

document.addEventListener("keydown", function(event) {
    newGame.handleKeydown(event);
});