class Token {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    drawHTMLToken() {
        const token = document.createElement("div");
        document.getElementById("game-board-underlay").appendChild(token);
        token.setAttribute("id", this.id);
        token.setAttribute("class", "token");
        token.style.backgroundColor = this.owner.color;
    }

    get htmlToken() {
        return document.getElementById(this.id);
    }

    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation--;
        }
    }

    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation++;
        }
    }

    drop(target, reset) {
        this.dropped = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, "easeOutBounce", reset);
    }
}