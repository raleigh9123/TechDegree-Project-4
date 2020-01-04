/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/**
 * Game Object contains 3 properties:
 *  missed: tracks the number of missed guesses by the player.
 *  phrases: an array of fifteen Phrase objects to use with the game. A phrase should only include letters and spaces— no numbers, punctuation or other special characters.
 *   activePhrase: Phrase object currently in play.
 */
class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            'An arm and a leg',
            'good night',
            'bargain hunting',
            'cut corners',
            'break a leg',
            'easy does it',
            'under the weather',
            'on thin ice',
            'whole nine yards',
            'fit as a fiddle',
            'son of a gun',
            'on the spot',
            'abra cadabra',
            'clean as a whistle',
            'yeet',
        ];
        this.activePhrase = null;
    }

    /**
     * Reveals game board and loads new phrase
     */
    startGame() {
        // Hides start game overlay
        document.getElementById('overlay').style.display = 'none';
        // Takes random phrase from getRandomPhrase() method and passes into a new Phrase object. Sets the current game object's "activePhrase" to generated Phrase object
        this.activePhrase = new Phrase(this.getRandomPhrase());
        // Takes Phrase Object's string generates key spaces on screen
        const string = this.activePhrase.phrase;
        this.activePhrase.addPhraseToDisplay(string);
    }

    /**
     * @return {phrase} Randomly retrieves one of the phrases stored in the Game object's phrases array and returns it.
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[random];
    }

    /**
     * @param {htmlButton || keydownEventObject}
     * Direct game logic to match correct keys or remove lives for wrong keys. End game when phrase is completed.
     */
    handleInteraction(event) {
        // Capture event target (for onscreen button) or event object (for keydown event) and store in variable
        let button = event;

        /**
         * This if statement is evaluated only if the event is a keypress.
         * 1. Store all onscreen keys in array
         * 2. Create function 'findSelectedKey' with @param letter This function searches the array of onScreen keys. If a key onScreen matches the key pressed on keyboard, then change this.handleInteraction() method variable 'button' to equal matching on screen <button> element.
         */
        if (button.type === 'keydown') {
            const onScreenKeys = document.querySelectorAll('.key');

            const findSelectedKey = letter => {
                onScreenKeys.forEach(key => {
                    if (key.textContent === letter) {
                        button = key;
                    }
                });
            };
            findSelectedKey(button.key);
        }

        // Disables selected letter onscreen.
        button.disabled = true;

        // If phrase does not include user selected letter, add "chosen" css class, call showMatchedLetter(), and check for win by calling checkForWin(), else add "wrong" css class to button and call removeLife() method,
        const letter = button.textContent;
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button);
            if (this.checkForWin()) {
                this.gameOver();
            }
        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    /**
     * Remove life from scoreboard and call gameOver() if all lives are lost.
     */
    removeLife() {
        // Replace liveHeart.png with lostHeart.png
        if (this.missed < 5) {
            const totalLives = document.querySelectorAll('.tries');
            let lifeNumber = totalLives.length - this.missed - 1;

            totalLives[lifeNumber].childNodes[0].setAttribute('src', 'images/lostHeart.png');
        }
        // Increment missed property
        this.missed += 1;
        // If all lives lost, gameOver()
        if (this.missed === 5) {
            this.gameOver();
        }
    }

    /**
     * Checks to see if the player has revealed all of the letters in the active phrase.
     */
    checkForWin() {
        // Find total number of letters to guess
        const letters = document.querySelectorAll('.letter');
        const numlettersToGuess = letters.length;

        // Find total number of correct letters
        const correctLetters = document.querySelectorAll('.show');
        const correctGuesses = correctLetters.length;

        // If numbers match, gameOver();
        if (correctGuesses === numlettersToGuess) {
            this.gameOver();
        }
    }

    /**
     * Reveal the start overlay
     * Evaluate total missed guesses to determine win or loss
     * Update h1 element with win/loss message
     * Reset game by calling resetGame()
     */
    gameOver() {
        if (this.missed === 5) {
            document.querySelector('#game-over-message').textContent = 'You have lost! Try again!';
        } else {
            document.querySelector('#game-over-message').textContent = 'You won! Play again?';
        }

        document.getElementById('overlay').style.display = 'flex';

        this.resetGame();
    }

    /**
     * Reset game by clearing the active phrase on the board, resetting keys, and restoring lives. Reset missed counter
     */
    resetGame() {
        // Reset Phrase
        let lettersAndSpaces = document.querySelectorAll('#phrase ul li');
        for (let letter of lettersAndSpaces) {
            letter.parentNode.removeChild(letter);
        }

        // Reset Keys
        let keys = document.querySelectorAll('.key');
        for (let key of keys) {
            key.disabled = false;
            key.className = 'key';
        }

        // Reset Lives
        let lives = document.querySelectorAll('.tries img');
        for (let life of lives) {
            life.src = 'images/liveHeart.png';
        }

        this.missed = 0;
    }
}
