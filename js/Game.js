class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    get activePlayer() {
        return this.players.find(player => player.active);
    }

    // Creates two player objects
    createPlayers() {
        const players = [new Player("Player 1", 1, "#e15258", true), new Player("Player 2", 2, "#e59a13")];
        return players;
    }

    // Gets game ready for play
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawHTMLToken();
        this.ready = true;
    }

    handleKeydown(event) {
        if (this.ready) {
            if (event.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            }
            else if (event.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }
            else if (event.key === "ArrowDown") {
                this.playToken();
            }
        }
    }

    playToken() {
        let openSpace = null;
        for (let space of this.board.spaces[this.activePlayer.activeToken.columnLocation]) {
            if (space.token == null) {
                openSpace = space;
            }
            else {
                break;
            }
        }
        if (openSpace != null) {
            this.ready = false;
            this.activePlayer.activeToken.drop(openSpace, () => {
                this.updateGameState(this.activePlayer.activeToken, openSpace);
            });
        }
    }

    // Checks if there is a winner on the board after each token drop
    // @param {Object} Targeted space for dropped token
    // @return {boolean} Boolean value indicating whether the game has been won or not
    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        // Vertical Check
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x][y+1].owner === owner && 
                    this.board.spaces[x][y+2].owner === owner && 
                    this.board.spaces[x][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // Horizontal Check
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x+1][y].owner === owner && 
                    this.board.spaces[x+2][y].owner === owner && 
                    this.board.spaces[x+3][y].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // Upward Diagonal Check
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y+1].owner === owner && 
                    this.board.spaces[x-2][y+2].owner === owner && 
                    this.board.spaces[x-3][y+3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        // Downward Diagonal Check
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner && 
                    this.board.spaces[x-1][y-1].owner === owner && 
                    this.board.spaces[x-2][y-2].owner === owner && 
                    this.board.spaces[x-3][y-3].owner === owner) {
                        win = true;
                }           
            }
        }
    
        return win;
    }

    // Switches active player
    switchPlayers() {
        for (let player of this.players) {
            player.active = player.active === true ? false : true;
        }
    }

    // Displays game over message
    // @param {string} message - Game over message
    gameOver(message) {
        document.getElementById("game-over").style.display = "block";
        document.getElementById("game-over").textContent = message;
    }

    // Updates game state after token is dropped
    // @param {Object} token - The token that's being dropped
    // @param {Object} target - Targeted space for the dropped token
    updateGameState(token, target) {
        target.mark(token);
        if (this.checkForWin(target)) {
            this.gameOver(`you wins!`);
        }
        else {
            this.switchPlayers();
            if (this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawHTMLToken();
                this.ready = true;
            }
            else {
                gameOver("No more tokens!");
            }
        }
    }
}