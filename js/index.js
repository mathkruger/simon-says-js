const playButton = document.querySelector(".play");
const colorButtons = document.querySelectorAll(".buttons .button");

function wait(duration = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve();
        }, duration)
    });
}

const game = {
    level: 1,
    isPlaying: false,
    sequence: [],
    response: [],
    possibleColors: ["green", "red", "blue", "yellow"],

    startLevel() {
        this.isPlaying = true;
        this.generateLevel();
        this.showLevel();
    },

    generateLevel() {
        const newItem = this.possibleColors[Math.floor(Math.random() * this.possibleColors.length)];
        this.sequence.push(newItem);
    },

    getButton(color) {
        return Array.from(colorButtons).find(x => x.classList.contains(color));
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
        this.level = 0;
        this.sequence = [];
        this.response = [];
    }
};

playButton.addEventListener("click", () => {
    game.startLevel();
});

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (!game.isPlaying) return;

        const color = button.dataset.color;
        game.response.push(color);
        game.checkResponse();
    });
});