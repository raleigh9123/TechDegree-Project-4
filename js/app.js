/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

/**
 * Add click event listener to "Start Game" button which instantiates a new Game object and starts the game with startGame() method.
 *
 */
const game = new Game();
document.getElementById('btn__reset').addEventListener('click', function() {
    game.startGame();
});

/**
 * Add click event listeners to each of the onscreen keyboard buttons, click calls handleInteraction() method on the Game object.
 */
const onScreenKeys = document.querySelectorAll('.key');
onScreenKeys.forEach(key => {
    key.addEventListener('click', function(e) {
        game.handleInteraction(e.target);
    });
});

/**
 * Add keydown event listener. Calls handleInteraction() method on the Game object. Passes event object into method call.
 */
document.addEventListener('keydown', function(e) {
    game.handleInteraction(e);
});
