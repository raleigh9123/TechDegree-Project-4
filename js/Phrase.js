/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

/**
 * Phrase Object contains 1 property:
 *  phrase: takes phrase parameter and converts string to lowercase
 */
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * @param {string} string Generates placeholders on screen when the game starts. Each letter in phrase is represented by an empty box (an html <li> element)
     */
    addPhraseToDisplay(phrase) {
        const phraseSection = document.querySelector('#phrase ul');

        // Splits phrase into individual letters and places each letter into array 'letters'
        const letters = phrase.split('');

        // For each letter, create a <li> element with proper css class and letter as textContent
        letters.forEach(letter => {
            let htmlLetterItem = document.createElement('li');
            // CSS Class "Space" if no letter
            if (letter === ' ') {
                htmlLetterItem.className = 'space';
            } /* CSS Class "letter" if contains letter */ else {
                htmlLetterItem.classList.add('letter', 'hide', letter);
                htmlLetterItem.textContent = letter;
            }

            // Append each letter to DOM
            phraseSection.appendChild(htmlLetterItem);
        });
    }

    /**
     * @param {letter} string Checks letter selected by the player  and if matche in game phrase is found, returns true. If no match is found, return false
     */
    checkLetter(letter) {
        return this.phrase.includes(letter);
    }

    /**
     * @param {button} htmlElement  Parameter is on screen button. Queries all letters in active phrase that match letters (found with css class of letter). For each letter, add css class 'show' to reveal on page.
     */
    showMatchedLetter(button) {
        const matchedLetters = document.querySelectorAll(`.${button.textContent}`);

        for (let i = 0; i < matchedLetters.length; i++) {
            matchedLetters[i].classList.add('show');
        }
    }
}
