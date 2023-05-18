function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, duration)
    });
}

function showElement(el) {
    el.setAttribute("style", "");
}

function hideElement(el) {
    el.setAttribute("style", "display: none");
}

const game = {
    playButtonContainer: document.querySelector(".play-button-container"),
    colorButtons: document.querySelectorAll(".buttons .button"),
    levelContainer: document.querySelector(".level"),
    level: 1,
    isPlaying: false,
    sequence: [],
    response: [],
    possibleColors: ["green", "red", "blue", "yellow"],
    
    initialize() {
        this.listenButtonClicks();
    },

    startLevel() {
        hideElement(this.playButtonContainer);
        showElement(this.levelContainer);
        
        this.isPlaying = true;
        this.generateLevel();
        this.showLevel();
        
        this.levelContainer.innerHTML = this.level;
    },
    
    listenButtonClicks() {
        this.colorButtons.forEach(button => {
            button.addEventListener("click", () => {
                if (!game.isPlaying) return;
        
                const color = button.dataset.color;
                this.response.push(color);
                this.checkResponse();
            });
        });
    },

    generateLevel() {
        const newItem = this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)];
        this.sequence.push(newItem);
    },

    getButton(color) {
        return Array.from(this.colorButtons).find(x => x.dataset.color === color);
    },

    async checkResponse() {
        if (this.response.length < this.sequence.length) {
            return;
        }

        if (this.response.toString() == this.sequence.toString()) {
            this.level++;
            this.response = [];

            await wait(1000);
            this.startLevel();
        } else {
            alert("You lost the game :(");
            this.isPlaying = false;
            this.reset();
        }
    },

    async showLevel() {
        for (let i = 0; i < this.sequence.length; i++) {
            const color = this.sequence[i];
            const element = this.getButton(color);
            element.classList.add("active");
            await wait(1000);
            element.classList.remove("active");
            await wait(200);
        }
    },

    reset() {
        this.level = 1;
        this.sequence = [];
        this.response = [];
        
        showElement(this.playButtonContainer);
        hideElement(this.levelContainer);
    }
};

game.initialize();

const playButton = document.querySelector(".play");
playButton.addEventListener("click", () => {
    game.startLevel();
});
