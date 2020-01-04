/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

/**
 * The class should include a constructor that initializes the following properties:
 * 
 *  missed: used to track the number of missed guesses by the player. The initial value is 0, since no guesses have been made at the start of the game.
 *  phrases: an array of five Phrase objects to use with the game. A phrase should only include letters and spaces— no numbers, punctuation or other special characters.
*   activePhrase: This is the Phrase object that’s currently in play. The initial value is null. Within the startGame() method, this property will be set to the Phrase object returned from a call to the getRandomPhrase() method.
 
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
            'perfect storm',
            'whole nine yards',
            'fit as a fiddle',
            'son of a gun',
            'on the spot',
            'abra cadabra',
            'clean as a whistle',
            'shazam',
            'yeet',
        ];
        this.activePhrase = null;
    }

    /**
     * hides the start screen overlay, calls the getRandomPhrase() method, and sets the activePhrase property with the chosen phrase. It also adds that phrase to the board by calling the addPhraseToDisplay() method on the active Phrase object.
     *
     */
    startGame() {
        // Hides overlay
        document.getElementById('overlay').style.display = 'none';
        // Takes random phrase from getRandomPhrase() method and passes into a new Phrase object, then sets the current game object's "activePhrase" to the new Phrase object
        this.activePhrase = new Phrase(this.getRandomPhrase());
        // Takes active phrase's string and passes into Phrase Object's addPhraseToDisplay() method to generate visual on screen
        const string = this.activePhrase.phrase;
        this.activePhrase.addPhraseToDisplay(string);
    }

    /**
     * @return {phrase} randomly retrieves one of the phrases stored in the Game object's phrases array and returns it
     *
     */
    getRandomPhrase() {
        const random = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[random];
    }

    /**
     * @param {htmlElement} [key].event.Target
     * Check to see if the button clicked by the player matches a letter in the phrase and direct game logic if letter matches or fails to match.
     */
    handleInteraction(event) {
        // Capture event (whether keydown or click) and store in variable
        let button = event;

        /**
         * This if statement is evaluated only if the event is a keypress.
         * 1. Store all onscreen keys in array
         * 2. Create function findSelectedKey with @param letter This function searches the array of onScreen keys. Once a key onScreen matches the key pressed on keyboard, then this.handleInteraction() variable 'button' equals matching on screen <button> element.
         * 3. Change handleInteraction() method's button variable to match onscreen keyboard click
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
        const letter = button.textContent;

        // If phrase does not include user selected letter, add "wrong" css class to button and call removeLife() method, else add "chosen" css class, call showMatchedLetter(), and check for win by calling checkForWin()
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
     * this method removes a life from the scoreboard, by replacing one of the liveHeart.png images with a lostHeart.png image (found in the images folder) and increments the missed property. If the player has five missed guesses (i.e they're out of lives), then end the game by calling the gameOver() method.k
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
     * this method checks to see if the player has revealed all of the letters in the active phrase.
     *
     */
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const numlettersToGuess = letters.length;

        const correctLetters = document.querySelectorAll('.show');
        const correctGuesses = correctLetters.length;

        if (correctGuesses === numlettersToGuess) {
            this.gameOver();
        }
    }

    /**
     * this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class.
     *
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
