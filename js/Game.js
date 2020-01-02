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
            'Merry Christmas',
            'good morning',
            'bargain hunting',
            'cut corners',
            'break a leg',
            'easy does it',
            'under the weather',
            'on thin ice',
            'perfect storm',
            'whole nine yards',
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
    handleInteraction(button) {
        // Disables selected letter onscreen.
        button.disabled = true;

        // If phrase does not include user selected letter, add "wrong" css class to button and call removeLife() method, else add "chosen" css class, call showMatchedLetter(), and check for win by calling checkForWin()
        if (this.activePhrase.checkLetter(button, this.activePhrase)) {
            button.classList.add('wrong');
            this.removeLife();
        } else {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter();
            if (this.checkForWin()) {
                this.gameOver();
            }
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
    checkForWin() {}

    /**
     * this method displays the original start screen overlay, and depending on the outcome of the game, updates the overlay h1 element with a friendly win or loss message, and replaces the overlay’s start CSS class with either the win or lose CSS class.
     *
     */
    gameOver() {}
}
